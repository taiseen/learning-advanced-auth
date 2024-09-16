import { mailtrapClient, sender } from "../mailtrap.config.js";
import passResetSuccess from "../template/passResetSuccess.js";
import config from "../../../../config/index.js";


const sendPasswordResetSuccess = async (existingUser) => {

    const { name, email, } = existingUser;

    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: passResetSuccess.replace("{userName}", name),
            category: config.mailTrap.sendMailCategory.passwordResetOK, // for analytics
        });

        console.log("✅ Password reset email sent successfully", response);

    } catch (error) {

        console.error(`🔴🔴🔴 Error sending password reset success email`, error);

        throw new Error(`Error sending password reset success email: ${error}`);
    }
};


export default sendPasswordResetSuccess;