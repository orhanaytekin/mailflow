import { getCurrentMessage, getMessageMetadata } from '../utils/gmail';
import { analyzeEmail } from '../integrations/openai';
import { createNotionTask } from '../integrations/notion';
import { createJiraIssue } from '../integrations/jira';
import { sendSlackNotification } from '../integrations/slack';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';
import { createErrorCard } from '../ui/cards';
import {
  validateWorkflowConfig,
  getConfiguredPlatforms,
  validateIntegrationConfig,
} from '../config/settings';
import { createIntegrationSettingsCard } from '../ui/settings';

const createWorkflowResultCard = (analysis, metadata) => {
  const card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader()
    .setTitle('Email Analysis')
    .setSubtitle(metadata.subject));

  // Analysis Summary Section
  const summarySection = CardService.newCardSection()
    .addWidget(CardService.newTextParagraph().setText(analysis.analysis.summary))
    .addWidget(CardService.newKeyValue()
      .setTopLabel('Priority')
      .setContent(analysis.emailMetadata.priority))
    .addWidget(CardService.newKeyValue()
      .setTopLabel('Category')
      .setContent(analysis.emailMetadata.category));

  // Technical Details Section (if available)
  if (analysis.technicalDetails) {
    const techSection = CardService.newCardSection()
      .addWidget(CardService.newTextParagraph().setText('🔧 Technical Details'));

    if (analysis.technicalDetails.appVersion) {
      techSection.addWidget(CardService.newKeyValue()
        .setTopLabel('App Version')
        .setContent(analysis.technicalDetails.appVersion));
    }

    if (analysis.technicalDetails.deviceInfo) {
      const { deviceInfo } = analysis.technicalDetails;
      if (deviceInfo.type) {
        techSection.addWidget(CardService.newKeyValue()
          .setTopLabel('Device Type')
          .setContent(deviceInfo.type));
      }
      if (deviceInfo.model) {
        techSection.addWidget(CardService.newKeyValue()
          .setTopLabel('Device Model')
          .setContent(deviceInfo.model));
      }
      if (deviceInfo.osVersion) {
        techSection.addWidget(CardService.newKeyValue()
          .setTopLabel('OS Version')
          .setContent(deviceInfo.osVersion));
      }
    }

    if (analysis.technicalDetails.userIdentifiers) {
      const { userIdentifiers } = analysis.technicalDetails;
      if (userIdentifiers.aid) {
        techSection.addWidget(CardService.newKeyValue()
          .setTopLabel('AID')
          .setContent(userIdentifiers.aid));
      }
      if (userIdentifiers.userId) {
        techSection.addWidget(CardService.newKeyValue()
          .setTopLabel('User ID')
          .setContent(userIdentifiers.userId));
      }
    }

    card.addSection(techSection);
  }

  // Actions Section - Only show available integrations
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
    // Add button for each configured platform with descriptive text
    configuredPlatforms.forEach((platform) => {
      const taskMetadata = {
        emailId: metadata.id || '',
        threadId: metadata.threadId || '',
        sentiment: analysis.analysis.sentiment || 'neutral',
        responseNeeded: analysis.emailMetadata.responseNeeded || false,
      };

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

  return card
    .addSection(summarySection)
    .addSection(actionsSection)
    .build();
};

export const processCustomerSupportWorkflow = async () => {
  try {
    // Check if workflow is properly configured
    if (!validateWorkflowConfig('CUSTOMER_SUPPORT')) {
      logError('Customer Support Workflow', 'Required integrations not configured');
      return CardService.newActionResponseBuilder()
        .setNavigation(CardService.newNavigation().updateCard(createIntegrationSettingsCard()))
        .setNotification(CardService.newNotification()
          .setText('Please configure OpenAI and at least one task platform')
          .setType(CardService.NotificationType.WARNING))
        .build();
    }

    const message = getCurrentMessage();
    if (!message) {
      return createErrorCard(CONFIG.ERROR_MESSAGES.NO_EMAIL_SELECTED);
    }

    const metadata = getMessageMetadata(message);

    logInfo('Customer Support Workflow', 'Starting email analysis');
    try {
      const analysis = await analyzeEmail(metadata.subject, metadata.body);
      logInfo('Customer Support Workflow', JSON.stringify(analysis));
      if (!analysis || !analysis.analysis) {
        logError('Customer Support Workflow', 'Invalid analysis response');
        return createErrorCard(CONFIG.ERROR_MESSAGES.ANALYSIS_FAILED);
      }

      // Show analysis results and platform selection
      return createWorkflowResultCard(analysis, metadata);
    } catch (error) {
      if (error.message.startsWith('Email skipped:')) {
        return CardService.newActionResponseBuilder()
          .setNotification(CardService.newNotification()
            .setText(error.message)
            .setType(CardService.NotificationType.INFO))
          .build();
      }
      throw error;
    }
  } catch (error) {
    logError('Customer Support Workflow', error);
    return createErrorCard(error.message);
  }
};

export const createWorkflowTask = async (platform, params) => {
  try {
    logInfo('Task Creation', `Creating task in ${platform}`);

    // Verify platform is configured
    if (!validateIntegrationConfig(platform)) {
      throw new Error(`${platform} is not properly configured. Please check settings.`);
    }

    // Parse metadata and technical details
    let metadata;
    let technicalDetails;
    try {
      metadata = params.metadata ? JSON.parse(params.metadata) : {};
      technicalDetails = params.technicalDetails ? JSON.parse(params.technicalDetails) : null;
    } catch (error) {
      logError('Parse Error', error);
      metadata = {};
      technicalDetails = null;
    }

    const taskParams = {
      title: params.title || 'Untitled Task',
      description: params.description || 'No description provided',
      priority: params.priority || 'Medium',
      category: params.category || 'Support',
      metadata,
      technicalDetails,
    };

    let result;
    switch (platform.toLowerCase()) {
      case 'notion':
        result = await createNotionTask(taskParams);
        break;
      case 'jira':
        result = await createJiraIssue(taskParams);
        break;
      case 'slack':
        result = await sendSlackNotification({
          ...taskParams,
          taskUrl: null,
        });
        break;
      default:
        throw new Error(`Invalid platform: ${platform}`);
    }

    if (!result) {
      throw new Error(`Failed to create task in ${platform}`);
    }

    // Send additional Slack notification if configured
    if (platform !== 'slack' && validateIntegrationConfig('slack')) {
      try {
        await sendSlackNotification({
          ...taskParams,
          taskUrl: result.url,
        });
      } catch (error) {
        logError('Slack Notification Error', error);
        // Don't fail the main task creation
      }
    }

    logInfo('Task Creation', `Task created in ${platform}: ${result.id}`);

    return CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation().popToRoot())
      .setNotification(CardService.newNotification()
        .setText(`Successfully sent to ${CONFIG.INTEGRATIONS[platform.toUpperCase()].name}`)
        .setType(CardService.NotificationType.SUCCESS))
      .build();
  } catch (error) {
    logError('Create Task Error', error);
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification()
        .setText(error.message)
        .setType(CardService.NotificationType.ERROR))
      .build();
  }
};
