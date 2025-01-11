# Gmail API Access Setup Guide

## 1. Create/Select Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top of the page
3. Click "New Project" or select an existing project
   - Project Name: `gmail-task-automation` (or your preferred name)
   - Click "Create"

## 2. Enable Gmail API

1. In the Google Cloud Console, go to the [API Library](https://console.cloud.google.com/apis/library)
2. Search for "Gmail API"
3. Click on "Gmail API"
4. Click "Enable"

## 3. Configure OAuth Consent Screen

1. Go to [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)
2. Choose User Type:
   - Select "External" (for public use) or "Internal" (for organization only)
   - Click "Create"

3. Fill in the OAuth consent screen:

   ```plaintext
   App name: Gmail Task Automation
   User support email: [your-email]
   Developer contact information: [your-email]
   ```

4. Click "Save and Continue"

5. Add Scopes:
   - Click "Add or Remove Scopes"
   - Search and select:
     - `https://www.googleapis.com/auth/gmail.readonly` (read emails)
     - `https://www.googleapis.com/auth/gmail.modify` (modify emails)
     - `https://www.googleapis.com/auth/gmail.labels` (manage labels)
   - Click "Update"

## 4. Create Credentials

1. Go to [Credentials](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials"
3. Select "OAuth 2.0 Client ID"
4. Choose Application Type:
   - For development: Select "Desktop app"
   - For web application: Select "Web application"

5. Fill in details:

   ```plaintext
   Name: Gmail Task Automation
   Authorized redirect URIs: [Your redirect URIs]
   ```

6. Click "Create"
7. Download the client configuration file (JSON)

## 5. Store Credentials Securely

1. Rename the downloaded JSON file to `credentials.json`
2. Store it securely (never commit to version control)
3. Add to `.gitignore`:

   ```plaintext
   credentials.json
   ```

## 6. Verification Status (Optional)

- For public applications:
  1. Complete OAuth verification process
  2. Submit for Google verification
  3. Provide additional documentation as requested

## Notes

- Keep credentials secure and never share them
- For testing, you can use the API immediately with unverified status (limited to 100 users)
- For production, complete the verification process
- Monitor API quotas in Google Cloud Console
