// Make functions available globally
function onHomepage() {
}
function handleGmailTrigger() {
}
function analyzeCurrentEmail() {
}
function handleCustomerSupportWorkflow() {
}
function showSettingsCard() {
}
function showIntegrationSettings() {
}
function createTask() {
}
function handleDeleteIntegration() {
}
// Add to global exports
function showDeleteConfirmation() {
}
// Add settings handlers with correct names
function onSaveOPENAISettings(e) {
}
function onSaveNOTIONSettings(e) {
}
function onSaveJIRASettings(e) {
}
function onSaveSLACKSettings(e) {
}
function testNotionSetup() {
}
function testJiraSetup() {
}
// Add to global scope
function processNewEmails() {
}
// Update globals
function showSetupGuide() {
}
function enableDiscovery() {
}
function disableDiscovery() {
}
function toggleAutoReply() {
}var AppLib;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  analyzeCurrentEmail: () => (/* binding */ src_analyzeCurrentEmail),
  createTask: () => (/* binding */ createTask),
  handleCustomerSupportWorkflow: () => (/* binding */ handleCustomerSupportWorkflow),
  handleDeleteIntegration: () => (/* reexport */ handleDeleteIntegration),
  handleGmailTrigger: () => (/* binding */ src_handleGmailTrigger),
  onHomepage: () => (/* binding */ src_onHomepage),
  showDeleteConfirmation: () => (/* reexport */ showDeleteConfirmation),
  showIntegrationSettings: () => (/* binding */ showIntegrationSettings),
  showSettingsCard: () => (/* binding */ showSettingsCard)
});

;// CONCATENATED MODULE: ./src/server/config/constants.js
const constants_CONFIG = {
  APP: {
    NAME: 'MailFlow AI',
    VERSION: '1.0.0',
    DESCRIPTION: 'AI-powered email workflow automation'
  },
  LABELS: {
    DISCOVERY: 'MailFlow: Discovery',
    PROCESSED: 'MailFlow: Processed',
    SKIPPED: 'MailFlow: Skipped'
  },
  WORKFLOWS: {
    CUSTOMER_SUPPORT: {
      id: 'CUSTOMER_SUPPORT',
      name: 'Customer Support',
      description: 'AI-powered customer support request handling',
      requiredIntegrations: ['openai'],
      taskPlatforms: ['notion', 'jira', 'slack'],
      defaultPlatform: 'notion'
    }
  },
  UI: {
    ICONS: {
      HOME: 'https://www.gstatic.com/images/icons/material/system/1x/home_black_24dp.png',
      TASK: 'https://www.gstatic.com/images/icons/material/system/1x/task_alt_black_24dp.png',
      SETTINGS: 'https://www.gstatic.com/images/icons/material/system/1x/settings_black_24dp.png',
      WORKFLOW: 'https://www.gstatic.com/images/icons/material/system/1x/workflow_black_24dp.png'
    },
    COLORS: {
      PRIMARY: '#1a73e8',
      SUCCESS: '#1e8e3e',
      ERROR: '#d93025'
    }
  },
  PROPERTIES: {
    NOTION_API_KEY: 'NOTION_API_KEY',
    NOTION_DATABASE_ID: 'NOTION_DATABASE_ID',
    OPENAI_API_KEY: 'OPENAI_API_KEY',
    AUTO_REPLY_ENABLED: 'AUTO_REPLY_ENABLED',
    SLACK_WEBHOOK_URL: 'SLACK_WEBHOOK_URL',
    ACTIVE_MESSAGE_ID: 'ACTIVE_MESSAGE_ID',
    JIRA_DOMAIN: 'JIRA_DOMAIN',
    JIRA_EMAIL: 'JIRA_EMAIL',
    JIRA_API_TOKEN: 'JIRA_API_TOKEN',
    JIRA_PROJECT_KEY: 'JIRA_PROJECT_KEY',
    SLACK_CHANNEL: 'SLACK_CHANNEL'
  },
  ERROR_MESSAGES: {
    NO_EMAIL_SELECTED: 'No email selected. Please select an email first.',
    MISSING_INTEGRATION: integration => `${integration} integration not configured. Please set it up in MailFlow Settings.`,
    ANALYSIS_FAILED: 'Failed to analyze email. Please try again.',
    TASK_CREATION_FAILED: 'Failed to create task. Please try again.',
    DELETE_FAILED: 'Failed to delete integration settings. Please try again.',
    INVALID_INTEGRATION: 'Invalid integration specified.'
  },
  INTEGRATIONS: {
    OPENAI: {
      name: 'OpenAI',
      fields: [{
        key: 'OPENAI_API_KEY',
        label: 'API Key'
      }]
    },
    NOTION: {
      name: 'Notion',
      fields: [{
        key: 'NOTION_API_KEY',
        label: 'API Key'
      }, {
        key: 'NOTION_DATABASE_ID',
        label: 'Database ID'
      }]
    },
    JIRA: {
      name: 'Jira',
      fields: [{
        key: 'JIRA_DOMAIN',
        label: 'Domain (e.g., your-domain.atlassian.net)'
      }, {
        key: 'JIRA_EMAIL',
        label: 'Email'
      }, {
        key: 'JIRA_API_TOKEN',
        label: 'API Token'
      }, {
        key: 'JIRA_PROJECT_KEY',
        label: 'Project Key'
      }]
    },
    SLACK: {
      name: 'Slack',
      fields: [{
        key: 'SLACK_WEBHOOK_URL',
        label: 'Webhook URL'
      }, {
        key: 'SLACK_CHANNEL',
        label: 'Channel (optional)'
      }]
    }
  },
  FEATURES: {
    AUTO_REPLY: {
      enabled: false,
      delaySeconds: 10
    }
  },
  EMAIL_TEMPLATES: {
    IRRELEVANT_REQUEST: {
      subject: originalSubject => `Re: ${originalSubject}`,
      body: `
        Thank you for your email. This is an automated response from MailFlow AI.
        
        We've received your message but it appears to be outside our standard workflow.
        A team member will review and respond if needed.
        
        Best regards,
        MailFlow AI
      `
    },
    RELEVANT_REQUEST: {
      subject: originalSubject => `Re: ${originalSubject}`,
      body: `
        Thank you for your email. This is an automated response from MailFlow AI.
        
        We've received your request and it's being processed.
        Our team will handle it according to our workflow.
        
        Best regards,
        MailFlow AI
      `
    }
  }
};
;// CONCATENATED MODULE: ./src/server/ui/components.js

const components_createHeader = (title, subtitle = null) => {
  const header = CardService.newCardHeader().setTitle(title).setImageUrl(constants_CONFIG.UI.ICONS.HOME);
  if (subtitle) {
    header.setSubtitle(subtitle);
  }
  return header;
};
const createHeaderSection = (showSettings = true) => {
  if (!showSettings) return null;
  return CardService.newCardSection().addWidget(CardService.newTextButton().setText('Settings').setOnClickAction(CardService.newAction().setFunctionName('showSettingsCard')));
};
const createActionButton = (text, functionName, parameters = {}, style = 'default') => {
  const button = CardService.newTextButton().setText(text).setOnClickAction(CardService.newAction().setFunctionName(functionName).setParameters(parameters));
  if (style === 'filled') {
    button.setTextButtonStyle(CardService.TextButtonStyle.FILLED);
  }
  return button;
};
const components_createSection = (title = null, widgets = []) => {
  const section = CardService.newCardSection();
  if (title) {
    section.setHeader(title);
  }
  widgets.forEach(widget => section.addWidget(widget));
  return section;
};
const createKeyValueWidget = (label, content, icon = null) => {
  const widget = CardService.newKeyValue().setTopLabel(label).setContent(content);
  if (icon) {
    widget.setIcon(icon);
  }
  return widget;
};
const createButtonSet = buttons => {
  const buttonSet = CardService.newButtonSet();
  buttons.forEach(button => buttonSet.addButton(button));
  return buttonSet;
};
;// CONCATENATED MODULE: ./src/server/utils/logger.js
// Console statements are intentionally used for Apps Script logging
// Apps Script logs can be viewed in the Apps Script Dashboard
const LOG_LEVEL = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR'
};
const logger_logError = (context, error, metadata = {}) => {
  const errorDetails = {
    timestamp: new Date().toISOString(),
    context,
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name
    },
    metadata,
    user: Session.getEffectiveUser().getEmail()
  };
  console.error(JSON.stringify(errorDetails, null, 2));
};
const logWarning = (context, message) => {
  console.warn(JSON.stringify({
    level: LOG_LEVEL.WARNING,
    context,
    message,
    timestamp: new Date().toISOString()
  }));
};
const logger_logInfo = (context, message) => {
  console.info(JSON.stringify({
    level: LOG_LEVEL.INFO,
    context,
    message,
    timestamp: new Date().toISOString()
  }));
};
;// CONCATENATED MODULE: ./src/server/config/settings.js


const settings_getProperty = key => PropertiesService.getUserProperties().getProperty(key);
const setProperty = (key, value) => {
  PropertiesService.getUserProperties().setProperty(key, value);
};
const deleteProperty = key => {
  PropertiesService.getUserProperties().deleteProperty(key);
};
const deleteProperties = keys => {
  try {
    const userProperties = PropertiesService.getUserProperties();

    // Delete properties one by one to handle errors gracefully
    keys.forEach(key => {
      try {
        userProperties.deleteProperty(key);
        logger_logInfo('Settings', `Deleted property: ${key}`);
      } catch (error) {
        logger_logError('Delete Property Error', `Failed to delete ${key}: ${error.message}`);
      }
    });
    return true;
  } catch (error) {
    logger_logError('Delete Properties Error', error);
    return false; // Return false instead of throwing error
  }
};
const validateIntegrationConfig = integration => {
  switch (integration.toLowerCase()) {
    case 'openai':
      return !!settings_getProperty(constants_CONFIG.PROPERTIES.OPENAI_API_KEY);
    case 'notion':
      return !!settings_getProperty(constants_CONFIG.PROPERTIES.NOTION_API_KEY) && !!settings_getProperty(constants_CONFIG.PROPERTIES.NOTION_DATABASE_ID);
    case 'jira':
      return !!settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_DOMAIN) && !!settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_EMAIL) && !!settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_API_TOKEN) && !!settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_PROJECT_KEY);
    case 'slack':
      return !!settings_getProperty(constants_CONFIG.PROPERTIES.SLACK_WEBHOOK_URL);
    default:
      return false;
  }
};
const validateWorkflowConfig = workflowId => {
  const workflow = constants_CONFIG.WORKFLOWS[workflowId];
  if (!workflow) return false;

  // Check required integrations
  const hasRequiredIntegrations = workflow.requiredIntegrations.every(integration => validateIntegrationConfig(integration));

  // Check if at least one task platform is configured
  const hasTaskPlatform = workflow.taskPlatforms.some(platform => validateIntegrationConfig(platform));
  return hasRequiredIntegrations && hasTaskPlatform;
};
const settings_getConfiguredPlatforms = workflowId => {
  const workflow = constants_CONFIG.WORKFLOWS[workflowId];
  if (!workflow) return [];
  return workflow.taskPlatforms.filter(platform => validateIntegrationConfig(platform));
};
;// CONCATENATED MODULE: ./src/server/utils/gmail.js



