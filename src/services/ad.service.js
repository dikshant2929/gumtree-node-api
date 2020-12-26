
const httpStatus = require('http-status');
const { email } = require('../config/config');
const { Ad } = require('../models');
const ApiError = require('../utils/ApiError');
const {commonCheck , checkEmptyObject} = require('../utils/globals');
const pick = require('../utils/pick');

const categoryService = require('./category.service');
const userService = require('./user.service');

/**
 * Create am ad
 * @param {Object} adBody
 * @param {string} [adBody.title] - title of ad
 * @param {string} [adBody.description] - description of ad
 * @param {string} [adBody.user] - Id of user posting ad
 * @param {string} [adBody.coverImage] - coverimage of ad
 * @param {Array} [adBody.images] - array of images
 * @param {object} [adBody.address] - address of position of ad
 * @param {object} [adBody.attributes] - attributes in case of autoMobi and real estate
 * @returns {Promise<Ad>}
 */
const createAd = async (adBody) => {
    const user = await userService.getUserById(adBody.user);
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const category = await categoryService.getCategory(adBody.category);
    if(!category){
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    let result = '';
    // check for attributes validation
    if(category.attributes && !checkEmptyObject(category.attributes)){
        for (var key in category.attributes) {
            if (category.attributes.hasOwnProperty(key)) {
                result += commonCheck(adBody.attributes , category.attributes[key] , key);
                if(!result)
                    result = '';
            }
        }
    } else {
        delete adBody.attributes;
    }
    
    if(result){
        throw new ApiError(httpStatus.NOT_FOUND, "Missing paramenters :-- " + result);        
    }

    const ad = await Ad.create({...adBody});
    return ad;
};

/**
 * Query for users
 * @param {id} filter - adId for ad detail
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAd = async (filter , options) => {
    const ads = Ad.paginate(filter, options);
    return ads;
};

/**
 * get ad by id
 * @param {ObjectId} id
 * @returns {Promise<Ad>}
 */

const getAdById =  async (id) => {
    const data = await Ad.find({_id : id}).populate('user', {'email' : 1 , 'status' : 1 , 'name' : 1}).populate('category' , {'name' : 1}).exec();
    // let ads = await Ad.findById(id);
    // if(!ads){
    //     throw new ApiError(httpStatus.NOT_FOUND, 'Ad not found');
    // }
    // need to concanate this in ads
    // let user = await userService.getUserById(ads.userId);
    
    return data;
};

/**
 * Update ad by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Ad>}
 */
const updateAdById = async (id, updateBody) => {
  const ad = await Ad.findById(id);
  if (!ad) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ad not found');
  }
  if (updateBody.categoryId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category cannot be changed');
  }
  Object.assign(ad, updateBody);
  await Ad.update( {_id : ad.id} , updateBody);
  return ad;
};

/**
 * Delete Ad by id
 * @param {ObjectId} id
 * @returns {Promise<Ad>}
 */
const deleteAdById = async (id) => {
  const ad  = await updateAdById(id , {is_deleted : true})
  return { message : "Ad deleted successfully" , status : true};
};

module.exports = {
    getAd,
    getAdById,
    updateAdById,
    createAd,
    deleteAdById
};
