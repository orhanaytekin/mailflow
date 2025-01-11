import {
  createHomeCard, createAnalysisCard, createSettingsCard, createErrorCard,
} from './server/ui/cards';
import {
  createIntegrationSettingsCard,
  handleSaveOpenAISettings,
  handleSaveNotionSettings,
  handleSaveJiraSettings,
  handleSaveSlackSettings,
  createDeleteConfirmationCard,
} from './server/ui/settings';
import { processCustomerSupportWorkflow } from './server/workflows/customer-support';
import { setProperty, deleteProperties } from './server/config/settings';
import { CONFIG } from './server/config/constants';
import { logInfo, logError } from './server/utils/logger';
import { createNotionTask } from './server/integrations/notion';
import { createJiraIssue } from './server/integrations/jira';

// Declare functions in global scope
function onHomepage() {
  logInfo('Homepage', 'Rendering home card');
  return createHomeCard();
}

function handleGmailTrigger(e) {
  const { messageId } = e.gmail;
  setProperty(CONFIG.PROPERTIES.ACTIVE_MESSAGE_ID, messageId);
  return createHomeCard();
}

function analyzeCurrentEmail() {
  logInfo('Email Analysis', 'Starting email analysis');
  return createAnalysisCard();
}

function handleCustomerSupportWorkflow() {
  logInfo('Customer Support', 'Starting customer support workflow');
  return processCustomerSupportWorkflow();
}

function showSettingsCard() {
  logInfo('Settings', 'Showing settings card');
  return createSettingsCard();
}

function showIntegrationSettings() {
  logInfo('Settings', 'Showing integration settings');
  return createIntegrationSettingsCard();
}

function createTask(e) {
  logInfo('Task Creation', 'Creating task');
  const { platform } = e.parameters;

  try {
    switch (platform) {
      case 'notion':
        return createNotionTask(e.parameters);
      case 'jira':
        return createJiraIssue(e.parameters);
      default:
        throw new Error('Invalid platform selected');
    }
  } catch (error) {
    logError('Create Task Error', error);
    return createErrorCard(error.message);
  }
}

function showDeleteConfirmation(e) {
  logInfo('Settings', 'Showing delete confirmation');
  return createDeleteConfirmationCard(e);
}

function handleDeleteIntegration(e) {
  const { integration } = e.parameters;
  logInfo('Settings', `Deleting ${integration} integration`);

  try {
    // Delete all properties for this integration
    const propertiesToDelete = CONFIG.INTEGRATIONS[integration].fields
      .map((field) => CONFIG.PROPERTIES[field.key]);

    deleteProperties(propertiesToDelete);

    return CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation().updateCard(createIntegrationSettingsCard()))
      .setNotification(CardService.newNotification()
        .setText(`${CONFIG.INTEGRATIONS[integration].name} integration deleted successfully`)
        .setType(CardService.NotificationType.INFO))
      .build();
  } catch (error) {
    logError('Delete Integration Error', error);
    return createErrorCard('Failed to delete integration settings');
  }
}

// Export all functions
export {
  onHomepage,
  handleGmailTrigger,
  analyzeCurrentEmail,
  handleCustomerSupportWorkflow,
  showSettingsCard,
  showIntegrationSettings,
  createTask,
};

// Make functions available globally
global.onHomepage = onHomepage;
global.handleGmailTrigger = handleGmailTrigger;
global.analyzeCurrentEmail = analyzeCurrentEmail;
global.handleCustomerSupportWorkflow = handleCustomerSupportWorkflow;
global.showSettingsCard = showSettingsCard;
global.showIntegrationSettings = showIntegrationSettings;
global.onSaveOpenAISettings = (e) => {
  logInfo('Settings', 'Saving OpenAI settings');
  return handleSaveOpenAISettings(e);
};
global.onSaveNotionSettings = (e) => {
  logInfo('Settings', 'Saving Notion settings');
  return handleSaveNotionSettings(e);
};
global.createTask = createTask;
global.onSaveJiraSettings = (e) => {
  logInfo('Settings', 'Saving Jira settings');
  return handleSaveJiraSettings(e);
};
global.onSaveSlackSettings = (e) => {
  logInfo('Settings', 'Saving Slack settings');
  return handleSaveSlackSettings(e);
};
global.showDeleteConfirmation = showDeleteConfirmation;
global.handleDeleteIntegration = handleDeleteIntegration;
