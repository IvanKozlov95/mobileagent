const router	= require('express').Router();
const passport	= require('passport');
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const Comment	= mongoose.model('Comment');

router.post('/add', auth.isAuthenticated, (req, res, next) => {
	var postId = req.body.post;
	var comment = new Comment({
		user: req.user._id,
		post: postId,
		text: req.body.text
	});
	comment.save((err) => {
		err ? next(err) : res.send('Comment created');
	});
});

router.post('/edit', auth.isAdmin, (req, res, next) => {
	var commentId = req.body.comment;
	Comment.findById(commentId, (err, comment) => {
		if (err) return next(err);

		if (comment) {
			comment.text = req.body.text;
			comment.save((err) => {
				return err ? next(err) : res.send('Comment has been updeate');
			});
		} else {
			res.status(404).end()
		}
	});
});

router.post('/delete', auth.isAdmin, (req, res, next) => {
	var commentId = req.body.comment;
	Comment.findById(commentId, (err, comment) => {
		if (err) return next(err);

		if (comment) {
			comment.isDeleted = true;
			comment.save((err) => {
				return err ? next(err) : res.send('Comment has been deleted');
			});
		} else {
			res.status(404).end();
		}
	});
});

router.get('/list', (req, res, next) => {
	var perPage = Number.parseInt(req.query.perpage) || 5;
	var page = Number.parseInt(req.query.page) || 0;
	var postId = req.query.post;
	Comment.find({ 'post': postId })
		.where('isDeleted').ne(true)
		.limit(perPage)
		.skip(perPage * page)
		.exec((err, comments) => {
			return err ? next(err) : res.json(comments);
		});
});

module.exports = router;