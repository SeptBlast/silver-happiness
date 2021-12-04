const Joi = require("joi");

const addNewTheater = {
	body: Joi.object().keys({
		location: Joi.object().keys({
			address: Joi.object().keys({
				city: Joi.string().required(),
				state: Joi.string().required(),
				street1: Joi.string().required(),
				street2: Joi.string(),
				zipcode: Joi.string().required(),
			}),
			geo: Joi.object().keys({
				coordinates: Joi.array().items(Joi.number()).required(),
				type: Joi.string() || "Point",
			}),
		}),
	}),
};

const updateTheater = {
	query: Joi.object().keys({
		theater_id: Joi.string().required(),
	}),
	body: Joi.object().keys({
		location: Joi.object().keys({
			address: Joi.object().keys({
				city: Joi.string().required(),
				state: Joi.string().required(),
				street1: Joi.string().required(),
				street2: Joi.string(),
				zipcode: Joi.string().required(),
			}),
			geo: Joi.object().keys({
				coordinates: Joi.array().items(Joi.number()).required(),
				type: Joi.string() || "Point",
			}),
		}),
	}),
};

const getTheater = {
	query: Joi.object().keys({
		theater_id: Joi.string().required(),
	}),
};

const deleteTheater = {
	query: Joi.object().keys({
		theater_id: Joi.string().required(),
	}),
};

module.exports = {
	addNewTheater,
	updateTheater,
	getTheater,
	deleteTheater,
};
