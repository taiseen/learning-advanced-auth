import sendPasswordResetSuccess from "../mailtrap/mail/sendPasswordResetSuccess.js";
import userModel from "../model/user.js";
import bcryptjs from 'bcryptjs';


const resetPassword = async (req, res) => {

    const { password } = req.body;
    const { token } = req.params; // user searching by this ==> token

    try {

        const existingUser = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }, // checking for, is token time expire || not...?
            // if this time is < greater than Date.now... means this token is expired...
        });


        if (!existingUser) return res
            .status(400)
            .json({ success: false, message: "Invalid or expired reset token" });


        // password updated by hashing...
        const salt = await bcryptjs.genSalt();
        const hashedPassword = await bcryptjs.hash(password, salt);


        existingUser.password = hashedPassword; // 🔄️ value update...
        existingUser.resetPasswordToken = undefined; // delete this property
        existingUser.resetPasswordExpiresAt = undefined; // delete this property


        await existingUser.save(); // 🟢 save changes into database


        // send password update status ==> into user mailbox 📧
        await sendPasswordResetSuccess(existingUser);


        res
            .status(200)
            .json({ success: true, message: "Password reset successful ✅" });

    } catch (error) {
        console.log("🔴🔴🔴 Password reset error:- ", error);

        res.status(400).json({ success: false, message: error.message });
    }
};


export default resetPassword;