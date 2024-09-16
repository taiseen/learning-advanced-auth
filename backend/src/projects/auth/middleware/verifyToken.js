import config from '../../../config/index.js';
import httpStatus from 'http-status';
import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {

    const incomingToken = req.cookies[config.token.name]; // dynamically get this token name...


    // if no token present...
    if (!incomingToken) return res
        .status(httpStatus.FORBIDDEN) // 403 status code
        .json({ success: false, message: 'Unauthorized Access. JWT Token Is Required 🚫' });


    try {

        // 🔎 checking for - if some one trying to edit this token...
        const decodedInfo = jwt.verify(incomingToken, config.token.jwtSecret);


        if (!decodedInfo) return res
            .status(httpStatus.UNAUTHORIZED) // 403 status code
            .json({ success: false, message: "Unauthorized - JWT token wrong or expired 🔴" });


        // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
        // store userId inside this request property...
        // by this track user inside whole app...
        req.userId = decodedInfo.userId;


        next(); // if all OK ==> then go to requested endpoint...


    } catch (error) {

        console.log("Verify Token error :- ", error);

        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR) // 500 status code
            .json({ success: false, error: error.message, message: 'Internal Server error' });
    }
}

export default verifyToken;