const { number, object } = require('joi');
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
categorySchema.plugin(toJSON);

categorySchema.statics.isNameTaken = async function (name, excludeCategoryId) {
    const category = await this.findOne({ name, _id: { $ne: excludeCategoryId } });
    return !!category;
  };


categorySchema.statics.getAttributes = async function (categoryId) {
  const category = await this.findOne({ categoryId });
  
  return category && category.attributes ? category.attributes : {};
};  
/**
 * @typedef Category
 */
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
