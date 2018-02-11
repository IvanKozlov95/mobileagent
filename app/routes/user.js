const router	= require('express').Router();
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const User		= mongoose.model('User');

router.get('/list', auth.isAdmin, async (req, res, next) => {
	var perPage = Number.parseInt(req.query.perpage) || 5;
	var page = Number.parseInt(req.query.page) || 0;
	try {
		var users = await User.find()
				.limit(perPage)
				.skip(perPage * page)
				.select('username')
				.exec();
	} catch (e) {
		return next(err);
	}
	res.json(users);
});

router.get('/logout', (req, res, next) => {
	req.logout();
	res.send('You\'ve signed out');
})

module.exports = router;