const mongoose = require("mongoose")


const MONGOOSE_URL = process.env.MONGOOSE_URL;

//  mongoose.set('debug', true);

mongoose.connect(MONGOOSE_URL, {useNewUrlParser: true}, (err) => {
	if (!err)
		console.log('MongoDB connection successful.');
	else
	console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});




module.exports = mongoose;