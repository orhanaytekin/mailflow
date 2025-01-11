import { getProperty } from '../config/settings';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';

const createNotionNotification = (params, taskUrl) => ({
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `📝 *New Notion Task Created*\n${params.title}`,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Category:*\n${params.category}`,
        },
        {
          type: 'mrkdwn',
          text: `*Priority:*\n${params.priority}`,
        },
      ],
    },
    {
      type: 'section',
      fields: [
        ...(params.technicalDetails?.userIdentifiers?.userId ? [{
          type: 'mrkdwn',
          text: `*User ID:*\n${params.technicalDetails.userIdentifiers.userId}`,
        }] : []),
        ...(params.technicalDetails?.userIdentifiers?.aid ? [{
          type: 'mrkdwn',
          text: `*AID:*\n${params.technicalDetails.userIdentifiers.aid}`,
        }] : []),
      ],
    },
    ...(taskUrl ? [{
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'View in Notion',
            emoji: true,
          },
          url: taskUrl,
        },
      ],
    }] : []),
  ],
});

const createJiraNotification = (params, taskUrl) => ({
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `🎯 *New Jira Issue Created*\n${params.title}`,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Category:*\n${params.category}`,
        },
        {
          type: 'mrkdwn',
          text: `*Priority:*\n${params.priority}`,
        },
      ],
    },
    {
      type: 'section',
      fields: [
        ...(params.technicalDetails?.userIdentifiers?.userId ? [{
          type: 'mrkdwn',
          text: `*User ID:*\n${params.technicalDetails.userIdentifiers.userId}`,
        }] : []),
        ...(params.technicalDetails?.userIdentifiers?.aid ? [{
          type: 'mrkdwn',
          text: `*AID:*\n${params.technicalDetails.userIdentifiers.aid}`,
        }] : []),
        ...(params.technicalDetails?.appVersion ? [{
          type: 'mrkdwn',
          text: `*App Version:*\n${params.technicalDetails.appVersion}`,
        }] : []),
      ],
    },
    ...(taskUrl ? [{
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'View in Jira',
            emoji: true,
          },
          url: taskUrl,
        },
      ],
    }] : []),
  ],
});

const createDefaultNotification = (params) => ({
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `📧 *New Support Request*\n${params.title}`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: params.description,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Category:*\n${params.category}`,
        },
        {
          type: 'mrkdwn',
          text: `*Priority:*\n${params.priority}`,
        },
      ],
    },
    {
      type: 'section',
      fields: [
        ...(params.technicalDetails?.userIdentifiers?.userId ? [{
          type: 'mrkdwn',
          text: `*User ID:*\n${params.technicalDetails.userIdentifiers.userId}`,
        }] : []),
        ...(params.technicalDetails?.userIdentifiers?.aid ? [{
          type: 'mrkdwn',
          text: `*AID:*\n${params.technicalDetails.userIdentifiers.aid}`,
        }] : []),
        ...(params.technicalDetails?.appVersion ? [{
          type: 'mrkdwn',
          text: `*App Version:*\n${params.technicalDetails.appVersion}`,
        }] : []),
      ],
    },
  ],
});

export const sendSlackNotification = async (params) => {
  try {
    const webhookUrl = getProperty(CONFIG.PROPERTIES.SLACK_WEBHOOK_URL);
    if (!webhookUrl) {
      throw new Error('Slack webhook URL not configured');
    }

    // Choose template based on source
    let payload;
    if (params.source === 'notion' && params.taskUrl) {
      payload = createNotionNotification(params, params.taskUrl);
    } else if (params.source === 'jira' && params.taskUrl) {
      payload = createJiraNotification(params, params.taskUrl);
    } else {
      payload = createDefaultNotification(params);
    }

    logInfo('Slack Payload', payload);

    const response = await UrlFetchApp.fetch(webhookUrl, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });

    if (response.getResponseCode() !== 200) {
      throw new Error(`Slack API Error: ${response.getContentText()}`);
    }

    logInfo('Slack Notification Sent', {
      source: params.source || 'direct',
      hasTaskUrl: !!params.taskUrl,
    });

    // Return a proper result object
    return {
      id: new Date().getTime().toString(), // Use timestamp as ID
      url: null, // Slack doesn't have a direct URL to the message
    };
  } catch (error) {
    logError('Send Slack Notification Error', error);
    throw error;
  }
};
