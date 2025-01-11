import { CONFIG } from '../config/constants';
import { createHeader, createSection, createActionButton } from './components';
import { getProperty, setProperty } from '../config/settings';

export const createIntegrationSettingsCard = () => {
  const card = CardService.newCardBuilder();
  card.setHeader(createHeader('Integration Settings', null, false));

  // Create sections for each integration
  Object.entries(CONFIG.INTEGRATIONS).forEach(([key, integration]) => {
    const section = createSection(`${integration.name} Settings`, [
      ...integration.fields.map((field) => CardService.newTextInput()
        .setFieldName(field.key)
        .setTitle(field.label)
        .setValue(getProperty(CONFIG.PROPERTIES[field.key]) || '')
        .setMultiline(false)),
      CardService.newButtonSet()
        .addButton(
          CardService.newTextButton()
            .setText(`Save ${integration.name} Settings`)
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName(`onSave${key}Settings`)
                .setParameters({ source: 'settings' }),
            ),
        )
        .addButton(
          CardService.newTextButton()
            .setText('Delete')
            .setTextButtonStyle(CardService.TextButtonStyle.TEXT)
            .setOnClickAction(
              CardService.newAction()
                .setFunctionName('showDeleteConfirmation')
                .setParameters({ integration: key }),
            ),
        ),
    ]);
    card.addSection(section);
  });

  return card
    .addSection(createSection(null, [createActionButton('Back', 'showSettingsCard')]))
    .build();
};

// Add delete confirmation dialog
export const createDeleteConfirmationCard = (e) => {
  const { integration } = e.parameters;
  const card = CardService.newCardBuilder();

  card.setHeader(createHeader('Confirm Delete', null, false));

  const confirmSection = createSection(null, [
    CardService.newTextParagraph()
      .setText(
        `Are you sure you want to delete the ${CONFIG.INTEGRATIONS[integration].name} `
        + 'integration settings? This cannot be undone.',
      ),
    CardService.newButtonSet()
      .addButton(
        CardService.newTextButton()
          .setText('Delete')
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
          .setBackgroundColor(CONFIG.UI.COLORS.ERROR)
          .setOnClickAction(
            CardService.newAction()
              .setFunctionName('handleDeleteIntegration')
              .setParameters({ integration }),
          ),
      )
      .addButton(
        CardService.newTextButton()
          .setText('Cancel')
          .setOnClickAction(
            CardService.newAction()
              .setFunctionName('showIntegrationSettings'),
          ),
      ),
  ]);

  return card.addSection(confirmSection).build();
};

// Add handler functions for each integration
export const handleSaveJiraSettings = (e) => {
  const { formInputs } = e.commonEventObject;
  CONFIG.INTEGRATIONS.JIRA.fields.forEach((field) => {
    const value = formInputs[field.key]?.stringInputs?.value[0];
    if (value) {
      setProperty(CONFIG.PROPERTIES[field.key], value);
    }
  });

  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification()
      .setText('Jira settings saved successfully')
      .setType(CardService.NotificationType.SUCCESS))
    .build();
};

export const handleSaveSlackSettings = (e) => {
  const { formInputs } = e.commonEventObject;
  CONFIG.INTEGRATIONS.SLACK.fields.forEach((field) => {
    const value = formInputs[field.key]?.stringInputs?.value[0];
    if (value) {
      setProperty(CONFIG.PROPERTIES[field.key], value);
    }
  });

  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification()
      .setText('Slack settings saved successfully')
      .setType(CardService.NotificationType.SUCCESS))
    .build();
};

export const handleSaveOpenAISettings = (e) => {
  const { formInputs } = e.commonEventObject;
  const apiKey = formInputs.OPENAI_API_KEY?.stringInputs?.value[0];
  if (apiKey) {
    setProperty(CONFIG.PROPERTIES.OPENAI_API_KEY, apiKey);
  }

  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification()
      .setText('OpenAI settings saved successfully')
      .setType(CardService.NotificationType.SUCCESS))
    .build();
};

export const handleSaveNotionSettings = (e) => {
  const { formInputs } = e.commonEventObject;
  const apiKey = formInputs.NOTION_API_KEY?.stringInputs?.value[0];
  const databaseId = formInputs.NOTION_DATABASE_ID?.stringInputs?.value[0];

  if (apiKey) {
    setProperty(CONFIG.PROPERTIES.NOTION_API_KEY, apiKey);
  }
  if (databaseId) {
    setProperty(CONFIG.PROPERTIES.NOTION_DATABASE_ID, databaseId);
  }

  return CardService.newActionResponseBuilder()
    .setNotification(CardService.newNotification()
      .setText('Notion settings saved successfully')
      .setType(CardService.NotificationType.SUCCESS))
    .build();
};
