const mongoose	= require('../lib/mongoose');
const Schema	= mongoose.Schema;
const crypto	= require('crypto');

var	UserSchema = new Schema({
	username: { type: String, unique: true, required: true },
	passwordHash: { type: String, required: true },
	salt: { type: String, required: true }
});

UserSchema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

UserSchema.methods.checkPassword = function(password) {
	return this.encryptPassword(password) == this.passwordHash;
};

UserSchema.virtual('password')
	.set(function(password) {
		this.salt = Math.random() + '';
		this.passwordHash = this.encryptPassword(password);
	});

mongoose.model('User', UserSchema);