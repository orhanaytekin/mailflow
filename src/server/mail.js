import { analyzeEmail } from './integrations/openai';
import { getConfiguredPlatforms } from './config/settings';
import { logInfo, logError } from './utils/logger';
import { isDiscoveryEnabled } from './triggers';
import { processEmail } from './workflows/customer-support';
import { CONFIG } from './config/constants';

// Helper functions for email analysis
const cleanSubject = (subject) => subject.replace(/^(Re|Fwd|FW|RE|FWD):\s*/i, '').trim();

// Error and success cards
const createErrorCard = (message) => {
  const card = CardService.newCardBuilder();
  const section = CardService.newCardSection()
    .addWidget(CardService.newTextParagraph().setText(`❌ ${message}`))
    .addWidget(
      CardService.newTextButton()
        .setText('Back to Home')
        .setOnClickAction(CardService.newAction().setFunctionName('onHomepage')),
    );

  return card.addSection(section).build();
};

// MARK: Success card
export const createSuccessCard = (message, taskUrl) => {
  const card = CardService.newCardBuilder();
  const section = CardService.newCardSection().addWidget(CardService.newTextParagraph().setText(`✅ ${message}`));

  if (taskUrl) {
    section.addWidget(
      CardService.newTextButton().setText('View Task').setOpenLink(CardService.newOpenLink().setUrl(taskUrl)),
    );
  }

  section.addWidget(
    CardService.newTextButton()
      .setText('Back to Home')
      .setOnClickAction(CardService.newAction().setFunctionName('onHomepage')),
  );

  return card.addSection(section).build();
};

// Helper function to get current message
export const getCurrentMessage = () => {
  try {
    const activeMessageAccessToken = PropertiesService.getUserProperties().getProperty('activeMessageId');
    if (!activeMessageAccessToken) {
      return null;
    }
    return GmailApp.getMessageById(activeMessageAccessToken);
  } catch (error) {
    return null;
  }
};

// Helper function to set current message
const setCurrentMessage = (messageId) => {
  PropertiesService.getUserProperties().setProperty('activeMessageId', messageId);
};

// Helper function to get icon based on sentiment
const getSentimentIcon = (sentiment) => {
  if (sentiment === 'Positive') return CardService.Icon.STAR;
  if (sentiment === 'Negative') return CardService.Icon.WARNING;
  return CardService.Icon.CLOCK;
};

// Helper function to get icon based on urgency
const getUrgencyIcon = (urgencyLevel) => {
  if (urgencyLevel === 'Immediate') return CardService.Icon.URGENT;
  if (urgencyLevel === 'Soon') return CardService.Icon.CLOCK;
  return CardService.Icon.CALENDAR_TODAY;
};

const extractPriority = (subject, body) => {
  const urgentPatterns = /urgent|asap|emergency|critical|immediate/i;
  const highPatterns = /important|priority|high|urgent/i;

  if (urgentPatterns.test(subject)) return 'Urgent';
  if (highPatterns.test(subject) || urgentPatterns.test(body)) return 'High';
  if (highPatterns.test(body)) return 'Medium';
  return 'Normal';
};

