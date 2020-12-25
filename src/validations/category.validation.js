const Joi = require('joi');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    status: Joi.number(),
    fieldType : Joi.string(),
    iconUrl : Joi.string()
  }),
};

const getCategory = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId)
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
}),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      status : Joi.number(),
      iconUrl : Joi.string()
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
