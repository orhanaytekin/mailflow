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
  technicalDetails,
}) => {
  try {
    const webhookUrl = getProperty(CONFIG.PROPERTIES.SLACK_WEBHOOK_URL);
    const channel = getProperty(CONFIG.PROPERTIES.SLACK_CHANNEL);

    if (!webhookUrl) {
      throw new Error(CONFIG.ERROR_MESSAGES.MISSING_INTEGRATION('Slack'));
    }

    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '📧 New Support Task Created',
          emoji: true,
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
    ];

    if (technicalDetails) {
      const techFields = [];

      if (technicalDetails.appVersion) {
        techFields.push({
          type: 'mrkdwn',
          text: `*App Version:*\n${technicalDetails.appVersion}`,
        });
      }

      if (technicalDetails.deviceInfo) {
        const { deviceInfo } = technicalDetails;
        if (deviceInfo.type) techFields.push({ type: 'mrkdwn', text: `*Device Type:*\n${deviceInfo.type}` });
        if (deviceInfo.model) techFields.push({ type: 'mrkdwn', text: `*Device Model:*\n${deviceInfo.model}` });
        if (deviceInfo.osVersion) techFields.push({ type: 'mrkdwn', text: `*OS Version:*\n${deviceInfo.osVersion}` });
        if (deviceInfo.deviceId) techFields.push({ type: 'mrkdwn', text: `*Device ID:*\n${deviceInfo.deviceId}` });
      }

      if (technicalDetails.userIdentifiers) {
        const { userIdentifiers } = technicalDetails;
        if (userIdentifiers.userId) techFields.push({ type: 'mrkdwn', text: `*User ID:*\n${userIdentifiers.userId}` });
        if (userIdentifiers.aid) techFields.push({ type: 'mrkdwn', text: `*AID:*\n${userIdentifiers.aid}` });
      }

      for (let i = 0; i < techFields.length; i += 10) {
        blocks.push({
          type: 'section',
          fields: techFields.slice(i, i + 10),
        });
      }
    }

    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Description:*\n${description}`,
      },
    });

    if (taskUrl) {
      blocks.push({
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'View Task',
              emoji: true,
            },
            url: taskUrl,
            style: 'primary',
          },
        ],
      });
    }

    const response = await UrlFetchApp.fetch(webhookUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        channel,
        blocks,
      }),
    });

    if (response.getResponseCode() !== 200) {
      const error = response.getContentText();
      throw new Error(`Slack API Error: ${error}`);
    }

    return {
      id: new Date().getTime().toString(),
      url: null,
    };
  } catch (error) {
    logError('Send Slack Notification Error', error);
    throw error;
  }
};
