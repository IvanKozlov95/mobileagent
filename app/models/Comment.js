const mongoose	= require('../lib/mongoose');
const Schema	= mongoose.Schema;

var	CommentSchema = new Schema({
	user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
	text: String
});

mongoose.model('Comment', CommentSchema);