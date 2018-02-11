const router	= require('express').Router();
const passport	= require('passport');
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const Errors	= require('../lib/error');
const User		= mongoose.model('User');

router.post('/', auth.isAnon, function(req, res, next) {
	var user = new User( { 
			username: req.body.username,
			password: req.body.password,
		} );

	user.save(function(err) {
		if (err instanceof mongoose.Error.ValidationError){
			return next(new Errors.BadRequest());
		}

		// If err.code == 11000 this is duplicate key error
		// that means that user already exists
		if (err && 	err.code == 11000) {
			return next(new Errors.BadRequest('User exists'));
		}

		return err 
		?  next(err)
		  : req.logIn(user, function(err) {
		    return err
		      ? next(err)
		      : res.status(200).send('You\'ve signed up!');
		  });
		});
});

module.exports = router;