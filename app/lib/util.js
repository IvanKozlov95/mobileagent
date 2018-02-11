const ObjectId	= require('mongoose').Types.ObjectId;
const Errors	= require('./error');

module.exports._throw = function (error) {
	throw error;
}

module.exports.checkObjectId = function (id) {
	if (!ObjectId.isValid(id)) throw new Errors.BadRequest('Object id is not correct');
}

module.exports.checkText = function (text) {
	if (text == '' || text == undefined) throw new Errors.BadRequest('Text cannot be empty');
}