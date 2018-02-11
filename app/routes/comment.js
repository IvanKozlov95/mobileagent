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

router.get('/list', (req, res, next) => {
	var perPage = Number.parseInt(req.query.perpage) || 5;
	var page = Number.parseInt(req.query.page) || 0;
	var postId = req.query.post;
	Comment.find({ 'post': postId })
		.limit(perPage)
		.skip(perPage * page)
		.exec((err, comments) => {
			return err ? next(err) : res.json(comments);
		});
});

module.exports = router;