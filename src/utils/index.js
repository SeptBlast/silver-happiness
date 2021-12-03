const { devlogger, prodlogger } = require("./logger.utils");
const catchAync = require("./catchAsync.utils");
const ApiErrors = require("./apiErrors.utils");
const config = require("../config");

var logger = config.environment === "development" ? devlogger() : prodlogger();

module.exports.logger = logger;
module.exports.CatchAync = catchAync;
module.exports.ApiError = ApiErrors;
