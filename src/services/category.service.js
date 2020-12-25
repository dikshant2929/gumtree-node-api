const { compareSync } = require('bcryptjs');
const httpStatus = require('http-status');
const { Category, User } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<category>}
 */
const createCategory = async (categoryBody) => {
  if (await Category.isNameTaken(categoryBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const category = await Category.create({...categoryBody});
  return category;
};

/**
 * Query for category
 * @param {id} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const getCategory = async (id) => {
  const users = id ? Category.findById(id) : Category.find();
  return users;
};


/**
 * Update category by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (id, updateBody) => {
  const category = await getCategory(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  if (updateBody.name && (await Category.isNameTaken(updateBody.name, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(category, updateBody);
  await Category.update( {_id : category.id} , updateBody);
  return category;
};

/**
 * Delete Category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (id) => {
  const category = await getCategory(id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await Category.remove(category);
  return category;
};

module.exports = {
    getCategory,
    updateCategoryById,
    createCategory,
    deleteCategoryById
};
