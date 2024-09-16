import passResetRequest from "../template/passResetRequest.js";
import { mailtrapClient, sender } from "../mailtrap.config.js";
import config from "../../../../config/index.js";


const sendPasswordResetRequest = async (existingUser, resetPasswordURL) => {

    const { name, email, } = existingUser;

    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            category: config.mailTrap.sendMailCategory.passwordReset, // for analytics
            html: passResetRequest
                .replace("{userName}", name)
                .replace("{resetPasswordURL}", resetPasswordURL),
        });

        console.log("✅ Password reset email sent successfully", response);

    } catch (error) {
        console.error(`🔴🔴🔴 Error sending password reset email`, error);

        throw new Error(`Error sending password reset email: ${error}`);
    }
};


export default sendPasswordResetRequest;