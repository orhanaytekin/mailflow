import { isDiscoveryEnabled, createEmailTrigger, deleteEmailTrigger } from '../triggers';
import { createHomeCard, createErrorCard } from './cards';
import { getProperty, setProperty } from '../config/settings';
import { logError } from '../utils/logger';
import { CONFIG } from '../config/constants';

const createSetupGuideCard = () => {
  if (isDiscoveryEnabled()) {
    const card = CardService.newCardBuilder();
    card.setHeader(CardService.newCardHeader()
      .setTitle('Auto-Discovery Already Enabled')
      .setImageStyle(CardService.ImageStyle.SQUARE)
      .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/warning_black_24dp.png'));

    const warningSection = CardService.newCardSection()
      .addWidget(CardService.newTextParagraph()
        .setText(
          'Auto-discovery is already enabled with hourly checks. '
          + 'Please disable it first if you want to change settings.',
        ))
      .addWidget(CardService.newButtonSet()
        .addButton(CardService.newTextButton()
          .setText('Disable Auto-Discovery')
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
          .setBackgroundColor('#d93025')
          .setOnClickAction(CardService.newAction().setFunctionName('disableDiscovery')))
        .addButton(CardService.newTextButton()
          .setText('Back to Home')
          .setOnClickAction(CardService.newAction().setFunctionName('onHomepage'))));

    return card.addSection(warningSection).build();
  }

  const card = CardService.newCardBuilder();

  card.setHeader(CardService.newCardHeader()
    .setTitle('Auto-Discovery Setup Guide')
    .setImageStyle(CardService.ImageStyle.SQUARE)
    .setImageUrl('https://www.gstatic.com/images/icons/material/system/1x/help_outline_black_24dp.png'));

  const guideSection = CardService.newCardSection()
    .setHeader('📋 Required Steps')
    .addWidget(CardService.newTextParagraph()
      .setText('To complete auto-discovery setup, create a Gmail filter:'))
    .addWidget(CardService.newTextParagraph()
      .setText('1. Go to Gmail settings (⚙️) > "See all settings"'))
    .addWidget(CardService.newTextParagraph()
      .setText('2. Go to "Filters and Blocked Addresses" tab'))
    .addWidget(CardService.newTextParagraph()
      .setText('3. Click "Create a new filter"'))
    .addWidget(CardService.newTextParagraph()
      .setText('4. Set your conditions (e.g., from specific domains)'))
    .addWidget(CardService.newTextParagraph()
      .setText('5. Click "Create filter"'))
    .addWidget(CardService.newTextParagraph()
      .setText('6. In the actions:'))
    .addWidget(CardService.newTextParagraph()
      .setText('   • Check "Star it"'))
    .addWidget(CardService.newTextParagraph()
      .setText('   • Check "Apply label" and select "Auto-Discovery"'))
    .addWidget(CardService.newTextParagraph()
      .setText('7. Click "Create filter"'))
    .addWidget(CardService.newDivider())
    .addWidget(CardService.newTextParagraph()
      .setText('Emails matching your filter will be processed automatically based on your settings.'));

  const actionSection = CardService.newCardSection()
    .addWidget(CardService.newTextButton()
      .setText('Create Gmail Filter')
      .setOpenLink(CardService.newOpenLink()
        .setUrl('https://mail.google.com/mail/u/0/#settings/filters')))
    .addWidget(CardService.newDivider())
    .addWidget(CardService.newTextButton()
      .setText('Enable Auto-Discovery')
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
      .setOnClickAction(CardService.newAction().setFunctionName('enableDiscovery')));

  return card
    .addSection(guideSection)
    .addSection(actionSection)
    .build();
};

export const showSetupGuide = () => CardService.newActionResponseBuilder()
  .setNavigation(CardService.newNavigation().pushCard(createSetupGuideCard()))
  .build();

export const enableDiscovery = () => {
  const success = createEmailTrigger();
  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(createHomeCard()))
    .setNotification(CardService.newNotification()
      .setText(success ? 'Auto-discovery enabled with hourly checks' : 'Failed to enable auto-discovery')
      .setType(success ? CardService.NotificationType.SUCCESS : CardService.NotificationType.ERROR))
    .build();
};

export const disableDiscovery = () => {
  const success = deleteEmailTrigger();
  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(createHomeCard()))
    .setNotification(CardService.newNotification()
      .setText(success ? 'Auto-discovery disabled' : 'Failed to disable auto-discovery')
      .setType(success ? CardService.NotificationType.SUCCESS : CardService.NotificationType.ERROR))
    .build();
};

export const toggleAutoReply = () => {
  try {
    if (!isDiscoveryEnabled) {
      return CardService.newActionResponseBuilder()
        .setNotification(CardService.newNotification()
          .setText('Auto-reply requires Auto-Discovery to be enabled. Please enable Auto-Discovery first.')
          .setType(CardService.NotificationType.WARNING))
        .setNavigation(CardService.newNavigation().pushCard(createSetupGuideCard()))
        .build();
    }

    const currentValue = getProperty(CONFIG.PROPERTIES.AUTO_REPLY_ENABLED) === 'true';
    setProperty(CONFIG.PROPERTIES.AUTO_REPLY_ENABLED, (!currentValue).toString());

    return CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation().updateCard(createHomeCard()))
      .setNotification(CardService.newNotification()
        .setText(!currentValue
          ? 'Auto-reply enabled - Will send automatic responses to emails'
          : 'Auto-reply disabled - No automatic responses will be sent')
        .setType(CardService.NotificationType.INFO))
      .build();
  } catch (error) {
    logError('Toggle Auto-Reply Error', error);
    return createErrorCard(error.message);
  }
};
