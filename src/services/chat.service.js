const { compareSync } = require('bcryptjs');
const httpStatus = require('http-status');
const { Chat, User } = require('../models');
const ApiError = require('../utils/ApiError');
const mongoose = require('mongoose');
/**
 * Create a chat
 * @param {Object} chatBody
 * @returns {Promise<chat>}
 */
const createChat = async (chatBody) => {
  const chat = await Chat.create({...chatBody});
  return chat;
};

/**
 * Query for chat
 * @param {id} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const getChatBySenderRecieverId = async (body) => {
  const chat = await Chat.find({recieverId : body.recieverId , senderId : body.senderId }).sort('desc');
  return chat;
};

/**
 * Query for chat
 * @param {id} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const getChatByByUser = async (id) => {
  // const chat = await Chat.find({'$or' : [{ senderId : id } , { recieverId : id }]}).populate('recieverId' , {name : 1});
  let chat;
  // chat = await Chat.find({ $or: [ { senderId: id }, { recieverId: id } ] })
  //   .sort({ _id : -1 })
  //   .limit(1)
  //   .populate('recieverId' , {name : 1})
  //   .exec();

  chat = await Chat.aggregate([{
		$match: {
			senderId: mongoose.Types.ObjectId(id)
		}
	}, {
		$group: {
			"_id": "$recieverId"
		}
	}, {
		$project: {
			"recieverId": "$_id",
      "_id": 0,
    },
  }
],(err , res) => {
  console.log(res);
})
  return chat;
};

/**
 * Query for chat
 * @param {id} filter - Mongo filter
 * @returns {Promise<QueryResult>}
 */
const getChatById = async (id) => {
  const chat = await Chat.findById(id);
  return chat;
};


/**
 * Update chat by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Chat>}
 */
const updateChatById = async (id, updateBody) => {
  const chat = await getChatById(id);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  if (updateBody.name && (await Chat.isNameTaken(updateBody.name, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(chat, updateBody);
  await Chat.update( {_id : chat.id} , updateBody);
  return chat;
};

/**
 * Delete Chat by id
 * @param {ObjectId} id
 * @returns {Promise<Chat>}
 */
const deleteChatById = async (id) => {
  const chat = await getChat(id);
  if (!chat) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Chat not found');
  }
  await Chat.remove(chat);
  return chat;
};

module.exports = {
    getChatBySenderRecieverId,
    getChatByByUser,
    getChatById,
    updateChatById,
    createChat,
    deleteChatById
};
