import { getCurrentMessage, getMessageMetadata, sendEmailReply } from '../utils/gmail';
import { analyzeEmail } from '../integrations/openai';
import { createNotionTask } from '../integrations/notion';
import { createJiraIssue } from '../integrations/jira';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';
import { createErrorCard, createWorkflowResultCard } from '../ui/cards';
import { sendSlackNotification } from '../integrations/slack';
import {
  validateWorkflowConfig,
  getConfiguredPlatforms,
  getProperty,
} from '../config/settings';
import { createIntegrationSettingsCard } from '../ui/settings';
import { EMAIL_TEMPLATES } from '../templates/email-templates';

export const createWorkflowTask = async (platform, params) => {
  try {
    let result;
    switch (platform.toLowerCase()) {
      case 'jira':
        try {
          result = await createJiraIssue(params);
        } catch (error) {
          logError('Jira Task Creation Error', error);
          // Check if it's a configuration error
          if (error.message.includes('configuration')) {
            throw new Error('Jira is not properly configured. Please check your settings.');
          }
          throw error;
        }
        break;
      case 'notion':
        result = await createNotionTask(params);
        break;
      case 'slack':
        // Slack is handled separately via sendSlackNotification
        return { success: true }; // Don't throw error for Slack
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }

    if (!result?.url) {
      throw new Error(`Failed to create task in ${platform}`);
    }

    logInfo('Task Creation', `Created ${platform.toLowerCase()} task for email`);
    return {
      success: true,
      url: result.url,
      taskId: result.id,
    };
  } catch (error) {
    logError('Create Task Error', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const processEmail = async (message, thread) => {
  try {
    const metadata = getMessageMetadata(message);
    const analysis = await analyzeEmail(metadata.subject, metadata.body);
    const isAutoReplyEnabled = getProperty(CONFIG.PROPERTIES.AUTO_REPLY_ENABLED) === 'true';

    // Handle auto-reply based on relevance
    if (!analysis.relevant) {
      // Only send reply if auto-reply is enabled
      if (isAutoReplyEnabled) {
        await sendEmailReply(message, EMAIL_TEMPLATES.IRRELEVANT_REQUEST);
      }

      return {
        success: false,
        reason: analysis.reason || 'Email not relevant',
        autoReplied: isAutoReplyEnabled,
      };
    }

    // Get platforms from AI analysis or fall back to configured ones
    let platformsToUse = [];

    // If AI suggests platforms, use those
    if (analysis.emailMetadata.platforms && analysis.emailMetadata.platforms.length > 0) {
      platformsToUse = analysis.emailMetadata.platforms.map((p) => p.toLowerCase());
    } else {
      // Fallback to configured platforms
      platformsToUse = getConfiguredPlatforms('CUSTOMER_SUPPORT');
    }

    const taskUrls = {};
    const errors = [];

    // Create tasks in all determined platforms (except Slack)
    await Promise.all(platformsToUse.map(async (platform) => {
      // Skip Slack as it's for notifications only
      if (platform.toLowerCase() === 'slack') return;

      try {
        const result = await createWorkflowTask(platform, {
          title: analysis.analysis.summary,
          description: analysis.analysis.details,
          priority: analysis.emailMetadata.priority,
          category: analysis.emailMetadata.category,
          metadata: JSON.stringify({
            emailId: message.getId(),
            threadId: thread.getId(),
            sentiment: analysis.analysis.sentiment,
            responseNeeded: analysis.emailMetadata.responseNeeded,
          }),
          technicalDetails: JSON.stringify(analysis.technicalDetails),
        });

        if (result?.success && result?.url) {
          taskUrls[platform] = result.url;
          logInfo('Task Creation', `Created ${platform.toLowerCase()} task for email`);
        } else if (result?.error) {
          errors.push(`${platform}: ${result.error}`);
        }
      } catch (error) {
        errors.push(`${platform}: ${error.message}`);
        logError(`${platform} Task Creation Error`, error);
      }
    }));

    // Send single Slack notification only if we have created any tasks
    if (Object.keys(taskUrls).length > 0) {
      try {
        await sendSlackNotification({
          title: analysis.analysis.summary,
          description: analysis.analysis.details,
          priority: analysis.emailMetadata.priority,
          category: analysis.emailMetadata.category,
          taskUrls,
        });
        logInfo('Slack Notification', 'Sent notification with task URLs');
      } catch (error) {
        errors.push(`Slack: ${error.message}`);
        logError('Slack Notification Error', error);
      }
    }

    // Only send confirmation reply if auto-reply is enabled
    if (isAutoReplyEnabled) {
      await sendEmailReply(message, EMAIL_TEMPLATES.RELEVANT_REQUEST);
    }

    // Return success with auto-reply status
    return {
      success: Object.keys(taskUrls).length > 0,
      analysis,
      taskUrls,
      errors: errors.length > 0 ? errors : undefined,
      autoReplied: isAutoReplyEnabled,
    };
  } catch (error) {
    logError('Process Email Error', error);
    throw error;
  }
};

export const processCustomerSupportWorkflow = async () => {
  try {
    if (!validateWorkflowConfig('CUSTOMER_SUPPORT')) {
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

    const thread = message.getThread();
    const result = await processEmail(message, thread);

    if (!result.success) {
      return createErrorCard(result.reason);
    }

    return createWorkflowResultCard(result.analysis, getMessageMetadata(message));
  } catch (error) {
    logError('Customer Support Workflow Error', error);
    return createErrorCard(error.message);
  }
};
