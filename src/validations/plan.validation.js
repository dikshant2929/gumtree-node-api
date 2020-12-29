const Joi = require('joi');
const { objectId , url } = require('./custom.validation');

const createPlan = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    time_period : Joi.number(),
    imgUrl : Joi.string().custom(url),
    price : Joi.number(),
    attributes : Joi.object(),
    active : Joi.boolean()
  }),
};

const getPlan = {
  params: Joi.object().keys({
    planId: Joi.string().custom(objectId)
  }),
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
    active : Joi.boolean()
  }),
};

const updatePlan = {
  params: Joi.object().keys({
    planId: Joi.string().custom(objectId)
  }),
  body: Joi.object()
    .keys({
        title: Joi.string(),
        description: Joi.string(),
        time_period : Joi.number(),
        imgUrl : Joi.string().custom(url),
        price : Joi.number(),
        attributes : Joi.object(),
        active : Joi.boolean()
    })
    .min(1),
};


module.exports = {
  createPlan,
  getPlan,
  updatePlan,
};
