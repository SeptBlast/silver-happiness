const { Router } = require("express");

const pingRoute = require("./ping.route");

const router = Router();

const defaultRoutes = [{ path: "/ping", handler: pingRoute }];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.handler);
});

module.exports = router;
