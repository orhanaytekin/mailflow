import { getProperty } from '../config/settings';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';

const getCategoryEmoji = (category) => {
  switch (category?.toLowerCase()) {
    case 'bug':
      return '🐛';
    case 'feature request':
      return '✨';
    case 'enhancement':
      return '🚀';
    case 'question':
      return '❓';
    case 'support':
      return '🆘';
    default:
      return '📝';
  }
};

const getPriorityEmoji = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return '🚨';
    case 'medium':
      return '🟡';
    case 'low':
      return '🟢';
    default:
      return '⚪';
  }
};

const formatTaskLinks = (taskUrls) => {
  if (!taskUrls || Object.keys(taskUrls).length === 0) return null;

  const links = Object.entries(taskUrls).map(([platform, url]) => {
    let emoji; let
      text;
    switch (platform.toLowerCase()) {
      case 'jira':
        emoji = '🎯';
        text = 'View Jira Issue';
        break;
      case 'notion':
        emoji = '📘';
        text = 'View Notion Page';
        break;
      default:
        emoji = '🔗';
        text = `View in ${platform}`;
    }
    return `${emoji} <${url}|${text}>`;
  });

  return links.join('\n');
};

const formatSlackMessage = (params) => {
  const categoryEmoji = getCategoryEmoji(params.category);
  const priorityEmoji = getPriorityEmoji(params.priority);

  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `${categoryEmoji} New ${params.category || 'Support'}`,
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${params.title}*`,
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Priority*\n${priorityEmoji} ${params.priority || 'Medium'}`,
        },
        {
          type: 'mrkdwn',
          text: `*Category*\n${categoryEmoji} ${params.category || 'Support'}`,
        },
      ],
    },
  ];

  // Add description if available (truncate if too long)
  if (params.description) {
    const truncatedDescription = params.description.length > 1000
      ? `${params.description.substring(0, 1000)}...`
      : params.description;

    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Details*\n${truncatedDescription}`,
      },
    });
  }

  // Add task URLs if available
  if (params.taskUrls) {
    const taskLinks = formatTaskLinks(params.taskUrls);
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: taskLinks.split('\n').join('\n\n'),
      },
    });
  }

  return blocks;
};

export const sendSlackNotification = async (params) => {
  try {
    const webhookUrl = getProperty(CONFIG.PROPERTIES.SLACK_WEBHOOK_URL);
    if (!webhookUrl) {
      throw new Error(CONFIG.ERROR_MESSAGES.MISSING_INTEGRATION('Slack'));
    }

    const blocks = formatSlackMessage(params);

    const response = await UrlFetchApp.fetch(webhookUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      muteHttpExceptions: true,
      payload: JSON.stringify({ blocks }),
    });

    if (response.getResponseCode() !== 200) {
      throw new Error(`Slack API Error: ${response.getContentText()}`);
    }

    logInfo('Slack Notification', {
      source: params.source,
      hasTaskUrls: !!params.taskUrls,
    });

    return true;
  } catch (error) {
    logError('Send Slack Notification Error', error);
    return false;
  }
};
