import { getCurrentMessage, getMessageMetadata } from '../utils/gmail';
import { analyzeEmail } from '../integrations/openai';
import { createNotionTask } from '../integrations/notion';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';
import { createErrorCard } from '../ui/cards';
import { validateWorkflowConfig } from '../config/settings';
import { createIntegrationSettingsCard } from '../ui/settings';

export const processCustomerSupportWorkflow = async () => {
  try {
    // Check if workflow is properly configured
    if (!validateWorkflowConfig('CUSTOMER_SUPPORT')) {
      logError('Customer Support Workflow', 'Required integrations not configured');
      return CardService.newActionResponseBuilder()
        .setNavigation(CardService.newNavigation().updateCard(createIntegrationSettingsCard()))
        .setNotification(CardService.newNotification()
          .setText('Please configure required integrations (OpenAI and Notion) first')
          .setType(CardService.NotificationType.WARNING))
        .build();
    }

    const message = getCurrentMessage();
    if (!message) {
      return createErrorCard(CONFIG.ERROR_MESSAGES.NO_EMAIL_SELECTED);
    }

    const metadata = getMessageMetadata(message);

    logInfo('Customer Support Workflow', 'Starting email analysis');
    const analysis = await analyzeEmail(metadata.subject, metadata.body);

    if (!analysis || !analysis.analysis) {
      logError('Customer Support Workflow', 'Invalid analysis response');
      return createErrorCard(CONFIG.ERROR_MESSAGES.ANALYSIS_FAILED);
    }

    logInfo('Customer Support Workflow', 'Creating Notion task');
    const taskResult = await createNotionTask({
      title: analysis.analysis.summary,
      description: `${analysis.analysis.details}\n\nOriginal Email:\n${metadata.body}`,
      priority: analysis.emailMetadata.priority,
      category: analysis.emailMetadata.category,
      metadata: {
        emailId: metadata.id,
        threadId: metadata.threadId,
        sentiment: analysis.analysis.sentiment,
        responseNeeded: analysis.emailMetadata.responseNeeded,
      },
    });

    if (!taskResult || !taskResult.id) {
      throw new Error(CONFIG.ERROR_MESSAGES.TASK_CREATION_FAILED);
    }

    logInfo('Customer Support Workflow', `Task created: ${taskResult.id}`);

    return CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation().popToRoot())
      .setNotification(CardService.newNotification()
        .setText('Task created successfully!')
        .setType(CardService.NotificationType.SUCCESS))
      .build();
  } catch (error) {
    logError('Customer Support Workflow', error);
    return createErrorCard(error.message);
  }
};
