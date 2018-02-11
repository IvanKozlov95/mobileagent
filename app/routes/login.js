const router	= require('express').Router();
const passport	= require('passport');
const mongoose	= require('mongoose');
const auth		= require('../middleware/authentication');
const Errors	= require('../lib/error');
const User		= mongoose.model('User');

router.post('/', auth.isAnon, function(req, res, next) {
  passport.authenticate('local',
	function(err, user, info) {
	  if (err) return next(err);
	  if (user) {
		req.logIn(user, function(err) {
		  return err
			? next(err)
			: res.send('Successful login.');
		});
	  } else {
	  	return next(new Errors.BadRequestError('Unknown user.'))
	  } 
	}
  )(req, res, next);
});

module.exports = router;