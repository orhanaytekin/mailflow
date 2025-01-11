import { CONFIG } from '../config/constants';
import {
  createHeader, createActionButton, createSection, createKeyValueWidget, createButtonSet, createHeaderSection,
} from './components';
import { getCurrentMessage, getMessageMetadata } from '../utils/gmail';
import { analyzeEmail } from '../integrations/openai';
import { validateIntegrationConfig } from '../config/settings';
import { logError } from '../utils/logger';

export const createErrorCard = (message) => {
  const card = CardService.newCardBuilder();
  card.setHeader(createHeader('Error', null, false));

  const errorSection = createSection(null, [
    CardService.newTextParagraph().setText(`❌ ${message}`),
    createActionButton('Back to Home', 'onHomepage'),
  ]);

  return card.addSection(errorSection).build();
};

export const createHomeCard = () => {
  const card = CardService.newCardBuilder();

  // Add header
  card.setHeader(createHeader('Gmail Task Automation', 'Automate your email workflows', false));

  // Add settings button in its own section
  const settingsSection = createHeaderSection(true);
  if (settingsSection) {
    card.addSection(settingsSection);
  }

  // Add selected email information
  try {
    const message = getCurrentMessage();
    if (message) {
      const metadata = getMessageMetadata(message);
      const emailSection = createSection('Selected Email', [
        createKeyValueWidget('Subject', metadata.subject),
        createKeyValueWidget('From', metadata.sender),
        createKeyValueWidget('Date', metadata.date.toLocaleString()),
      ]);
      card.addSection(emailSection);
    }
  } catch (error) {
    const noEmailSection = createSection('No Email Selected', [
      CardService.newTextParagraph().setText('Please select an email to get started.'),
    ]);
    card.addSection(noEmailSection);
  }

  // Main workflow button
  const workflowSection = createSection('Quick Actions', [
    createActionButton('📋 Customer Support Workflow', 'handleCustomerSupportWorkflow', {}, 'filled'),
    createButtonSet([
      createActionButton('Analyze Email', 'analyzeCurrentEmail'),
    ]),
  ]);

  return card.addSection(workflowSection).build();
};

export const createAnalysisCard = async () => {
  const card = CardService.newCardBuilder();

  try {
    const message = getCurrentMessage();
    const metadata = getMessageMetadata(message);
    const analysis = await analyzeEmail(metadata.subject, metadata.body);

    card.setHeader(createHeader('Email Analysis', metadata.subject));

    const summarySection = createSection('Summary', [
      CardService.newTextParagraph().setText(analysis.analysis.summary),
      createKeyValueWidget(
        'Priority',
        analysis.emailMetadata.priority,
        analysis.emailMetadata.priority === 'High'
          ? CardService.Icon.PRIORITY_HIGH
          : CardService.Icon.DESCRIPTION,
      ),
      createKeyValueWidget('Category', analysis.emailMetadata.category, CardService.Icon.BOOKMARK),
    ]);

    const actionsSection = createSection('Actions', [
      createButtonSet([
        createActionButton('Create Task', 'createTask', {
          title: analysis.analysis.summary,
          priority: analysis.emailMetadata.priority,
          platform: CONFIG.WORKFLOWS.CUSTOMER_SUPPORT.defaultPlatform,
        }, 'filled'),
        createActionButton('Back', 'onHomepage'),
      ]),
    ]);

    return card.addSection(summarySection).addSection(actionsSection).build();
  } catch (error) {
    logError('Analysis Card Error', error);
    return createErrorCard(error.message);
  }
};

export const createSettingsCard = () => {
  const card = CardService.newCardBuilder();
  card.setHeader(createHeader('Settings', null, false));

  const integrationSection = createSection(
    'Integrations',
    Object.entries(CONFIG.INTEGRATIONS).map(([key, integration]) => {
      const isConfigured = validateIntegrationConfig(key.toLowerCase());
      return createKeyValueWidget(
        integration.name,
        isConfigured ? 'Connected' : 'Not Configured',
        isConfigured ? CardService.Icon.CONFIRMATION_NUMBER_ICON : CardService.Icon.DESCRIPTION,
      );
    }).concat([
      createActionButton('Configure Integrations', 'showIntegrationSettings'),
    ]),
  );

  return card.addSection(integrationSection).build();
};
