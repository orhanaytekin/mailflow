import { getProperty } from '../config/settings';
import { CONFIG } from '../config/constants';
import { logError } from '../utils/logger';

const JIRA_API_VERSION = '3';

export const createJiraIssue = async ({
  title,
  description,
  priority,
  category,
  metadata,
}) => {
  try {
    const domain = getProperty(CONFIG.PROPERTIES.JIRA_DOMAIN);
    const email = getProperty(CONFIG.PROPERTIES.JIRA_EMAIL);
    const apiToken = getProperty(CONFIG.PROPERTIES.JIRA_API_TOKEN);
    const projectKey = getProperty(CONFIG.PROPERTIES.JIRA_PROJECT_KEY);

    if (!domain || !email || !apiToken || !projectKey) {
      throw new Error(CONFIG.ERROR_MESSAGES.MISSING_INTEGRATION('Jira'));
    }

    const response = await UrlFetchApp.fetch(`https://${domain}/rest/api/${JIRA_API_VERSION}/issue`, {
      method: 'post',
      headers: {
        Authorization: `Basic ${Utilities.base64Encode(`${email}:${apiToken}`)}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        fields: {
          project: { key: projectKey },
          summary: title,
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: description }],
              },
            ],
          },
          issuetype: { name: 'Task' },
          priority: { name: priority },
          labels: [category, 'email-automation'],
          customfield_10000: metadata.emailId, // Adjust field ID as needed
          customfield_10001: metadata.threadId, // Adjust field ID as needed
        },
      }),
    });

    const result = JSON.parse(response.getContentText());
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result;
  } catch (error) {
    logError('Create Jira Issue Error', error);
    throw error;
  }
};
