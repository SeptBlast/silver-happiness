const httpStatus = require("http-status");

const { ApiError, Pick, CatchAync, logger: log } = require("../utils");
const { TheaterService } = require("../services");

const AddNewTheater = CatchAync(async (req, res) => {
	try {
		const requestBody = Object.assign({}, req.body);
		const theater = await TheaterService.addNewTheater(requestBody);

		res.status(httpStatus.CREATED).json(theater);
	} catch (error) {
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
	}
});

const GetAllTheaters = CatchAync(async (req, res) => {
	try {
		const filters = Pick(req.query, ["name", "city", "state"]);
		const options = Pick(req.query, ["limit", "page", "sortBy"]);
		const theaters = await TheaterService.queryTheaters(filters, options);

		res.status(httpStatus.OK).json(theaters);
	} catch (error) {
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
	}
});

const GetTheaterById = CatchAync(async (req, res) => {
	try {
		const { id } = req.query;
		const theater = await TheaterService.getTheaterById(id);
		if (!theater) {
			throw new ApiError(httpStatus.NOT_FOUND, "Theater not found");
		}

		res.status(httpStatus.OK).json(theater);
	} catch (error) {
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
	}
});

const UpdateTheaterById = CatchAync(async (req, res) => {
	try {
		const { id } = req.query;
		const theaterDetails = req.body;
		const theater = await TheaterService.updateTheaterById(id, theaterDetails);
		res.status(httpStatus.OK).json(theater);
	} catch (error) {
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
	}
});

const DeleteTheaterById = CatchAync(async (req, res) => {
	try {
		const { id } = req.query;
		await TheaterService.deleteTheaterById(id);
		res.status(httpStatus.NO_CONTENT).send();
	} catch (error) {
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
	}
});

module.exports = {
	AddNewTheater,
	GetAllTheaters,
	GetTheaterById,
	UpdateTheaterById,
	DeleteTheaterById,
};
