export const EMAIL_TEMPLATES = {
  IRRELEVANT_REQUEST: {
    plainText: `
      Thank you for your email. This is an automated response from MailFlow AI.
      
      To better assist you, please provide the following information:
      
      1. App Version
      2. Device Type and Model
      3. Operating System Version
      4. User ID or Support Code
      
      This information will help us investigate and resolve your issue more efficiently.
      
      Best regards,
      MailFlow AI
    `,
    htmlBody: `
      <p>Thank you for your email. This is an automated response from MailFlow AI.</p>
      <p>To better assist you, please provide the following information:</p>
      <ul>
        <li>App Version</li>
        <li>Device Type and Model</li>
        <li>Operating System Version</li>
        <li>User ID or Support Code</li>
      </ul>
      <p>This information will help us investigate and resolve your issue more efficiently.</p>
      <p>Best regards,<br>MailFlow AI</p>
    `,
  },
  RELEVANT_REQUEST: {
    plainText: `
      Thank you for your email. This is an automated response from MailFlow AI.
      
      We have received your request and our team is looking into it.
      
      We appreciate the detailed information you've provided and will work on addressing 
      your request as quickly as possible. You'll receive updates as we make progress.
      
      Best regards,
      MailFlow AI
    `,
    htmlBody: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p>Thank you for your email. This is an automated response from MailFlow AI.</p>
        
        <p>We have received your request and our team is looking into it.</p>
        
        <p>We appreciate the detailed information you've provided and will work on addressing 
        your request as quickly as possible. You'll receive updates as we make progress.</p>
        
        <p>Best regards,<br>
        <strong>MailFlow AI</strong></p>
      </div>
    `,
  },
};
