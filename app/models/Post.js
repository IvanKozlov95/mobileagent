const mongoose	= require('../lib/mongoose');
const Schema	= mongoose.Schema;

var	PostSchema = new Schema({
	title: { type: String, required: true },
	text: { type: String, required: true },
	creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	likes: Number,
	dislikes: Number
});

mongoose.model('Post', PostSchema);