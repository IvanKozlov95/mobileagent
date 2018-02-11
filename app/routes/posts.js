const router	= require('express').Router();
const passport	= require('passport');
const mongoose	= require('mongoose');
const Post		= mongoose.model('Post');

router.post('/create', (req, res, next) => {
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

module.exports = router;