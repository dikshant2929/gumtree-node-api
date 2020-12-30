const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const {removeFieldFromObj} = require('../utils/globals');

const register = catchAsync(async (req, res) => {
  let user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user : removeFieldFromObj(['otp'] , user ) , tokens });
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
  await authService.resendOtp(req.params.userId);
  res.send("Otp resent successfully");
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


module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verify,
  resendOtp
};
