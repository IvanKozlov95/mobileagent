const mongoose	= require('../lib/mongoose');
const Schema	= mongoose.Schema;

let	CommentSchema = new Schema({
	user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
	post: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
	text: String,
	isDeleted: { type: Boolean, default: false }
});

CommentSchema.method.update = async (data) => {
	for (field in data) {
		this[field] = data[field];
	}
	await this.save();
}

mongoose.model('Comment', CommentSchema);