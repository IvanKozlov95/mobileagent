require('./app/models');

const app			= require('express')();
const session		= require('express-session');
const MongoClient	= require('mongodb').MongoClient;
const bodyParser	= require('body-parser');
const passport		= require('passport');
const config		= require('./config');
const mongoose		= require('./app/lib/mongoose');
const MongoStore	= require('connect-mongo')(session);
const Routes		= require('./app/routes');
const Errors		= require('./app/lib/error');
const port = config.get('port');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	secret: 'SECRET',
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
require('./app/lib/passport')(passport);

/*
*	Loading routes
*/
app.use('/login', Routes.login);
app.use('/register', Routes.register);
app.use('/posts', Routes.posts);
app.use('/comment', Routes.comment);
app.use('/user', Routes.user);

/*
*	Errors handling
*/
app.use((err, req, res, next) => {
	if (err instanceof Errors.MyError) {
		res.status(err.status).send(err.message).end();
	} else {
		console.log(err);
		res.status(500).end();
	}
});

app.listen(port, () => {
  console.log('We are live on ' + port);
});