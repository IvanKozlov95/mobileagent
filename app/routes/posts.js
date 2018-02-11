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
});

router.post('/edit', auth.isAdmin, (req, res, next) => {
	var postId = req.body.post;

	Post.findById(postId, (err, post) => {
		if (err) return next(err);

		if (post) {
			post.text = req.body.text;
			post.save((err) => {
				return err ? next(err) : res.send('Post has been updated');
			});
		} else {
			res.status(404).end();
		}
	});
});

router.get('/list', (req, res, next) => {
	var perPage = Number.parseInt(req.query.perpage) || 5;
	var page = Number.parseInt(req.query.page) || 0;
	Post.find()
		.limit(perPage)
		.skip(perPage * page)
		.exec((err, posts) => {
			return err ? next(err) : res.json(posts);
		});
});

router.get('/info', (req, res, next) => {
	var postId = req.query.id;

	Post.findById(postId, (err, post) => {
		if (err) return next(err);

		if (post) {
			res.json(post);
		} else {
			res.status(404).end();
		}
	});
});

module.exports = router;