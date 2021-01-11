const { number, object, boolean } = require('joi');
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const chatSchema = mongoose.Schema(
  {
    senderId : {
        type: mongoose.Schema.ObjectId,
        ref : 'User',
        required: true,
        default: null,
    },
      
    recieverId : {
        type: mongoose.Schema.ObjectId,
        ref : 'User',
        required: true,
        default: null,
    },
    text :{
      type : String,
      required : true
    },
    type :{
      type : String,
      default : "text"
    },
    isRead : {
        type : Boolean,
        default : false
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON);


chatSchema.pre('save', async function (next) {
    const chat = this;
    next();
});
  
/**
 * @typedef Chat
 */
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
