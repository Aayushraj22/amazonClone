import { Router } from "express";
import { registerWithPassword, loginWithPassword, sendEmailOTP, verifyEmailOTP } from "./controller.js";
import { registerWithPasswordValidatorSchema, loginWithPasswordValidatorSchema, verifyEmail, verifyEmailOTPValidatorSchema } from "./validator.js";
import { validate } from "../../middlewares/Validate.js";

const router = Router()


// routes/auth.js
// router.post('/mobile/send-otp', sendMobileOTP);
// router.post('/mobile/verify-otp', verifyMobileOTP);

router.post('/email/send-otp', validate(verifyEmail), sendEmailOTP);
router.post('/email/verify-otp', validate(verifyEmailOTPValidatorSchema), verifyEmailOTP);

// router.post('/google', googleAuth);
// router.post('/facebook', facebookAuth);
// router.post('/apple', appleAuth);

router.post('/register', validate(registerWithPasswordValidatorSchema), registerWithPassword);
router.post('/login', validate(loginWithPasswordValidatorSchema), loginWithPassword);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);

// router.get('/me', authMiddleware, getProfile);
// router.patch('/profile', authMiddleware, updateProfile);


export default router