const { Router } = require("express");

const pingRoute = require("./ping.route");
const theaterRoute = require("./theater.route");

const router = Router();

const defaultRoutes = [
	{ path: "/ping", handler: pingRoute },
	{ path: "/theater", handler: theaterRoute },
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.handler);
});

module.exports = router;
