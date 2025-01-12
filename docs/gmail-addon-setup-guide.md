# Gmail Add-on Setup Guide

## Prerequisites

- Google account with access to Google Cloud Console
- Basic understanding of JavaScript
- Access to [Google Apps Script](https://script.google.com)

## Creating New Project

### Method 1: Direct from Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click "+ New project"
3. Name your project (e.g., "MailFlow AI")

### Method 2: From Google Drive

1. Go to [drive.google.com](https://drive.google.com)
2. Click "New" > "More" > "Google Apps Script"
3. Name your project

## Project Configuration

### 1. Create manifest file (appsscript.json)

```json
{
"timeZone": "Your/Timezone",
"dependencies": {
"enabledAdvancedServices": [{
"userSymbol": "Gmail",
"serviceId": "gmail",
"version": "v1"
}]
},
"gmail": {
"name": "MailFlow AI",
"logoUrl": "https://your-logo-url.png",
"contextualTriggers": [{
"unconditional": {},
"onTriggerFunction": "handleGmailTrigger"
}],
"primaryColor": "#1e8e3e",
"secondaryColor": "#d93025",
"version": "LATEST_VERSION",
"openLinkUrlPrefixes": [
"https://notion.so/",
"https://jira.com/",
"https://slack.com/"
    ]
    },
    "exceptionLogging": "STACKDRIVER",
    "runtimeVersion": "V8"
}
```

### 2. Create Initial Code Structure (Code.gs)

```javascript
function onHomepage(e) {
// Initial homepage card
return createHomepageCard();
}
function createHomepageCard() {
const card = CardService.newCardBuilder();
// Add UI elements here
return card.build();
}
function handleGmailTrigger(e) {
// Handle Gmail events
console.log('Gmail trigger activated');
}
```

## Enable Required Services

### 1. Enable Gmail Service

1. In Apps Script editor, click "Services" (+ icon)
2. Scroll to find "Gmail API"
3. Click "Add"
4. Click "OK"

### Required OAuth Scopes

Make sure the following scopes are included in your manifest:

```json
{
  "oauthScopes": [
    "https://www.googleapis.com/auth/gmail.addons.execute",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.labels",
    "https://www.googleapis.com/auth/script.external_request"
  ]
}
```

These scopes are required for:

- Reading email content
- Sending auto-replies
- Managing labels
- Making API calls to external services

### 2. Enable Advanced Gmail Service

1. Click "Services" (+ icon)
2. Find and enable "Gmail Advanced Service"
3. Version: v1

## Test Deployment Setup

### 1. Create Test Deployment

1. Click "Deploy" > "New deployment"
2. Choose "Test deployment"
3. Configure OAuth consent screen when prompted:
   - Add test users
   - Set application name
   - Add necessary scopes

### 2. Test in Gmail

1. Go to Gmail
2. Look for your add-on in the right sidebar
3. Verify basic functionality

## Troubleshooting

### Common Issues

1. **Permissions Errors**
   - Verify Gmail API is enabled
   - Check OAuth scopes in manifest
   - Ensure test user is added

2. **Deployment Failures**
   - Verify manifest syntax
   - Check function names match triggers
   - Validate all required services are enabled

3. **Trigger Issues**
   - Verify function names in manifest
   - Check logs for errors
   - Ensure triggers are properly configured

## Next Steps

1. Implement UI components using Card Service
2. Add integration code for Notion/Jira
3. Set up Slack notifications
4. Test with various email scenarios
5. Prepare for production deployment

## Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Gmail Add-on Documentation](https://developers.google.com/gmail/add-ons)
- [Card Service Reference](https://developers.google.com/apps-script/reference/card-service)
