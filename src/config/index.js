require("dotenv").config();

module.exports = {
	environment: process.env.NODE_ENV || "development",
	port: process.env.PORT || 3000,

	// Database
	mongoDB: {
		mongoDBUri: process.env.MONGO_HOST + "/" + process.env.MONGO_DB_NAME,
		mongoDBOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
};
