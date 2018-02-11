const router	= require('express').Router();
const passport	= require('passport');
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const ObjectId	= require('mongoose').Types.ObjectId;
const util		= require('../util/util');
const Comment	= mongoose.model('Comment');
const Post		= mongoose.model('Post');

router.post('/add', auth.isAuthenticated, async (req, res, next) => {
	var comment = new Comment({
		user: req.user._id,
		post: req.body.post,
		text: req.body.text
	});
	try {
		if (!ObjectId.isValid(comment.post)) throw new Error('My error');
		var post = await Post.findById(comment.post);
		post ? await comment.save() : _throw(new Error('My Error'));
	} catch (e) {
		return next(e);
	}
	res.send('Comment created');
});

router.post('/edit', auth.isAdmin, async (req, res, next) => {
	var commentId = req.body.comment;
	try {
		if (!ObjectId.isValid(commentId)) throw new Error('My error');
		var comment = await Comment.findById(commentId);
		if (comment) {
			await comment.update({ text: req.body.text });
		} else {
			res.status(404).end();
		}
	} catch (e) {
		return next(e);
	}
	res.send('Comment has been updated');
});

router.post('/delete', auth.isAdmin, async (req, res, next) => {
	var commentId = req.body.comment;
	try {
		if (!ObjectId.isValid(commentId)) throw new Error('My error');
		var comment = await Comment.findById(commentId);
		if (comment) {
			await comment.update({ isDeleted: true });
		} else {
			res.status(404).end();
		}
	} catch (e) {
		return next(e);
	}
	res.send('Comment has been deleted');
});

router.get('/list', async (req, res, next) => {
	var perPage = Number.parseInt(req.query.perpage) || 5;
	var page = Number.parseInt(req.query.page) || 0;
	var postId = req.query.post;
	try {
		if (!ObjectId.isValid(postId)) throw new Error('My error');
		var comments = await Comment.find({ 'post': postId })
			.where('isDeleted').ne(true)
			.limit(perPage)
			.skip(perPage * page)
			.exec();
	} catch (e) {
		return next(err);
	}
	res.json(comments);
});

module.exports = router;