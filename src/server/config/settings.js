import { CONFIG } from './constants';
import { logError, logInfo } from '../utils/logger';

export const getProperty = (key) => PropertiesService.getUserProperties().getProperty(key);

export const setProperty = (key, value) => {
  PropertiesService.getUserProperties().setProperty(key, value);
};

export const deleteProperty = (key) => {
  PropertiesService.getUserProperties().deleteProperty(key);
};

export const deleteProperties = (keys) => {
  try {
    const userProperties = PropertiesService.getUserProperties();

    // Delete properties one by one to handle errors gracefully
    keys.forEach((key) => {
      try {
        userProperties.deleteProperty(key);
        logInfo('Settings', `Deleted property: ${key}`);
      } catch (error) {
        logError('Delete Property Error', `Failed to delete ${key}: ${error.message}`);
      }
    });

    return true;
  } catch (error) {
    logError('Delete Properties Error', error);
    return false; // Return false instead of throwing error
  }
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

  // Check required integrations
  const hasRequiredIntegrations = workflow.requiredIntegrations
    .every((integration) => validateIntegrationConfig(integration));

  // Check if at least one task platform is configured
  const hasTaskPlatform = workflow.taskPlatforms
    .some((platform) => validateIntegrationConfig(platform));

  return hasRequiredIntegrations && hasTaskPlatform;
};

export const getConfiguredPlatforms = (workflowId) => {
  const workflow = CONFIG.WORKFLOWS[workflowId];
  if (!workflow) return [];

  return workflow.taskPlatforms
    .filter((platform) => validateIntegrationConfig(platform));
};
