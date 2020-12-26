const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createAd = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price : Joi.number(),
    categoryId : Joi.string().custom(objectId).required(),
    userId : Joi.string().custom(objectId).required(),
    coverImage : Joi.string(),
    images : Joi.array(),
    attributes : Joi.object(),
    address : Joi.object()
  }),
};

const getAd = {
  query: Joi.object().keys({
    adId: Joi.string().custom(objectId)
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
        coverImage : Joi.string(),
        images : Joi.array(),
        attributes : Joi.object(),
        address : Joi.object(),
        active : Joi.boolean(),
        is_deleted : Joi.boolean()
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
};
