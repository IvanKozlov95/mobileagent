const router	= require('express').Router();
const passport	= require('passport');
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const Errors	= require('../lib/error');
const User		= mongoose.model('User');

router.post('/', auth.isAnon, async function(req, res, next) {
	let user = new User( { 
			username: req.body.username,
			password: req.body.password,
		} );

	try {
		await user.save();
		req.logIn(user, (err) => {
			if (err) {
				throw err;
			} else {
				res.status(200).send('You\'ve signed up!');
			}
		});
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError){
			return next(new Errors.BadRequest());
		}

		// If err.code == 11000 this is duplicate key error
		// that means that user already exists
		if (e.code == 11000) {
			return next(new Errors.BadRequest('User exists'));
		}

		return next(e);
	}
});

module.exports = router;