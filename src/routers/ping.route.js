const { Router } = require("express");
const httpStatus = require("http-status");

const PackageConfig = require("../../package.json");

const router = Router();

router
	.get("/", (_req, res) => {
		res.json({
			name: PackageConfig.name,
			version: "v" + PackageConfig.version,
			author: PackageConfig.author,
		});
	})
	.all((_req, res) => {
		res.status(httpStatus.METHOD_NOT_ALLOWED).json({
			message: "Method not allowed",
		});
	});

module.exports = router;
