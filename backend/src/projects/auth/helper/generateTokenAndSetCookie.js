import expireTimeHour from "./expireTimeHour.js";
import config from "../../../config/index.js";
import jwt from "jsonwebtoken";


const getDomainFromUrl = (url) => {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname;
    } catch (error) {
        console.error('Invalid URL', error);
        return '';
    }
}


const generateTokenAndSetCookie = (res, userId) => {

    const oneDay = expireTimeHour(24);


    // generate token...
    const token = jwt.sign(
        { userId },
        config.token.jwtSecret,
        { expiresIn: config.token.jwtExpiresIn }
    );


    // set cookie...
    res.cookie(config.token.name, token, {
        secure: config.env === "production", // this is for - https || http
        httpOnly: true, // this is not accessible by javascript...
        sameSite: "lax", // // CSRF Attack Protection...
        maxAge: oneDay * 7, // 7 days...
        // domain: getDomainFromUrl(config.clientUrl), // Adjust for domain
        // path: "/", // Ensure it applies to the entire site
    });


    return token;
};


export default generateTokenAndSetCookie;