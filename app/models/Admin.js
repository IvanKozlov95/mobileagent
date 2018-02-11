const mongoose	= require('../lib/mongoose');
const Schema	= mongoose.Schema;
const User		= mongoose.model('User');

let	AdminSchema = new Schema({});

User.discriminator('Admin', AdminSchema);