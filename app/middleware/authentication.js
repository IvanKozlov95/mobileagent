const Errors	= require('../lib/error');

exports.isAdmin = function(req, res, next) {
	(req.isAuthenticated() && req.user.__t == 'Admin')
		? next()
		: next(new Errors.UnauthorizedAcsess('Sorry, you\'re not an admin'));
};

exports.isAuthenticated = function (req, res, next){
	req.isAuthenticated()
		? next()
		: next(new Errors.UnauthorizedAcsess('You must sign in.'));
};

exports.isAnon = function(req, res, next) {
	req.isAuthenticated()
		? next(new Errors.UnauthorizedAcsess('You\'re alredy authorized.'))
		: next();
}