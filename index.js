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

app.listen(port, () => {
  console.log('We are live on ' + port);
});