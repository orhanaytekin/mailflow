import { CONFIG } from '../config/constants';
import {
  createHeader, createActionButton, createSection, createKeyValueWidget, createButtonSet, createHeaderSection,
} from './components';
import { getCurrentMessage, getMessageMetadata } from '../utils/gmail';
import { analyzeEmail } from '../integrations/openai';
import { validateIntegrationConfig, getConfiguredPlatforms } from '../config/settings';
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

    // Get configured platforms and create action section
    const configuredPlatforms = getConfiguredPlatforms('CUSTOMER_SUPPORT');
    const actionsSection = CardService.newCardSection()
      .setHeader('Available Actions');

    if (configuredPlatforms.length === 0) {
      actionsSection
        .addWidget(CardService.newTextParagraph()
          .setText('⚠️ No task platforms configured. Please configure at least one platform in settings.'))
        .addWidget(
          CardService.newTextButton()
            .setText('Go to Settings')
            .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
            .setOnClickAction(
              CardService.newAction().setFunctionName('showIntegrationSettings'),
            ),
        );
    } else {
      // Add button for each configured platform
      configuredPlatforms.forEach((platform) => {
        let buttonText;
        switch (platform.toLowerCase()) {
          case 'slack':
            buttonText = 'Send to Slack';
            break;
          case 'notion':
            buttonText = 'Create in Notion';
            break;
          case 'jira':
            buttonText = 'Create Jira Issue';
            break;
          default:
            buttonText = `Send to ${platform}`;
        }

        const taskMetadata = {
          emailId: metadata.id || '',
          threadId: metadata.threadId || '',
          sentiment: analysis.analysis.sentiment || 'neutral',
          responseNeeded: analysis.emailMetadata.responseNeeded || false,
        };

        actionsSection.addWidget(
          CardService.newTextButton()
            .setText(buttonText)
            .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName('createTask')
                .setParameters({
                  platform,
                  title: analysis.analysis.summary || 'Untitled Task',
                  description: analysis.analysis.details || 'No description provided',
                  priority: analysis.emailMetadata.priority || 'Medium',
                  category: analysis.emailMetadata.category || 'Support',
                  metadata: JSON.stringify(taskMetadata),
                  technicalDetails: JSON.stringify(analysis.technicalDetails || null),
                }),
            ),
        );
      });
    }

    // Add back button
    actionsSection.addWidget(
      CardService.newTextButton()
        .setText('Back')
        .setOnClickAction(CardService.newAction().setFunctionName('onHomepage')),
    );

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
