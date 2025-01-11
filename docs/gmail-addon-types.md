# Google Workspace Add-on Types for Gmail

## Available Options

### 1. Gmail Add-on (Recommended for this project)

- Appears directly in Gmail interface
- Can read and process emails
- Integrates with Gmail's UI
- Best for email-triggered automations
- Uses Google Apps Script

### 2. Chrome Extension

- More flexible but requires separate installation
- Not deeply integrated with Gmail
- Requires maintaining browser compatibility
- Not recommended for this use case

### 3. Web Application

- Runs separately from Gmail
- Requires Gmail API integration
- Less seamless user experience
- Not recommended for this use case

## Why Gmail Add-on is Best for This Project

### Advantages

1. Native integration with Gmail
2. Easier user adoption (installs directly from Workspace Marketplace)
3. Runs server-side (more secure for API keys)
4. Better performance for email processing
5. Automatic updates through Marketplace

### Technical Requirements

1. Must use Google Apps Script
2. Must follow Google's UI guidelines
3. Must implement specific triggers for Gmail events

## Next Steps

1. Start with Google Apps Script project
2. Use Gmail Add-on manifest structure
3. Follow Google's Cards UI framework
4. Implement Gmail-specific triggers
