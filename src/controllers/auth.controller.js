const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const {removeFieldFromObj} = require('../utils/globals');
const { User } = require('../models');
const { http } = require('../config/logger');

const register = catchAsync(async (req, res) => {
  let user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user : user/* removeFieldFromObj(['otp'] , user )*/ , tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const verify = catchAsync(async (req, res) => {
  const user = await authService.verifyUserUsingOtp(req.body.otp , req.params.userId);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user : removeFieldFromObj(['otp'] , user ) , tokens });
});

const resendOtp = catchAsync(async (req, res) => {
  const user = await authService.resendOtp(req.params.userId);
  res.send("Otp resent successfully" + user.otp);
});


const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.send({status : true , message : "Reset link sent successfully"});
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.send({status : true , message : "Password changes successfully"});
});

const sendOtp = catchAsync(async (req, res) => {
  res.json(await authService.sendOtp(req.body.mobile , req.body.email));
});

const validateOtp = catchAsync(async (req, res) => {
  await authService.validateOtp(req.params.id, req.body.otp);
  res.send({status : true , message : "otp validated successfully"});
});

const forgotPasswordByOtpSend = catchAsync(async (req, res) => {
  if(!await userService.getUserByEmail(req.body.email)){
    res.status(httpStatus.NOT_FOUND).send({message : "User not found"})  
  } 
  else
    res.json(await authService.sendOtp(req.body.mobile , req.body.email));

});


const forgotPasswordByOtpValidate = catchAsync(async (req, res) => {
  const user = await authService.validateOtp(req.params.id, req.body.otp);
  const resetPasswordToken = await tokenService.generateResetPasswordToken(user.email);
  res.send({status : true , resetPasswordToken : resetPasswordToken , message : "otp validated successfully"});
});


module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verify,
  resendOtp,
  sendOtp,
  validateOtp,
  forgotPasswordByOtpSend,
  forgotPasswordByOtpValidate
};
