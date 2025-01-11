import { getProperty } from '../config/settings';
import { CONFIG } from '../config/constants';
import { logError, logInfo } from '../utils/logger';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-4';

const SYSTEM_PROMPT = `You are an AI assistant analyzing customer support emails. First determine if the email is 
relevant to customer support by checking if it contains:
- Questions about products/services
- Bug reports
- Feature requests
- Technical issues
- General support inquiries
- Feedback
- Complaints

If the email is spam, automated notification, or completely unrelated to customer support, respond with:
{
  "relevant": false,
  "reason": "Brief explanation why this is not a customer support matter"
}

For relevant emails, analyze the content and determine appropriate platforms based on these rules:
- JIRA: Bugs, technical issues, high-priority items, security concerns
- Notion: Feature requests, enhancements, documentation needs, long-term tracking
- Both: Complex issues requiring both tracking and technical resolution

Format response as:
{
  "relevant": true,
  "analysis": {
    "summary": "Clear, concise summary of the main request/issue",
    "details": "Detailed analysis of the problem, steps to reproduce if available",
    "sentiment": "positive|neutral|negative"
  },
  "emailMetadata": {
    "priority": "High|Medium|Low",
    "category": "Bug|Feature Request|Question|Support",
    "responseNeeded": true|false,
    "platforms": ["JIRA", "NOTION"] // Platforms where this should be created
  },
  "technicalDetails": {  // Optional but valuable if available
    "appVersion": "string or null",
    "deviceInfo": {
      "type": "string or null",
      "model": "string or null",
      "osVersion": "string or null",
      "deviceId": "string or null"
    },
    "userIdentifiers": {
      "userId": "string or null",
      "aid": "string or null",
      "otherIds": []
    }
  }
}

Guidelines for platform selection:
1. JIRA:
   - All bugs regardless of priority
   - High-priority support issues
   - Security concerns
   - System outages
   - Data-related issues

2. Notion:
   - Feature requests and enhancements
   - Documentation updates
   - Process improvements
   - General feedback
   - Knowledge base items

3. Both Platforms:
   - Complex issues needing both tracking and technical work
   - Major feature requests with technical implications
   - Strategic product changes
   - Issues requiring cross-team collaboration
  
For relevant emails, analyze the content and extract any available technical information. Format response as:
    "priority": "High|Medium|Low", // Based on urgency words, reported impact
    "responseNeeded": true|false

Guidelines for analysis:

1. RELEVANCE: Focus on customer support nature, not technical details availability

2. PRIORITY:
   - High: System down, blocking issues, data loss, security concerns
   - Medium: Feature requests, non-blocking bugs, account issues
   - Low: General questions, minor UI issues, suggestions

3. TECHNICAL INFO: Extract if available but don't reject emails without it

4. RESPONSE NEEDED: True if the email requires a response or action

Examples of relevant emails (even without technical details):
- "The app keeps crashing" (Bug)
- "Can you add dark mode?" (Feature Request)
- "How do I reset my password?" (Support)
- "I can't access my account" (Support)
- "The new update is confusing" (Feedback)

Remember: Technical details enhance the support process but their absence doesn't make an email irrelevant.`;

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

      // If email is not relevant, return the analysis instead of throwing
      if (!analysis.relevant) {
        logInfo('Email Analysis', `Email skipped: ${analysis.reason}`);
        return analysis;
      }

      // Add fallback values for required fields
      const processedAnalysis = {
        relevant: true,
        analysis: {
          summary: analysis.analysis?.summary || subject || 'Untitled Request',
          details: analysis.analysis?.details || body || 'No details provided',
          sentiment: analysis.analysis?.sentiment || 'neutral',
        },
        emailMetadata: {
          priority: analysis.emailMetadata?.priority || 'Medium',
          category: analysis.emailMetadata?.category || 'Support',
          responseNeeded: analysis.emailMetadata?.responseNeeded || true,
          platforms: analysis.emailMetadata?.platforms || ['JIRA', 'NOTION'],
        },
        technicalDetails: {
          appVersion: analysis.technicalDetails?.appVersion || null,
          deviceInfo: {
            type: analysis.technicalDetails?.deviceInfo?.type || null,
            model: analysis.technicalDetails?.deviceInfo?.model || null,
            osVersion: analysis.technicalDetails?.deviceInfo?.osVersion || null,
            deviceId: analysis.technicalDetails?.deviceInfo?.deviceId || null,
          },
          userIdentifiers: {
            userId: analysis.technicalDetails?.userIdentifiers?.userId || null,
            aid: analysis.technicalDetails?.userIdentifiers?.aid || null,
            otherIds: analysis.technicalDetails?.userIdentifiers?.otherIds || [],
          },
        },
      };

      logInfo('Email Analysis', `Analysis completed for: ${subject}`);
      logInfo('Email Analysis', `Analysis: ${JSON.stringify(processedAnalysis)}`);
      return processedAnalysis;
    } catch (parseError) {
      logError('OpenAI Response Parse Error', parseError);
      // Return a basic analysis structure if parsing fails
      return {
        relevant: true,
        analysis: {
          summary: subject || 'Untitled Request',
          details: body || 'No details provided',
          sentiment: 'neutral',
        },
        emailMetadata: {
          priority: 'Medium',
          category: 'Support',
          responseNeeded: true,
          platforms: ['JIRA', 'NOTION'],
        },
        technicalDetails: {
          appVersion: null,
          deviceInfo: {
            type: null,
            model: null,
            osVersion: null,
            deviceId: null,
          },
          userIdentifiers: {
            userId: null,
            aid: null,
            otherIds: [],
          },
        },
      };
    }
  } catch (error) {
    logError('Analyze Email Error', error);
    throw error;
  }
};
