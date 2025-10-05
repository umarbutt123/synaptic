const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { emailConfig } = require('./emailConfig');

/**
 * Check if zip file exists and create if needed
 */
// async function ensureZipFile() {
//     const zipPath = './reports.zip';

//     if (!fs.existsSync(zipPath)) {
//         console.log('📦 Creating zip file...');
//         const { zipReportsFolder } = require('./zipFolder');
//         await zipReportsFolder();
//         console.log('✅ Zip file created successfully!');
//     }
//     return zipPath;
// }

async function testEmailConnection() {
    try {
        console.log('🔧 Testing email connection with attachment...');

        // Ensure zip file exists
        // const zipPath = await ensureZipFile();

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: emailConfig.smtpHost,
            port: emailConfig.smtpPort,
            secure: emailConfig.secure,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.password
            }
        });

        // Test connection
        await transporter.verify();
        console.log('✅ Email server connection verified!');

        // Get file stats for attachment info
        // const stats = fs.statSync(zipPath);
        // const fileSizeKB = Math.round(stats.size / 1024);
        // const fileName = path.basename(zipPath);

        // Send email with attachment
        const mailOptions = {
            from: emailConfig.from,
            to: emailConfig.to,
            subject: emailConfig.subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">📧 Test Email Notification</h2>
                    <p>${emailConfig.text}</p>
                    
                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #2c5aa0; margin-top: 0;">📊 Test Reports Available</h3>
                        <p>Your test reports have been uploaded and are ready for review.</p>
                        
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="https://drive.google.com/file/d/1fdgS_8qw56JTbAmpzDW2EyKuNfUFX3rR/view" 
                               style="background-color: #4285f4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                                📁 View Reports on Google Drive
                            </a>
                        </div>
                        
                        <p style="font-size: 12px; color: #666;">
                            📅 Generated: ${new Date().toLocaleString()}
                        </p>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">
                        Best regards,<br>
                        Test Automation System
                    </p>
                </div>
            `,
            text: `${emailConfig.text}

📊 Test Reports Available
Your test reports have been uploaded and are ready for review.

🔗 View Reports: https://drive.google.com/file/d/1fdgS_8qw56JTbAmpzDW2EyKuNfUFX3rR/view

📅 Generated: ${new Date().toLocaleString()}

Best regards,
Test Automation System`
        };

        console.log(`📤 Sending email:`);
        const info = await transporter.sendMail(mailOptions);

        console.log('✅ Email sent successfully!');
        // console.log(`📧 Message ID: ${info.messageId}`);

    } catch (error) {
        console.error('❌ Error:', error.message);

        if (error.message.includes('552') || error.message.includes('BlockedMessage')) {
            console.log('\n🚫 Gmail Security Block Detected');
            console.log('📧 Gmail is blocking zip attachments for security reasons.');
            console.log('\n🔧 Alternative solutions:');
            console.log('1. Try renaming file to .txt or .tar extension');
            console.log('2. Use company email server instead of Gmail');
            console.log('3. Send notification email without attachment');
            console.log('4. Use Outlook/Office365 email service');
        } else {
            console.log('\n🔍 General troubleshooting:');
            console.log('1. Check if app password is correct');
            console.log('2. Ensure 2FA is enabled on Gmail');
            console.log('3. Verify zip file exists and is readable');
            console.log('4. Check network connection');
        }
    }
}

testEmailConnection();
