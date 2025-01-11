# Integration Setup Guide

This guide explains how to set up each integration for the Gmail Task Automation add-on.

## Table of Contents

- [OpenAI Integration](#openai-integration)
- [Notion Integration](#notion-integration)
- [Jira Integration](#jira-integration)
- [Slack Integration](#slack-integration)

## OpenAI Integration

1. Visit [OpenAI API Keys](https://platform.openai.com/account/api-keys)
2. Create a new API key
3. Copy the API key
4. In the add-on settings:
   - Paste the API key in the "OpenAI API Key" field
   - Click "Save OpenAI Settings"

## Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New Integration"
3. Fill in:
   - Name: "Gmail Task Automation"
   - Select workspace
4. Click "Submit"
5. Copy the "Internal Integration Token"
6. Create a new database in Notion or use an existing one
7. Share the database with your integration
8. Copy the database ID from the URL:
   - URL format: `https://notion.so/workspace/{DATABASE_ID}?v=...`
9. In the add-on settings:
   - Paste the Integration Token in "API Key"
   - Paste the Database ID
   - Click "Save Notion Settings"

Required Database Properties:

- Title (type: title)
- Status (type: select)
- Priority (type: select)
- Category (type: select)
- Email ID (type: text)
- Thread ID (type: text)

## Jira Integration

1. Go to [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security)
2. Under Security, click "Create and manage API tokens"
3. Click "Create API token"
4. Name it "Gmail Task Automation"
5. Copy the token
6. Get your Jira information:
   - Domain: `your-domain.atlassian.net`
   - Email: Your Atlassian account email
   - Project Key: Found in project settings
7. In the add-on settings:
   - Fill in all Jira fields
   - Click "Save Jira Settings"

Custom Fields Setup:

1. In Jira, go to Project Settings
2. Click "Issue types"
3. Add custom fields for:
   - Email ID
   - Thread ID
4. Note the custom field IDs
5. Update them in the code:

   ```javascript
   customfield_10000: metadata.emailId,  // Update ID
   customfield_10001: metadata.threadId, // Update ID
   ```

## Slack Integration

1. Go to [Slack API Apps](https://api.slack.com/apps)
2. Click "Create New App"
   - Choose "From scratch"
   - Name: "Gmail Task Automation"
   - Select workspace
3. Under "Features":
   - Click "Incoming Webhooks"
   - Toggle "Activate Incoming Webhooks"
   - Click "Add New Webhook to Workspace"
   - Select channel
   - Copy the Webhook URL
4. In the add-on settings:
   - Paste the Webhook URL
   - (Optional) Set default channel
   - Click "Save Slack Settings"

## Testing Integrations

After setting up each integration:

1. Select an email in Gmail
2. Click "Analyze Email"
3. Click "Create Task"
4. Check each platform:
   - Notion: New page created
   - Jira: New issue created
   - Slack: Notification received

## Troubleshooting

Common issues and solutions:

### OpenAI

- Error: "API key invalid" → Verify key and regenerate if needed
- Error: "Rate limit" → Check usage limits

### Notion

- Error: "Access denied" → Check database sharing
- Error: "Invalid database" → Verify database ID

### Jira

- Error: "Authentication failed" → Check email and token
- Error: "Project not found" → Verify project key
- Error: "Custom field not found" → Update field IDs

### Slack

- Error: "Invalid webhook" → Regenerate webhook URL
- Error: "Channel not found" → Check channel name/ID
