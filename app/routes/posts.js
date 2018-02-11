const router	= require('express').Router();
const passport	= require('passport');
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const util		= require('../lib/util');
const ObjectId	= require('mongoose').Types.ObjectId;
const Post		= mongoose.model('Post');
const Like		= mongoose.model('Like');

router.post('/create', auth.isAdmin, async (req, res, next) => {
	var post = new Post({
		title: req.body.title,
		text: req.body.text,
		creator: req.user._id
	})
	try {
		await post.save();
	} catch (e) {
		next(err);
	};
	res.send('Post created');
});

router.post('/like', auth.isAuthenticated, async (req, res, next) => {
	var postId = req.body.post;
	try {
		if (!ObjectId.isValid(postId)) throw new Error('My error');
		if (await Post.findById(postId) == null) throw new Error('400');
		var like = await Like.findOne({ 'user': req.user._id, 'post': postId });
		if (like) {
			like.value = req.body.value || true;
		} else {
			like = new Like({
				user: req.user._id,
				post: postId,
				value: req.body.value
			});
		}
		await like.save();
	} catch (e) {
		return next(e);
	}
	res.send('like asdasdasd');
});

router.post('/edit', auth.isAdmin, async (req, res, next) => {
	var postId = req.body.post;
	try {
		if (!ObjectId.isValid(req.query.id)) throw new Error('My error');
		var post = await Post.findById(req.query.id);
		if (post) {
			post.text = req.body.text;
			await post.save();
		} else {
			res.status(404).end();
		}
	} catch (e) {
		return next(e);
	}
	res.send('Post has been updated');
});

router.get('/list', async (req, res, next) => {
	var perPage = Number.parseInt(req.query.perpage) || 5;
	var page = Number.parseInt(req.query.page) || 0;
	try {
		var posts = await Post.find()
				.limit(perPage)
				.skip(perPage * page)
				.exec();
	} catch (e) {
		return next(err);
	}
	res.json(posts);
});

router.get('/info', async (req, res, next) => {
	try {
		if (!ObjectId.isValid(req.query.id)) throw new Error('My error');
		var post = await Post.findById(req.query.id);
	} catch (e) {
		return next(e);
	}
	post ? res.json(post) : res.status(404).end();
});

module.exports = router;