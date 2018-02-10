const mongoose	= require('../lib/mongoose');
const Schema	= mongoose.Schema;
const crypto	= require('crypto');

var	UserBaseSchema = new Schema({
	username: { type: String, unique: true, required: true },
	passwordHash: { type: String, required: true },
	salt: { type: String, required: true }
});

UserBaseSchema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

UserBaseSchema.methods.checkPassword = function(password) {
	return this.encryptPassword(password) == this.passwordHash;
};

UserBaseSchema.virtual('password')
	.set(function(password) {
		this.salt = Math.random() + '';
		this.passwordHash = this.encryptPassword(password);
	});

mongoose.model('UserBase', UserBaseSchema);