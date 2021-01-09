const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/verify/:userId', validate(authValidation.verify), authController.verify);
router.post('/resendotp/:userId', validate(authValidation.resendOtp), authController.resendOtp);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

router.post('/forgot-password/otp', validate(authValidation.otpToMobile), authController.forgotPasswordByOtpSend);
router.post('/forgot-password/otp/:id', validate(authValidation.validateOtp), authController.forgotPasswordByOtpValidate);

router.post('/send-otp', validate(authValidation.otpToMobile), authController.sendOtp);
router.patch('/validate-otp/:id', validate(authValidation.validateOtp), authController.validateOtp);


module.exports = router;
