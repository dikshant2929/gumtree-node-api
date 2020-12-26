const mongoose = require('mongoose');
const { toJSON , paginate } = require('./plugins');

const adSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      default: 1,
    },
    price: {
        type: Number,
        default: 0,
    },
    categoryId : {
      type: String,
      required: true,
      default: null,
    },
    active :{
      type : Boolean,
      default : true
    },
    is_deleted :{
        type : Boolean,
        default : false
    },
    userId : {
		type : String,
		required: true,
		default : null,
	},
	coverImage : {
        type : String,
        default : null,
	},
	images : {
		type : Array,
		default : []
	},
	address : {
		type : Object,
		default : {}
	},
	attributes : {
		type : Object,
		default : {}
	}
	
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
adSchema.plugin(toJSON);
adSchema.plugin(paginate);
  
  
/**
 * @typedef Ad
 */
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
