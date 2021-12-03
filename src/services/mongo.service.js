const mongoose = require("mongoose");

const config = require("../config");
const { logger: log } = require("../utils");

const mongoDBOptions = config.mongoDB.mongoDBOptions;
const mongoDBUrl = config.mongoDB.mongoDBUri;

const MongoDBConnection = mongoose
	.connect(mongoDBUrl, mongoDBOptions)
	.then(() => log.info("MongoDB connection established 📌"))
	.catch((err) => log.error(err));

module.exports = {
	MongoDBConnection,
};
