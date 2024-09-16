import { mailtrapClient, sender } from "../mailtrap.config.js";
import emailVerification from "../template/emailVerification.js";
import config from "../../../../config/index.js";


const sendEmailVerification = async (newUserRegister, verificationCode) => {

    const { name, email } = newUserRegister;

    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            category: config.mailTrap.sendMailCategory.emailVerification, // for analytics
            html: emailVerification
                .replace("{userName}", name)
                .replace("{verificationCode}", verificationCode),
        });

        console.log("✅ Email sent successfully", response);

    } catch (error) {

        console.log("🔴🔴🔴 Email Verification error:- ", error);

        throw new Error(`Sending Email Verification error:- ${error}`);
    }
};


export default sendEmailVerification;