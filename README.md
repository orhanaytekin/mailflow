# Gmail Task Automation Add-on

A Gmail Add-on that automatically creates tasks in Notion/Jira from emails with Slack notifications.

## Features

- Create tasks from emails in Notion or Jira
- Intelligent email content analysis
- Automatic priority detection
- Due date extraction
- Category classification
- Slack notifications
- Recent tasks view
- Email labeling

## Prerequisites

1. Node.js and npm installed
2. Google Cloud Project with Gmail API enabled
3. Google Apps Script project
4. Notion API access (for Notion integration)
5. Jira API access (for Jira integration)
6. Slack Webhook URL (for notifications)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/orhanaytekin/emailman.git
cd emailman
```

2. Install dependencies:

```bash
npm install
```

3. Login to Google Apps Script:

```bash
npx clasp login
```

4. Create a new Google Apps Script project:

```bash
npx clasp create --type webapp
```

5. Enable the Gmail API in Google Cloud Console:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Enable Gmail API
   - Configure OAuth consent screen
   - Create credentials (OAuth 2.0 Client ID)

6. Configure external service integrations:
   - Get Notion API key and database ID
   - Set up Jira API token and project
   - Create Slack webhook

## Development

1. Start development server:

```bash
npm run watch
```

2. Make changes to files in `src/` directory

3. Build the project:

```bash
npm run build
```

4. Deploy to Google Apps Script:

```bash
npm run deploy
```

## Configuration

After deployment, configure the add-on:

1. Open Gmail
2. Find the add-on in the right sidebar
3. Click "Configure Integrations"
4. Enter your API keys and settings:
   - Notion API Token & Database ID
   - Jira API Token, Email, URL & Project Key
   - Slack Webhook URL

## Usage

1. Select an email in Gmail
2. Click the add-on icon in the right sidebar
3. Choose "Create Task"
4. Edit task details if needed
5. Select destination (Notion/Jira)
6. Click "Create Task"

## Testing

Run tests:

```bash
npm test
```

## Deployment to Google Workspace Marketplace

1. Prepare marketplace listing:
   - Write detailed description
   - Create screenshots
   - Prepare privacy policy
   - Create terms of service

2. Submit for review:
   - Go to Google Workspace Marketplace SDK
   - Complete OAuth consent verification
   - Submit for review

## Support

For issues and feature requests, please use the [issue tracker](https://github.com/orhanaytekin/emailman/issues).

## License

This project is licensed under the terms specified in the package.json file.
