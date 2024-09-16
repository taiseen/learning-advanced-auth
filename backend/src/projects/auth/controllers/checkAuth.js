import userModel from "../model/user.js";


const checkAuth = async (req, res) => {

    const { userId } = req; // this { userId } set by "verifyToken()" middleware for tracking the user...

    try {

        const existingUser = await userModel.findById(userId).select('-password'); // remove this password field


        if (!existingUser) return res
            .status(400)
            .json({ success: false, message: "User not found" });


        res
            .status(200)
            .json({
                success: true,
                user: {
                    ...existingUser._doc,
                    id: existingUser._id,
                    _id: undefined,
                    __v: undefined,
                }
            });

    } catch (error) {

        console.log("🔴🔴🔴 Error in checkAuth ", error);

        res
            .status(400)
            .json({ success: false, error: error.message, message: 'Internal Server error 🔴' });
    }
};


export default checkAuth;