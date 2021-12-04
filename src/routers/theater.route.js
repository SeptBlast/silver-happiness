const { Router } = require("express");

const { TheaterController } = require("../controllers");
const { TheaterValidate } = require("../validations");
const { Validate } = require("../middleware");

const router = Router();

router.route("/").get(TheaterController.GetAllTheaters).post(Validate(TheaterValidate.addNewTheater), TheaterController.AddNewTheater);

router
	.route("/find")
	.get(Validate(TheaterValidate.getTheater), TheaterController.GetTheaterById)
	.put(Validate(TheaterValidate.updateTheater), TheaterController.UpdateTheaterById)
	.delete(Validate(TheaterValidate.deleteTheater), TheaterController.DeleteTheaterById);

module.exports = router;
