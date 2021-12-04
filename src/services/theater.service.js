const httpStatus = require("http-status");

const { TheaterModel } = require("../models");
const { environment } = require("../config");
const { ApiError, logger: log } = require("../utils");

var DEBUG_MODE = environment === "development" ? true : false;

const queryTheaters = async (filter, options) => {
	var result = await TheaterModel.find(filter, null, options);
	if (DEBUG_MODE) log.info(result);
	return result;
};

const addNewTheater = async (reqBody) => {
	return TheaterModel.create(reqBody);
};

const getTheaterById = async (theaterId) => {
	var result = await TheaterModel.findOne({ theaterId: theaterId });
	if (DEBUG_MODE) log.info(result);
	return result;
};

const updateTheaterById = async (theaterId, reqBody) => {
	const theater = await getTheaterById(theaterId);
	if (!theater) {
		throw new ApiError(httpStatus.NOT_FOUND, "Theater not found");
	}

	Object.assign(theater, reqBody);
	await theater.save();
	return theater;
};

const deleteTheaterById = async (theaterId) => {
	const theater = await getTheaterById(theaterId);
	if (!theater) {
		throw new ApiError(httpStatus.NOT_FOUND, "Theater not found");
	}

	await theater.remove();
	return theater;
};

module.exports = {
	queryTheaters,
	addNewTheater,
	getTheaterById,
	updateTheaterById,
	deleteTheaterById,
};
