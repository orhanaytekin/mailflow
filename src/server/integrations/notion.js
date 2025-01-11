import { getProperty } from '../config/settings';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';
import { createIntegrationSettingsCard } from '../ui/settings';

const NOTION_API_URL = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

export const createNotionTask = async (params) => {
  try {
    const apiKey = getProperty(CONFIG.PROPERTIES.NOTION_API_KEY);
    const databaseId = getProperty(CONFIG.PROPERTIES.NOTION_DATABASE_ID);

    if (!apiKey || !databaseId) {
      logError('Notion Task Creation', 'Missing configuration');
      return CardService.newActionResponseBuilder()
        .setNavigation(CardService.newNavigation().updateCard(createIntegrationSettingsCard()))
        .setNotification(CardService.newNotification()
          .setText('Please configure Notion integration first')
          .setType(CardService.NotificationType.WARNING))
        .build();
    }

    const response = await UrlFetchApp.fetch(`${NOTION_API_URL}/pages`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Name: {
            title: [
              {
                text: {
                  content: params.title,
                },
              },
            ],
          },
          Status: {
            select: {
              name: 'New',
            },
          },
          Priority: {
            select: {
              name: params.priority,
            },
          },
          Category: {
            select: {
              name: params.category,
            },
          },
          'Email ID': {
            rich_text: [
              {
                text: {
                  content: params.metadata.emailId,
                },
              },
            ],
          },
          'Thread ID': {
            rich_text: [
              {
                text: {
                  content: params.metadata.threadId,
                },
              },
            ],
          },
        },
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: params.description,
                  },
                },
              ],
            },
          },
        ],
      }),
    });

    const result = JSON.parse(response.getContentText());
    if (result.error) {
      logError('Notion API Error', result.error);
      throw new Error(result.error.message);
    }

    logInfo('Notion Task Created', `Task ID: ${result.id}`);
    return {
      id: result.id,
      url: result.url,
    };
  } catch (error) {
    logError('Create Notion Task Error', error);
    throw error;
  }
};

export const validateNotionConfig = async () => {
  try {
    const token = getProperty(CONFIG.PROPERTIES.NOTION_API_KEY);
    const databaseId = getProperty(CONFIG.PROPERTIES.NOTION_DATABASE_ID);

    if (!token || !databaseId) {
      return false;
    }

    const response = await UrlFetchApp.fetch(`${NOTION_API_URL}/databases/${databaseId}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
      },
      muteHttpExceptions: true,
    });

    const result = JSON.parse(response.getContentText());
    return !result.error;
  } catch (error) {
    logError('Validate Notion Config Error', error);
    return false;
  }
};
