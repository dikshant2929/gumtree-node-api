const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { chatService } = require('../services');

const createChat = catchAsync(async (req, res) => {
  const chat = await chatService.createChat(req.body);
  res.status(httpStatus.CREATED).send(chat);
});

const getChat = catchAsync(async (req, res) => {
  
  const result = await chatService.getChatBySenderRecieverId(req.body);
  res.send(result);
});

const getChats = catchAsync(async (req, res) => {
  
  const result = await chatService.getChatByByUser(req.params.userId);
  res.send(result);
});

const updateChat = catchAsync(async (req, res) => {
  const chat = await chatService.updateChatById(req.params.chatId, req.body);
  res.send(chat);
});

const deleteChat = catchAsync(async (req, res) => {
  await chatService.deleteChatById(req.params.chatId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createChat,
  getChat,
  getChats,
  updateChat,
  deleteChat,
};
