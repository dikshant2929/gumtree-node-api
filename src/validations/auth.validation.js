const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    mobile : Joi.string(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
const verify = {
  params: Joi.object().keys({
    userId : Joi.string().custom(objectId)
  }),
  body: Joi.object().keys({
    otp: Joi.string().required(),
  }),
};

const resendOtp = {
  params: Joi.object().keys({
    userId : Joi.string().custom(objectId)
  })
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const otpToMobile = {
  body : Joi.object().keys({
    mobile: Joi.string(),
    email: Joi.string()
  })
}

const validateOtp = {
  
  params : Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body : Joi.object().keys({
    otp: Joi.string().required()
  })
}
module.exports = {
  register,
  login,
  logout,
  verify,
  refreshTokens,
  forgotPassword,
  resetPassword,
  resendOtp,
  otpToMobile,
  validateOtp
};
