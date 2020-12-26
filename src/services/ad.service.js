
const httpStatus = require('http-status');
const { Ad } = require('../models');
const ApiError = require('../utils/ApiError');
const {commonCheck , checkEmptyObject} = require('../utils/globals');

const categoryService = require('./category.service');
const userService = require('./user.service');
/**
 * Create am ad
 * @param {Object} adBody
 * @param {string} [adBody.title] - title of ad
 * @param {string} [adBody.description] - description of ad
 * @param {string} [adBody.userId] - Id of user posting ad
 * @param {string} [adBody.coverImage] - coverimage of ad
 * @param {Array} [adBody.images] - array of images
 * @param {object} [adBody.address] - address of position of ad
 * @param {object} [adBody.attributes] - attributes in case of autoMobi and real estate
 * @returns {Promise<Ad>}
 */
const createAd = async (adBody) => {
    const user = await userService.getUserById(adBody.userId);
    if(!user){
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const category = await categoryService.getCategory(adBody.categoryId);
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
const getAd = async (id , filter , options) => {
    // filter.active = true; filter.is_deleted = false;
    const ads = id ? Ad.findById(id) : Ad.paginate(filter, options);
    return ads;
};


/**
 * Update ad by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Ad>}
 */
const updateAdById = async (id, updateBody) => {
  const ad = await getAd(id);
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
    updateAdById,
    createAd,
    deleteAdById
};
