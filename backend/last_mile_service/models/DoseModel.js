const mongoose = require("mongoose");

const DoseSchema = new mongoose.Schema(
	{
		id: {
			required: true,
			type: String,
		},
		vaccineVialId: {
			required: true,
			type: String,
		},
		age: {
			required: true,
			type: Number,
			min: 0,
			max: 140,
		},
		gender: {
			required: true,
			type: String,
			enum: ["MALE", "FEMALE", "OTHERS"],
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("dose", DoseSchema);