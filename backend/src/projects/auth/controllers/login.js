import generateTokenAndSetCookie from '../helper/generateTokenAndSetCookie.js';
import userModel from '../model/user.js';
import httpStatus from 'http-status';
import bcryptjs from 'bcryptjs';


// 🔎 Read || Checking Operation
const login = async (req, res) => {

    try {

        // ⬇️ these data come from frontend by user given input field...
        const { email, password } = req.body;


        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
        // 🟧 Step 1:- User existence checking... 
        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧

        // find user info from mongodb database...
        const existingUser = await userModel.findOne({ email });

        // if user not exist...
        if (!existingUser) return res
            .status(httpStatus.FORBIDDEN) // 403 status code
            .json({ message: "User does not exist 🔴", success: false });


        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
        // 🟧 Step 2:- password matching checking...
        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧

        const isPasswordMatch = await bcryptjs.compare(password, existingUser.password);

        // if password not match...
        if (!isPasswordMatch) return res
            .status(httpStatus.BAD_REQUEST) // 400 status code
            .json({ message: "Invalid credentials 🔴", success: false });


        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
        // 🟩 Step 3:- if user & password ok, then process for jwt...
        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

        // jwt-token and cookie... & send to client side browser... 🌐
        generateTokenAndSetCookie(res, existingUser._id);

        existingUser.lastLogin = new Date(); // 🔄️ update lastLogin info...
        await existingUser.save(); // 🟢 save changes into database

        res
            .status(httpStatus.OK) // 200 status code
            .json({
                success: true,
                message: "Logged in successfully ✅",
                user: {
                    ...existingUser._doc,
                    id: existingUser._id,
                    // delete these properties...
                    password: undefined,
                    _id: undefined,
                    __v: undefined,
                },
            })

    } catch (error) {

        console.log("🔴🔴🔴 Login error:- ", error);

        res
            .status(httpStatus.INTERNAL_SERVER_ERROR) // 500 status code
            .json({
                success: false,
                error: error.message,
                message: "Internal server error 🔴",
            })
    }
}


export default login;