const getCurrentMessage = () => {
  const messageId = settings_getProperty(constants_CONFIG.PROPERTIES.ACTIVE_MESSAGE_ID);
  if (!messageId) {
    throw new Error(constants_CONFIG.ERROR_MESSAGES.NO_EMAIL_SELECTED);
  }
  const message = GmailApp.getMessageById(messageId);
  if (!message) {
    throw new Error(constants_CONFIG.ERROR_MESSAGES.NO_EMAIL_SELECTED);
  }
  return message;
};
const getMessageMetadata = message => ({
  id: message.getId(),
  messageId: message.getId(),
  threadId: message.getThread().getId(),
  subject: message.getSubject(),
  sender: message.getFrom(),
  recipient: message.getTo(),
  date: message.getDate(),
  body: message.getPlainBody(),
  hasAttachments: message.getAttachments().length > 0,
  headers: {
    messageId: message.getHeader('Message-ID'),
    references: message.getHeader('References'),
    inReplyTo: message.getHeader('In-Reply-To')
  }
});
const addLabel = async (messageId, labelName) => {
  try {
    let label = GmailApp.getUserLabelByName(labelName);
    if (!label) {
      label = GmailApp.createLabel(labelName);
    }
    const message = GmailApp.getMessageById(messageId);
    message.getThread().addLabel(label);
  } catch (error) {
    logError('Add Label Error', error);
    throw error;
  }
};
const sendEmailReply = async (originalMessage, template) => {
  try {
    const metadata = getMessageMetadata(originalMessage);

    // Use Gmail's native reply functionality
    const thread = originalMessage.getThread();
    thread.reply(template.plainText.trim(), {
      htmlBody: template.htmlBody.trim(),
      name: constants_CONFIG.APP.NAME
    });
    logger_logInfo('Email Reply Sent', `Replied to ${metadata.subject || '(no subject)'}`);
    return true;
  } catch (error) {
    logger_logError('Send Email Reply Error', error);
    return false;
  }
};
;// CONCATENATED MODULE: ./src/server/integrations/openai.js



const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4';
const SYSTEM_PROMPT = `You are an AI assistant analyzing customer support emails. First determine if the email is 
relevant to customer support by checking if it contains:
- Questions about products/services
- Bug reports
- Feature requests
- Technical issues
- General support inquiries
- Feedback
- Complaints

If the email is spam, automated notification, or completely unrelated to customer support, respond with:
{
  "relevant": false,
  "reason": "Brief explanation why this is not a customer support matter"
}

For relevant emails, analyze the content and determine appropriate platforms based on these rules:
- JIRA: Bugs, technical issues, high-priority items, security concerns
- Notion: Feature requests, enhancements, documentation needs, long-term tracking
- Both: Complex issues requiring both tracking and technical resolution

Format response as:
{
  "relevant": true,
  "analysis": {
    "summary": "Clear, concise summary of the main request/issue",
    "details": "Detailed analysis of the problem, steps to reproduce if available",
    "sentiment": "positive|neutral|negative"
  },
  "emailMetadata": {
    "priority": "High|Medium|Low",
    "category": "Bug|Feature Request|Question|Support",
    "responseNeeded": true|false,
    "platforms": ["JIRA", "NOTION"] // Platforms where this should be created
  },
  "technicalDetails": {  // Optional but valuable if available
    "appVersion": "string or null",
    "deviceInfo": {
      "type": "string or null",
      "model": "string or null",
      "osVersion": "string or null",
      "deviceId": "string or null"
    },
    "userIdentifiers": {
      "userId": "string or null",
      "aid": "string or null",
      "otherIds": []
    }
  }
}

Guidelines for platform selection:
1. JIRA:
   - All bugs regardless of priority
   - High-priority support issues
   - Security concerns
   - System outages
   - Data-related issues

2. Notion:
   - Feature requests and enhancements
   - Documentation updates
   - Process improvements
   - General feedback
   - Knowledge base items

3. Both Platforms:
   - Complex issues needing both tracking and technical work
   - Major feature requests with technical implications
   - Strategic product changes
   - Issues requiring cross-team collaboration
  
For relevant emails, analyze the content and extract any available technical information. Format response as:
    "priority": "High|Medium|Low", // Based on urgency words, reported impact
    "responseNeeded": true|false

Guidelines for analysis:

1. RELEVANCE: Focus on customer support nature, not technical details availability

2. PRIORITY:
   - High: System down, blocking issues, data loss, security concerns
   - Medium: Feature requests, non-blocking bugs, account issues
   - Low: General questions, minor UI issues, suggestions

3. TECHNICAL INFO: Extract if available but don't reject emails without it

4. RESPONSE NEEDED: True if the email requires a response or action

Examples of relevant emails (even without technical details):
- "The app keeps crashing" (Bug)
- "Can you add dark mode?" (Feature Request)
- "How do I reset my password?" (Support)
- "I can't access my account" (Support)
- "The new update is confusing" (Feedback)

Remember: Technical details enhance the support process but their absence doesn't make an email irrelevant.`;
const openai_analyzeEmail = async (subject, body) => {
  try {
    const apiKey = settings_getProperty(constants_CONFIG.PROPERTIES.OPENAI_API_KEY);
    if (!apiKey) {
      throw new Error(constants_CONFIG.ERROR_MESSAGES.MISSING_INTEGRATION('OpenAI'));
    }
    const response = await UrlFetchApp.fetch(OPENAI_API_URL, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        model: MODEL,
        messages: [{
          role: 'system',
          content: SYSTEM_PROMPT
        }, {
          role: 'user',
          content: `Please analyze this email:\nSubject: ${subject}\n\nBody: ${body}`
        }],
        temperature: 0.1,
        max_tokens: 3000
      })
    });
    const result = JSON.parse(response.getContentText());
    if (result.error) {
      logger_logError('OpenAI API Error', result.error);
      throw new Error(result.error.message);
    }
    try {
      var _analysis$analysis, _analysis$analysis2, _analysis$analysis3, _analysis$emailMetada, _analysis$emailMetada2, _analysis$emailMetada3, _analysis$emailMetada4, _analysis$technicalDe, _analysis$technicalDe2, _analysis$technicalDe3, _analysis$technicalDe4, _analysis$technicalDe5, _analysis$technicalDe6, _analysis$technicalDe7, _analysis$technicalDe8;
      const analysis = JSON.parse(result.choices[0].message.content);

      // If email is not relevant, return the analysis instead of throwing
      if (!analysis.relevant) {
        logger_logInfo('Email Analysis', `Email skipped: ${analysis.reason}`);
        return analysis;
      }

      // Add fallback values for required fields
      const processedAnalysis = {
        relevant: true,
        analysis: {
          summary: ((_analysis$analysis = analysis.analysis) === null || _analysis$analysis === void 0 ? void 0 : _analysis$analysis.summary) || subject || 'Untitled Request',
          details: ((_analysis$analysis2 = analysis.analysis) === null || _analysis$analysis2 === void 0 ? void 0 : _analysis$analysis2.details) || body || 'No details provided',
          sentiment: ((_analysis$analysis3 = analysis.analysis) === null || _analysis$analysis3 === void 0 ? void 0 : _analysis$analysis3.sentiment) || 'neutral'
        },
        emailMetadata: {
          priority: ((_analysis$emailMetada = analysis.emailMetadata) === null || _analysis$emailMetada === void 0 ? void 0 : _analysis$emailMetada.priority) || 'Medium',
          category: ((_analysis$emailMetada2 = analysis.emailMetadata) === null || _analysis$emailMetada2 === void 0 ? void 0 : _analysis$emailMetada2.category) || 'Support',
          responseNeeded: ((_analysis$emailMetada3 = analysis.emailMetadata) === null || _analysis$emailMetada3 === void 0 ? void 0 : _analysis$emailMetada3.responseNeeded) || true,
          platforms: ((_analysis$emailMetada4 = analysis.emailMetadata) === null || _analysis$emailMetada4 === void 0 ? void 0 : _analysis$emailMetada4.platforms) || ['JIRA', 'NOTION']
        },
        technicalDetails: {
          appVersion: ((_analysis$technicalDe = analysis.technicalDetails) === null || _analysis$technicalDe === void 0 ? void 0 : _analysis$technicalDe.appVersion) || null,
          deviceInfo: {
            type: ((_analysis$technicalDe2 = analysis.technicalDetails) === null || _analysis$technicalDe2 === void 0 || (_analysis$technicalDe2 = _analysis$technicalDe2.deviceInfo) === null || _analysis$technicalDe2 === void 0 ? void 0 : _analysis$technicalDe2.type) || null,
            model: ((_analysis$technicalDe3 = analysis.technicalDetails) === null || _analysis$technicalDe3 === void 0 || (_analysis$technicalDe3 = _analysis$technicalDe3.deviceInfo) === null || _analysis$technicalDe3 === void 0 ? void 0 : _analysis$technicalDe3.model) || null,
            osVersion: ((_analysis$technicalDe4 = analysis.technicalDetails) === null || _analysis$technicalDe4 === void 0 || (_analysis$technicalDe4 = _analysis$technicalDe4.deviceInfo) === null || _analysis$technicalDe4 === void 0 ? void 0 : _analysis$technicalDe4.osVersion) || null,
            deviceId: ((_analysis$technicalDe5 = analysis.technicalDetails) === null || _analysis$technicalDe5 === void 0 || (_analysis$technicalDe5 = _analysis$technicalDe5.deviceInfo) === null || _analysis$technicalDe5 === void 0 ? void 0 : _analysis$technicalDe5.deviceId) || null
          },
          userIdentifiers: {
            userId: ((_analysis$technicalDe6 = analysis.technicalDetails) === null || _analysis$technicalDe6 === void 0 || (_analysis$technicalDe6 = _analysis$technicalDe6.userIdentifiers) === null || _analysis$technicalDe6 === void 0 ? void 0 : _analysis$technicalDe6.userId) || null,
            aid: ((_analysis$technicalDe7 = analysis.technicalDetails) === null || _analysis$technicalDe7 === void 0 || (_analysis$technicalDe7 = _analysis$technicalDe7.userIdentifiers) === null || _analysis$technicalDe7 === void 0 ? void 0 : _analysis$technicalDe7.aid) || null,
            otherIds: ((_analysis$technicalDe8 = analysis.technicalDetails) === null || _analysis$technicalDe8 === void 0 || (_analysis$technicalDe8 = _analysis$technicalDe8.userIdentifiers) === null || _analysis$technicalDe8 === void 0 ? void 0 : _analysis$technicalDe8.otherIds) || []
          }
        }
      };
      logger_logInfo('Email Analysis', `Analysis completed for: ${subject}`);
      logger_logInfo('Email Analysis', `Analysis: ${JSON.stringify(processedAnalysis)}`);
      return processedAnalysis;
    } catch (parseError) {
      logger_logError('OpenAI Response Parse Error', parseError);
      // Return a basic analysis structure if parsing fails
      return {
        relevant: true,
        analysis: {
          summary: subject || 'Untitled Request',
          details: body || 'No details provided',
          sentiment: 'neutral'
        },
        emailMetadata: {
          priority: 'Medium',
          category: 'Support',
          responseNeeded: true,
          platforms: ['JIRA', 'NOTION']
        },
        technicalDetails: {
          appVersion: null,
          deviceInfo: {
            type: null,
            model: null,
            osVersion: null,
            deviceId: null
          },
          userIdentifiers: {
            userId: null,
            aid: null,
            otherIds: []
          }
        }
      };
    }
  } catch (error) {
    logger_logError('Analyze Email Error', error);
    throw error;
  }
};
;// CONCATENATED MODULE: ./src/server/triggers.js



