const router	= require('express').Router();
const passport	= require('passport');
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const User		= mongoose.model('User');

router.post('/', auth.isAnon, function(req, res, next) {
	var user = new User( { 
			username: req.body.username,
			password: req.body.password,
		} );

	console.log(req.body);
	user.save(function(err) {
		if (err instanceof mongoose.Error.ValidationError){
			console.log(err.toString());
			res.status(400).end();
		}

		// If err.code == 11000 this is duplicate key error
		// that means that user already exists
		if (err && 	err.code == 11000) {
			return res.status(400).end();
		}

		return err 
		?  next(err)
		  : req.logIn(user, function(err) {
		    return err
		      ? next(err)
		      : res.status(200).end();
		  });
		});
});

module.exports = router;