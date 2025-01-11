import { CONFIG } from './constants';

export const getProperty = (key) => PropertiesService.getUserProperties().getProperty(key);

export const setProperty = (key, value) => {
  PropertiesService.getUserProperties().setProperty(key, value);
};

export const deleteProperty = (key) => {
  PropertiesService.getUserProperties().deleteProperty(key);
};

export const deleteProperties = (keys) => {
  const userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperties(keys);
};

export const validateIntegrationConfig = (integration) => {
  switch (integration.toLowerCase()) {
    case 'openai':
      return !!getProperty(CONFIG.PROPERTIES.OPENAI_API_KEY);
    case 'notion':
      return !!getProperty(CONFIG.PROPERTIES.NOTION_API_KEY)
        && !!getProperty(CONFIG.PROPERTIES.NOTION_DATABASE_ID);
    case 'jira':
      return !!getProperty(CONFIG.PROPERTIES.JIRA_DOMAIN)
        && !!getProperty(CONFIG.PROPERTIES.JIRA_EMAIL)
        && !!getProperty(CONFIG.PROPERTIES.JIRA_API_TOKEN)
        && !!getProperty(CONFIG.PROPERTIES.JIRA_PROJECT_KEY);
    case 'slack':
      return !!getProperty(CONFIG.PROPERTIES.SLACK_WEBHOOK_URL);
    default:
      return false;
  }
};

export const validateWorkflowConfig = (workflowId) => {
  const workflow = CONFIG.WORKFLOWS[workflowId];
  if (!workflow) return false;

  return workflow.requiredIntegrations.every((integration) => validateIntegrationConfig(integration));
};
