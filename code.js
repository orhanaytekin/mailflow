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
// Add settings handlers with correct names
function onSaveOPENAISettings(e) {
}
function onSaveNOTIONSettings(e) {
}
function onSaveJIRASettings(e) {
}
function onSaveSLACKSettings(e) {
}
// Add to global exports
function showDeleteConfirmation() {
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
  analyzeCurrentEmail: () => (/* binding */ analyzeCurrentEmail),
  createTask: () => (/* binding */ createTask),
  handleCustomerSupportWorkflow: () => (/* binding */ handleCustomerSupportWorkflow),
  handleDeleteIntegration: () => (/* reexport */ handleDeleteIntegration),
  handleGmailTrigger: () => (/* binding */ handleGmailTrigger),
  onHomepage: () => (/* binding */ onHomepage),
  showDeleteConfirmation: () => (/* reexport */ showDeleteConfirmation),
  showIntegrationSettings: () => (/* binding */ showIntegrationSettings),
  showSettingsCard: () => (/* binding */ showSettingsCard)
});

;// CONCATENATED MODULE: ./src/server/config/constants.js
const constants_CONFIG = {
  APP: {
    NAME: 'Gmail Task Automation',
    VERSION: '1.0.0',
    DESCRIPTION: 'Automate task creation from Gmail emails'
  },
  LABELS: {
    PROCESSED: 'Processed',
    CUSTOMER_SUPPORT: 'Customer-Support'
  },
  WORKFLOWS: {
    CUSTOMER_SUPPORT: {
      id: 'CUSTOMER_SUPPORT',
      name: 'Customer Support',
      description: 'Handle customer support requests and inquiries',
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
    MISSING_INTEGRATION: integration => `${integration} integration not configured. Please configure it in settings.`,
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
const logger_logError = (context, error) => {
  console.error(JSON.stringify({
    level: LOG_LEVEL.ERROR,
    context,
    error: error.message || error,
    timestamp: new Date().toISOString()
  }));
};
const logWarning = (context, message) => {
  console.warn(JSON.stringify({
    level: LOG_LEVEL.WARNING,
    context,
    message,
    timestamp: new Date().toISOString()
  }));
};
const logInfo = (context, message) => {
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
        logInfo('Settings', `Deleted property: ${key}`);
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
const getConfiguredPlatforms = workflowId => {
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
  threadId: message.getThread().getId(),
  subject: message.getSubject(),
  sender: message.getFrom(),
  recipient: message.getTo(),
  date: message.getDate(),
  body: message.getPlainBody(),
  hasAttachments: message.getAttachments().length > 0
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
;// CONCATENATED MODULE: ./src/server/integrations/openai.js



const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4';
const SYSTEM_PROMPT = `You are an AI assistant analyzing customer support emails. First determine if the email is 
relevant to customer support or app-related issues. If the email is empty, spam, or completely unrelated, respond with:
{
  "relevant": false,
  "reason": "Brief explanation why this email is not relevant"
}

For relevant emails, carefully extract ALL technical information, especially:
- Device information (iPhone model, Android device, etc.)
- OS versions (iOS version, Android version)
- App version numbers
- Any identifiers (AID, User ID, Device ID)
- Technical context from email signatures

Format response as a structured JSON with "relevant": true:
{
  "relevant": true,
  "analysis": {
    "summary": "Brief, clear summary focusing on the main request/issue",
    "details": "Detailed analysis including any context provided",
    "sentiment": "positive|neutral|negative"
  },
  "emailMetadata": {
    "priority": "High|Medium|Low",
    "category": "Bug|Feature Request|Question|Support",
    "responseNeeded": true|false
  },
  "technicalDetails": {
    "appVersion": "string or null",
    "deviceInfo": {
      "type": "string or null (e.g., 'iPhone', 'Android')",
      "model": "string or null (e.g., 'iPhone 11', 'Pixel 6')",
      "osVersion": "string or null (e.g., 'iOS 17.6.1')",
      "deviceId": "string or null"
    },
    "userIdentifiers": {
      "userId": "string or null",
      "aid": "string or null (e.g., '46AA6F08-451D-4E62-B9CE-D8C945848BEE')",
      "otherIds": []
    }
  }
}

Important:
1. ALWAYS extract technical information even if it appears in signatures or informal parts of the email
2. Look for version numbers in formats like x.x.x or standard version patterns
3. Parse device information from phrases like "Sent from my iPhone" or similar signatures
4. Include ALL identifiers found in the email, especially AID or User ID
5. If information is not found, use null instead of omitting the field

Example technical patterns to look for:
- "iPhone X, iOS 15.5"
- "App version 2.1.0"
- "AID: XXXXX-XXXXX-XXXXX"
- "Sent from my [Device]"
- "Version 3.0.0"
- "Build 123"
- "Device ID: XXXXX"

Extract any technical information like app versions, device details, and user IDs, even if they appear in 
different formats or locations in the email.`;
const analyzeEmail = async (subject, body) => {
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
      const analysis = JSON.parse(result.choices[0].message.content);

      // If email is not relevant, throw an error with the reason
      if (!analysis.relevant) {
        throw new Error(`Email skipped: ${analysis.reason}`);
      }
      logInfo('Email Analysis', `Analysis completed for: ${subject}`);
      logInfo('Email Analysis', `Analysis: ${JSON.stringify(analysis)}`);
      return analysis;
    } catch (parseError) {
      logger_logError('OpenAI Response Parse Error', parseError);
      throw new Error('Failed to parse AI response. Please try again.');
    }
  } catch (error) {
    logger_logError('Analyze Email Error', error);
    throw error;
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

  // Add header
  card.setHeader(components_createHeader('Gmail Task Automation', 'Automate your email workflows', false));

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
      const emailSection = components_createSection('Selected Email', [createKeyValueWidget('Subject', metadata.subject), createKeyValueWidget('From', metadata.sender), createKeyValueWidget('Date', metadata.date.toLocaleString())]);
      card.addSection(emailSection);
    }
  } catch (error) {
    const noEmailSection = components_createSection('No Email Selected', [CardService.newTextParagraph().setText('Please select an email to get started.')]);
    card.addSection(noEmailSection);
  }

  // Main workflow button
  const workflowSection = components_createSection('Quick Actions', [createActionButton('📋 Customer Support Workflow', 'handleCustomerSupportWorkflow', {}, 'filled'), createButtonSet([createActionButton('Analyze Email', 'analyzeCurrentEmail')])]);
  return card.addSection(workflowSection).build();
};
const createAnalysisCard = async () => {
  const card = CardService.newCardBuilder();
  try {
    const message = getCurrentMessage();
    const metadata = getMessageMetadata(message);
    const analysis = await analyzeEmail(metadata.subject, metadata.body);
    card.setHeader(components_createHeader('Email Analysis', metadata.subject));
    const summarySection = components_createSection('Summary', [CardService.newTextParagraph().setText(analysis.analysis.summary), createKeyValueWidget('Priority', analysis.emailMetadata.priority, analysis.emailMetadata.priority === 'High' ? CardService.Icon.PRIORITY_HIGH : CardService.Icon.DESCRIPTION), createKeyValueWidget('Category', analysis.emailMetadata.category, CardService.Icon.BOOKMARK)]);

    // Get configured platforms and create action section
    const configuredPlatforms = getConfiguredPlatforms('CUSTOMER_SUPPORT');
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
;// CONCATENATED MODULE: ./src/server/ui/settings.js



const createIntegrationSettingsCard = () => {
  const card = CardService.newCardBuilder();
  card.setHeader(components_createHeader('Integration Settings', null, false));

  // Create sections for each integration
  Object.entries(constants_CONFIG.INTEGRATIONS).forEach(([key, integration]) => {
    const section = components_createSection(`${integration.name} Settings`, [...integration.fields.map(field => CardService.newTextInput().setFieldName(field.key).setTitle(field.label).setValue(settings_getProperty(constants_CONFIG.PROPERTIES[field.key]) || '').setMultiline(false)), CardService.newButtonSet().addButton(CardService.newTextButton().setText(`Save ${integration.name} Settings`).setOnClickAction(CardService.newAction().setFunctionName(`onSave${key}Settings`).setParameters({
      source: 'settings'
    }))).addButton(CardService.newTextButton().setText('Delete').setTextButtonStyle(CardService.TextButtonStyle.TEXT).setOnClickAction(CardService.newAction().setFunctionName('showDeleteConfirmation').setParameters({
      integration: key
    })))]);
    card.addSection(section);
  });
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
;// CONCATENATED MODULE: ./src/server/ui/settings-handlers.js




const handleDeleteIntegration = e => {
  const {
    integration
  } = e.parameters;
  logInfo('Settings', `Deleting ${integration} integration`);
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
  logInfo('Settings', `Showing delete confirmation for ${integration}`);
  const card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader().setTitle(`Delete ${constants_CONFIG.INTEGRATIONS[integration].name} Integration`));

  // Add section directly to card instead of storing in variable
  return card.addSection(CardService.newCardSection().addWidget(CardService.newTextParagraph().setText(`Are you sure you want to delete the ${constants_CONFIG.INTEGRATIONS[integration].name} integration? ` + 'This will remove all settings.')).addWidget(CardService.newButtonSet().addButton(CardService.newTextButton().setText('Delete').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor('#d93025').setOnClickAction(CardService.newAction().setFunctionName('handleDeleteIntegration').setParameters({
    integration
  }))).addButton(CardService.newTextButton().setText('Cancel').setOnClickAction(CardService.newAction().setFunctionName('showIntegrationSettings'))))).build();
};
;// CONCATENATED MODULE: ./src/server/integrations/notion.js




const NOTION_API_URL = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';
const createNotionTask = async params => {
  try {
    const apiKey = settings_getProperty(constants_CONFIG.PROPERTIES.NOTION_API_KEY);
    const databaseId = settings_getProperty(constants_CONFIG.PROPERTIES.NOTION_DATABASE_ID);
    if (!apiKey || !databaseId) {
      logger_logError('Notion Task Creation', 'Missing configuration');
      return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().updateCard(createIntegrationSettingsCard())).setNotification(CardService.newNotification().setText('Please configure Notion integration first').setType(CardService.NotificationType.WARNING)).build();
    }
    const response = await UrlFetchApp.fetch(`${NOTION_API_URL}/pages`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json'
      },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        parent: {
          database_id: databaseId
        },
        properties: {
          Name: {
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
          'Email ID': {
            rich_text: [{
              text: {
                content: params.metadata.emailId
              }
            }]
          },
          'Thread ID': {
            rich_text: [{
              text: {
                content: params.metadata.threadId
              }
            }]
          }
        },
        children: [{
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{
              type: 'text',
              text: {
                content: params.description
              }
            }]
          }
        }]
      })
    });
    const result = JSON.parse(response.getContentText());
    if (result.error) {
      logger_logError('Notion API Error', result.error);
      throw new Error(result.error.message);
    }
    logInfo('Notion Task Created', `Task ID: ${result.id}`);
    return {
      id: result.id,
      url: result.url
    };
  } catch (error) {
    logger_logError('Create Notion Task Error', error);
    throw error;
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
;// CONCATENATED MODULE: ./src/server/integrations/jira.js



const JIRA_API_VERSION = '3';
const createJiraIssue = async ({
  title,
  description,
  priority,
  category,
  metadata
}) => {
  try {
    const domain = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_DOMAIN);
    const email = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_EMAIL);
    const apiToken = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_API_TOKEN);
    const projectKey = settings_getProperty(constants_CONFIG.PROPERTIES.JIRA_PROJECT_KEY);
    if (!domain || !email || !apiToken || !projectKey) {
      throw new Error(constants_CONFIG.ERROR_MESSAGES.MISSING_INTEGRATION('Jira'));
    }
    const response = await UrlFetchApp.fetch(`https://${domain}/rest/api/${JIRA_API_VERSION}/issue`, {
      method: 'post',
      headers: {
        Authorization: `Basic ${Utilities.base64Encode(`${email}:${apiToken}`)}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        fields: {
          project: {
            key: projectKey
          },
          summary: title,
          description: {
            type: 'doc',
            version: 1,
            content: [{
              type: 'paragraph',
              content: [{
                type: 'text',
                text: description
              }]
            }]
          },
          issuetype: {
            name: 'Task'
          },
          priority: {
            name: priority
          },
          labels: [category, 'email-automation'],
          customfield_10000: metadata.emailId,
          // Adjust field ID as needed
          customfield_10001: metadata.threadId // Adjust field ID as needed
        }
      })
    });
    const result = JSON.parse(response.getContentText());
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    return result;
  } catch (error) {
    logger_logError('Create Jira Issue Error', error);
    throw error;
  }
};
;// CONCATENATED MODULE: ./src/server/integrations/slack.js



const sendSlackNotification = async ({
  title,
  description,
  priority,
  category,
  metadata,
  taskUrl,
  technicalDetails
}) => {
  try {
    const webhookUrl = settings_getProperty(constants_CONFIG.PROPERTIES.SLACK_WEBHOOK_URL);
    const channel = settings_getProperty(constants_CONFIG.PROPERTIES.SLACK_CHANNEL);
    if (!webhookUrl) {
      throw new Error(constants_CONFIG.ERROR_MESSAGES.MISSING_INTEGRATION('Slack'));
    }
    const blocks = [{
      type: 'header',
      text: {
        type: 'plain_text',
        text: '📧 New Support Task Created',
        emoji: true
      }
    }, {
      type: 'section',
      fields: [{
        type: 'mrkdwn',
        text: `*Title:*\n${title}`
      }, {
        type: 'mrkdwn',
        text: `*Priority:*\n${priority}`
      }]
    }, {
      type: 'section',
      fields: [{
        type: 'mrkdwn',
        text: `*Category:*\n${category}`
      }, {
        type: 'mrkdwn',
        text: `*Email ID:*\n${metadata.emailId}`
      }]
    }];
    if (technicalDetails) {
      const techFields = [];
      if (technicalDetails.appVersion) {
        techFields.push({
          type: 'mrkdwn',
          text: `*App Version:*\n${technicalDetails.appVersion}`
        });
      }
      if (technicalDetails.deviceInfo) {
        const {
          deviceInfo
        } = technicalDetails;
        if (deviceInfo.type) techFields.push({
          type: 'mrkdwn',
          text: `*Device Type:*\n${deviceInfo.type}`
        });
        if (deviceInfo.model) techFields.push({
          type: 'mrkdwn',
          text: `*Device Model:*\n${deviceInfo.model}`
        });
        if (deviceInfo.osVersion) techFields.push({
          type: 'mrkdwn',
          text: `*OS Version:*\n${deviceInfo.osVersion}`
        });
        if (deviceInfo.deviceId) techFields.push({
          type: 'mrkdwn',
          text: `*Device ID:*\n${deviceInfo.deviceId}`
        });
      }
      if (technicalDetails.userIdentifiers) {
        const {
          userIdentifiers
        } = technicalDetails;
        if (userIdentifiers.userId) techFields.push({
          type: 'mrkdwn',
          text: `*User ID:*\n${userIdentifiers.userId}`
        });
        if (userIdentifiers.aid) techFields.push({
          type: 'mrkdwn',
          text: `*AID:*\n${userIdentifiers.aid}`
        });
      }
      for (let i = 0; i < techFields.length; i += 10) {
        blocks.push({
          type: 'section',
          fields: techFields.slice(i, i + 10)
        });
      }
    }
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Description:*\n${description}`
      }
    });
    if (taskUrl) {
      blocks.push({
        type: 'actions',
        elements: [{
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'View Task',
            emoji: true
          },
          url: taskUrl,
          style: 'primary'
        }]
      });
    }
    const response = await UrlFetchApp.fetch(webhookUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        channel,
        blocks
      })
    });
    if (response.getResponseCode() !== 200) {
      const error = response.getContentText();
      throw new Error(`Slack API Error: ${error}`);
    }
    return {
      id: new Date().getTime().toString(),
      url: null
    };
  } catch (error) {
    logger_logError('Send Slack Notification Error', error);
    throw error;
  }
};
;// CONCATENATED MODULE: ./src/server/workflows/customer-support.js