const TRIGGER_FUNCTION_NAME = 'processNewEmails';
const DISCOVERY_ENABLED_KEY = 'autoDiscoveryEnabled';
const triggers_isDiscoveryEnabled = () => settings_getProperty(DISCOVERY_ENABLED_KEY) === 'true';
const deleteEmailTrigger = () => {
  try {
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === TRIGGER_FUNCTION_NAME) {
        ScriptApp.deleteTrigger(trigger);
      }
    });
    setProperty(DISCOVERY_ENABLED_KEY, 'false');
    logger_logInfo('Triggers', 'Email discovery trigger deleted');
    return true;
  } catch (error) {
    logger_logError('Delete Trigger Error', error);
    return false;
  }
};
const createEmailTrigger = () => {
  try {
    deleteEmailTrigger();

    // Create time-based trigger that runs every hour
    ScriptApp.newTrigger(TRIGGER_FUNCTION_NAME).timeBased().everyHours(1).create();

    // Create the label if it doesn't exist
    let label = GmailApp.getUserLabelByName(constants_CONFIG.LABELS.DISCOVERY);
    if (!label) {
      label = GmailApp.createLabel(constants_CONFIG.LABELS.DISCOVERY);
    }
    setProperty(DISCOVERY_ENABLED_KEY, 'true');
    logger_logInfo('Triggers', 'Hourly email discovery trigger created');
    return true;
  } catch (error) {
    logger_logError('Create Trigger Error', error);
    return false;
  }
};
;// CONCATENATED MODULE: ./src/server/ui/cards.js







const createErrorCard = message => {
  const card = CardService.newCardBuilder();
  card.setHeader(components_createHeader('Error', null, false));
  const errorSection = components_createSection(null, [CardService.newTextParagraph().setText(`❌ ${message}`), createActionButton('Back to Home', 'onHomepage')]);
  return card.addSection(errorSection).build();
};
const createHomeCard = () => {
  const card = CardService.newCardBuilder();
  const isEnabled = triggers_isDiscoveryEnabled();
  const isAutoReplyEnabled = settings_getProperty(constants_CONFIG.PROPERTIES.AUTO_REPLY_ENABLED) === 'true';

  // Add header
  card.setHeader(components_createHeader('MailFlow AI', 'Automate your email workflows', false));

  // Add settings button in its own section
  const settingsSection = createHeaderSection(true);
  if (settingsSection) {
    card.addSection(settingsSection);
  }

  // Add auto-discovery section
  const discoverySection = CardService.newCardSection().setHeader('🔍 Email Discovery').addWidget(CardService.newTextParagraph().setText('Automatically process new emails based on filters.'));
  if (isEnabled) {
    discoverySection.addWidget(CardService.newTextButton().setText('Disable Auto-Discovery').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(constants_CONFIG.UI.COLORS.ERROR).setOnClickAction(CardService.newAction().setFunctionName('disableDiscovery'))).addWidget(CardService.newTextParagraph().setText('Currently checking every hour'));
  } else {
    discoverySection.addWidget(CardService.newTextButton().setText('Enable Auto-Discovery').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(constants_CONFIG.UI.COLORS.SUCCESS).setOnClickAction(CardService.newAction().setFunctionName('showSetupGuide')));
  }
  card.addSection(discoverySection);

  // Auto-reply section
  const autoReplySection = CardService.newCardSection().setHeader('✉️ Auto-Reply').addWidget(CardService.newTextParagraph().setText((() => {
    if (!isEnabled) {
      return 'Auto-reply requires Auto-Discovery to be enabled first. Enable Auto-Discovery to use automatic email responses.';
    }
    if (isAutoReplyEnabled) {
      return 'Smart replies enabled - Automatic responses active';
    }
    return 'Smart replies disabled - No automatic responses';
  })())).addWidget(CardService.newTextButton().setText(isAutoReplyEnabled ? 'Disable Auto-Reply' : 'Enable Auto-Reply').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(isAutoReplyEnabled ? constants_CONFIG.UI.COLORS.ERROR : constants_CONFIG.UI.COLORS.SUCCESS).setDisabled(!isEnabled).setOnClickAction(CardService.newAction().setFunctionName('toggleAutoReply')));
  card.addSection(autoReplySection);

  // Add selected email information
  try {
    const message = getCurrentMessage();
    if (message) {
      const metadata = getMessageMetadata(message);
      const emailSection = components_createSection('Selected Email', [createKeyValueWidget('Subject', metadata.subject), createKeyValueWidget('From', metadata.sender), createKeyValueWidget('Date', metadata.date.toLocaleString())]);
      card.addSection(emailSection);
    }
  } catch (error) {
    const noEmailSection = components_createSection('No Email Selected', [CardService.newTextParagraph().setText('Please select an email to get started.')]);
    card.addSection(noEmailSection);
  }

  // Main workflow button - removed Analyze Email button
  const workflowSection = components_createSection('Quick Actions', [createActionButton('📋 Customer Support Workflow', 'handleCustomerSupportWorkflow', {}, 'filled')]);
  return card.addSection(workflowSection).build();
};
const createAnalysisCard = async () => {
  const card = CardService.newCardBuilder();
  try {
    const message = getCurrentMessage();
    const metadata = getMessageMetadata(message);
    const analysis = await openai_analyzeEmail(metadata.subject, metadata.body);
    card.setHeader(components_createHeader('Email Analysis', metadata.subject));
    const summarySection = components_createSection('Summary', [CardService.newTextParagraph().setText(analysis.analysis.summary), createKeyValueWidget('Priority', analysis.emailMetadata.priority, analysis.emailMetadata.priority === 'High' ? CardService.Icon.PRIORITY_HIGH : CardService.Icon.DESCRIPTION), createKeyValueWidget('Category', analysis.emailMetadata.category, CardService.Icon.BOOKMARK)]);

    // Get configured platforms and create action section
    const configuredPlatforms = settings_getConfiguredPlatforms('CUSTOMER_SUPPORT');
    const actionsSection = CardService.newCardSection().setHeader('Available Actions');
    if (configuredPlatforms.length === 0) {
      actionsSection.addWidget(CardService.newTextParagraph().setText('⚠️ No task platforms configured. Please configure at least one platform in settings.')).addWidget(CardService.newTextButton().setText('Go to Settings').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setOnClickAction(CardService.newAction().setFunctionName('showIntegrationSettings')));
    } else {
      // Add button for each configured platform
      configuredPlatforms.forEach(platform => {
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
          responseNeeded: analysis.emailMetadata.responseNeeded || false
        };
        actionsSection.addWidget(CardService.newTextButton().setText(buttonText).setTextButtonStyle(CardService.TextButtonStyle.FILLED).setOnClickAction(CardService.newAction().setFunctionName('createTask').setParameters({
          platform,
          title: analysis.analysis.summary || 'Untitled Task',
          description: analysis.analysis.details || 'No description provided',
          priority: analysis.emailMetadata.priority || 'Medium',
          category: analysis.emailMetadata.category || 'Support',
          metadata: JSON.stringify(taskMetadata),
          technicalDetails: JSON.stringify(analysis.technicalDetails || null)
        })));
      });
    }

    // Add back button
    actionsSection.addWidget(CardService.newTextButton().setText('Back').setOnClickAction(CardService.newAction().setFunctionName('onHomepage')));
    return card.addSection(summarySection).addSection(actionsSection).build();
  } catch (error) {
    logger_logError('Analysis Card Error', error);
    return createErrorCard(error.message);
  }
};
const createSettingsCard = () => {
  const card = CardService.newCardBuilder();
  card.setHeader(components_createHeader('Settings', null, false));
  const integrationSection = components_createSection('Integrations', Object.entries(constants_CONFIG.INTEGRATIONS).map(([key, integration]) => {
    const isConfigured = validateIntegrationConfig(key.toLowerCase());
    return createKeyValueWidget(integration.name, isConfigured ? 'Connected' : 'Not Configured', isConfigured ? CardService.Icon.CONFIRMATION_NUMBER_ICON : CardService.Icon.DESCRIPTION);
  }).concat([createActionButton('Configure Integrations', 'showIntegrationSettings')]));
  return card.addSection(integrationSection).build();
};
const createWorkflowResultCard = analysis => {
  const card = CardService.newCardBuilder();

  // Header
  const header = CardService.newCardHeader().setTitle('Analysis Results').setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/analytics_black_24dp.png');
  card.setHeader(header);

  // Summary section
  const summarySection = CardService.newCardSection().setHeader('📋 Summary').addWidget(CardService.newTextParagraph().setText(analysis.analysis.summary));

  // Add priority and category
  summarySection.addWidget(CardService.newKeyValue().setTopLabel('Priority').setContent(analysis.emailMetadata.priority).setIcon(analysis.emailMetadata.priority.toLowerCase() === 'high' ? CardService.Icon.PRIORITY_HIGH : CardService.Icon.PRIORITY_LOW));
  summarySection.addWidget(CardService.newKeyValue().setTopLabel('Category').setContent(analysis.emailMetadata.category).setIcon(CardService.Icon.FOLDER));

  // Add sentiment if available
  if (analysis.analysis.sentiment) {
    summarySection.addWidget(CardService.newKeyValue().setTopLabel('Sentiment').setContent(analysis.analysis.sentiment).setIcon((() => {
      const sentiment = analysis.analysis.sentiment.toLowerCase();
      if (sentiment === 'positive') {
        return CardService.Icon.STAR;
      }
      if (sentiment === 'negative') {
        return CardService.Icon.WARNING;
      }
      return CardService.Icon.DESCRIPTION;
    })()));
  }
  card.addSection(summarySection);

  // Details section
  const detailsSection = CardService.newCardSection().setHeader('🔍 Details').addWidget(CardService.newTextParagraph().setText(analysis.analysis.details));

  // Add technical details if available
  if (analysis.technicalDetails) {
    var _analysis$technicalDe, _analysis$technicalDe2;
    const techDetails = [];
    if (analysis.technicalDetails.appVersion) {
      techDetails.push(`App Version: ${analysis.technicalDetails.appVersion}`);
    }
    if ((_analysis$technicalDe = analysis.technicalDetails.deviceInfo) !== null && _analysis$technicalDe !== void 0 && _analysis$technicalDe.type) {
      techDetails.push(`Device: ${analysis.technicalDetails.deviceInfo.type}`);
    }
    if ((_analysis$technicalDe2 = analysis.technicalDetails.deviceInfo) !== null && _analysis$technicalDe2 !== void 0 && _analysis$technicalDe2.osVersion) {
      techDetails.push(`OS: ${analysis.technicalDetails.deviceInfo.osVersion}`);
    }
    if (techDetails.length > 0) {
      detailsSection.addWidget(CardService.newTextParagraph().setText(`\n🔧 Technical Information:\n${techDetails.join('\n')}`));
    }
  }
  card.addSection(detailsSection);

  // Add back to home button
  const actionSection = CardService.newCardSection().setHeader('Actions').addWidget(CardService.newTextButton().setText('Back to Home').setTextButtonStyle(CardService.TextButtonStyle.TEXT).setOnClickAction(CardService.newAction().setFunctionName('onHomepage')));
  card.addSection(actionSection);
  return card.build();
};
;// CONCATENATED MODULE: ./src/server/integrations/notion.js



