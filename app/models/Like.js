const mongoose	= require('../lib/mongoose');
const Schema	= mongoose.Schema;

var	LikeSchema = new Schema({
	user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
	value: Boolean
});

mongoose.model('Like', LikeSchema);