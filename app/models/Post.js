const mongoose	= require('../lib/mongoose');
const Schema	= mongoose.Schema;

var	PostSchema = new Schema({
	title: { type: String, required: true },
	text: { type: String, required: true },
	creator: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

mongoose.model('Post', PostSchema);