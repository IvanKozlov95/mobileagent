var passport		= require('passport');
var LocalStrategy	= require('passport-local').Strategy;
var mongoose		= require('./mongoose');

function initPassport() {
	passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	}, function(username, password, done){
		console.log("Authentification request. Name: " + username + ', pass: ' + password);
		User.findOne({ username : username},function(err, user){
			if (err) return done(err);

			if (user && user.checkPassword(password)) {
				done(null, user);
			} else {
				console.log('Authentification request failed.');
				done(null, false, { message: 'Cannot find user like that.'})
			};
		});
	}));
}

module.exports = initPassport;