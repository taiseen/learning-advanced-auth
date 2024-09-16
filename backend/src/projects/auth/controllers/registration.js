import generateTokenAndSetCookie from '../helper/generateTokenAndSetCookie.js';
import sendEmailVerification from '../mailtrap/mail/sendEmailVerification.js';
import expireTimeHour from '../helper/expireTimeHour.js';
import userModel from '../model/user.js';
import httpStatus from 'http-status';
import bcryptjs from 'bcryptjs';


// ✅ Write || Create Operation
const registration = async (req, res) => {

    try {

        // ⬇️ these data come from frontend by user given input field...
        const { name, email, password } = req.body;


        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
        // 🟧 Step 1:- User existence checking... 
        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧

        const user = await userModel.findOne({ email });

        if (user) return res
            .status(httpStatus.CONFLICT) // 409 status code
            .json({ message: 'Email already exist, you can login 🟢', success: false });



        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
        // 🟩 Step 2:- if user not exist, then start registration process...
        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

        // 📝 for password protection | Hashing System... | avoid Hashing collection also...
        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(password, salt); // hash user given password...


        const verificationCode = Math.floor(1_00_000 + Math.random() * 9_00_000).toString();
        const verificationCodeExpiresAt = expireTimeHour(24); // 24 hours;


        // ✅ creating new user | object data model...
        const newUserRegister = new userModel({
            name,
            email,
            password: hashedPassword,
            verificationCode,
            verificationCodeExpiresAt,
        });


        // ✅ save user at mongodb database...
        await newUserRegister.save();


        // jwt-token and send cookie... ==> into browser 🌐
        generateTokenAndSetCookie(res, newUserRegister._id);


        // send email verification code... ==> into user mailbox 📧
        await sendEmailVerification(newUserRegister, verificationCode);


        // send user info at frontend...
        res
            .status(httpStatus.CREATED) // 201 status code
            .json({
                message: "Registration successfully ✅",
                success: true,
                // user: {
                //     ...newUserRegister._doc,
                //     id: newUserRegister._id,
                //     // delete these properties... from response for sending to client
                //     password: undefined,
                //     _id: undefined,
                //     __v: undefined,
                // },
            });

    } catch (error) {

        console.log("🔴🔴🔴 Registration error:- ", error);

        res
            .status(httpStatus.INTERNAL_SERVER_ERROR) // 500 status code
            .json({
                success: false,
                error: error.message,
                message: "Internal server error 🔴",
            });
    }
}


export default registration;