export const sendmail = () => {
  const email = Session.getActiveUser().getEmail();

  const htmlBody = `
    <p>Hello</p>`;

  const textBody = htmlBody.replace(/<[^>]+>/g, ' ');

  GmailApp.sendEmail(email, 'Hello from Google Apps Script', textBody, {
    htmlBody,
  });

  Logger.log(`Email message sent to${email}`);
};
