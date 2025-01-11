import { CONFIG } from '../config/constants';

export const createHeader = (title, subtitle = null) => {
  const header = CardService.newCardHeader()
    .setTitle(title)
    .setImageUrl(CONFIG.UI.ICONS.HOME);

  if (subtitle) {
    header.setSubtitle(subtitle);
  }

  return header;
};

export const createHeaderSection = (showSettings = true) => {
  if (!showSettings) return null;

  return CardService.newCardSection()
    .addWidget(
      CardService.newTextButton()
        .setText('Settings')
        .setOnClickAction(CardService.newAction().setFunctionName('showSettingsCard')),
    );
};

export const createActionButton = (text, functionName, parameters = {}, style = 'default') => {
  const button = CardService.newTextButton()
    .setText(text)
    .setOnClickAction(CardService.newAction().setFunctionName(functionName).setParameters(parameters));

  if (style === 'filled') {
    button.setTextButtonStyle(CardService.TextButtonStyle.FILLED);
  }

  return button;
};

export const createSection = (title = null, widgets = []) => {
  const section = CardService.newCardSection();

  if (title) {
    section.setHeader(title);
  }

  widgets.forEach((widget) => section.addWidget(widget));

  return section;
};

export const createKeyValueWidget = (label, content, icon = null) => {
  const widget = CardService.newKeyValue().setTopLabel(label).setContent(content);

  if (icon) {
    widget.setIcon(icon);
  }

  return widget;
};

export const createButtonSet = (buttons) => {
  const buttonSet = CardService.newButtonSet();
  buttons.forEach((button) => buttonSet.addButton(button));
  return buttonSet;
};
