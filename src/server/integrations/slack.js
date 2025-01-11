import { getProperty } from '../config/settings';
import { CONFIG } from '../config/constants';
import { logError } from '../utils/logger';

export const sendSlackNotification = async ({
  title,
  description,
  priority,
  category,
  metadata,
  taskUrl,
}) => {
  try {
    const webhookUrl = getProperty(CONFIG.PROPERTIES.SLACK_WEBHOOK_URL);
    const channel = getProperty(CONFIG.PROPERTIES.SLACK_CHANNEL);

    if (!webhookUrl) {
      throw new Error(CONFIG.ERROR_MESSAGES.MISSING_INTEGRATION('Slack'));
    }

    const response = await UrlFetchApp.fetch(webhookUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        channel,
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '📧 New Support Task Created',
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Title:*\n${title}`,
              },
              {
                type: 'mrkdwn',
                text: `*Priority:*\n${priority}`,
              },
            ],
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Category:*\n${category}`,
              },
              {
                type: 'mrkdwn',
                text: `*Email ID:*\n${metadata.emailId}`,
              },
            ],
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Description:*\n${description.substring(0, 2000)}...`,
            },
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'View Task',
                },
                url: taskUrl,
                style: 'primary',
              },
            ],
          },
        ],
      }),
    });

    return JSON.parse(response.getContentText());
  } catch (error) {
    logError('Send Slack Notification Error', error);
    throw error;
  }
};
