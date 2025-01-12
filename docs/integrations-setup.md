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

1. Create a Notion Integration:
   - Go to [Notion Integrations](https://www.notion.so/my-integrations)
   - Click "New integration"
   - Name: "Gmail Task Automation"
   - Select workspace
   - Copy the "Internal Integration Token"

2. Create a Notion Database:
   - Create a new page in Notion
   - Type `/database` and select "Table - Full page"
   - Add the following properties:
     - Title (default)
     - Status (Select)
       - Options: New, In Progress, Done
     - Priority (Select)
       - Options: High, Medium, Low
     - Category (Multi-select)
       - Options: Support, Bug, Feature, Question
     - Source (Select)
       - Options: Email, Manual
     - Email ID (Text)
     - Thread ID (Text)
     - Technical Details (Text)
     - Created Date (Date)

3. Share Database with Integration:
   - Open the database
   - Click "Share" in top right
   - Click "Invite"
   - Find and select your integration
   - Click "Invite"

4. Get Database ID:
   - Open the database in full page view
   - Copy the ID from URL:

     ```bash
     https://notion.so/workspace/{DATABASE_ID}?v=...
     ```

   - ID is the 32-character string

5. In the add-on settings:
   - Paste the Integration Token
   - Paste the Database ID
   - Click "Save Notion Settings"
   - Click "Test Connection"

Required Database Properties (Not updated. Check the code for the exact names):

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
   - Domain: Your Jira domain (e.g. `your-domain.atlassian.net`) - do not include https://
   - Email: Your Atlassian account email
   - Project Key: Found in project settings (e.g. `PROJ`)

7. Verify Jira Project Setup:
   - Go to Project Settings > Issue Types
   - Ensure "Task" issue type exists
   - Verify Priority field has options: High, Medium, Low
   - Add custom fields if needed (see Custom Fields Setup below)

8. In the add-on settings:
   - Fill in Domain (without https://)
   - Fill in Email
   - Fill in API Token
   - Fill in Project Key
   - Click "Save Jira Settings"
   - Click "Test Jira Setup" to verify configuration

Note: When entering the domain, only enter the domain part (e.g. `your-domain.atlassian.net`) without `https://` or any trailing slashes.

### Custom Fields Setup (Optional)

1. In Jira, go to Project Settings > Fields
2. Add custom fields:
   - Email ID (Text Field)
   - Thread ID (Text Field)
3. Get field IDs:
   - Go to Project Settings > Fields
   - Click on the field
   - Note the ID from the URL (e.g., customfield_10000)
4. Update the code if needed:

   ```javascript
   customfield_10000: metadata.emailId,  // Update ID
   customfield_10001: metadata.threadId, // Update ID
   ```

### Troubleshooting

Common Jira errors:

- "No issue key returned": Check project permissions and issue type
- "Invalid priority": Verify priority options match (High, Medium, Low)
- "Project not found": Double-check project key
- "Authentication failed": Verify email and API token

### Jira Issue Format

The add-on creates Jira issues with:

1. Summary: Email subject or analysis summary
2. Description: Formatted with:
   - Main description
   - Technical details section
   - Email metadata
3. Priority: Mapped from email priority
4. Labels:
   - `email-automation`
   - Category (lowercase)
5. Issue Type: Task

Note: Instead of custom fields, all metadata is included in the formatted description for better compatibility across Jira configurations.

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
