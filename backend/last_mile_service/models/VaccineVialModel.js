const mongoose = require("mongoose");

const VaccineVialSchema = new mongoose.Schema(
	{
		id: {
			required: true,
			type: String,
		},
		warehouseId: {
			required: true,
			type: String,
		},
		productId: {
			required: true,
			type: String,
		},
		batchNumber: {
			required: true,
			type: String,
		},
		numberOfDoses: {
			required: true,
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("vaccinevial", VaccineVialSchema);