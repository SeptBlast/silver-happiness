const Joi = require("joi");

const addNewTheater = {
	body: Joi.object().keys({
		address_city: Joi.string().required(),
		address_state: Joi.string().required(),
		address_street1: Joi.string().required(),
		address_street2: Joi.string().required(),
		address_zipcode: Joi.string().required(),
		address_geo_coordinates: Joi.array().items(Joi.number()).required(),
		address_geo_type: Joi.string().required(),
	}),
};

const updateTheater = {
	query: Joi.object().keys({
		theater_id: Joi.string().required(),
	}),
	body: Joi.object().keys({
		address_city: Joi.string().required(),
		address_state: Joi.string().required(),
		address_street1: Joi.string().required(),
		address_street2: Joi.string().required(),
		address_zipcode: Joi.string().required(),
		address_geo_coordinates: Joi.array().items(Joi.number()).required(),
		address_geo_type: Joi.string().required(),
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
