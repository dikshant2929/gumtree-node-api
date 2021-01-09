const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const Otp = require('../models/otp.model');
const moment = require('moment');
const config = require('../config/config');
const { sendOTPForgotPassword } = require('../services/email.service');


/**
 * send otp to mobile
 * @param {string} mobile
 * @returns {Promise}
 */
const sendOtp = async (email , mobile,otp) => {
  try {
    let otpSaveObject = {
        otp : otp,
        mobile : mobile,
        email : email,
        expires : moment().add(config.jwt.otpExpirationMinutes, 'minutes').toDate()
    }
    if(email){
      await sendOTPForgotPassword(email , otp)
    }
    return await Otp.create({...otpSaveObject});    
  } catch (error) {
      console.log(error)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Otp verification failed');
  }
};

/**
 * validate OTP
 * @param {string} id
 * @param {string} otp
 * @returns {Promise}
 */
const validateOtp = async (id , otp) => {
  try {
    let OtpResult = await Otp.findOne( { _id : id , expires : {
        $gte :moment().toDate(),        
    }});
    if(!OtpResult){
        throw new ApiError(httpStatus.NOT_FOUND, 'Otp expired or id not found');
    }
    console.log(OtpResult)

    if(otp !== OtpResult.otp){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Otp not match');
    }

    await Otp.deleteOne({_id : id});
    OtpResult.verified = true;
    return OtpResult;
  } catch (error) {
      console.log(error)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Otp verification failed');
  }
};



module.exports = {
  validateOtp,
  sendOtp
};
