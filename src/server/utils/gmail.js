import { CONFIG } from '../config/constants';
import { getProperty } from '../config/settings';
import { logError, logInfo } from './logger';

export const getCurrentMessage = () => {
  const messageId = getProperty(CONFIG.PROPERTIES.ACTIVE_MESSAGE_ID);
  if (!messageId) {
    throw new Error(CONFIG.ERROR_MESSAGES.NO_EMAIL_SELECTED);
  }

  const message = GmailApp.getMessageById(messageId);
  if (!message) {
    throw new Error(CONFIG.ERROR_MESSAGES.NO_EMAIL_SELECTED);
  }

  return message;
};

export const getMessageMetadata = (message) => ({
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
    inReplyTo: message.getHeader('In-Reply-To'),
  },
});

export const addLabel = async (messageId, labelName) => {
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

export const sendEmailReply = async (originalMessage, template) => {
  try {
    const metadata = getMessageMetadata(originalMessage);

    // Use Gmail's native reply functionality
    const thread = originalMessage.getThread();
    thread.reply(
      template.plainText.trim(),
      {
        htmlBody: template.htmlBody.trim(),
        name: CONFIG.APP.NAME,
      },
    );

    logInfo('Email Reply Sent', `Replied to ${metadata.subject || '(no subject)'}`);
    return true;
  } catch (error) {
    logError('Send Email Reply Error', error);
    return false;
  }
};