const NOTION_API_URL = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';
const createNotionTask = async params => {
  try {
    var _params$technicalDeta, _params$technicalDeta2, _params$technicalDeta3, _params$technicalDeta4, _params$technicalDeta5, _params$technicalDeta6, _params$metadata, _params$metadata2;
    const apiKey = settings_getProperty(constants_CONFIG.PROPERTIES.NOTION_API_KEY);
    const databaseId = settings_getProperty(constants_CONFIG.PROPERTIES.NOTION_DATABASE_ID);
    if (!apiKey || !databaseId) {
      throw new Error('Notion API key or database ID not configured');
    }

    // Log the request payload for debugging
    const payload = {
      parent: {
        database_id: databaseId
      },
      properties: {
        Title: {
          title: [{
            text: {
              content: params.title
            }
          }]
        },
        Status: {
          select: {
            name: 'New'
          }
        },
        Priority: {
          select: {
            name: params.priority
          }
        },
        Category: {
          select: {
            name: params.category
          }
        },
        Description: {
          rich_text: [{
            text: {
              content: params.description
            }
          }]
        },
        'App Version': {
          rich_text: [{
            text: {
              content: ((_params$technicalDeta = params.technicalDetails) === null || _params$technicalDeta === void 0 ? void 0 : _params$technicalDeta.appVersion) || 'N/A'
            }
          }]
        },
        'Device Type': {
          rich_text: [{
            text: {
              content: ((_params$technicalDeta2 = params.technicalDetails) === null || _params$technicalDeta2 === void 0 || (_params$technicalDeta2 = _params$technicalDeta2.deviceInfo) === null || _params$technicalDeta2 === void 0 ? void 0 : _params$technicalDeta2.type) || 'N/A'
            }
          }]
        },
        'Device Model': {
          rich_text: [{
            text: {
              content: ((_params$technicalDeta3 = params.technicalDetails) === null || _params$technicalDeta3 === void 0 || (_params$technicalDeta3 = _params$technicalDeta3.deviceInfo) === null || _params$technicalDeta3 === void 0 ? void 0 : _params$technicalDeta3.model) || 'N/A'
            }
          }]
        },
        'OS Version': {
          rich_text: [{
            text: {
              content: ((_params$technicalDeta4 = params.technicalDetails) === null || _params$technicalDeta4 === void 0 || (_params$technicalDeta4 = _params$technicalDeta4.deviceInfo) === null || _params$technicalDeta4 === void 0 ? void 0 : _params$technicalDeta4.osVersion) || 'N/A'
            }
          }]
        },
        AID: {
          rich_text: [{
            text: {
              content: ((_params$technicalDeta5 = params.technicalDetails) === null || _params$technicalDeta5 === void 0 || (_params$technicalDeta5 = _params$technicalDeta5.userIdentifiers) === null || _params$technicalDeta5 === void 0 ? void 0 : _params$technicalDeta5.aid) || 'N/A'
            }
          }]
        },
        'User ID': {
          rich_text: [{
            text: {
              content: ((_params$technicalDeta6 = params.technicalDetails) === null || _params$technicalDeta6 === void 0 || (_params$technicalDeta6 = _params$technicalDeta6.userIdentifiers) === null || _params$technicalDeta6 === void 0 ? void 0 : _params$technicalDeta6.userId) || 'N/A'
            }
          }]
        },
        'Email ID': {
          rich_text: [{
            text: {
              content: ((_params$metadata = params.metadata) === null || _params$metadata === void 0 ? void 0 : _params$metadata.emailId) || 'N/A'
            }
          }]
        },
        'Thread ID': {
          rich_text: [{
            text: {
              content: ((_params$metadata2 = params.metadata) === null || _params$metadata2 === void 0 ? void 0 : _params$metadata2.threadId) || 'N/A'
            }
          }]
        }
      }
    };
    logger_logInfo('Notion Request', payload);
    const response = await UrlFetchApp.fetch('https://api.notion.com/v1/pages', {
      method: 'post',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      muteHttpExceptions: true,
      payload: JSON.stringify(payload)
    });

    // Log the full response for debugging
    const responseText = response.getContentText();
    logger_logInfo('Notion Response', 'Raw response:', responseText);
    const result = JSON.parse(responseText);
    if (result.error) {
      logger_logError('Notion API Error', result.error);
      throw new Error(`Notion API Error: ${result.error.message}`);
    }
    if (!result.id) {
      logger_logError('Notion Task Creation', 'Response:', result);
      throw new Error('Failed to create Notion task - no ID returned');
    }
    logger_logInfo('Notion Task Created', `Task ID: ${result.id}, URL: ${result.url}`);
    return {
      id: result.id,
      url: result.url
    };
  } catch (error) {
    logger_logError('Notion Task Creation Error', {
      error: error.message,
      stack: error.stack
    });
    throw new Error(`Failed to create Notion task: ${error.message}`);
  }
};
const validateNotionConfig = async () => {
  try {
    const token = getProperty(CONFIG.PROPERTIES.NOTION_API_KEY);
    const databaseId = getProperty(CONFIG.PROPERTIES.NOTION_DATABASE_ID);
    if (!token || !databaseId) {
      return false;
    }
    const response = await UrlFetchApp.fetch(`${NOTION_API_URL}/databases/${databaseId}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION
      },
      muteHttpExceptions: true
    });
    const result = JSON.parse(response.getContentText());
    return !result.error;
  } catch (error) {
    logError('Validate Notion Config Error', error);
    return false;
  }
};
const checkNotionSetup = async () => {
  try {
    const apiKey = settings_getProperty(constants_CONFIG.PROPERTIES.NOTION_API_KEY);
    const databaseId = settings_getProperty(constants_CONFIG.PROPERTIES.NOTION_DATABASE_ID);
    if (!apiKey || !databaseId) {
      throw new Error('Missing API key or database ID');
    }

    // First check API key validity
    const userResponse = await UrlFetchApp.fetch('https://api.notion.com/v1/users/me', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28'
      },
      muteHttpExceptions: true
    });
    const userResult = JSON.parse(userResponse.getContentText());
    if (userResult.error) {
      throw new Error(`Invalid API key: ${userResult.error.message}`);
    }

    // Then check database access and schema
    const dbResponse = await UrlFetchApp.fetch(`https://api.notion.com/v1/databases/${databaseId}`, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28'
      },
      muteHttpExceptions: true
    });
    const dbResult = JSON.parse(dbResponse.getContentText());
    logger_logInfo('Notion Database Check', dbResult);
    if (dbResult.error) {
      throw new Error(`Database access error: ${dbResult.error.message}`);
    }

    // Verify required properties exist with correct types
    const requiredProperties = {
      Title: 'title',
      Status: 'select',
      Priority: 'select',
      Category: 'select',
      Description: 'rich_text',
      'App Version': 'rich_text',
      'Device Type': 'rich_text',
      'Device Model': 'rich_text',
      'OS Version': 'rich_text',
      AID: 'rich_text',
      'Email ID': 'rich_text',
      'Thread ID': 'rich_text'
    };
    const missingProperties = [];
    const wrongTypes = [];
    Object.entries(requiredProperties).forEach(([propName, expectedType]) => {
      const prop = dbResult.properties[propName];
      if (!prop) {
        missingProperties.push(propName);
      } else if (prop.type !== expectedType) {
        wrongTypes.push(`${propName} (expected ${expectedType}, got ${prop.type})`);
      }
    });
    if (missingProperties.length > 0) {
      throw new Error(`Missing properties: ${missingProperties.join(', ')}`);
    }
    if (wrongTypes.length > 0) {
      throw new Error(`Wrong property types: ${wrongTypes.join(', ')}`);
    }

    // Check select options
    const statusOptions = dbResult.properties.Status.select.options.map(o => o.name);
    if (!statusOptions.includes('New')) {
      throw new Error('Status property missing "New" option');
    }
    return {
      success: true,
      bot: userResult.bot,
      workspace: dbResult.parent.workspace,
      properties: dbResult.properties
    };
  } catch (error) {
    logger_logError('Notion Setup Check', error);
    return {
      success: false,
      error: error.message
    };
  }
};
;// CONCATENATED MODULE: ./src/server/integrations/jira.js



