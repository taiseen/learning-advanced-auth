import sendWelcomeEmailAfterEmailVerified from "../mailtrap/mail/sendWcEmailAfterEmailVerified.js";
import userModel from "../model/user.js";


const emailVerification = async (req, res) => {
    
    const { code } = req.body; // user searching by this ==> code

    try {

        const existingUser = await userModel.findOne({
            verificationCode: code,
            verificationCodeExpiresAt: { $gt: Date.now() }, // checking for, is code time expire || not...?
            // if this time is < greater than Date.now... means this code is expired...
        });


        if (!existingUser) return res
            .status(400)
            .json({ success: false, message: "Invalid or expired verification code 🔴" });


        existingUser.isVerified = true; // ✅ email verified
        existingUser.verificationCode = undefined; // delete this property
        existingUser.verificationCodeExpiresAt = undefined; // delete this property


        await existingUser.save(); // 🟢 save changes into database


        // send welcome email ==> into user mailbox 📧
        await sendWelcomeEmailAfterEmailVerified(existingUser);


        res
            .status(200)
            .json({
                message: "Email verified successfully ✅",
                success: true,
                // user: {
                //     ...existingUser._doc,
                //     id: existingUser._id,
                //     // delete these properties...
                //     password: undefined,
                //     _id: undefined,
                //     __v: undefined,
                // },
            });

    } catch (error) {

        console.log("🔴🔴🔴 Email Verification error:- ", error);

        res
            .status(500)
            .json({ success: false, message: "Email Server error 🔴" });
    }
};


export default emailVerification;