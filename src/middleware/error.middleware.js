const mongoose = require("mongoose");
const httpStatus = require("http-status");

const config = require("../config");
const { logger: log, ApiError } = require("../utils");

const errorConvertor = (err, _req, _res, next) => {
	let error = err;

	if (!(error instanceof ApiError)) {
		const statusCode = error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
		const message = error.message || httpStatus[statusCode];
		error = new ApiError(statusCode, message, false, err.stack);
	}

	next(error);
};

const errorHandler = (err, _req, res, _next) => {
	let { statusCode, message } = err;

	if (config.env === "production" && !err.isOperational) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
	}

	res.locals.errorMessage = err.message;

	const response = {
		code: statusCode,
		message,
		...(config.environment === "development" && { stack: err.stack }),
	};

	if (config.environment === "development") {
		log.error(err);
	}

	res.status(statusCode).send(response);
};

module.exports = {
	errorConvertor,
	errorHandler,
};