const createJiraIssue = async params => {
  try {
    var _params$category;
    const domain = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_DOMAIN);
    const email = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_EMAIL);
    const apiToken = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_API_TOKEN);
    const projectKey = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_PROJECT_KEY);
    if (!domain || !email || !apiToken || !projectKey) {
      logger_logInfo('Jira Config Debug', {
        hasDomain: !!domain,
        hasEmail: !!email,
        hasToken: !!apiToken,
        hasProjectKey: !!projectKey,
        domain,
        email,
        projectKey
      });
      throw new Error('Missing Jira configuration');
    }
    const jiraUrl = domain.startsWith('https://') ? domain : `https://${domain}`;
    const apiEndpoint = `${jiraUrl}/rest/api/3/issue`;

    // Log request details for debugging
    logger_logInfo('Jira Request', {
      url: apiEndpoint,
      email,
      projectKey,
      title: params.title,
      priority: params.priority
    });

    // Convert priority to Jira format
    const priorityMap = {
      High: '1',
      Medium: '3',
      Low: '5'
    };
    const jiraPriority = priorityMap[params.priority] || '3';

    // Format labels (remove special characters and lowercase)
    const labels = ['email-automation', ((_params$category = params.category) === null || _params$category === void 0 ? void 0 : _params$category.toLowerCase().replace(/[^a-z0-9]/g, '-')) || 'uncategorized'];

    // Create proper Jira description with technical details
    const technicalDetails = JSON.parse(params.technicalDetails || '{}');
    const metadata = JSON.parse(params.metadata || '{}');
    const descriptionContent = [{
      type: 'paragraph',
      content: [{
        type: 'text',
        text: params.description
      }]
    }, {
      type: 'paragraph',
      content: [{
        type: 'text',
        text: '\nTechnical Details:',
        marks: [{
          type: 'strong'
        }]
      }]
    }];

    // Add technical details if available
    if (technicalDetails.appVersion) {
      descriptionContent.push({
        type: 'paragraph',
        content: [{
          type: 'text',
          text: `App Version: ${technicalDetails.appVersion}`
        }]
      });
    }
    if (technicalDetails.deviceInfo) {
      const {
        deviceInfo
      } = technicalDetails;
      if (deviceInfo.type || deviceInfo.model || deviceInfo.osVersion) {
        descriptionContent.push({
          type: 'paragraph',
          content: [{
            type: 'text',
            text: `Device: ${[deviceInfo.type, deviceInfo.model, deviceInfo.osVersion].filter(Boolean).join(', ')}`
          }]
        });
      }
    }

    // Add email metadata
    if (metadata.emailId || metadata.threadId) {
      descriptionContent.push({
        type: 'paragraph',
        content: [{
          type: 'text',
          text: '\nEmail Reference:',
          marks: [{
            type: 'strong'
          }]
        }]
      });
      if (metadata.emailId) {
        descriptionContent.push({
          type: 'paragraph',
          content: [{
            type: 'text',
            text: `Email ID: ${metadata.emailId}`
          }]
        });
      }
      if (metadata.threadId) {
        descriptionContent.push({
          type: 'paragraph',
          content: [{
            type: 'text',
            text: `Thread ID: ${metadata.threadId}`
          }]
        });
      }
    }
    const payload = {
      fields: {
        project: {
          key: projectKey
        },
        summary: params.title,
        description: {
          type: 'doc',
          version: 1,
          content: descriptionContent
        },
        issuetype: {
          name: 'Task'
        },
        priority: {
          id: jiraPriority
        },
        labels
      }
    };

    // Log the payload for debugging
    logger_logInfo('Jira Payload', payload);
    const response = await UrlFetchApp.fetch(apiEndpoint, {
      method: 'post',
      headers: {
        Authorization: `Basic ${Utilities.base64Encode(`${email}:${apiToken}`)}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      muteHttpExceptions: true,
      payload: JSON.stringify(payload)
    });
    const responseData = JSON.parse(response.getContentText());
    logger_logInfo('Jira Response Details', {
      status: response.getResponseCode(),
      headers: response.getAllHeaders(),
      body: response.getContentText()
    });
    if (response.getResponseCode() !== 201) {
      var _responseData$errorMe;
      throw new Error(`Jira API Error: ${((_responseData$errorMe = responseData.errorMessages) === null || _responseData$errorMe === void 0 ? void 0 : _responseData$errorMe[0]) || 'Unknown error'}`);
    }
    const issueKey = responseData.key;
    const issueUrl = `${jiraUrl}/browse/${issueKey}`;
    return {
      success: true,
      id: issueKey,
      url: issueUrl
    };
  } catch (error) {
    logger_logError('Create Jira Issue Error', error);
    throw error;
  }
};
const checkJiraSetup = async () => {
  try {
    const token = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_API_TOKEN);
    const email = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_EMAIL);
    const domain = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_DOMAIN);
    const projectKey = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_PROJECT_KEY);
    if (!token || !email || !domain || !projectKey) {
      throw new Error('Missing required Jira configuration');
    }
    const baseUrl = domain.startsWith('https://') ? domain : `https://${domain}`;

    // Test authentication
    const authResponse = await UrlFetchApp.fetch(`${baseUrl}/rest/api/3/myself`, {
      method: 'get',
      headers: {
        Authorization: `Basic ${Utilities.base64Encode(`${email}:${token}`)}`,
        Accept: 'application/json'
      },
      muteHttpExceptions: true
    });
    if (authResponse.getResponseCode() !== 200) {
      throw new Error('Authentication failed - check email and API token');
    }

    // Test project access
    const projectResponse = await UrlFetchApp.fetch(`${baseUrl}/rest/api/3/project/${projectKey}`, {
      method: 'get',
      headers: {
        Authorization: `Basic ${Utilities.base64Encode(`${email}:${token}`)}`,
        Accept: 'application/json'
      },
      muteHttpExceptions: true
    });
    if (projectResponse.getResponseCode() !== 200) {
      throw new Error(`Project "${projectKey}" not found or not accessible`);
    }

    // Test issue types
    const projectData = JSON.parse(projectResponse.getContentText());
    const issueTypes = projectData.issueTypes || [];
    if (!issueTypes.some(type => type.name === 'Task')) {
      throw new Error('Project does not have "Task" issue type');
    }
    return {
      success: true,
      account: JSON.parse(authResponse.getContentText()),
      project: projectData
    };
  } catch (error) {
    logger_logError('Jira Setup Check', error);
    return {
      success: false,
      error: error.message
    };
  }
};
;// CONCATENATED MODULE: ./src/server/ui/settings.js






const createIntegrationSettingsCard = () => {
  const card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader().setTitle('MailFlow Settings').setImageStyle(CardService.ImageStyle.SQUARE).setImageUrl(constants_CONFIG.UI.ICONS.SETTINGS));

  // Create sections for each integration
  Object.entries(constants_CONFIG.INTEGRATIONS).forEach(([key, integration]) => {
    const section = components_createSection(`${integration.name} Settings`, [...integration.fields.map(field => CardService.newTextInput().setFieldName(field.key).setTitle(field.label).setValue(settings_getProperty(constants_CONFIG.PROPERTIES[field.key]) || '').setMultiline(false)), CardService.newButtonSet().addButton(CardService.newTextButton().setText(`Save ${integration.name} Settings`).setOnClickAction(CardService.newAction().setFunctionName(`onSave${key}Settings`).setParameters({
      source: 'settings'
    }))).addButton(CardService.newTextButton().setText('Delete').setTextButtonStyle(CardService.TextButtonStyle.TEXT).setOnClickAction(CardService.newAction().setFunctionName('showDeleteConfirmation').setParameters({
      integration: key
    })))]);
    card.addSection(section);
  });

  // Create and add Notion test section
  const notionSection = CardService.newCardSection().setHeader('Notion Settings').addWidget(CardService.newTextButton().setText('Test Notion Setup').setOnClickAction(CardService.newAction().setFunctionName('testNotionSetup')));
  card.addSection(notionSection); // Add the section to the card

  const jiraSection = CardService.newCardSection().setHeader('Jira Settings').addWidget(CardService.newTextButton().setText('Test Jira Setup').setOnClickAction(CardService.newAction().setFunctionName('testJiraSetup')));
  card.addSection(jiraSection);
  return card.addSection(components_createSection(null, [createActionButton('Back', 'showSettingsCard')])).build();
};

// Add delete confirmation dialog
const createDeleteConfirmationCard = e => {
  const {
    integration
  } = e.parameters;
  const card = CardService.newCardBuilder();
  card.setHeader(createHeader('Confirm Delete', null, false));
  const confirmSection = createSection(null, [CardService.newTextParagraph().setText(`Are you sure you want to delete the ${CONFIG.INTEGRATIONS[integration].name} ` + 'integration settings? This cannot be undone.'), CardService.newButtonSet().addButton(CardService.newTextButton().setText('Delete').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(CONFIG.UI.COLORS.ERROR).setOnClickAction(CardService.newAction().setFunctionName('handleDeleteIntegration').setParameters({
    integration
  }))).addButton(CardService.newTextButton().setText('Cancel').setOnClickAction(CardService.newAction().setFunctionName('showIntegrationSettings')))]);
  return card.addSection(confirmSection).build();
};

// Add handler functions for each integration
const handleSaveJiraSettings = e => {
  const {
    formInputs
  } = e.commonEventObject;
  constants_CONFIG.INTEGRATIONS.JIRA.fields.forEach(field => {
    var _formInputs$field$key;
    const value = (_formInputs$field$key = formInputs[field.key]) === null || _formInputs$field$key === void 0 || (_formInputs$field$key = _formInputs$field$key.stringInputs) === null || _formInputs$field$key === void 0 ? void 0 : _formInputs$field$key.value[0];
    if (value) {
      setProperty(constants_CONFIG.PROPERTIES[field.key], value);
    }
  });
  return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText('Jira settings saved successfully').setType(CardService.NotificationType.SUCCESS)).build();
};
const handleSaveSlackSettings = e => {
  const {
    formInputs
  } = e.commonEventObject;
  constants_CONFIG.INTEGRATIONS.SLACK.fields.forEach(field => {
    var _formInputs$field$key2;
    const value = (_formInputs$field$key2 = formInputs[field.key]) === null || _formInputs$field$key2 === void 0 || (_formInputs$field$key2 = _formInputs$field$key2.stringInputs) === null || _formInputs$field$key2 === void 0 ? void 0 : _formInputs$field$key2.value[0];
    if (value) {
      setProperty(constants_CONFIG.PROPERTIES[field.key], value);
    }
  });
  return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText('Slack settings saved successfully').setType(CardService.NotificationType.SUCCESS)).build();
};
const handleSaveOpenAISettings = e => {
  var _formInputs$OPENAI_AP;
  const {
    formInputs
  } = e.commonEventObject;
  const apiKey = (_formInputs$OPENAI_AP = formInputs.OPENAI_API_KEY) === null || _formInputs$OPENAI_AP === void 0 || (_formInputs$OPENAI_AP = _formInputs$OPENAI_AP.stringInputs) === null || _formInputs$OPENAI_AP === void 0 ? void 0 : _formInputs$OPENAI_AP.value[0];
  if (apiKey) {
    setProperty(constants_CONFIG.PROPERTIES.OPENAI_API_KEY, apiKey);
  }
  return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText('OpenAI settings saved successfully').setType(CardService.NotificationType.SUCCESS)).build();
};
const handleSaveNotionSettings = e => {
  var _formInputs$NOTION_AP, _formInputs$NOTION_DA;
  const {
    formInputs
  } = e.commonEventObject;
  const apiKey = (_formInputs$NOTION_AP = formInputs.NOTION_API_KEY) === null || _formInputs$NOTION_AP === void 0 || (_formInputs$NOTION_AP = _formInputs$NOTION_AP.stringInputs) === null || _formInputs$NOTION_AP === void 0 ? void 0 : _formInputs$NOTION_AP.value[0];
  const databaseId = (_formInputs$NOTION_DA = formInputs.NOTION_DATABASE_ID) === null || _formInputs$NOTION_DA === void 0 || (_formInputs$NOTION_DA = _formInputs$NOTION_DA.stringInputs) === null || _formInputs$NOTION_DA === void 0 ? void 0 : _formInputs$NOTION_DA.value[0];
  if (apiKey) {
    setProperty(constants_CONFIG.PROPERTIES.NOTION_API_KEY, apiKey);
  }
  if (databaseId) {
    setProperty(constants_CONFIG.PROPERTIES.NOTION_DATABASE_ID, databaseId);
  }
  return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText('Notion settings saved successfully').setType(CardService.NotificationType.SUCCESS)).build();
};
const testNotionSetup = async () => {
  try {
    const result = await checkNotionSetup();
    if (!result.success) {
      return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText(`Notion setup error: ${result.error}`).setType(CardService.NotificationType.ERROR)).build();
    }
    return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText('Notion setup verified successfully!').setType(CardService.NotificationType.SUCCESS)).build();
  } catch (error) {
    logger_logError('Test Notion Setup', error);
    return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText(`Failed to test Notion setup: ${error.message}`).setType(CardService.NotificationType.ERROR)).build();
  }
};
const testJiraSetup = async () => {
  try {
    const result = await checkJiraSetup();
    if (!result.success) {
      return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText(`Jira setup error: ${result.error}`).setType(CardService.NotificationType.ERROR)).build();
    }
    return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText('Jira setup verified successfully!').setType(CardService.NotificationType.SUCCESS)).build();
  } catch (error) {
    logger_logError('Test Jira Setup', error);
    return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText(`Failed to test Jira setup: ${error.message}`).setType(CardService.NotificationType.ERROR)).build();
  }
};
;// CONCATENATED MODULE: ./src/server/ui/settings-handlers.js




