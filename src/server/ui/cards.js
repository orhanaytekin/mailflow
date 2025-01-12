import { CONFIG } from '../config/constants';
import {
  createHeader, createActionButton, createSection, createKeyValueWidget, createHeaderSection,
} from './components';
import { getCurrentMessage, getMessageMetadata } from '../utils/gmail';
import { analyzeEmail } from '../integrations/openai';
import { validateIntegrationConfig, getConfiguredPlatforms, getProperty } from '../config/settings';
import { logError } from '../utils/logger';
import { isDiscoveryEnabled } from '../triggers';

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
  const isEnabled = isDiscoveryEnabled();
  const isAutoReplyEnabled = getProperty(CONFIG.PROPERTIES.AUTO_REPLY_ENABLED) === 'true';

  // Add header
  card.setHeader(createHeader('MailFlow AI', 'Automate your email workflows', false));

  // Add settings button in its own section
  const settingsSection = createHeaderSection(true);
  if (settingsSection) {
    card.addSection(settingsSection);
  }

  // Add auto-discovery section
  const discoverySection = CardService.newCardSection()
    .setHeader('🔍 Email Discovery')
    .addWidget(CardService.newTextParagraph()
      .setText('Automatically process new emails based on filters.'));

  if (isEnabled) {
    discoverySection
      .addWidget(CardService.newTextButton()
        .setText('Disable Auto-Discovery')
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
        .setBackgroundColor(CONFIG.UI.COLORS.ERROR)
        .setOnClickAction(CardService.newAction().setFunctionName('disableDiscovery')))
      .addWidget(CardService.newTextParagraph()
        .setText('Currently checking every hour'));
  } else {
    discoverySection
      .addWidget(CardService.newTextButton()
        .setText('Enable Auto-Discovery')
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
        .setBackgroundColor(CONFIG.UI.COLORS.SUCCESS)
        .setOnClickAction(CardService.newAction().setFunctionName('showSetupGuide')));
  }

  card.addSection(discoverySection);

  // Auto-reply section
  const autoReplySection = CardService.newCardSection()
    .setHeader('✉️ Auto-Reply')
    .addWidget(CardService.newTextParagraph()
      .setText((() => {
        if (!isEnabled) {
          return 'Auto-reply requires Auto-Discovery to be enabled first. Enable Auto-Discovery to use automatic email responses.';
        }
        if (isAutoReplyEnabled) {
          return 'Smart replies enabled - Automatic responses active';
        }
        return 'Smart replies disabled - No automatic responses';
      })()))
    .addWidget(CardService.newTextButton()
      .setText(isAutoReplyEnabled ? 'Disable Auto-Reply' : 'Enable Auto-Reply')
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
      .setBackgroundColor(isAutoReplyEnabled ? CONFIG.UI.COLORS.ERROR : CONFIG.UI.COLORS.SUCCESS)
      .setDisabled(!isEnabled)
      .setOnClickAction(CardService.newAction().setFunctionName('toggleAutoReply')));

  card.addSection(autoReplySection);

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

  // Main workflow button - removed Analyze Email button
  const workflowSection = createSection('Quick Actions', [
    createActionButton('📋 Customer Support Workflow', 'handleCustomerSupportWorkflow', {}, 'filled'),
  ]);

  return card
    .addSection(workflowSection)
    .build();
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

export const createWorkflowResultCard = (analysis) => {
  const card = CardService.newCardBuilder();

  // Header
  const header = CardService.newCardHeader()
    .setTitle('Analysis Results')
    .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/analytics_black_24dp.png');
  card.setHeader(header);

  // Summary section
  const summarySection = CardService.newCardSection()
    .setHeader('📋 Summary')
    .addWidget(CardService.newTextParagraph().setText(analysis.analysis.summary));

  // Add priority and category
  summarySection.addWidget(
    CardService.newKeyValue()
      .setTopLabel('Priority')
      .setContent(analysis.emailMetadata.priority)
      .setIcon(
        analysis.emailMetadata.priority.toLowerCase() === 'high'
          ? CardService.Icon.PRIORITY_HIGH
          : CardService.Icon.PRIORITY_LOW,
      ),
  );

  summarySection.addWidget(
    CardService.newKeyValue()
      .setTopLabel('Category')
      .setContent(analysis.emailMetadata.category)
      .setIcon(CardService.Icon.FOLDER),
  );

  // Add sentiment if available
  if (analysis.analysis.sentiment) {
    summarySection.addWidget(
      CardService.newKeyValue()
        .setTopLabel('Sentiment')
        .setContent(analysis.analysis.sentiment)
        .setIcon((() => {
          const sentiment = analysis.analysis.sentiment.toLowerCase();
          if (sentiment === 'positive') {
            return CardService.Icon.STAR;
          }
          if (sentiment === 'negative') {
            return CardService.Icon.WARNING;
          }
          return CardService.Icon.DESCRIPTION;
        })()),
    );
  }

  card.addSection(summarySection);

  // Details section
  const detailsSection = CardService.newCardSection()
    .setHeader('🔍 Details')
    .addWidget(CardService.newTextParagraph().setText(analysis.analysis.details));

  // Add technical details if available
  if (analysis.technicalDetails) {
    const techDetails = [];

    if (analysis.technicalDetails.appVersion) {
      techDetails.push(`App Version: ${analysis.technicalDetails.appVersion}`);
    }

    if (analysis.technicalDetails.deviceInfo?.type) {
      techDetails.push(`Device: ${analysis.technicalDetails.deviceInfo.type}`);
    }

    if (analysis.technicalDetails.deviceInfo?.osVersion) {
      techDetails.push(`OS: ${analysis.technicalDetails.deviceInfo.osVersion}`);
    }

    if (techDetails.length > 0) {
      detailsSection.addWidget(
        CardService.newTextParagraph().setText(`\n🔧 Technical Information:\n${techDetails.join('\n')}`),
      );
    }
  }

  card.addSection(detailsSection);

  // Add back to home button
  const actionSection = CardService.newCardSection()
    .setHeader('Actions')
    .addWidget(
      CardService.newTextButton()
        .setText('Back to Home')
        .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
        .setOnClickAction(CardService.newAction().setFunctionName('onHomepage')),
    );

  card.addSection(actionSection);

  return card.build();
};
