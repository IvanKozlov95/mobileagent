var mongoose = require('./app/lib/mongoose'),
	async 	 = require('async');

function open(cb){
	mongoose.connection.on('open', cb);
}

function dropDatabase(cb) {
	var db = mongoose.connection.db;
	db.dropDatabase(cb);
}

function requireModels(cb) {
	require('./app/models');

	async.each(Object.keys[mongoose.models], function(modelName, cb) {
		mongoose.models[modelName].ensureIndexes(cb);
	}, cb);
}

function createUsers(cb) {
	var users = [
		new mongoose.models.User({username: 'Ivan', password: '123'}),
		new mongoose.models.User({username: 'Vasya', password: '123'}),
		new mongoose.models.Admin({username: 'admin', password: '123'}),
	];

	async.each(users, function(item, cb) {
		item.save(cb);
	}, cb);
}

async.series([
	open,
	dropDatabase,
	requireModels,
	createUsers,
	], function(err) {
		if (!err) {
			console.log("Test db've been created");
		} else {
			console.log(err);
		}

		mongoose.disconnect();
	});