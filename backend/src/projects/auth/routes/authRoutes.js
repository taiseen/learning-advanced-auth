import resetPasswordInput from '../middleware/inputValidation/resetPasswordInput.js';
import registrationInputs from '../middleware/inputValidation/registrationInputs.js';
import emailAddressInput from '../middleware/inputValidation/emailAddressInput.js';
import emailCodeInput from '../middleware/inputValidation/emailCodeInput.js';
import loginInputs from '../middleware/inputValidation/loginInputs.js';
import emailVerification from '../controllers/emailVerification.js';
import forgotPassword from '../controllers/forgotPassword.js';
import resetPassword from '../controllers/resetPassword.js';
import registration from '../controllers/registration.js';
import verifyToken from '../middleware/verifyToken.js';
import checkAuth from '../controllers/checkAuth.js';
import logout from '../controllers/logout.js';
import login from '../controllers/login.js';
import express from 'express';


const router = express.Router();


// user send data, ✅ create operation...
router.post('/register', registrationInputs, registration);

// user send data, ✅ for verifying email...
router.post("/email-verification", emailCodeInput, emailVerification);

// user sending data, 🔎 checking operation...
router.post('/login', loginInputs, login);

// user sending data, 🔎 checking operation...
router.post('/logout', logout);

// user send email data for password recovery...
router.post("/forgot-password", emailAddressInput, forgotPassword);

// user send data & also get :token info from url...
router.post("/reset-password/:token", resetPasswordInput, resetPassword);


router.get("/check-auth", verifyToken, checkAuth);


export default router;





// 📝 Learning Note:-
// if user hit by browser at this url ==> /auth/login/
// server replay as an error ==> 404
// because this url method is [.post]
// if this url method is [.get] then user get replay from server

// so why [.post] ?
// [.post] ==> because user send some data to server | backend...
// [.post] ==> all of the input values of form, send to the backend...