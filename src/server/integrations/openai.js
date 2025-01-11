import { getProperty } from '../config/settings';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4';

const SYSTEM_PROMPT = `You are an AI assistant analyzing customer support emails. First determine if the email is 
relevant to customer support or app-related issues. If the email is empty, spam, or completely unrelated, respond with:
{
  "relevant": false,
  "reason": "Brief explanation why this email is not relevant"
}

For relevant emails, carefully extract ALL technical information, especially:
- Device information (iPhone model, Android device, etc.)
- OS versions (iOS version, Android version)
- App version numbers
- Any identifiers (AID, User ID, Device ID)
- Technical context from email signatures

Format response as a structured JSON with "relevant": true:
{
  "relevant": true,
  "analysis": {
    "summary": "Brief, clear summary focusing on the main request/issue",
    "details": "Detailed analysis including any context provided",
    "sentiment": "positive|neutral|negative"
  },
  "emailMetadata": {
    "priority": "High|Medium|Low",
    "category": "Bug|Feature Request|Question|Support",
    "responseNeeded": true|false
  },
  "technicalDetails": {
    "appVersion": "string or null",
    "deviceInfo": {
      "type": "string or null (e.g., 'iPhone', 'Android')",
      "model": "string or null (e.g., 'iPhone 11', 'Pixel 6')",
      "osVersion": "string or null (e.g., 'iOS 17.6.1')",
      "deviceId": "string or null"
    },
    "userIdentifiers": {
      "userId": "string or null",
      "aid": "string or null (e.g., '46AA6F08-451D-4E62-B9CE-D8C945848BEE')",
      "otherIds": []
    }
  }
}

Important:
1. ALWAYS extract technical information even if it appears in signatures or informal parts of the email
2. Look for version numbers in formats like x.x.x or standard version patterns
3. Parse device information from phrases like "Sent from my iPhone" or similar signatures
4. Include ALL identifiers found in the email, especially AID or User ID
5. If information is not found, use null instead of omitting the field

Example technical patterns to look for:
- "iPhone X, iOS 15.5"
- "App version 2.1.0"
- "AID: XXXXX-XXXXX-XXXXX"
- "Sent from my [Device]"
- "Version 3.0.0"
- "Build 123"
- "Device ID: XXXXX"

Extract any technical information like app versions, device details, and user IDs, even if they appear in 
different formats or locations in the email.`;

export const analyzeEmail = async (subject, body) => {
  try {
    const apiKey = getProperty(CONFIG.PROPERTIES.OPENAI_API_KEY);
    if (!apiKey) {
      throw new Error(CONFIG.ERROR_MESSAGES.MISSING_INTEGRATION('OpenAI'));
    }

    const response = await UrlFetchApp.fetch(OPENAI_API_URL, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      muteHttpExceptions: true,
      payload: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: `Please analyze this email:\nSubject: ${subject}\n\nBody: ${body}`,
          },
        ],
        temperature: 0.1,
        max_tokens: 3000,
      }),
    });

    const result = JSON.parse(response.getContentText());
    if (result.error) {
      logError('OpenAI API Error', result.error);
      throw new Error(result.error.message);
    }

    try {
      const analysis = JSON.parse(result.choices[0].message.content);

      // If email is not relevant, throw an error with the reason
      if (!analysis.relevant) {
        throw new Error(`Email skipped: ${analysis.reason}`);
      }

      logInfo('Email Analysis', `Analysis completed for: ${subject}`);
      logInfo('Email Analysis', `Analysis: ${JSON.stringify(analysis)}`);
      return analysis;
    } catch (parseError) {
      logError('OpenAI Response Parse Error', parseError);
      throw new Error('Failed to parse AI response. Please try again.');
    }
  } catch (error) {
    logError('Analyze Email Error', error);
    throw error;
  }
};
