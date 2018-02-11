const mongoose	= require('mongoose');
const Errors	= require('../lib/error');
const Post		= mongoose.model('Post');
const Like		= mongoose.model('Like');

class PostMiddleware {
	static async create(req, res, next) {
		let post = new Post({
			title: req.body.title,
			text: req.body.text,
			creator: req.user._id
		})
		try {
			await post.save();
		} catch (e) {
			next(e);
		};
		res.send('Post created');
	}

	static async update(req, res, next) {
		try {
			let post = await Post.findById(req.body.post);
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
	}

	static async like(req, res, next) {
		let postId = req.body.post;
		let value = req.body.value || true
		try {
			if (await Post.findById(postId) == null) throw new Errors.ObjectNotFound('Post');
			let like = await Like.findOne({ 'user': req.user._id, 'post': postId });
			if (like) {
				like.value = value;
			} else {
				like = new Like({
					user: req.user._id,
					post: postId,
					value: value
				});
			}
			await like.save();
		} catch (e) {
			return next(e);
		}
		res.send('Post has been liked!');
	}

	static async getList(req, res, next) {
		let perPage = Number.parseInt(req.query.perpage) || 5;
		let page = Number.parseInt(req.query.page) || 0;
		try {
			var posts = await Post.find()
					.limit(perPage)
					.skip(perPage * page)
					.lean();
		} catch (e) {
			return next(e);
		}
		res.json(posts);
	}

	static async fetch(req, res, next) {
		try {
			var post = await Post.findById(req.query.id);
		} catch (e) {
			return next(e);
		}
		post ? res.json(post) : util._throw(new Errors.ObjectNotFound('Post'));
	}
}

module.exports = PostMiddleware;