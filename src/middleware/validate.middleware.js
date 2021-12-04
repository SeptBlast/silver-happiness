const Joi = require("joi");
const httpStatus = require("http-status");

const { Pick, ApiError } = require("../utils");

const validate = (schema) => (req, res, next) => {
	const validSchema = Pick(schema, ["body", "params", "query"]);
	const object = Pick(req, Object.keys(validSchema));
	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: "key" }, abortEarly: false })
		.validate(object);

	if (error) {
		const errorMessage = error.details.map((details) => details.message).join(", ");
		return next(new ApiError(errorMessage, httpStatus.BAD_REQUEST));
	}

	Object.assign(req, value);
	return next();
};

module.exports = validate;
