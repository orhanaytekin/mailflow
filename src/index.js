import {
  createHomeCard, createAnalysisCard, createSettingsCard,
} from './server/ui/cards';
import {
  createIntegrationSettingsCard,
  handleSaveOpenAISettings,
  handleSaveNotionSettings,
  handleSaveJiraSettings,
  handleSaveSlackSettings,
  testNotionSetup,
  testJiraSetup,
} from './server/ui/settings';
import { handleDeleteIntegration, showDeleteConfirmation } from './server/ui/settings-handlers';
import { processCustomerSupportWorkflow, createWorkflowTask } from './server/workflows/customer-support';
import { showSetupGuide, enableDiscovery, disableDiscovery } from './server/ui/handlers';
import { setProperty } from './server/config/settings';
import { CONFIG } from './server/config/constants';
import { logInfo } from './server/utils/logger';
import { processNewEmails } from './server/mail';

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
  const { platform, ...params } = e.parameters;
  return createWorkflowTask(platform, params);
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
  handleDeleteIntegration,
  showDeleteConfirmation,
};

// Make functions available globally
global.onHomepage = onHomepage;
global.handleGmailTrigger = handleGmailTrigger;
global.analyzeCurrentEmail = analyzeCurrentEmail;
global.handleCustomerSupportWorkflow = handleCustomerSupportWorkflow;
global.showSettingsCard = showSettingsCard;
global.showIntegrationSettings = showIntegrationSettings;
global.createTask = createTask;
global.handleDeleteIntegration = handleDeleteIntegration;
global.showDeleteConfirmation = showDeleteConfirmation;

// Add settings handlers with correct names
global.onSaveOPENAISettings = (e) => {
  logInfo('Settings', 'Saving OpenAI settings');
  return handleSaveOpenAISettings(e);
};

global.onSaveNOTIONSettings = (e) => {
  logInfo('Settings', 'Saving Notion settings');
  return handleSaveNotionSettings(e);
};

global.onSaveJIRASettings = (e) => {
  logInfo('Settings', 'Saving Jira settings');
  return handleSaveJiraSettings(e);
};

global.onSaveSLACKSettings = (e) => {
  logInfo('Settings', 'Saving Slack settings');
  return handleSaveSlackSettings(e);
};

// Add to global exports
global.showDeleteConfirmation = showDeleteConfirmation;

global.testNotionSetup = testNotionSetup;

global.testJiraSetup = testJiraSetup;

// Add to global scope
global.processNewEmails = processNewEmails;

// Update globals
global.showSetupGuide = showSetupGuide;
global.enableDiscovery = enableDiscovery;
global.disableDiscovery = disableDiscovery;
