const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, errors, json } = format;

const { environment } = require("../config/index");

const devlogger = () => {
	const coustomFormat = printf(({ level, message, label, timestamp, stack }) => {
		return `${timestamp} [${label}] [${level}]: ${stack || message}`;
	});

	return createLogger({
		level: environment === "development" ? "debug" : "info",
		format: combine(label({ label: "silver-happiness-api" }), format.colorize(), timestamp(), errors({ stack: true }), coustomFormat),
		defaultMeta: { service: "silver-happiness-api" },
		transports: [new transports.Console()],
	});
};

const prodlogger = () => {
	return createLogger({
		format: combine(timestamp(), errors({ stack: true }), json()),
		defaultMeta: { service: "silver-happiness-api" },
		transports: [new transports.Console()],
	});
};

module.exports = { devlogger, prodlogger };
