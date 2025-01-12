export const EMAIL_TEMPLATES = {
  IRRELEVANT_REQUEST: {
    plainText: `Thank you for contacting us. To better assist you, please provide the following information:

1. App Version
2. Device Type and Model
3. Operating System Version
4. User ID or Support Code (automatically generated when clicking the support button in the app)

This information will help us investigate and resolve your issue more efficiently.

Best regards,
Support Team`,

    htmlBody: `<p>Thank you for contacting us. To better assist you, please provide the following information:</p>
<ul>
  <li>App Version</li>
  <li>Device Type and Model</li>
  <li>Operating System Version</li>
  <li>User ID or Support Code (automatically generated when clicking the support button in the app)</li>
</ul>
<p>This information will help us investigate and resolve your issue more efficiently.</p>
<p>Best regards,<br>Support Team</p>`,
  },

  RELEVANT_REQUEST: {
    plainText: `Thank you for reaching out to us. We have received your request and our team is looking into it.

We appreciate the information you've provided and will work on addressing your request as quickly as possible.

You'll receive updates as we make progress on your case.

Best regards,
Support Team`,

    htmlBody: `<p>Thank you for reaching out to us. We have received your request and our team is looking into it.</p>
<p>We appreciate the detailed information you've provided and will work on addressing your request as quickly as possible.</p>
<p>You'll receive updates as we make progress on your case.</p>
<p>Best regards,<br>Support Team</p>`,
  },
};
