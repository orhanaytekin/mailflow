// Configuration and constants
export const CONFIG = {
  PROPERTIES: {
    ACTIVE_MESSAGE_ID: 'activeMessageId',
    OPENAI_API_KEY: 'openaiApiKey',
    NOTION_API_KEY: 'notionApiKey',
    NOTION_DATABASE_ID: 'notionDatabaseId',
  },
  LABELS: {
    PROCESSED: 'Processed',
    CUSTOMER_SUPPORT: 'Customer-Support',
  },
  WORKFLOWS: {
    CUSTOMER_SUPPORT: {
      id: 'customer_support',
      name: 'Customer Support',
      description: 'Handle customer support requests and inquiries',
      defaultPlatform: 'notion',
      requiredIntegrations: ['openai', 'notion'],
    },
  },
  UI: {
    ICONS: {
      HOME: 'https://www.gstatic.com/images/icons/material/system/1x/home_black_24dp.png',
      TASK: 'https://www.gstatic.com/images/icons/material/system/1x/task_alt_black_24dp.png',
      SETTINGS: 'https://www.gstatic.com/images/icons/material/system/1x/settings_black_24dp.png',
      WORKFLOW: 'https://www.gstatic.com/images/icons/material/system/1x/workflow_black_24dp.png',
    },
  },
  ERROR_MESSAGES: {
    NO_EMAIL_SELECTED: 'Please select an email first',
    MISSING_INTEGRATION: (name) => `${name} integration is not configured. Please configure it in settings.`,
    ANALYSIS_FAILED: 'Failed to analyze email. Please try again.',
    TASK_CREATION_FAILED: 'Failed to create task. Please try again.',
  },
};
