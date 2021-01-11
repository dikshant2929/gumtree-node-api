const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const chatValidation = require('../../validations/chat.validation');
const chatController = require('../../controllers/chat.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('addChat'), validate(chatValidation.createChat), chatController.createChat)
  .get(auth('getChat'), validate(chatValidation.getChat), chatController.getChat);

router
  .route('/user')
  .post(auth('getChat') , validate(chatValidation.getChat), chatController.getChat)

router
  .route('/user/:userId')
  .post(auth('getChat'), validate(chatValidation.getChats), chatController.getChats)


router
  .route('/:chatId')
  .patch(auth('manageChat'), validate(chatValidation.updateChat), chatController.updateChat)
  .delete(auth('manageChat'), validate(chatValidation.deleteChat), chatController.deleteChat)

  
module.exports = router;