const handleDeleteIntegration = e => {
  const {
    integration
  } = e.parameters;
  logger_logInfo('Settings', `Deleting ${integration} integration`);
  try {
    if (!integration || !constants_CONFIG.INTEGRATIONS[integration]) {
      throw new Error(constants_CONFIG.ERROR_MESSAGES.INVALID_INTEGRATION);
    }

    // Get all property keys for this integration
    const propertiesToDelete = constants_CONFIG.INTEGRATIONS[integration].fields.map(field => constants_CONFIG.PROPERTIES[field.key]).filter(Boolean); // Remove any undefined/null values

    if (propertiesToDelete.length === 0) {
      throw new Error('No properties found to delete');
    }

    // Delete the properties
    const success = deleteProperties(propertiesToDelete);
    if (!success) {
      throw new Error(constants_CONFIG.ERROR_MESSAGES.DELETE_FAILED);
    }

    // Return success response
    return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().updateCard(createIntegrationSettingsCard())).setNotification(CardService.newNotification().setText(`${constants_CONFIG.INTEGRATIONS[integration].name} integration deleted successfully`).setType(CardService.NotificationType.INFO)).build();
  } catch (error) {
    logger_logError('Delete Integration Error', error);
    return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText(`Failed to delete integration: ${error.message}`).setType(CardService.NotificationType.ERROR)).build();
  }
};
const showDeleteConfirmation = e => {
  const {
    integration
  } = e.parameters;
  logger_logInfo('Settings', `Showing delete confirmation for ${integration}`);
  const card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader().setTitle(`Delete ${constants_CONFIG.INTEGRATIONS[integration].name} Integration`));

  // Add section directly to card instead of storing in variable
  return card.addSection(CardService.newCardSection().addWidget(CardService.newTextParagraph().setText(`Are you sure you want to delete the ${constants_CONFIG.INTEGRATIONS[integration].name} integration? ` + 'This will remove all settings.')).addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText('Delete').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor('#d93025').setOnClickAction(CardService.newAction().setFunctionName('handleDeleteIntegration').setParameters({
    integration
  }))).addButton(CardService.newTextButton().setText('Cancel').setOnClickAction(CardService.newAction().setFunctionName('showIntegrationSettings'))))).build();
};
;// CONCATENATED MODULE: ./src/server/integrations/slack.js



