const httpStatus = require("http-status");

const { ApiError, Pick, CatchAync, logger: log } = require("../utils");
const { TheaterService } = require("../services");
const { environment: env } = require("../config");

const AddNewTheater = CatchAync(async (req, res) => {
	try {
		const requestBody = Object.assign({}, req.body);
		const theater = await TheaterService.addNewTheater(requestBody);

		res.status(httpStatus.CREATED).json(theater);
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json({
			message: error.message,
			stack: env === "development" ? error.stack : "",
		});
	}
});

const GetAllTheaters = CatchAync(async (req, res) => {
	try {
		const filters = Pick(req.query, ["name", "city", "state"]);
		const options = Pick(req.query, ["limit", "page", "sortBy"]);
		const theaters = await TheaterService.queryTheaters(filters, options);

		res.status(httpStatus.OK).json(theaters);
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json({
			message: error.message,
			stack: env === "development" ? error.stack : "",
		});
	}
});

const GetTheaterById = CatchAync(async (req, res) => {
	try {
		const { theater_id } = req.query;
		const theater = await TheaterService.getTheaterById(theater_id);
		log.info("Theater found", theater);
		if (!theater) {
			throw new ApiError(httpStatus.NOT_FOUND, "Theater not found");
		}

		res.status(httpStatus.OK).json(theater);
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json({
			message: error.message,
			stack: env === "development" ? error.stack : "",
		});
	}
});

const UpdateTheaterById = CatchAync(async (req, res) => {
	try {
		const { theater_id } = req.query;
		const theaterDetails = req.body;
		const theater = await TheaterService.updateTheaterById(theater_id, theaterDetails);
		res.status(httpStatus.OK).json(theater);
	} catch (error) {
		log.error(error);
		res.status(httpStatus.BAD_REQUEST).json({
			message: error.message,
			stack: env === "development" ? error.stack : "",
		});
	}
});

const DeleteTheaterById = CatchAync(async (req, res) => {
	try {
		const { theater_id } = req.query;
		await TheaterService.deleteTheaterById(theater_id);
		res.status(httpStatus.NO_CONTENT).send();
	} catch (error) {
		res.status(httpStatus.BAD_REQUEST).json({
			message: error.message,
			stack: env === "development" ? error.stack : "",
		});
	}
});

module.exports = {
	AddNewTheater,
	GetAllTheaters,
	GetTheaterById,
	UpdateTheaterById,
	DeleteTheaterById,
};
