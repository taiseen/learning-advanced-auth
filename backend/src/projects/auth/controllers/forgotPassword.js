import sendPasswordResetRequest from "../mailtrap/mail/sendPasswordResetRequest.js";
import expireTimeHour from "../helper/expireTimeHour.js";
import config from "../../../config/index.js";
import userModel from "../model/user.js";
import crypto from "crypto";


const forgotPassword = async (req, res) => {

    const { email } = req.body;

    try {

        const existingUser = await userModel.findOne({ email });

        if (!existingUser) return res
            .status(400)
            .json({ success: false, message: "User not found 🔴" });


        // Generate reset token for secure url... 🔗
        const resetToken = crypto.randomBytes(20).toString("hex");


        existingUser.resetPasswordToken = resetToken; // 🔄️ value update...
        existingUser.resetPasswordExpiresAt = expireTimeHour(1); // 🔄️ value update...


        await existingUser.save(); // 🟢 save changes into database


        // generate url for password reset...
        const resetPasswordURL = `${config.clientUrl}/reset-password/${resetToken}`;

        
        // send password reset email...
        await sendPasswordResetRequest(existingUser, resetPasswordURL);


        res
            .status(200)
            .json({ success: true, message: "Password reset link sent to your email 📧" });

    } catch (error) {

        console.log("🔴🔴🔴 Forgot password error:- ", error);

        res
            .status(400)
            .json({ success: false, message: error.message });
    }
};


export default forgotPassword;