const createWorkflowResultCard = (analysis, metadata) => {
  const card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader().setTitle('Email Analysis').setSubtitle(metadata.subject));

  // Analysis Summary Section
  const summarySection = CardService.newCardSection().addWidget(CardService.newTextParagraph().setText(analysis.analysis.summary)).addWidget(CardService.newKeyValue().setTopLabel('Priority').setContent(analysis.emailMetadata.priority)).addWidget(CardService.newKeyValue().setTopLabel('Category').setContent(analysis.emailMetadata.category));

  // Technical Details Section (if available)
  if (analysis.technicalDetails) {
    const techSection = CardService.newCardSection().addWidget(CardService.newTextParagraph().setText('🔧 Technical Details'));
    if (analysis.technicalDetails.appVersion) {
      techSection.addWidget(CardService.newKeyValue().setTopLabel('App Version').setContent(analysis.technicalDetails.appVersion));
    }
    if (analysis.technicalDetails.deviceInfo) {
      const {
        deviceInfo
      } = analysis.technicalDetails;
      if (deviceInfo.type) {
        techSection.addWidget(CardService.newKeyValue().setTopLabel('Device Type').setContent(deviceInfo.type));
      }
      if (deviceInfo.model) {
        techSection.addWidget(CardService.newKeyValue().setTopLabel('Device Model').setContent(deviceInfo.model));
      }
      if (deviceInfo.osVersion) {
        techSection.addWidget(CardService.newKeyValue().setTopLabel('OS Version').setContent(deviceInfo.osVersion));
      }
    }
    if (analysis.technicalDetails.userIdentifiers) {
      const {
        userIdentifiers
      } = analysis.technicalDetails;
      if (userIdentifiers.aid) {
        techSection.addWidget(CardService.newKeyValue().setTopLabel('AID').setContent(userIdentifiers.aid));
      }
      if (userIdentifiers.userId) {
        techSection.addWidget(CardService.newKeyValue().setTopLabel('User ID').setContent(userIdentifiers.userId));
      }
    }
    card.addSection(techSection);
  }

  // Actions Section - Only show available integrations
  const configuredPlatforms = getConfiguredPlatforms('CUSTOMER_SUPPORT');
  const actionsSection = CardService.newCardSection().setHeader('Available Actions');
  if (configuredPlatforms.length === 0) {
    actionsSection.addWidget(CardService.newTextParagraph().setText('⚠️ No task platforms configured. Please configure at least one platform in settings.')).addWidget(CardService.newTextButton().setText('Go to Settings').setTextButtonStyle(CardService.TextButtonStyle.FILLED).setOnClickAction(CardService.newAction().setFunctionName('showIntegrationSettings')));
  } else {
    // Add button for each configured platform with descriptive text
    configuredPlatforms.forEach(platform => {
      const taskMetadata = {
        emailId: metadata.id || '',
        threadId: metadata.threadId || '',
        sentiment: analysis.analysis.sentiment || 'neutral',
        responseNeeded: analysis.emailMetadata.responseNeeded || false
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
};
const processCustomerSupportWorkflow = async () => {
  try {
    // Check if workflow is properly configured
    if (!validateWorkflowConfig('CUSTOMER_SUPPORT')) {
      logger_logError('Customer Support Workflow', 'Required integrations not configured');
      return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().updateCard(createIntegrationSettingsCard())).setNotification(CardService.newNotification().setText('Please configure OpenAI and at least one task platform').setType(CardService.NotificationType.WARNING)).build();
    }
    const message = getCurrentMessage();
    if (!message) {
      return createErrorCard(constants_CONFIG.ERROR_MESSAGES.NO_EMAIL_SELECTED);
    }
    const metadata = getMessageMetadata(message);
    logInfo('Customer Support Workflow', 'Starting email analysis');
    try {
      const analysis = await analyzeEmail(metadata.subject, metadata.body);
      logInfo('Customer Support Workflow', JSON.stringify(analysis));
      if (!analysis || !analysis.analysis) {
        logger_logError('Customer Support Workflow', 'Invalid analysis response');
        return createErrorCard(constants_CONFIG.ERROR_MESSAGES.ANALYSIS_FAILED);
      }

      // Show analysis results and platform selection
      return createWorkflowResultCard(analysis, metadata);
    } catch (error) {
      if (error.message.startsWith('Email skipped:')) {
        return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText(error.message).setType(CardService.NotificationType.INFO)).build();
      }
      throw error;
    }
  } catch (error) {
    logger_logError('Customer Support Workflow', error);
    return createErrorCard(error.message);
  }
};
const createWorkflowTask = async (platform, params) => {
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
      logger_logError('Parse Error', error);
      metadata = {};
      technicalDetails = null;
    }
    const taskParams = {
      title: params.title || 'Untitled Task',
      description: params.description || 'No description provided',
      priority: params.priority || 'Medium',
      category: params.category || 'Support',
      metadata,
      technicalDetails
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
          taskUrl: null
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
          taskUrl: result.url
        });
      } catch (error) {
        logger_logError('Slack Notification Error', error);
        // Don't fail the main task creation
      }
    }
    logInfo('Task Creation', `Task created in ${platform}: ${result.id}`);
    return CardService.newActionResponseBuilder().setNavigation(CardService.newNavigation().popToRoot()).setNotification(CardService.newNotification().setText(`Successfully sent to ${constants_CONFIG.INTEGRATIONS[platform.toUpperCase()].name}`).setType(CardService.NotificationType.SUCCESS)).build();
  } catch (error) {
    logger_logError('Create Task Error', error);
    return CardService.newActionResponseBuilder().setNotification(CardService.newNotification().setText(error.message).setType(CardService.NotificationType.ERROR)).build();
  }
};
;// CONCATENATED MODULE: ./src/index.js








