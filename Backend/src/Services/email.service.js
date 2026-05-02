const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

const sendOTPEmail = async (email, otp) => {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS ||
        process.env.EMAIL_USER === 'your-email@gmail.com' ||
        process.env.EMAIL_PASS === 'your-app-password') {
        console.log(`Email not configured. OTP for ${email}: ${otp}`);
        return false; // Return false to indicate email was not sent
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification OTP - NextHire AI',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Welcome to NextHire AI!</h2>
                <p>Thank you for registering. Please verify your email address using the OTP below:</p>
                <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
                    <h1 style="color: #ff2d78; font-size: 32px; margin: 0;">${otp}</h1>
                </div>
                <p>This OTP will expire in 10 minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
                <br>
                <p>Best regards,<br>NextHire AI Team</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
    }
};

module.exports = {
    generateOTP,
    sendOTPEmail
};