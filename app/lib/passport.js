const passport		= require('passport');
const LocalStrategy	= require('passport-local').Strategy;
const mongoose		= require('./mongoose');
const User			= mongoose.model('User');


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

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err,user){
		err 
			? done(err)
			: done(null, user);
	});
});

module.exports = initPassport;