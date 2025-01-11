import { isDiscoveryEnabled, createEmailTrigger, deleteEmailTrigger } from '../triggers';
import { createHomeCard } from './cards';

const createSetupGuideCard = () => {
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
      .setText('Emails matching your filter will be processed automatically every hour.'));

  const actionSection = CardService.newCardSection()
    .addWidget(CardService.newTextButton()
      .setText('Create Gmail Filter')
      .setOpenLink(CardService.newOpenLink()
        .setUrl('https://mail.google.com/mail/u/0/#settings/filters')))
    .addWidget(CardService.newTextButton()
      .setText('Enable Auto-Discovery')
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
      .setOnClickAction(CardService.newAction().setFunctionName('enableDiscovery')));

  return card
    .addSection(guideSection)
    .addSection(actionSection)
    .build();
};

export const toggleDiscovery = () => {
  const currentState = isDiscoveryEnabled();

  if (!currentState) {
    // Show guide first when enabling
    return CardService.newActionResponseBuilder()
      .setNavigation(CardService.newNavigation().pushCard(createSetupGuideCard()))
      .build();
  }

  // Handle disabling
  const success = deleteEmailTrigger();
  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(createHomeCard()))
    .setNotification(CardService.newNotification()
      .setText(success ? 'Auto-discovery disabled successfully' : 'Failed to disable auto-discovery')
      .setType(success ? CardService.NotificationType.SUCCESS : CardService.NotificationType.ERROR))
    .build();
};

export const enableDiscovery = () => {
  const success = createEmailTrigger();
  return CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(createHomeCard()))
    .setNotification(CardService.newNotification()
      .setText(success ? 'Auto-discovery enabled successfully' : 'Failed to enable auto-discovery')
      .setType(success ? CardService.NotificationType.SUCCESS : CardService.NotificationType.ERROR))
    .build();
};
