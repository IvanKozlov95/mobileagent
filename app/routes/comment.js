const router	= require('express').Router();
const passport	= require('passport');
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const Post		= mongoose.model('Post');
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

module.exports = router;