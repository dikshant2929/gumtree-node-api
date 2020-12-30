/**
 * check properties inside an object
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const commonCheck = (req, req_data, key) => {
	key = key || 'body';
	if(!req_data.length) {
		return '';
	}
	let blank_array = [];
	for(let count = 0; count < req_data.length; count++) {
		if( !req[key] ||
			req[key][req_data[count]] === 'undefined'   ||
			req[key][req_data[count]] === undefined   ||
			req[key][req_data[count]] === null   ||
			(typeof req[key][req_data[count]] == 'string' && req[key][req_data[count]].trim() == "") ||
			req[key][req_data[count]] === " " || 
			req[key][req_data[count]] === "") {
			blank_array.push(req_data[count]);
		}
	}
	if(blank_array.length) {
		return blank_array.join(', ');
	}
	return '';
}

/**
 * check if object is empty
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */

const checkEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}


/**
 * remove fields from object 
 * @param {string[]} fields
 * @param {Object} object
 * @returns {Object}
 */

const removeFieldFromObj = (fields , obj) => {
	fields && fields.length && fields.forEach(element => {
		obj[element] = undefined;
	});
	return obj;
  }

module.exports = {
    commonCheck,
	checkEmptyObject,
	removeFieldFromObj
}