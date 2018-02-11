const router	= require('express').Router();
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const User		= mongoose.model('User');

router.get('/list', auth.isAdmin, (req, res, next) => {
	var perPage = Number.parseInt(req.query.perpage) || 2;
	var page = Number.parseInt(req.query.page) || 0;
	User.find()
		.limit(perPage)
		.skip(perPage * page)
		.exec((err, users) => {
			return err ? next(err) : res.json(users);
		});
});

module.exports = router;