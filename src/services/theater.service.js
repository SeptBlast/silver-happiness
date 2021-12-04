const httpStatus = require("http-status");

const { TheaterModel } = require("../models");
const { ApiError, logger: log } = require("../utils");

const queryTheaters = async (filter, options) => {
	return TheaterModel.find(filter, options);
};

const addNewTheater = async (reqBody) => {
	return TheaterModel.create(reqBody);
};

const getTheaterById = async (theaterId) => {
	return TheaterModel.findById(theaterId);
};

const updateTheaterById = async (theaterId, reqBody) => {
	const theater = await GetTheaterById(theaterId);
	if (!theater) {
		throw new ApiError(httpStatus.NOT_FOUND, "Theater not found");
	}

	Object.assign(theater, reqBody);
	await theater.save();
	return theater;
};

const deleteTheaterById = async (theaterId) => {
	const theater = await GetTheaterById(theaterId);
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
