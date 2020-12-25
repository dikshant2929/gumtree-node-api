const { number } = require('joi');
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    fieldType: {
        type: String,
        default: "generic",
    },
    iconUrl : {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);

categorySchema.statics.isNameTaken = async function (name, excludeCategoryId) {
    const category = await this.findOne({ name, _id: { $ne: excludeCategoryId } });
    return !!category;
  };
  
/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
