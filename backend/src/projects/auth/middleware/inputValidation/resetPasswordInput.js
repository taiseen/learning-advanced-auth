import httpStatus from 'http-status';
import Joi from 'joi';


const resetPasswordInput = (req, res, next) => {

    const userGivenData = req.body;

    const schema = Joi.object({
        password: Joi.string().trim(true).min(4).max(40).required(),
    });


    const { error } = schema.validate(userGivenData);


    if (error) {
        return res
            .status(httpStatus.BAD_REQUEST) // 400 status code
            .json({ message: "🔴 Bad request", error })
    }


    next(); // if all OK ==> then go to login process...
}

export default resetPasswordInput;