import { getProperty } from '../config/settings';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';

export const createJiraIssue = async (params) => {
  try {
    const domain = getProperty(CONFIG.PROPERTIES.JIRA_DOMAIN);
    const email = getProperty(CONFIG.PROPERTIES.JIRA_EMAIL);
    const apiToken = getProperty(CONFIG.PROPERTIES.JIRA_API_TOKEN);
    const projectKey = getProperty(CONFIG.PROPERTIES.JIRA_PROJECT_KEY);

    if (!domain || !email || !apiToken || !projectKey) {
      logInfo('Jira Config Debug', {
        hasDomain: !!domain,
        hasEmail: !!email,
        hasToken: !!apiToken,
        hasProjectKey: !!projectKey,
        domain,
        email,
        projectKey,
      });
      throw new Error('Missing Jira configuration');
    }

    const jiraUrl = domain.startsWith('https://') ? domain : `https://${domain}`;
    const apiEndpoint = `${jiraUrl}/rest/api/3/issue`;

    // Log request details for debugging
    logInfo('Jira Request', {
      url: apiEndpoint,
      email,
      projectKey,
      title: params.title,
      priority: params.priority,
    });

    // Convert priority to Jira format
    const priorityMap = {
      High: '1',
      Medium: '3',
      Low: '5',
    };

    const jiraPriority = priorityMap[params.priority] || '3';

    // Format labels (remove special characters and lowercase)
    const labels = [
      'email-automation',
      params.category?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'uncategorized',
    ];

    // Create proper Jira description with technical details
    const technicalDetails = JSON.parse(params.technicalDetails || '{}');
    const metadata = JSON.parse(params.metadata || '{}');

    const descriptionContent = [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: params.description }],
      },
      {
        type: 'paragraph',
        content: [{ type: 'text', text: '\nTechnical Details:', marks: [{ type: 'strong' }] }],
      },
    ];

    // Add technical details if available
    if (technicalDetails.appVersion) {
      descriptionContent.push({
        type: 'paragraph',
        content: [{ type: 'text', text: `App Version: ${technicalDetails.appVersion}` }],
      });
    }

    if (technicalDetails.deviceInfo) {
      const { deviceInfo } = technicalDetails;
      if (deviceInfo.type || deviceInfo.model || deviceInfo.osVersion) {
        descriptionContent.push({
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: `Device: ${[
                deviceInfo.type,
                deviceInfo.model,
                deviceInfo.osVersion,
              ].filter(Boolean).join(', ')}`,
            },
          ],
        });
      }
    }

    // Add email metadata
    if (metadata.emailId || metadata.threadId) {
      descriptionContent.push({
        type: 'paragraph',
        content: [{ type: 'text', text: '\nEmail Reference:', marks: [{ type: 'strong' }] }],
      });
      if (metadata.emailId) {
        descriptionContent.push({
          type: 'paragraph',
          content: [{ type: 'text', text: `Email ID: ${metadata.emailId}` }],
        });
      }
      if (metadata.threadId) {
        descriptionContent.push({
          type: 'paragraph',
          content: [{ type: 'text', text: `Thread ID: ${metadata.threadId}` }],
        });
      }
    }

    const payload = {
      fields: {
        project: { key: projectKey },
        summary: params.title,
        description: {
          type: 'doc',
          version: 1,
          content: descriptionContent,
        },
        issuetype: { name: 'Task' },
        priority: { id: jiraPriority },
        labels,
      },
    };

    // Log the payload for debugging
    logInfo('Jira Payload', payload);

    const response = await UrlFetchApp.fetch(apiEndpoint, {
      method: 'post',
      headers: {
        Authorization: `Basic ${Utilities.base64Encode(`${email}:${apiToken}`)}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      muteHttpExceptions: true,
      payload: JSON.stringify(payload),
    });

    const responseData = JSON.parse(response.getContentText());
    logInfo('Jira Response Details', {
      status: response.getResponseCode(),
      headers: response.getAllHeaders(),
      body: response.getContentText(),
    });

    if (response.getResponseCode() !== 201) {
      throw new Error(`Jira API Error: ${responseData.errorMessages?.[0] || 'Unknown error'}`);
    }

    const issueKey = responseData.key;
    const issueUrl = `${jiraUrl}/browse/${issueKey}`;

    return {
      success: true,
      id: issueKey,
      url: issueUrl,
    };
  } catch (error) {
    logError('Create Jira Issue Error', error);
    throw error;
  }
};

export const checkJiraSetup = async () => {
  try {
    const token = getProperty(CONFIG.PROPERTIES.JIRA_API_TOKEN);
    const email = getProperty(CONFIG.PROPERTIES.JIRA_EMAIL);
    const domain = getProperty(CONFIG.PROPERTIES.JIRA_DOMAIN);
    const projectKey = getProperty(CONFIG.PROPERTIES.JIRA_PROJECT_KEY);

    if (!token || !email || !domain || !projectKey) {
      throw new Error('Missing required Jira configuration');
    }

    const baseUrl = domain.startsWith('https://') ? domain : `https://${domain}`;

    // Test authentication
    const authResponse = await UrlFetchApp.fetch(`${baseUrl}/rest/api/3/myself`, {
      method: 'get',
      headers: {
        Authorization: `Basic ${Utilities.base64Encode(`${email}:${token}`)}`,
        Accept: 'application/json',
      },
      muteHttpExceptions: true,
    });

    if (authResponse.getResponseCode() !== 200) {
      throw new Error('Authentication failed - check email and API token');
    }

    // Test project access
    const projectResponse = await UrlFetchApp.fetch(`${baseUrl}/rest/api/3/project/${projectKey}`, {
      method: 'get',
      headers: {
        Authorization: `Basic ${Utilities.base64Encode(`${email}:${token}`)}`,
        Accept: 'application/json',
      },
      muteHttpExceptions: true,
    });

    if (projectResponse.getResponseCode() !== 200) {
      throw new Error(`Project "${projectKey}" not found or not accessible`);
    }

    // Test issue types
    const projectData = JSON.parse(projectResponse.getContentText());
    const issueTypes = projectData.issueTypes || [];
    if (!issueTypes.some((type) => type.name === 'Task')) {
      throw new Error('Project does not have "Task" issue type');
    }

    return {
      success: true,
      account: JSON.parse(authResponse.getContentText()),
      project: projectData,
    };
  } catch (error) {
    logError('Jira Setup Check', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
