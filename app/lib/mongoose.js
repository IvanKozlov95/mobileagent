const mongoose		= require('mongoose');
const config		= require('../../config');

mongoose.connect(config.get('mongoose:uri'), (err) => {
	if (err) return console.log(`Can\'t conntect to a db at uri: ${config.get('mongoose:uri')}`);

	console.log("Connected to mongoose. Uri: " + config.get('mongoose:uri'));
});

module.exports = mongoose;