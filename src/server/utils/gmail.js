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
  threadId: message.getThread().getId(),
  subject: message.getSubject(),
  sender: message.getFrom(),
  recipient: message.getTo(),
  date: message.getDate(),
  body: message.getPlainBody(),
  hasAttachments: message.getAttachments().length > 0,
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

export const sendEmailReply = async (message, replyContent) => {
  try {
    const thread = message.getThread();
    const replyTo = message.getFrom();
    const subject = message.getSubject();

    // Create reply with proper threading
    GmailApp.sendEmail(
      replyTo,
      subject.startsWith('Re:') ? subject : `Re: ${subject}`,
      replyContent.plainText,
      {
        htmlBody: replyContent.htmlBody,
        threadId: thread.getId(),
        replyTo: Session.getEffectiveUser().getEmail(),
        name: CONFIG.APP.NAME,
      },
    );

    logInfo('Auto-Reply', `Sent reply to: ${replyTo}`);
    return true;
  } catch (error) {
    logError('Send Reply Error', error);
    return false;
  }
};
