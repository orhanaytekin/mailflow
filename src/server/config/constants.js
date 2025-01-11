export const CONFIG = {
  APP: {
    NAME: 'Gmail Task Automation',
    VERSION: '1.0.0',
    DESCRIPTION: 'Automate task creation from Gmail emails',
  },

  LABELS: {
    DISCOVERY: 'Auto-Discovery',
    PROCESSED: 'Processed by Automation',
    SKIPPED: 'Skipped by Automation',
  },

  WORKFLOWS: {
    CUSTOMER_SUPPORT: {
      id: 'CUSTOMER_SUPPORT',
      name: 'Customer Support',
      description: 'Handle customer support requests and inquiries',
      requiredIntegrations: ['openai'],
      taskPlatforms: ['notion', 'jira', 'slack'],
      defaultPlatform: 'notion',
    },
  },

  UI: {
    ICONS: {
      HOME: 'https://www.gstatic.com/images/icons/material/system/1x/home_black_24dp.png',
      TASK: 'https://www.gstatic.com/images/icons/material/system/1x/task_alt_black_24dp.png',
      SETTINGS: 'https://www.gstatic.com/images/icons/material/system/1x/settings_black_24dp.png',
      WORKFLOW: 'https://www.gstatic.com/images/icons/material/system/1x/workflow_black_24dp.png',
    },
    COLORS: {
      PRIMARY: '#1a73e8',
      SUCCESS: '#1e8e3e',
      ERROR: '#d93025',
    },
  },

  PROPERTIES: {
    NOTION_API_KEY: 'NOTION_API_KEY',
    NOTION_DATABASE_ID: 'NOTION_DATABASE_ID',
    OPENAI_API_KEY: 'OPENAI_API_KEY',
    SLACK_WEBHOOK_URL: 'SLACK_WEBHOOK_URL',
    ACTIVE_MESSAGE_ID: 'ACTIVE_MESSAGE_ID',
    JIRA_DOMAIN: 'JIRA_DOMAIN',
    JIRA_EMAIL: 'JIRA_EMAIL',
    JIRA_API_TOKEN: 'JIRA_API_TOKEN',
    JIRA_PROJECT_KEY: 'JIRA_PROJECT_KEY',
    SLACK_CHANNEL: 'SLACK_CHANNEL',
  },

  ERROR_MESSAGES: {
    NO_EMAIL_SELECTED: 'No email selected. Please select an email first.',
    MISSING_INTEGRATION: (integration) => `${integration} integration not configured. Please configure it in settings.`,
    ANALYSIS_FAILED: 'Failed to analyze email. Please try again.',
    TASK_CREATION_FAILED: 'Failed to create task. Please try again.',
    DELETE_FAILED: 'Failed to delete integration settings. Please try again.',
    INVALID_INTEGRATION: 'Invalid integration specified.',
  },

  INTEGRATIONS: {
    OPENAI: {
      name: 'OpenAI',
      fields: [
        { key: 'OPENAI_API_KEY', label: 'API Key' },
      ],
    },
    NOTION: {
      name: 'Notion',
      fields: [
        { key: 'NOTION_API_KEY', label: 'API Key' },
        { key: 'NOTION_DATABASE_ID', label: 'Database ID' },
      ],
    },
    JIRA: {
      name: 'Jira',
      fields: [
        { key: 'JIRA_DOMAIN', label: 'Domain (e.g., your-domain.atlassian.net)' },
        { key: 'JIRA_EMAIL', label: 'Email' },
        { key: 'JIRA_API_TOKEN', label: 'API Token' },
        { key: 'JIRA_PROJECT_KEY', label: 'Project Key' },
      ],
    },
    SLACK: {
      name: 'Slack',
      fields: [
        { key: 'SLACK_WEBHOOK_URL', label: 'Webhook URL' },
        { key: 'SLACK_CHANNEL', label: 'Channel (optional)' },
      ],
    },
  },
};
