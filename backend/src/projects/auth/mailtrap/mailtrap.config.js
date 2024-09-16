import config from "../../../config/index.js";
import { MailtrapClient } from "mailtrap";

// mailtrap configuration...

export const mailtrapClient = new MailtrapClient({
    endpoint: config.mailTrap.endPoint,
    token: config.mailTrap.token,
});


export const sender = {
    email: config.mailTrap.sender.email,
    name: config.mailTrap.sender.name,
};