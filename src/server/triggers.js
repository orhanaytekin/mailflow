import { logError, logInfo } from './utils/logger';
import { getProperty, setProperty } from './config/settings';
import { CONFIG } from './config/constants';

const TRIGGER_FUNCTION_NAME = 'processNewEmails';
const DISCOVERY_ENABLED_KEY = 'autoDiscoveryEnabled';

export const isDiscoveryEnabled = () => getProperty(DISCOVERY_ENABLED_KEY) === 'true';

export const deleteEmailTrigger = () => {
  try {
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach((trigger) => {
      if (trigger.getHandlerFunction() === TRIGGER_FUNCTION_NAME) {
        ScriptApp.deleteTrigger(trigger);
      }
    });
    setProperty(DISCOVERY_ENABLED_KEY, 'false');
    logInfo('Triggers', 'Email discovery trigger deleted');
    return true;
  } catch (error) {
    logError('Delete Trigger Error', error);
    return false;
  }
};

export const createEmailTrigger = () => {
  try {
    // Delete existing triggers first
    deleteEmailTrigger();

    // Create a time-based trigger that runs every hour
    ScriptApp.newTrigger(TRIGGER_FUNCTION_NAME)
      .timeBased()
      .everyHours(1)
      .create();

    // Create the label if it doesn't exist
    let label = GmailApp.getUserLabelByName(CONFIG.LABELS.DISCOVERY);
    if (!label) {
      label = GmailApp.createLabel(CONFIG.LABELS.DISCOVERY);
    }

    setProperty(DISCOVERY_ENABLED_KEY, 'true');
    logInfo('Triggers', 'Email discovery trigger created');
    return true;
  } catch (error) {
    logError('Create Trigger Error', error);
    return false;
  }
};
