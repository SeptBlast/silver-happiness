const mongoose = require("mongoose");

const { toJSON, paginate } = require("./plugins");

const addressSchema = new mongoose.Schema({
	city: {
		type: String,
	},
	state: {
		type: String,
	},
	street1: {
		type: String,
	},
	street2: {
		type: String,
	},
	zipcode: {
		type: String,
	},
});

const geolocationSchema = new mongoose.Schema({
	coordinates: {
		type: [Number],
		required: true,
		default: [0, 0],
	},
	type: {
		type: String,
	},
});

const locationSchema = new mongoose.Schema({
	address: {
		type: addressSchema,
	},
	geo: {
		type: geolocationSchema,
	},
});

const theatersSchema = new mongoose.Schema({
	theaterId: {
		type: Number,
		index: true,
	},
	location: {
		type: locationSchema,
	},
	addedOn: {
		type: Date,
		default: Date.now(),
	},
});

// theatersSchema.plugin(toJSON);
// theatersSchema.plugin(paginate);

module.exports = mongoose.model("theaters", theatersSchema);
