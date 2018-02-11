exports.isAdmin = function(req, res, next) {
	(req.isAuthenticated() && req.user.__t == 'Admin')
		? next()
		: res.send('Sorry, you\'re not an admin');
}

exports.isAuthenticated = function (req, res, next){
	req.isAuthenticated()
		? next()
		: res.redirect('/');
};