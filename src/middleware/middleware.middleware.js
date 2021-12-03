var packageJson = require("../../package.json");

var customHeaders = () => {
	return (req, res, next) => {
		res.setHeader("X-Powered-By", `silver-happiness v${packageJson.version}`);
		res.setHeader("X-Content-Type-Options", "nosniff");
		res.setHeader("X-XSS-Protection", "1; mode=block");
		res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
		res.setHeader("origin", req.hostname);

		next();
	};
};

const MethodNotAllowed = (_req, res) => {
	res.status(405).send({
		message: "Method Not Allowed",
	});
};

module.exports = { customHeaders, MethodNotAllowed };
