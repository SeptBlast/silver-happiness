const express = require("express");
const expressWinston = require("express-winston");
const httpStatus = require("http-status");
const winston = require("winston");
var addRequestId = require("express-request-id")();

const { Middleware, ErrorConvertor, ErrorHandler } = require("./src/middleware");
const { logger: log } = require("./src/utils");
const { MongoService } = require("./src/services");
const routes = require("./src/routers");

var app = express();

// Initialize the MongoDB service
MongoService;

app.disable("x-powered-by");
app.use(addRequestId);
app.use(Middleware.customHeaders());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	expressWinston.logger({
		transports: [new winston.transports.Console()],
		format: winston.format.combine(winston.format.colorize(), winston.format.json()),
		meta: true,
		expressFormat: true,
		colorize: true,
		ignoreRoute: function (req, res) {
			return false;
		},
	})
);

app.use("/v1", routes);

app.get("/ping", (req, res) => {
	log.info("ping route called...");
	res.status(httpStatus.OK).send("pong");
});

app.all("/*", (req, res) => {
	log.warn("Invalid route called...");
	res.status(httpStatus.METHOD_NOT_ALLOWED).send("Invalid route");
});

module.exports = app;