// Declare functions in global scope
function onHomepage() {
  logInfo('Homepage', 'Rendering home card');
  return createHomeCard();
}
function handleGmailTrigger(e) {
  const {
    messageId
  } = e.gmail;
  setProperty(constants_CONFIG.PROPERTIES.ACTIVE_MESSAGE_ID, messageId);
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
  const {
    platform,
    ...params
  } = e.parameters;
  return createWorkflowTask(platform, params);
}

// Export all functions


// Make functions available globally
__webpack_require__.g.onHomepage = onHomepage;
__webpack_require__.g.handleGmailTrigger = handleGmailTrigger;
__webpack_require__.g.analyzeCurrentEmail = analyzeCurrentEmail;
__webpack_require__.g.handleCustomerSupportWorkflow = handleCustomerSupportWorkflow;
__webpack_require__.g.showSettingsCard = showSettingsCard;
__webpack_require__.g.showIntegrationSettings = showIntegrationSettings;
__webpack_require__.g.createTask = createTask;
__webpack_require__.g.handleDeleteIntegration = handleDeleteIntegration;

// Add settings handlers with correct names
__webpack_require__.g.onSaveOPENAISettings = e => {
  logInfo('Settings', 'Saving OpenAI settings');
  return handleSaveOpenAISettings(e);
};
__webpack_require__.g.onSaveNOTIONSettings = e => {
  logInfo('Settings', 'Saving Notion settings');
  return handleSaveNotionSettings(e);
};
__webpack_require__.g.onSaveJIRASettings = e => {
  logInfo('Settings', 'Saving Jira settings');
  return handleSaveJiraSettings(e);
};
__webpack_require__.g.onSaveSLACKSettings = e => {
  logInfo('Settings', 'Saving Slack settings');
  return handleSaveSlackSettings(e);
};

// Add to global exports
__webpack_require__.g.showDeleteConfirmation = showDeleteConfirmation;
AppLib = __webpack_exports__;
/******/ })()
;