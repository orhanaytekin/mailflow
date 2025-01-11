import { getProperty } from '../config/settings';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';

const SYSTEM_PROMPT = `You are an AI assistant analyzing customer support emails. 
Respond with a JSON object in this format:
{
  "analysis": {
    "summary": "Brief summary of the email",
    "details": "Detailed analysis",
    "sentiment": "positive|neutral|negative"
  },
  "emailMetadata": {
    "priority": "High|Medium|Low",
    "category": "Bug|Feature Request|Question|Support",
    "responseNeeded": true|false
  }
}`;

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
      logInfo('Email Analysis', `Analysis completed for: ${subject}`);
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
