const router	= require('express').Router();
const passport	= require('passport');
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const util		= require('../lib/util');
const Errors	= require('../lib/error');
const ObjectId	= require('mongoose').Types.ObjectId;
const Post		= mongoose.model('Post');
const Like		= mongoose.model('Like');

router.post('/create', auth.isAdmin, async (req, res, next) => {
	let post = new Post({
		title: req.body.title,
		text: req.body.text,
		creator: req.user._id
	})
	try {
		util.checkText(post.text);
		await post.save();
	} catch (e) {
		next(e);
	};
	res.send('Post created');
});

router.post('/like', auth.isAuthenticated, async (req, res, next) => {
	let postId = req.body.post;
	try {
		util.checkObjectId(postId);
		if (await Post.findById(postId) == null) throw new Errors.ObjectNotFound('Post');
		let like = await Like.findOne({ 'user': req.user._id, 'post': postId });
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
	res.send('Post has been liked!');
});

router.post('/edit', auth.isAdmin, async (req, res, next) => {
	let postId = req.body.post;
	try {
		util.checkObjectId(postId);
		util.checkText(req.body.text);
		let post = await Post.findById(postId);
		if (post) {
			post.text = req.body.text;
			await post.save();
		} else {
			throw new Errors.ObjectNotFound('Post');
		}
	} catch (e) {
		return next(e);
	}
	res.send('Post has been updated');
});

router.get('/list', async (req, res, next) => {
	let perPage = Number.parseInt(req.query.perpage) || 5;
	let page = Number.parseInt(req.query.page) || 0;
	try {
		let posts = await Post.find()
				.limit(perPage)
				.skip(perPage * page)
				.lean();
	} catch (e) {
		return next(err);
	}
	res.json(posts);
});

router.get('/info', async (req, res, next) => {
	try {
		util.checkObjectId(req.query.id);
		let post = await Post.findById(req.query.id);
	} catch (e) {
		return next(e);
	}
	post ? res.json(post) : util._throw(new Errors.ObjectNotFound('Post'));
});

module.exports = router;