const getCategoryEmoji = category => {
  switch (category === null || category === void 0 ? void 0 : category.toLowerCase()) {
    case 'bug':
      return '🐛';
    case 'feature request':
      return '✨';
    case 'enhancement':
      return '🚀';
    case 'question':
      return '❓';
    case 'support':
      return '🆘';
    default:
      return '📝';
  }
};
const getPriorityEmoji = priority => {
  switch (priority === null || priority === void 0 ? void 0 : priority.toLowerCase()) {
    case 'high':
      return '🚨';
    case 'medium':
      return '🟡';
    case 'low':
      return '🟢';
    default:
      return '⚪';
  }
};
const formatTaskLinks = taskUrls => {
  if (!taskUrls || Object.keys(taskUrls).length === 0) return null;
  const links = Object.entries(taskUrls).map(([platform, url]) => {
    let emoji;
    let text;
    switch (platform.toLowerCase()) {
      case 'jira':
        emoji = '🎯';
        text = 'View Jira Issue';
        break;
      case 'notion':
        emoji = '📘';
        text = 'View Notion Page';
        break;
      default:
        emoji = '🔗';
        text = `View in ${platform}`;
    }
    return `${emoji} <${url}|${text}>`;
  });
  return links.join('\n');
};
const formatSlackMessage = params => {
  const categoryEmoji = getCategoryEmoji(params.category);
  const priorityEmoji = getPriorityEmoji(params.priority);
  const blocks = [{
    type: 'header',
    text: {
      type: 'plain_text',
      text: `${categoryEmoji} New ${params.category || 'Support'}`,
      emoji: true
    }
  }, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*${params.title}*`
    }
  }, {
    type: 'section',
    fields: [{
      type: 'mrkdwn',
      text: `*Priority*\n${priorityEmoji} ${params.priority || 'Medium'}`
    }, {
      type: 'mrkdwn',
      text: `*Category*\n${categoryEmoji} ${params.category || 'Support'}`
    }]
  }];

  // Add description if available (truncate if too long)
  if (params.description) {
    const truncatedDescription = params.description.length > 1000 ? `${params.description.substring(0, 1000)}...` : params.description;
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Details*\n${truncatedDescription}`
      }
    });
  }

  // Add task URLs if available
  if (params.taskUrls) {
    const taskLinks = formatTaskLinks(params.taskUrls);
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: taskLinks.split('\n').join('\n\n')
      }
    });
  }
  return blocks;
};
const sendSlackNotification = async params => {
  try {
    const webhookUrl = settings_getProperty(constants_CONFIG.PROPERTIES.SLACK_WEBHOOK_URL);
    if (!webhookUrl) {
      throw new Error(constants_CONFIG.ERROR_MESSAGES.MISSING_INTEGRATION('Slack'));
    }
    const blocks = formatSlackMessage(params);
    const response = await UrlFetchApp.fetch(webhookUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        blocks
      })
    });
    if (response.getResponseCode() !== 200) {
      throw new Error(`Slack API Error: ${response.getContentText()}`);
    }
    logger_logInfo('Slack Notification', {
      source: params.source,
      hasTaskUrls: !!params.taskUrls
    });
    return true;
  } catch (error) {
    logger_logError('Send Slack Notification Error', error);
    return false;
  }
};
;// CONCATENATED MODULE: ./src/server/templates/email-templates.js
const EMAIL_TEMPLATES = {
  IRRELEVANT_REQUEST: {
    plainText: `
      Thank you for your email. This is an automated response from MailFlow AI.
      
      To better assist you, please provide the following information:
      
      1. App Version
      2. Device Type and Model
      3. Operating System Version
      4. User ID or Support Code
      
      This information will help us investigate and resolve your issue more efficiently.
      
      Best regards,
      MailFlow AI
    `,
    htmlBody: `
      <p>Thank you for your email. This is an automated response from MailFlow AI.</p>
      <p>To better assist you, please provide the following information:</p>
      <ul>
        <li>App Version</li>
        <li>Device Type and Model</li>
        <li>Operating System Version</li>
        <li>User ID or Support Code</li>
      </ul>
      <p>This information will help us investigate and resolve your issue more efficiently.</p>
      <p>Best regards,<br>MailFlow AI</p>
    `
  },
  RELEVANT_REQUEST: {
    plainText: `
      Thank you for your email. This is an automated response from MailFlow AI.
      
      We have received your request and our team is looking into it.
      
      We appreciate the detailed information you've provided and will work on addressing 
      your request as quickly as possible. You'll receive updates as we make progress.
      
      Best regards,
      MailFlow AI
    `,
    htmlBody: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p>Thank you for your email. This is an automated response from MailFlow AI.</p>
        
        <p>We have received your request and our team is looking into it.</p>
        
        <p>We appreciate the detailed information you've provided and will work on addressing 
        your request as quickly as possible. You'll receive updates as we make progress.</p>
        
        <p>Best regards,<br>
        <strong>MailFlow AI</strong></p>
      </div>
    `
  }
};
;// CONCATENATED MODULE: ./src/server/workflows/customer-support.js











const createWorkflowTask = async (platform, params) => {
  try {
    var _result;
    let result;
    switch (platform.toLowerCase()) {
      case 'jira':
        try {
          result = await createJiraIssue(params);
        } catch (error) {
          logger_logError('Jira Task Creation Error', error);
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
        return {
          success: true
        };
      // Don't throw error for Slack
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
    if (!((_result = result) !== null && _result !== void 0 && _result.url)) {
      throw new Error(`Failed to create task in ${platform}`);
    }
    logger_logInfo('Task Creation', `Created ${platform.toLowerCase()} task for email`);
    return {
      success: true,
      url: result.url,
      taskId: result.id
    };
  } catch (error) {
    logger_logError('Create Task Error', error);
    return {
      success: false,
      error: error.message
    };
  }
};
const customer_support_processEmail = async (message, thread) => {
  try {
    const metadata = getMessageMetadata(message);
    const analysis = await openai_analyzeEmail(metadata.subject, metadata.body);
    const isAutoReplyEnabled = settings_getProperty(constants_CONFIG.PROPERTIES.AUTO_REPLY_ENABLED) === 'true';

    // Handle auto-reply based on relevance
    if (!analysis.relevant) {
      // Only send reply if auto-reply is enabled
      if (isAutoReplyEnabled) {
        await sendEmailReply(message, EMAIL_TEMPLATES.IRRELEVANT_REQUEST);
      }
      return {
        success: false,
        reason: analysis.reason || 'Email not relevant',
        autoReplied: isAutoReplyEnabled
      };
    }

    // Get platforms from AI analysis or fall back to configured ones
    let platformsToUse = [];

    // If AI suggests platforms, use those
    if (analysis.emailMetadata.platforms && analysis.emailMetadata.platforms.length > 0) {
      platformsToUse = analysis.emailMetadata.platforms.map(p => p.toLowerCase());
    } else {
      // Fallback to configured platforms
      platformsToUse = settings_getConfiguredPlatforms('CUSTOMER_SUPPORT');
    }
    const taskUrls = {};
    const errors = [];

    // Create tasks in all determined platforms (except Slack)
    await Promise.all(platformsToUse.map(async platform => {
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
            responseNeeded: analysis.emailMetadata.responseNeeded
          }),
          technicalDetails: JSON.stringify(analysis.technicalDetails)
        });
        if (result !== null && result !== void 0 && result.success && result !== null && result !== void 0 && result.url) {
          taskUrls[platform] = result.url;
          logger_logInfo('Task Creation', `Created ${platform.toLowerCase()} task for email`);
        } else if (result !== null && result !== void 0 && result.error) {
          errors.push(`${platform}: ${result.error}`);
        }
      } catch (error) {
        errors.push(`${platform}: ${error.message}`);
        logger_logError(`${platform} Task Creation Error`, error);
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
          taskUrls
        });
        logger_logInfo('Slack Notification', 'Sent notification with task URLs');
      } catch (error) {
        errors.push(`Slack: ${error.message}`);
        logger_logError('Slack Notification Error', error);
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
      autoReplied: isAutoReplyEnabled
    };
  } catch (error) {
    logger_logError('Process Email Error', error);
    throw error;
  }
};
const processCustomerSupportWorkflow = async () => {
  try {
    if (!validateWorkflowConfig('CUSTOMER_SUPPORT')) {
      return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().updateCard(createIntegrationSettingsCard())).setNotification(CardService.newNotification().setText('Please configure OpenAI and at least one task platform').setType(CardService.NotificationType.WARNING)).build();
    }
    const message = getCurrentMessage();
    if (!message) {
      return createErrorCard(constants_CONFIG.ERROR_MESSAGES.NO_EMAIL_SELECTED);
    }
    const thread = message.getThread();
    const result = await customer_support_processEmail(message, thread);
    if (!result.success) {
      return createErrorCard(result.reason);
    }
    return createWorkflowResultCard(result.analysis, getMessageMetadata(message));
  } catch (error) {
    logger_logError('Customer Support Workflow Error', error);
    return createErrorCard(error.message);
  }
};
;// CONCATENATED MODULE: ./src/server/ui/handlers.js





const createSetupGuideCard = () => {
  if (triggers_isDiscoveryEnabled()) {
    const card = CardService.newCardBuilder();
    card.setHeader(CardService.newCardHeader().setTitle('Email Discovery Active').setImageStyle(CardService.ImageStyle.SQUARE).setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/warning_black_24dp.png'));
    const warningSection = CardService.newCardSection().addWidget(CardService.newTextParagraph().setText('Email discovery is already active with hourly checks. ' + 'Please disable it first if you want to change settings.')).addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText('Disable Auto-Discovery').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor('#d93025').setOnClickAction(CardService.newAction().setFunctionName('disableDiscovery'))).addButton(CardService.newTextButton().setText('Back to Home').setOnClickAction(CardService.newAction().setFunctionName('onHomepage'))));
    return card.addSection(warningSection).build();
  }
  const card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader().setTitle('Auto-Discovery Setup Guide').setImageStyle(CardService.ImageStyle.SQUARE).setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/help_outline_black_24dp.png'));
  const guideSection = CardService.newCardSection().setHeader('📋 Required Steps').addWidget(CardService.newTextParagraph().setText('To complete auto-discovery setup, create a Gmail filter:')).addWidget(CardService.newTextParagraph().setText('1. Go to Gmail settings (⚙️) > "See all settings"')).addWidget(CardService.newTextParagraph().setText('2. Go to "Filters and Blocked Addresses" tab')).addWidget(CardService.newTextParagraph().setText('3. Click "Create a new filter"')).addWidget(CardService.newTextParagraph().setText('4. Set your conditions (e.g., from specific domains)')).addWidget(CardService.newTextParagraph().setText('5. Click "Create filter"')).addWidget(CardService.newTextParagraph().setText('6. In the actions:')).addWidget(CardService.newTextParagraph().setText('   • Check "Star it"')).addWidget(CardService.newTextParagraph().setText('   • Check "Apply label" and select "MailFlow: Discovery"')).addWidget(CardService.newTextParagraph().setText('7. Click "Create filter"')).addWidget(CardService.newDivider()).addWidget(CardService.newTextParagraph().setText('Emails matching your filter will be processed automatically based on your settings.'));
  const actionSection = CardService.newCardSection().addWidget(CardService.newTextButton().setText('Create Gmail Filter').setOpenLink(CardService.newOpenLink().setUrl('https://mail.google.com/mail/u/0/#settings/filters'))).addWidget(CardService.newDivider()).addWidget(CardService.newTextButton().setText('Enable Auto-Discovery').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setOnClickAction(CardService.newAction().setFunctionName('enableDiscovery')));
  return card.addSection(guideSection).addSection(actionSection).build();
};
const showSetupGuide = () => CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().pushCard(createSetupGuideCard())).build();
const enableDiscovery = () => {
  const success = createEmailTrigger();
  return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().updateCard(createHomeCard())).setNotification(CardService.newNotification().setText(success ? 'Auto-discovery enabled with hourly checks' : 'Failed to enable auto-discovery').setType(success ? CardService.NotificationType.SUCCESS : CardService.NotificationType.ERROR)).build();
};
const disableDiscovery = () => {
  const success = deleteEmailTrigger();
  if (success) {
    setProperty(constants_CONFIG.PROPERTIES.AUTO_REPLY_ENABLED, 'false');
  }
  return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().updateCard(createHomeCard())).setNotification(CardService.newNotification().setText(success ? 'Email discovery and auto-replies disabled' : 'Failed to disable email discovery').setType(success ? CardService.NotificationType.SUCCESS : CardService.NotificationType.ERROR)).build();
};
const toggleAutoReply = () => {
  try {
    if (!triggers_isDiscoveryEnabled) {
      return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText('Auto-reply requires Auto-Discovery to be enabled. Please enable Auto-Discovery first.').setType(CardService.NotificationType.WARNING)).setNavigation(CardService.newNavigation().pushCard(createSetupGuideCard())).build();
    }
    const currentValue = settings_getProperty(constants_CONFIG.PROPERTIES.AUTO_REPLY_ENABLED) === 'true';
    setProperty(constants_CONFIG.PROPERTIES.AUTO_REPLY_ENABLED, (!currentValue).toString());
    return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().updateCard(createHomeCard())).setNotification(CardService.newNotification().setText(!currentValue ? 'Smart replies enabled - AI will handle email responses' : 'Smart replies disabled - No automatic responses will be sent').setType(CardService.NotificationType.INFO)).build();
  } catch (error) {
    logger_logError('Toggle Auto-Reply Error', error);
    return createErrorCard(error.message);
  }
};
;// CONCATENATED MODULE: ./src/server/mail.js







// Helper functions for email analysis
const cleanSubject = subject => subject.replace(/^(Re|Fwd|FW|RE|FWD):\s*/i, '').trim();

// Error and success cards
const mail_createErrorCard = message => {
  const card = CardService.newCardBuilder();
  const section = CardService.newCardSection().addWidget(CardService.newTextParagraph().setText(`❌ ${message}`)).addWidget(CardService.newTextButton().setText('Back to Home').setOnClickAction(CardService.newAction().setFunctionName('onHomepage')));
  return card.addSection(section).build();
};

// MARK: Success card
const createSuccessCard = (message, taskUrl) => {
  const card = CardService.newCardBuilder();
  const section = CardService.newCardSection().addWidget(CardService.newTextParagraph().setText(`✅ ${message}`));
  if (taskUrl) {
    section.addWidget(CardService.newTextButton().setText('View Task').setOpenLink(CardService.newOpenLink().setUrl(taskUrl)));
  }
  section.addWidget(CardService.newTextButton().setText('Back to Home').setOnClickAction(CardService.newAction().setFunctionName('onHomepage')));
  return card.addSection(section).build();
};

// Helper function to get current message
const mail_getCurrentMessage = () => {
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
const setCurrentMessage = messageId => {
  PropertiesService.getUserProperties().setProperty('activeMessageId', messageId);
};

// Helper function to get icon based on sentiment
const getSentimentIcon = sentiment => {
  if (sentiment === 'Positive') return CardService.Icon.STAR;
  if (sentiment === 'Negative') return CardService.Icon.WARNING;
  return CardService.Icon.CLOCK;
};

// Helper function to get icon based on urgency
const getUrgencyIcon = urgencyLevel => {
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
const extractDueDate = body => {
  const datePatterns = [/due\s+by\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i, /deadline[:\s]+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i, /complete\s+by\s+(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/i];
  let foundDate = null;
  datePatterns.forEach(pattern => {
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
    documentation: /docs|documentation|guide|readme/i
  };
  const content = `${subject} ${body}`;
  const [category = 'general'] = Object.entries(categories).find(([, pattern]) => pattern.test(content)) || [];
  return category;
};
const extractMentions = body => {
  const emailPattern = /[\w.-]+@[\w.-]+\.\w+/g;
  const mentionPattern = /@[\w.-]+/g;
  const emailMatches = body.match(emailPattern) || [];
  const mentionMatches = body.match(mentionPattern) || [];
  return [...new Set([...emailMatches, ...mentionMatches])];
};
const extractLinks = htmlBody => {
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
  const sections = [{
    title: '📋 Task Details:',
    content: [`Priority: ${keyInfo.priority}`, keyInfo.dueDate ? `Due Date: ${keyInfo.dueDate}` : null, `Category: ${keyInfo.category}`, `Created from email by: ${sender}`, `Email Date: ${date.toISOString()}`].filter(Boolean)
  }, keyInfo.mentions.length > 0 && {
    title: '👥 Mentions:',
    content: keyInfo.mentions
  }, keyInfo.links.length > 0 && {
    title: '🔗 Related Links:',
    content: keyInfo.links
  }, {
    title: '📧 Email Content:',
    content: [plainBody.substring(0, 1500), plainBody.length > 1500 ? '... (truncated)' : ''].filter(Boolean)
  }].filter(Boolean);
  return sections.map(section => `${section.title}\n${section.content.join('\n')}`).join('\n\n');
};
const extractEmailContent = message => {
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
    links: extractLinks(htmlBody)
  };
  return formatDescription(plainBody, keyInfo, sender, date);
};

// Card creation functions
const createWelcomeCard = () => {
  const card = CardService.newCardBuilder();

  // Add header with overflow menu (3 dots)
  const header = CardService.newCardHeader().setTitle('Gmail Task Automation').setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/auto_awesome_black_24dp.png').setOverflowButton(CardService.newAction().setFunctionName('showSettingsCard').setParameters({
    source: 'overflow'
  }));

  // Add workflow section
  const workflowSection = CardService.newCardSection().setHeader('Workflows').addWidget(CardService.newTextButton().setText('📋 Customer Support Workflow').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setOnClickAction(CardService.newAction().setFunctionName('handleWorkflowSelection')));

  // Add quick actions section
  const actionsSection = CardService.newCardSection().setHeader('Quick Actions').addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText('Analyze Email').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setOnClickAction(CardService.newAction().setFunctionName('analyzeCurrentEmail'))).addButton(CardService.newTextButton().setText('Create Task').setOnClickAction(CardService.newAction().setFunctionName('showPlatformSelectionCard'))));

  // Add recent tasks preview
  const recentTasksSection = CardService.newCardSection().setHeader('Recent Tasks').addWidget(CardService.newTextButton().setText('View All Recent Tasks').setOnClickAction(CardService.newAction().setFunctionName('showRecentTasksCard')));
  return card.setHeader(header).addSection(workflowSection).addSection(actionsSection).addSection(recentTasksSection).build();
};
const createEmailActionsCard = message => {
  const card = CardService.newCardBuilder();
  const header = CardService.newCardHeader().setTitle('Create Task').setSubtitle(message.getSubject()).setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/task_alt_black_24dp.png');
  const taskSection = CardService.newCardSection().setHeader('Task Details').addWidget(CardService.newTextInput().setFieldName('taskTitle').setTitle('Title').setValue(message.getSubject())).addWidget(CardService.newTextInput().setFieldName('taskDescription').setTitle('Description').setMultiline(true).setValue(extractEmailContent(message))).addWidget(CardService.newSelectionInput().setFieldName('platform').setTitle('Create in').setType(CardService.SelectionInputType.RADIO_BUTTON).addItem('Notion', 'notion', true).addItem('Jira', 'jira', false));
  const actionSection = CardService.newCardSection().addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText('Create Task').setOnClickAction(CardService.newAction().setFunctionName('createTask').setParameters({
    messageId: message.getId()
  }))).addButton(CardService.newTextButton().setText('Cancel').setOnClickAction(CardService.newAction().setFunctionName('onHomepage'))));
  return card.setHeader(header).addSection(taskSection).addSection(actionSection).build();
};
const createAnalysisResultCard = analysis => {
  var _analysis$emailMetada;
  const card = CardService.newCardBuilder();

  // Header
  const header = CardService.newCardHeader().setTitle('Analysis Results').setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/analytics_black_24dp.png');

  // Summary section
  const summarySection = CardService.newCardSection().setHeader('📋 Summary').addWidget(CardService.newTextParagraph().setText(analysis.analysis.summary)).addWidget(CardService.newKeyValue().setTopLabel('Confidence').setContent(`${Math.round(analysis.emailMetadata.confidence * 100)}%`).setIcon(CardService.Icon.STAR));

  // Analysis details section
  const detailsSection = CardService.newCardSection().setHeader('🔍 Analysis').addWidget(CardService.newKeyValue().setTopLabel('Priority').setContent(analysis.emailMetadata.priority).setIcon(analysis.emailMetadata.priority === 'High' ? CardService.Icon.PRIORITY_HIGH : CardService.Icon.PRIORITY_LOW)).addWidget(CardService.newKeyValue().setTopLabel('Category').setContent(analysis.emailMetadata.category).setIcon(CardService.Icon.FOLDER)).addWidget(CardService.newKeyValue().setTopLabel('Sentiment').setContent(analysis.analysis.sentiment).setIcon(getSentimentIcon(analysis.analysis.sentiment))).addWidget(CardService.newKeyValue().setTopLabel('Urgency').setContent(`${analysis.analysis.urgency.level} - ${analysis.analysis.urgency.reason}`).setIcon(getUrgencyIcon(analysis.analysis.urgency.level)));

  // Recommended actions section
  const actionsSection = CardService.newCardSection().setHeader('🎯 Recommended Actions').addWidget(CardService.newTextParagraph().setText(`Primary Action: ${analysis.recommendedActions.primaryAction.actionType}\n` + `Reason: ${analysis.recommendedActions.primaryAction.reason}`));

  // Next steps section
  const stepsSection = CardService.newCardSection().setHeader('📝 Next Steps').addWidget(CardService.newTextParagraph().setText(analysis.nextSteps.map((step, index) => `${index + 1}. ${step.step}\n   Assignee: ${step.assignee} (~${step.timeEstimate})`).join('\n\n')));

  // Action buttons
  const platformsToUse = ((_analysis$emailMetada = analysis.emailMetadata.platforms) === null || _analysis$emailMetada === void 0 ? void 0 : _analysis$emailMetada.map(p => p.toLowerCase())) || getConfiguredPlatforms('CUSTOMER_SUPPORT');
  const buttonSection = CardService.newCardSection().setHeader('Available Actions');
  if (platformsToUse.length === 0) {
    buttonSection.addWidget(CardService.newTextParagraph().setText('⚠️ No task platforms configured. Please configure at least one platform in settings.')).addWidget(CardService.newTextButton().setText('Go to Settings').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setOnClickAction(CardService.newAction().setFunctionName('showIntegrationSettings')));
  } else {
    // Add button for each configured platform
    platformsToUse.forEach(platform => {
      var _getCurrentMessage, _getCurrentMessage2;
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
        emailId: ((_getCurrentMessage = mail_getCurrentMessage()) === null || _getCurrentMessage === void 0 ? void 0 : _getCurrentMessage.getId()) || '',
        threadId: ((_getCurrentMessage2 = mail_getCurrentMessage()) === null || _getCurrentMessage2 === void 0 || (_getCurrentMessage2 = _getCurrentMessage2.getThread()) === null || _getCurrentMessage2 === void 0 ? void 0 : _getCurrentMessage2.getId()) || '',
        sentiment: analysis.analysis.sentiment || 'neutral',
        responseNeeded: analysis.emailMetadata.responseNeeded || false
      };
      buttonSection.addWidget(CardService.newTextButton().setText(buttonText).setTextButtonStyle(CardService.TextButtonStyle.FILLED).setOnClickAction(CardService.newAction().setFunctionName('createTask').setParameters({
        platform,
        title: analysis.analysis.summary || 'Untitled Task',
        description: analysis.analysis.details || 'No description provided',
        priority: analysis.emailMetadata.priority || 'Medium',
        category: analysis.emailMetadata.category || 'Support',
        metadata: JSON.stringify(taskMetadata),
        technicalDetails: JSON.stringify(analysis.technicalDetails || null)
      })));
    });
  }

  // Add back button
  buttonSection.addWidget(CardService.newTextButton().setText('Back').setOnClickAction(CardService.newAction().setFunctionName('onHomepage')));
  return card.setHeader(header).addSection(summarySection).addSection(detailsSection).addSection(actionsSection).addSection(stepsSection).addSection(buttonSection).build();
};

// Gmail Add-on entry points
const onHomepage = () => createWelcomeCard();
const handleGmailTrigger = e => {
  const {
    messageId
  } = e.messageMetadata;
  setCurrentMessage(messageId);
  const message = GmailApp.getMessageById(messageId);
  return createEmailActionsCard(message);
};
const analyzeCurrentEmail = async e => {
  try {
    const {
      messageId
    } = e.messageMetadata;
    const message = GmailApp.getMessageById(messageId);
    if (!message) {
      return mail_createErrorCard('Could not find the selected email. Please try again.');
    }
    const analysis = await analyzeEmail(message.getSubject(), message.getPlainBody());
    if (!analysis || !analysis.summary) {
      return mail_createErrorCard('Failed to analyze email. Please try again or contact support.');
    }

    // Use the detailed analysis result card instead of building a new one
    return createAnalysisResultCard(analysis);
  } catch (error) {
    Logger.log(`Email analysis error: ${error.message}`);
    return mail_createErrorCard(`Failed to analyze email: ${error.message}`);
  }
};

// Legacy function - keeping for compatibility
const sendmail = () => {
  const email = Session.getActiveUser().getEmail();
  const htmlBody = '<p>Hello</p>';
  const textBody = htmlBody.replace(/<[^>]+>/g, ' ');
  GmailApp.sendEmail(email, 'Hello from Google Apps Script', textBody, {
    htmlBody
  });
  Logger.log(`Email message sent to ${email}`);
};
const handleIncomingEmail = async e => {
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
const ensureLabel = labelName => {
  try {
    let label = GmailApp.getUserLabelByName(labelName);
    if (!label) {
      label = GmailApp.createLabel(labelName);
    }
    return label;
  } catch (error) {
    logger_logError('Create Label Error', error);
    return null;
  }
};
const processNewEmails = async () => {
  try {
    if (!triggers_isDiscoveryEnabled()) {
      return;
    }
    const threads = GmailApp.search(`is:starred label:${constants_CONFIG.LABELS.DISCOVERY}`);
    logger_logInfo('Auto-Discovery', `Found ${threads.length} threads to process`);
    await Promise.all(threads.map(async thread => {
      const messages = thread.getMessages();
      await Promise.all(messages.map(async message => {
        if (!message.isStarred()) {
          return;
        }
        try {
          // Skip if message is from our own domain
          const userDomain = Session.getEffectiveUser().getEmail().split('@')[1];
          if (message.getFrom().includes(userDomain)) {
            return;
          }
          const result = await customer_support_processEmail(message, thread);

          // Always unstar the message as we've processed it
          message.unstar();
          if (result.success) {
            const processedLabel = ensureLabel(constants_CONFIG.LABELS.PROCESSED);
            if (processedLabel) {
              thread.addLabel(processedLabel);
            }
          } else {
            const skippedLabel = ensureLabel(constants_CONFIG.LABELS.SKIPPED);
            if (skippedLabel) {
              thread.addLabel(skippedLabel);
            }
          }
        } catch (error) {
          logger_logError('Message Processing Error', error);
        }
      }));
    }));
  } catch (error) {
    logger_logError('Process New Emails Error', error);
  }
};
;// CONCATENATED MODULE: ./src/index.js










// Declare functions in global scope
function src_onHomepage() {
  logger_logInfo('Homepage', 'Rendering home card');
  return createHomeCard();
}
function src_handleGmailTrigger(e) {
  const {
    messageId
  } = e.gmail;
  setProperty(constants_CONFIG.PROPERTIES.ACTIVE_MESSAGE_ID, messageId);
  return createHomeCard();
}
function src_analyzeCurrentEmail() {
  logger_logInfo('Email Analysis', 'Starting email analysis');
  return createAnalysisCard();
}
function handleCustomerSupportWorkflow() {
  logger_logInfo('Customer Support', 'Starting customer support workflow');
  return processCustomerSupportWorkflow();
}
function showSettingsCard() {
  logger_logInfo('Settings', 'Showing settings card');
  return createSettingsCard();
}
function showIntegrationSettings() {
  logger_logInfo('Settings', 'Showing integration settings');
  return createIntegrationSettingsCard();
}
function createTask(e) {
  const {
    platform,
    ...params
  } = e.parameters;
  return createWorkflowTask(platform, params);
}

// Export all functions


// Make functions available globally
__webpack_require__.g.onHomepage = src_onHomepage;
__webpack_require__.g.handleGmailTrigger = src_handleGmailTrigger;
__webpack_require__.g.analyzeCurrentEmail = src_analyzeCurrentEmail;
__webpack_require__.g.handleCustomerSupportWorkflow = handleCustomerSupportWorkflow;
__webpack_require__.g.showSettingsCard = showSettingsCard;
__webpack_require__.g.showIntegrationSettings = showIntegrationSettings;
__webpack_require__.g.createTask = createTask;
__webpack_require__.g.handleDeleteIntegration = handleDeleteIntegration;
__webpack_require__.g.showDeleteConfirmation = showDeleteConfirmation;

// Add settings handlers with correct names
__webpack_require__.g.onSaveOPENAISettings = e => {
  logger_logInfo('Settings', 'Saving OpenAI settings');
  return handleSaveOpenAISettings(e);
};
__webpack_require__.g.onSaveNOTIONSettings = e => {
  logger_logInfo('Settings', 'Saving Notion settings');
  return handleSaveNotionSettings(e);
};
__webpack_require__.g.onSaveJIRASettings = e => {
  logger_logInfo('Settings', 'Saving Jira settings');
  return handleSaveJiraSettings(e);
};
__webpack_require__.g.onSaveSLACKSettings = e => {
  logger_logInfo('Settings', 'Saving Slack settings');
  return handleSaveSlackSettings(e);
};

// Add to global exports
__webpack_require__.g.showDeleteConfirmation = showDeleteConfirmation;
__webpack_require__.g.testNotionSetup = testNotionSetup;
__webpack_require__.g.testJiraSetup = testJiraSetup;

// Add to global scope
__webpack_require__.g.processNewEmails = processNewEmails;

// Update globals
__webpack_require__.g.showSetupGuide = showSetupGuide;
__webpack_require__.g.enableDiscovery = enableDiscovery;
__webpack_require__.g.disableDiscovery = disableDiscovery;
__webpack_require__.g.toggleAutoReply = toggleAutoReply;
AppLib = __webpack_exports__;
/******/ })()
;