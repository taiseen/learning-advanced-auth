import httpStatus from 'http-status';
import Joi from 'joi';


const registrationInputs = (req, res, next) => {

    const userGivenData = req.body;

   
    const schema = Joi.object({
        name: Joi.string().trim(true).min(2).max(40).required(),
        email: Joi.string().trim(true).email().required(),
        password: Joi.string().trim(true).min(4).max(40).required(),
    });


    const { error } = schema.validate(userGivenData);


    if (error) {
        return res
            .status(httpStatus.BAD_REQUEST) // 400 status code
            .json({ message: "Bad request", error })
    }

    
    next(); // if all OK ==> then go to registration process
}

export default registrationInputs;