const { number, object } = require('joi');
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const planSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    imgUrl : {
      type: String,
      default: null,
    },
    description : {
        type: String,
        default: null,
    },
    time_period : {
        type: Number,
        default: null,
    },
    price : {
        type: Number,
        default: 0,
    },
    active : {
        type: Boolean,
        default: true,
    },
    attributes :{
      type : Object,
      default : {}
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
planSchema.plugin(toJSON);

planSchema.statics.isNameTaken = async function (name, excludePlanId) {
    const plan = await this.findOne({ name, _id: { $ne: excludePlanId } });
    return !!plan;
  };


planSchema.statics.getAttributes = async function (planId) {
  const plan = await this.findOne({ planId });
  
  return plan && plan.attributes ? plan.attributes : {};
};  
/**
 * @typedef Plan
 */
const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
