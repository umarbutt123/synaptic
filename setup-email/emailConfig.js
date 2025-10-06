// Email Configuration for Zip Emailer
// Update these values with your email settings

const emailConfig = {
   // Gmail Configuration (most common)
   smtpHost: 'smtp.gmail.com',
   smtpPort: 465,
   secure: true, // Use SSL connection (port 465)

   // Email Credentials
   user: '',
   // password: 'cywdgnafqztguecy', // Use app-specific password for Gmail

   // Email Content
   from: '',
   to: '',
   // to: 'ayeshaishfaqkiani@gmail.com',
   subject: 'Synaptic Test Reports Automation',
   text: 'Hello,\n\nThis email contains our latest Synaptic test reports link Uploaded on Google Drive.\nThe zip file includes HTML reports and test results.\n https://drive.google.com/drive/u/1/folders/1gJiIttHKrR0atufSF89wiNTNpyIbNKLR. \n\nBest regards,\nTest Automation Team'
};

// Outlook/Hotmail Configuration Example
// const outlookConfig = {
//     smtpHost: 'smtp-mail.outlook.com',
//     smtpPort: 587,
//     secure: false,
//     user: 'your-email@outlook.com',
//     password: 'your-password',
//     from: 'your-email@outlook.com',
//     to: 'recipient@example.com',
//     subject: 'Zip File Attachment - Automated Delivery',
//     text: 'Please find attached the requested zip file.'
// };

// Custom SMTP Configuration Example
// const customSmtpConfig = {
//     smtpHost: 'mail.yourcompany.com',
//     smtpPort: 587,
//     secure: false,
//     user: 'your-email@yourcompany.com',
//     password: 'your-password',
//     from: 'your-email@yourcompany.com',
//     to: 'recipient@example.com',
//     subject: 'Zip File Attachment - Automated Delivery',
//     text: 'Please find attached the requested zip file.'
// };

module.exports = {
   emailConfig,
   // outlookConfig,
   // customSmtpConfig
};

/*
📧 EMAIL SETUP INSTRUCTIONS:

1. Gmail Setup:
   - Enable 2-Factor Authentication
   - Generate App Password: https://myaccount.google.com/apppasswords
   - Use the App Password (not your regular password)

2. Outlook/Hotmail Setup:
   - Enable 2FA and generate app password
   - Use the app-specific password

3. Custom SMTP:
   - Contact your email provider for SMTP settings
   - Usually requires authentication with username/password

4. Security Tips:
   - Never commit real passwords to version control
   - Use environment variables in production
   - Consider using email services for automation

Example usage:
const { emailConfig } = require('./emailConfig');
const { zipAndEmailFolder } = require('./zipFolder');

zipAndEmailFolder('cypress/reports', emailConfig);
*/
