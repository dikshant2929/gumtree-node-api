const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const otpSchema = mongoose.Schema(
  {
    mobile: {
      type: String,
      // required: true,
      trim: true,
      validate(value) {
        if (!value.match(/[0-9]/)) {
          throw new Error('mobile number must be numeric');
        }
      }
    },
    email: {
      type: String,
      default: null
    },
    otp: {
      type: String,
      default: '0000'
    },
    verified: {
      type: Boolean,
      default: false
    },
    expires : {
      type : Date,
      required: true
    }
  }
);

// add plugin that converts mongoose to json
otpSchema.plugin(toJSON);

/**
 * Check if OTP matches the otp's OTP
 * @param {string} otp
 * @returns {Promise<boolean>}
 */
otpSchema.methods.isOtpMatch = async function (ot) {
  const otp = this;
  return ot === otp.otp;
};

otpSchema.pre('save', async function (next) {
  const otp = this;
  
  next();
});

/**
 * @typedef Otp
 */
const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
