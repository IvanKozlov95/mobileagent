const router	= require('express').Router();
const passport	= require('passport');
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const Post		= mongoose.model('Post');
const Like		= mongoose.model('Like');

router.post('/create', auth.isAdmin, (req, res, next) => {
	var post = new Post({
		title: req.body.title,
		text: req.body.text,
		creator: req.user._id,
		likes: 0,
		dislikes: 0
	})
	console.log(req.body);
	console.log(req.user);
	post.save((err) => {
		err ? next(err) : res.send('Post created');
	});
});

router.post('/like', auth.isAuthenticated, (req, res, next) => {
	var postId = req.body.post;
	Like.findOne({ 'user': req.user._id, 'post': postId }, (err, like) => {
		if (err) return next(err);

		if (like) {
			like.value = req.body.value;
		} else {
			like = new Like({
				user: req.user._id,
				post: postId,
				value: req.body.value
			});
		}
		like.save((err) => {
			return err ? next(err) : res.send('Like has been updated');
		});
	})
})

module.exports = router;