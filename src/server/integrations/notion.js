import { getProperty } from '../config/settings';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';

const NOTION_API_URL = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

export const createNotionTask = async (params) => {
  try {
    const apiKey = getProperty(CONFIG.PROPERTIES.NOTION_API_KEY);
    const databaseId = getProperty(CONFIG.PROPERTIES.NOTION_DATABASE_ID);

    if (!apiKey || !databaseId) {
      throw new Error('Notion API key or database ID not configured');
    }

    // Log the request payload for debugging
    const payload = {
      parent: { database_id: databaseId },
      properties: {
        Title: {
          title: [{ text: { content: params.title } }],
        },
        Status: {
          select: { name: 'New' },
        },
        Priority: {
          select: { name: params.priority },
        },
        Category: {
          select: { name: params.category },
        },
        Description: {
          rich_text: [{ text: { content: params.description } }],
        },
        'App Version': {
          rich_text: [{ text: { content: params.technicalDetails?.appVersion || 'N/A' } }],
        },
        'Device Type': {
          rich_text: [{ text: { content: params.technicalDetails?.deviceInfo?.type || 'N/A' } }],
        },
        'Device Model': {
          rich_text: [{ text: { content: params.technicalDetails?.deviceInfo?.model || 'N/A' } }],
        },
        'OS Version': {
          rich_text: [{ text: { content: params.technicalDetails?.deviceInfo?.osVersion || 'N/A' } }],
        },
        AID: {
          rich_text: [{ text: { content: params.technicalDetails?.userIdentifiers?.aid || 'N/A' } }],
        },
        'User ID': {
          rich_text: [{ text: { content: params.technicalDetails?.userIdentifiers?.userId || 'N/A' } }],
        },
        'Email ID': {
          rich_text: [{ text: { content: params.metadata?.emailId || 'N/A' } }],
        },
        'Thread ID': {
          rich_text: [{ text: { content: params.metadata?.threadId || 'N/A' } }],
        },
      },
    };

    logInfo('Notion Request', payload);

    const response = await UrlFetchApp.fetch('https://api.notion.com/v1/pages', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      muteHttpExceptions: true,
      payload: JSON.stringify(payload),
    });

    // Log the full response for debugging
    const responseText = response.getContentText();
    logInfo('Notion Response', 'Raw response:', responseText);

    const result = JSON.parse(responseText);

    if (result.error) {
      logError('Notion API Error', result.error);
      throw new Error(`Notion API Error: ${result.error.message}`);
    }

    if (!result.id) {
      logError('Notion Task Creation', 'Response:', result);
      throw new Error('Failed to create Notion task - no ID returned');
    }

    logInfo('Notion Task Created', `Task ID: ${result.id}, URL: ${result.url}`);

    return {
      id: result.id,
      url: result.url,
    };
  } catch (error) {
    logError('Notion Task Creation Error', {
      error: error.message,
      stack: error.stack,
    });
    throw new Error(`Failed to create Notion task: ${error.message}`);
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

export const checkNotionSetup = async () => {
  try {
    const apiKey = getProperty(CONFIG.PROPERTIES.NOTION_API_KEY);
    const databaseId = getProperty(CONFIG.PROPERTIES.NOTION_DATABASE_ID);

    if (!apiKey || !databaseId) {
      throw new Error('Missing API key or database ID');
    }

    // First check API key validity
    const userResponse = await UrlFetchApp.fetch('https://api.notion.com/v1/users/me', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
      },
      muteHttpExceptions: true,
    });

    const userResult = JSON.parse(userResponse.getContentText());
    if (userResult.error) {
      throw new Error(`Invalid API key: ${userResult.error.message}`);
    }

    // Then check database access and schema
    const dbResponse = await UrlFetchApp.fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
      },
      muteHttpExceptions: true,
    });

    const dbResult = JSON.parse(dbResponse.getContentText());
    logInfo('Notion Database Check', dbResult);

    if (dbResult.error) {
      throw new Error(`Database access error: ${dbResult.error.message}`);
    }

    // Verify required properties exist with correct types
    const requiredProperties = {
      Title: 'title',
      Status: 'select',
      Priority: 'select',
      Category: 'select',
      Description: 'rich_text',
      'App Version': 'rich_text',
      'Device Type': 'rich_text',
      'Device Model': 'rich_text',
      'OS Version': 'rich_text',
      AID: 'rich_text',
      'Email ID': 'rich_text',
      'Thread ID': 'rich_text',
    };

    const missingProperties = [];
    const wrongTypes = [];

    Object.entries(requiredProperties).forEach(([propName, expectedType]) => {
      const prop = dbResult.properties[propName];
      if (!prop) {
        missingProperties.push(propName);
      } else if (prop.type !== expectedType) {
        wrongTypes.push(`${propName} (expected ${expectedType}, got ${prop.type})`);
      }
    });

    if (missingProperties.length > 0) {
      throw new Error(`Missing properties: ${missingProperties.join(', ')}`);
    }

    if (wrongTypes.length > 0) {
      throw new Error(`Wrong property types: ${wrongTypes.join(', ')}`);
    }

    // Check select options
    const statusOptions = dbResult.properties.Status.select.options.map((o) => o.name);
    if (!statusOptions.includes('New')) {
      throw new Error('Status property missing "New" option');
    }

    return {
      success: true,
      bot: userResult.bot,
      workspace: dbResult.parent.workspace,
      properties: dbResult.properties,
    };
  } catch (error) {
    logError('Notion Setup Check', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