const extractDueDate = (body) => {
  const datePatterns = [
    /due\s+by\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
    /deadline[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
    /complete\s+by\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i,
  ];

  let foundDate = null;
  datePatterns.forEach((pattern) => {
    if (!foundDate) {
      const [, date] = body.match(pattern) || [];
      if (date) foundDate = date;
    }
  });
  return foundDate;
};

const determineCategory = (subject, body) => {
  const categories = {
    bug: /bug|issue|error|problem|crash|fix/i,
    feature: /feature|enhancement|improvement|add|new/i,
    support: /help|support|assistance|question/i,
    documentation: /docs|documentation|guide|readme/i,
  };

  const content = `${subject} ${body}`;
  const [category = 'general'] = Object.entries(categories).find(([, pattern]) => pattern.test(content)) || [];
  return category;
};

const extractMentions = (body) => {
  const emailPattern = /[\w.-]+@[\w.-]+\.\w+/g;
  const mentionPattern = /@[\w.-]+/g;

  const emailMatches = body.match(emailPattern) || [];
  const mentionMatches = body.match(mentionPattern) || [];

  return [...new Set([...emailMatches, ...mentionMatches])];
};

const extractLinks = (htmlBody) => {
  const links = [];
  const linkPattern = /<a[^>]+href=["']([^"']+)["'][^>]*>/g;

  let result = linkPattern.exec(htmlBody);
  while (result) {
    const [, url] = result;
    links.push(url);
    result = linkPattern.exec(htmlBody);
  }

  return links;
};

const formatDescription = (plainBody, keyInfo, sender, date) => {
  const sections = [
    {
      title: '📋 Task Details:',
      content: [
        `Priority: ${keyInfo.priority}`,
        keyInfo.dueDate ? `Due Date: ${keyInfo.dueDate}` : null,
        `Category: ${keyInfo.category}`,
        `Created from email by: ${sender}`,
        `Email Date: ${date.toISOString()}`,
      ].filter(Boolean),
    },
    keyInfo.mentions.length > 0 && {
      title: '👥 Mentions:',
      content: keyInfo.mentions,
    },
    keyInfo.links.length > 0 && {
      title: '🔗 Related Links:',
      content: keyInfo.links,
    },
    {
      title: '📧 Email Content:',
      content: [plainBody.substring(0, 1500), plainBody.length > 1500 ? '... (truncated)' : ''].filter(Boolean),
    },
  ].filter(Boolean);

  return sections.map((section) => `${section.title}\n${section.content.join('\n')}`).join('\n\n');
};

const extractEmailContent = (message) => {
  const plainBody = message.getPlainBody();
  const htmlBody = message.getBody();
  const subject = message.getSubject();
  const sender = message.getFrom();
  const date = message.getDate();

  const keyInfo = {
    subject: cleanSubject(subject),
    priority: extractPriority(subject, plainBody),
    dueDate: extractDueDate(plainBody),
    category: determineCategory(subject, plainBody),
    mentions: extractMentions(plainBody),
    links: extractLinks(htmlBody),
  };

  return formatDescription(plainBody, keyInfo, sender, date);
};

// Card creation functions
const createWelcomeCard = () => {
  const card = CardService.newCardBuilder();

  // Add header with overflow menu (3 dots)
  const header = CardService.newCardHeader()
    .setTitle('Gmail Task Automation')
    .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/auto_awesome_black_24dp.png')
    .setOverflowButton(
      CardService.newAction().setFunctionName('showSettingsCard').setParameters({ source: 'overflow' }),
    );

  // Add workflow section
  const workflowSection = CardService.newCardSection()
    .setHeader('Workflows')
    .addWidget(
      CardService.newTextButton()
        .setText('📋 Customer Support Workflow')
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
        .setOnClickAction(CardService.newAction().setFunctionName('handleWorkflowSelection')),
    );

  // Add quick actions section
  const actionsSection = CardService.newCardSection()
    .setHeader('Quick Actions')
    .addWidget(
      CardService.newButtonSet()
        .addButton(
          CardService.newTextButton()
            .setText('Analyze Email')
            .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
            .setOnClickAction(CardService.newAction().setFunctionName('analyzeCurrentEmail')),
        )
        .addButton(
          CardService.newTextButton()
            .setText('Create Task')
            .setOnClickAction(CardService.newAction().setFunctionName('showPlatformSelectionCard')),
        ),
    );

  // Add recent tasks preview
  const recentTasksSection = CardService.newCardSection()
    .setHeader('Recent Tasks')
    .addWidget(
      CardService.newTextButton()
        .setText('View All Recent Tasks')
        .setOnClickAction(CardService.newAction().setFunctionName('showRecentTasksCard')),
    );

  return card
    .setHeader(header)
    .addSection(workflowSection)
    .addSection(actionsSection)
    .addSection(recentTasksSection)
    .build();
};

const createEmailActionsCard = (message) => {
  const card = CardService.newCardBuilder();

  const header = CardService.newCardHeader()
    .setTitle('Create Task')
    .setSubtitle(message.getSubject())
    .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/task_alt_black_24dp.png');

  const taskSection = CardService.newCardSection()
    .setHeader('Task Details')
    .addWidget(CardService.newTextInput().setFieldName('taskTitle').setTitle('Title').setValue(message.getSubject()))
    .addWidget(
      CardService.newTextInput()
        .setFieldName('taskDescription')
        .setTitle('Description')
        .setMultiline(true)
        .setValue(extractEmailContent(message)),
    )
    .addWidget(
      CardService.newSelectionInput()
        .setFieldName('platform')
        .setTitle('Create in')
        .setType(CardService.SelectionInputType.RADIO_BUTTON)
        .addItem('Notion', 'notion', true)
        .addItem('Jira', 'jira', false),
    );

  const actionSection = CardService.newCardSection().addWidget(
    CardService.newButtonSet()
      .addButton(
        CardService.newTextButton()
          .setText('Create Task')
          .setOnClickAction(
            CardService.newAction().setFunctionName('createTask').setParameters({ messageId: message.getId() }),
          ),
      )
      .addButton(
        CardService.newTextButton()
          .setText('Cancel')
          .setOnClickAction(CardService.newAction().setFunctionName('onHomepage')),
      ),
  );

  return card.setHeader(header).addSection(taskSection).addSection(actionSection).build();
};

const createAnalysisResultCard = (analysis) => {
  const card = CardService.newCardBuilder();

  // Header
  const header = CardService.newCardHeader()
    .setTitle('Analysis Results')
    .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/analytics_black_24dp.png');

  // Summary section
  const summarySection = CardService.newCardSection()
    .setHeader('📋 Summary')
    .addWidget(CardService.newTextParagraph().setText(analysis.analysis.summary))
    .addWidget(
      CardService.newKeyValue()
        .setTopLabel('Confidence')
        .setContent(`${Math.round(analysis.emailMetadata.confidence * 100)}%`)
        .setIcon(CardService.Icon.STAR),
    );

  // Analysis details section
  const detailsSection = CardService.newCardSection()
    .setHeader('🔍 Analysis')
    .addWidget(
      CardService.newKeyValue()
        .setTopLabel('Priority')
        .setContent(analysis.emailMetadata.priority)
        .setIcon(
          analysis.emailMetadata.priority === 'High' ? CardService.Icon.PRIORITY_HIGH : CardService.Icon.PRIORITY_LOW,
        ),
    )
    .addWidget(
      CardService.newKeyValue()
        .setTopLabel('Category')
        .setContent(analysis.emailMetadata.category)
        .setIcon(CardService.Icon.FOLDER),
    )
    .addWidget(
      CardService.newKeyValue()
        .setTopLabel('Sentiment')
        .setContent(analysis.analysis.sentiment)
        .setIcon(getSentimentIcon(analysis.analysis.sentiment)),
    )
    .addWidget(
      CardService.newKeyValue()
        .setTopLabel('Urgency')
        .setContent(`${analysis.analysis.urgency.level} - ${analysis.analysis.urgency.reason}`)
        .setIcon(getUrgencyIcon(analysis.analysis.urgency.level)),
    );

  // Recommended actions section
  const actionsSection = CardService.newCardSection()
    .setHeader('🎯 Recommended Actions')
    .addWidget(
      CardService.newTextParagraph().setText(
        `Primary Action: ${analysis.recommendedActions.primaryAction.actionType}\n`
          + `Reason: ${analysis.recommendedActions.primaryAction.reason}`,
      ),
    );

  // Next steps section
  const stepsSection = CardService.newCardSection()
    .setHeader('📝 Next Steps')
    .addWidget(
      CardService.newTextParagraph().setText(
        analysis.nextSteps
          .map((step, index) => `${index + 1}. ${step.step}\n   Assignee: ${step.assignee} (~${step.timeEstimate})`)
          .join('\n\n'),
      ),
    );

  // Action buttons
  const platformsToUse = analysis.emailMetadata.platforms?.map((p) => p.toLowerCase())
                        || getConfiguredPlatforms('CUSTOMER_SUPPORT');

  const buttonSection = CardService.newCardSection()
    .setHeader('Available Actions');

  if (platformsToUse.length === 0) {
    buttonSection
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
    platformsToUse.forEach((platform) => {
      // Skip Slack as it's for notifications only
      if (platform.toLowerCase() === 'slack') return;

      let buttonText;
      switch (platform.toLowerCase()) {
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
        emailId: getCurrentMessage()?.getId() || '',
        threadId: getCurrentMessage()?.getThread()?.getId() || '',
        sentiment: analysis.analysis.sentiment || 'neutral',
        responseNeeded: analysis.emailMetadata.responseNeeded || false,
      };

      buttonSection.addWidget(
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
  buttonSection.addWidget(
    CardService.newTextButton()
      .setText('Back')
      .setOnClickAction(CardService.newAction().setFunctionName('onHomepage')),
  );

  return card
    .setHeader(header)
    .addSection(summarySection)
    .addSection(detailsSection)
    .addSection(actionsSection)
    .addSection(stepsSection)
    .addSection(buttonSection)
    .build();
};

// Gmail Add-on entry points
export const onHomepage = () => createWelcomeCard();

export const handleGmailTrigger = (e) => {
  const { messageId } = e.messageMetadata;
  setCurrentMessage(messageId);
  const message = GmailApp.getMessageById(messageId);
  return createEmailActionsCard(message);
};

export const analyzeCurrentEmail = async (e) => {
  try {
    const { messageId } = e.messageMetadata;
    const message = GmailApp.getMessageById(messageId);

    if (!message) {
      return createErrorCard('Could not find the selected email. Please try again.');
    }

    const analysis = await analyzeEmail(message.getSubject(), message.getPlainBody());

    if (!analysis || !analysis.summary) {
      return createErrorCard('Failed to analyze email. Please try again or contact support.');
    }

    // Use the detailed analysis result card instead of building a new one
    return createAnalysisResultCard(analysis);
  } catch (error) {
    Logger.log(`Email analysis error: ${error.message}`);
    return createErrorCard(`Failed to analyze email: ${error.message}`);
  }
};

// Legacy function - keeping for compatibility
export const sendmail = () => {
  const email = Session.getActiveUser().getEmail();
  const htmlBody = '<p>Hello</p>';
  const textBody = htmlBody.replace(/<[^>]+>/g, ' ');

  GmailApp.sendEmail(email, 'Hello from Google Apps Script', textBody, {
    htmlBody,
  });

  Logger.log(`Email message sent to ${email}`);
};

export const handleIncomingEmail = async (e) => {
  try {
    if (!isDiscoveryEnabled()) {
      return;
    }

    const thread = GmailApp.getThreadById(e.threadId);
    const message = thread.getMessages()[thread.getMessageCount() - 1];

    // Skip if message is from our own domain
    const userDomain = Session.getEffectiveUser().getEmail().split('@')[1];
    if (message.getFrom().includes(userDomain)) {
      return;
    }

    logInfo('Auto-Discovery', `Analyzing new email: ${message.getSubject()}`);

    const result = await processEmail(message, thread);

    if (result.success) {
      logInfo('Auto-Discovery', 'Successfully processed incoming email');
    }
  } catch (error) {
    logError('Auto-Discovery Error', error);
  }
};

// Helper function to ensure labels exist
const ensureLabel = (labelName) => {
  try {
    let label = GmailApp.getUserLabelByName(labelName);
    if (!label) {
      label = GmailApp.createLabel(labelName);
    }
    return label;
  } catch (error) {
    logError('Create Label Error', error);
    return null;
  }
};

export const processNewEmails = async () => {
  try {
    if (!isDiscoveryEnabled()) {
      return;
    }

    const threads = GmailApp.search(`is:starred label:${CONFIG.LABELS.DISCOVERY}`);
    logInfo('Auto-Discovery', `Found ${threads.length} threads to process`);

    await Promise.all(threads.map(async (thread) => {
      const messages = thread.getMessages();

      await Promise.all(messages.map(async (message) => {
        if (!message.isStarred()) {
          return;
        }

        try {
          // Skip if message is from our own domain
          const userDomain = Session.getEffectiveUser().getEmail().split('@')[1];
          if (message.getFrom().includes(userDomain)) {
            return;
          }

          const result = await processEmail(message, thread);

          // Always unstar the message as we've processed it
          message.unstar();

          if (result.success) {
            const processedLabel = ensureLabel(CONFIG.LABELS.PROCESSED);
            if (processedLabel) {
              thread.addLabel(processedLabel);
            }
          } else {
            const skippedLabel = ensureLabel(CONFIG.LABELS.SKIPPED);
            if (skippedLabel) {
              thread.addLabel(skippedLabel);
            }
          }
        } catch (error) {
          logError('Message Processing Error', error);
        }
      }));
    }));
  } catch (error) {
    logError('Process New Emails Error', error);
  }
};
