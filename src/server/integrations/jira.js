import { getProperty } from '../config/settings';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';

// Helper function to map our priority levels to Jira priority names
const mapPriority = (priority) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return 'Medium';
  }
};

export const createJiraIssue = async (params) => {
  // Declare variables at the top of the function scope
  let token;
  let email;
  let domain;
  let projectKey;

  try {
    token = getProperty(CONFIG.PROPERTIES.JIRA_API_TOKEN);
    email = getProperty(CONFIG.PROPERTIES.JIRA_EMAIL);
    domain = getProperty(CONFIG.PROPERTIES.JIRA_DOMAIN);
    projectKey = getProperty(CONFIG.PROPERTIES.JIRA_PROJECT_KEY);

    if (!token || !email || !domain || !projectKey) {
      throw new Error('Jira configuration missing. Please check settings.');
    }

    // Construct proper URL - ensure no double https://
    const baseUrl = domain.startsWith('https://') ? domain : `https://${domain}`;
    const apiUrl = `${baseUrl}/rest/api/3/issue`;

    // Log request details (excluding sensitive info)
    logInfo('Jira Request', {
      url: apiUrl,
      email,
      projectKey,
      title: params.title,
      priority: params.priority,
    });

    // Build description including metadata
    const description = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: params.description,
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: '\n\nTechnical Details:',
              marks: [{ type: 'strong' }],
            },
          ],
        },
      ],
    };

    // Add metadata to description instead of custom fields
    if (params.metadata || params.technicalDetails) {
      description.content.push({
        type: 'bulletList',
        content: [
          ...(params.metadata?.emailId ? [{
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{
                type: 'text',
                text: `Email ID: ${params.metadata.emailId}`,
              }],
            }],
          }] : []),
          ...(params.metadata?.threadId ? [{
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{
                type: 'text',
                text: `Thread ID: ${params.metadata.threadId}`,
              }],
            }],
          }] : []),
          ...(params.technicalDetails?.appVersion ? [{
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{
                type: 'text',
                text: `App Version: ${params.technicalDetails.appVersion}`,
              }],
            }],
          }] : []),
          ...(params.technicalDetails?.deviceInfo ? [{
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{
                type: 'text',
                text: `Device: ${params.technicalDetails.deviceInfo.type} 
                \n${params.technicalDetails.deviceInfo.model} (${params.technicalDetails.deviceInfo.osVersion})`,
              }],
            }],
          }] : []),
          ...(params.technicalDetails?.userIdentifiers?.aid ? [{
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{
                type: 'text',
                text: `AID: ${params.technicalDetails.userIdentifiers.aid}`,
              }],
            }],
          }] : []),
          ...(params.technicalDetails?.userIdentifiers?.userId ? [{
            type: 'listItem',
            content: [{
              type: 'paragraph',
              content: [{
                type: 'text',
                text: `User ID: ${params.technicalDetails.userIdentifiers.userId}`,
              }],
            }],
          }] : []),
        ],
      });
    }

    const payload = {
      fields: {
        project: {
          key: projectKey,
        },
        summary: params.title,
        description,
        issuetype: {
          name: 'Task',
        },
        priority: {
          name: mapPriority(params.priority),
        },
        labels: ['email-automation', params.category.toLowerCase().split(' ').join('-')],
      },
    };

    logInfo('Jira Payload', payload);

    const response = await UrlFetchApp.fetch(apiUrl, {
      method: 'post',
      headers: {
        Authorization: `Basic ${Utilities.base64Encode(`${email}:${token}`)}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      muteHttpExceptions: true,
      payload: JSON.stringify(payload),
    });

    // Log response details
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    const responseHeaders = response.getAllHeaders();

    logInfo('Jira Response Details', {
      status: responseCode,
      headers: responseHeaders,
      body: responseText,
    });

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      logError('Jira Response Parse Error', {
        error: parseError.message,
        responseText,
      });
      throw new Error('Failed to parse Jira response');
    }

    if (responseCode !== 201) {
      logError('Jira API Error', {
        status: responseCode,
        headers: responseHeaders,
        response: result,
        payload,
      });

      const errorMessage = result.errorMessages?.[0]
        || result.errors?.[Object.keys(result.errors)[0]]
        || result.message
        || `HTTP ${responseCode}`;

      throw new Error(`Jira API Error: ${errorMessage}`);
    }

    if (!result.key) {
      logError('Jira Issue Creation', {
        response: result,
        payload,
      });
      throw new Error('Failed to create Jira issue - no key returned');
    }

    logInfo('Jira Issue Created', {
      key: result.key,
      id: result.id,
      url: `${baseUrl}/browse/${result.key}`,
    });

    return {
      id: result.id,
      url: `${baseUrl}/browse/${result.key}`,
    };
  } catch (error) {
    logError('Create Jira Issue Error', {
      error: error.message,
      stack: error.stack,
      config: {
        domain: domain || '(missing)',
        projectKey: projectKey || '(missing)',
        email: email ? '(set)' : '(missing)',
        token: token ? '(set)' : '(missing)',
      },
    });
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
