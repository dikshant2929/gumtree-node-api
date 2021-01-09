const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const otpService = require('./otp.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { sendOTP } = require('../services/email.service');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.checkLogin(email);
  if(!user){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Account not activated.');
  } else {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
  }
};


/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    await userService.updateUserById(user.id, { password: newPassword });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};


/**
 * Verify users using otp
 * @param {string} otp
 * @param {string} userId
 * @returns {Promise}
 */
const verifyUserUsingOtp = async (otp, userId) => {
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if(!await user.isOtpMatch(otp)){
      throw new ApiError(httpStatus.UNAUTHORIZED, 'otp not matched');
    }
    await userService.updateUserById(user.id , { verified : true });
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Otp verification failed');
  }
};


/**
 * resend otp to email
 * @param {string} userId
 * @returns {Promise}
 */
const resendOtp = async (userId) => {
  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    
    let otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    await userService.updateUserById(userId , { otp : otp })
    sendOTP(user.email, otp);
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Otp verification failed');
  }
};

/**
 * send otp to mobile
 * @param {string} mobile
 * @returns {Promise}
 */
const sendOtp = async (mobile, email) => {
  try {
    let otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    return await otpService.sendOtp(email , mobile ,otp);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'unable to send otp');
  }
};

/**
 * send otp to mobile
 * @param {string} id
 * @returns {Promise}
 */
const validateOtp = async (id , otp) => {
  try {
    return await otpService.validateOtp(id , otp)
    
  } catch (error) {
    console.log(error)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Otp verification failed');
  }
};



module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyUserUsingOtp,
  resendOtp,
  validateOtp,
  sendOtp
};
