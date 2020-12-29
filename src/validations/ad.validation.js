const Joi = require('joi');
const { objectId , url } = require('./custom.validation');

const createAd = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price : Joi.number(),
    category : Joi.string().custom(objectId).required(),
    user : Joi.string().custom(objectId).required(),
    coverImage : Joi.string().custom(url),
    images : Joi.array(),
    attributes : Joi.object(),
    address : Joi.object(),
    tags : Joi.array()
  }),
};

const getAd = {
  query: Joi.object().keys({
    adId: Joi.string().custom(objectId),
    active : Joi.boolean(),
    is_deleted : Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()  
  }),
};

const updateAd = {
  params: Joi.object().keys({
    adId: Joi.string().custom(objectId)
}),
  body: Joi.object()
    .keys({
        title: Joi.string(),
        description: Joi.string(),
        price : Joi.number(),
        coverImage : Joi.string().custom(url),
        images : Joi.array(),
        attributes : Joi.object(),
        address : Joi.object(),
        active : Joi.boolean(),
        is_deleted : Joi.boolean()
    })
    .min(1),
};

const approveAd = {
  params: Joi.object().keys({
    adId: Joi.string().custom(objectId)
}),
  body: Joi.object()
    .keys({
      status : Joi.string()
    })
    .min(1),
};

const deleteAd = {
  params: Joi.object().keys({
    adId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAd,
  getAd,
  updateAd,
  deleteAd,
  approveAd
};
