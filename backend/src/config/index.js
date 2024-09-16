import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.join(process.cwd(), '.env') });


const config = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    dbURL: process.env.MONGODB_URI,
    clientUrl: process.env.CLIENT_URL,

    token: {
        name: 'token',
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN,

        // refSecret: process.env.REFRESH_JWT_SECRET,
        // refExpiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    },

    mailTrap: {
        endPoint: process.env.MAILTRAP_ENDPOINT,
        token: process.env.MAILTRAP_TOKEN,

        sender: {
            email: process.env.MAILTRAP_SENDER_EMAIL,
            name: process.env.MAILTRAP_SENDER_NAME,
        },

        welcomeMailTemplateUUID: process.env.MAILTRAP_WELCOME_MAIL_TEMPLATE_UUID,
        companyInfoName: process.env.MAILTRAP_COMPANY_INFO_NAME,

        sendMailCategory: {
            welcome: 'Verified Welcome Email',
            passwordReset: 'Password Reset Link',
            passwordResetOK: 'Password Reset Successful',
            emailVerification: 'Email Verification Code',
        },
    },
};


export default config;