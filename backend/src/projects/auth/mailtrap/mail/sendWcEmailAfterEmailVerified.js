import { mailtrapClient, sender } from "../mailtrap.config.js";
import config from "../../../../config/index.js";


const sendWelcomeEmailAfterEmailVerified = async (existingUser) => {

    const { name, email, } = existingUser;

    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: config.mailTrap.welcomeMailTemplateUUID,
            template_variables: {
                company_info_name: config.mailTrap.companyInfoName,
                name: name,
            },
        });

        console.log("✅ Welcome email sent successfully", response);

    } catch (error) {

        console.error(`🔴🔴🔴 Welcome email send error:- `, error);

        throw new Error(`Welcome email send error: ${error}`);
    }
};


export default sendWelcomeEmailAfterEmailVerified;