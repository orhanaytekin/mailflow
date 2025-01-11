import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';
import { deleteProperties } from '../config/settings';
import { createIntegrationSettingsCard } from './settings';

export const handleDeleteIntegration = (e) => {
  const { integration } = e.parameters;
  logInfo('Settings', `Deleting ${integration} integration`);

  try {
    if (!integration || !CONFIG.INTEGRATIONS[integration]) {
      throw new Error(CONFIG.ERROR_MESSAGES.INVALID_INTEGRATION);
    }

    // Get all property keys for this integration
    const propertiesToDelete = CONFIG.INTEGRATIONS[integration].fields
      .map((field) => CONFIG.PROPERTIES[field.key])
      .filter(Boolean); // Remove any undefined/null values

    if (propertiesToDelete.length === 0) {
      throw new Error('No properties found to delete');
    }

    // Delete the properties
    const success = deleteProperties(propertiesToDelete);
    if (!success) {
      throw new Error(CONFIG.ERROR_MESSAGES.DELETE_FAILED);
    }

    // Return success response
    return CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation().updateCard(createIntegrationSettingsCard()))
      .setNotification(CardService.newNotification()
        .setText(`${CONFIG.INTEGRATIONS[integration].name} integration deleted successfully`)
        .setType(CardService.NotificationType.INFO))
      .build();
  } catch (error) {
    logError('Delete Integration Error', error);
    return CardService.newActionResponseBuilder()
      .setNotification(CardService.newNotification()
        .setText(`Failed to delete integration: ${error.message}`)
        .setType(CardService.NotificationType.ERROR))
      .build();
  }
};

export const showDeleteConfirmation = (e) => {
  const { integration } = e.parameters;
  logInfo('Settings', `Showing delete confirmation for ${integration}`);

  const card = CardService.newCardBuilder();
  card.setHeader(CardService.newCardHeader()
    .setTitle(`Delete ${CONFIG.INTEGRATIONS[integration].name} Integration`));

  // Add section directly to card instead of storing in variable
  return card
    .addSection(
      CardService.newCardSection()
        .addWidget(CardService.newTextParagraph()
          .setText(
            `Are you sure you want to delete the ${CONFIG.INTEGRATIONS[integration].name} integration? `
            + 'This will remove all settings.',
          ))
        .addWidget(CardService.newButtonSet()
          .addButton(CardService.newTextButton()
            .setText('Delete')
            .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
            .setBackgroundColor('#d93025')
            .setOnClickAction(CardService.newAction()
              .setFunctionName('handleDeleteIntegration')
              .setParameters({ integration })))
          .addButton(CardService.newTextButton()
            .setText('Cancel')
            .setOnClickAction(CardService.newAction()
              .setFunctionName('showIntegrationSettings')))),
    )
    .build();
};
