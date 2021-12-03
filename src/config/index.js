require("dotenv").config();

module.exports = {
	environment: process.env.NODE_ENV || "development",
	port: process.env.PORT || 3000,

	// Database
	mongoDB: {
		mongoDBUri: process.env.MONGO_HOST + "/" + (this.environment === "development" ? "-test" : process.env.MONGO_DB_NAME || "test"),
		mongoDBOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
};
