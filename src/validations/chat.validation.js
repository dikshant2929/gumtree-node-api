const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createChat = {
  body: Joi.object().keys({
    senderId: Joi.string().required().custom(objectId),
    recieverId: Joi.string().required().custom(objectId),
    isRead: Joi.boolean(),
    text : Joi.string().required(),
    type : Joi.string().required(),
    adId: Joi.string().custom(objectId),
  }),
};

const getChat = {
  
    body: Joi.object()
    .keys({
        recieverId: Joi.string().required().custom(objectId),
        senderId: Joi.string().required().custom(objectId)
    })
};

const getChats = {
  
  params: Joi.object()
  .keys({
      userId: Joi.string().required().custom(objectId)
  })
};

const updateChat = {
  params: Joi.object().keys({
    chatId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        isRead: Joi.boolean().required(),
    })
};

const deleteChat = {
    params: Joi.object().keys({
      chatId: Joi.required().custom(objectId),
    })
};


module.exports = {
  createChat,
  getChat,
  getChats,
  updateChat,
  deleteChat
};
