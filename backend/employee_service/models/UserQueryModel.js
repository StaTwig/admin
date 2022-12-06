const mongoose = require("mongoose");

const UserQuerySchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		userId: {
			type: String,
			default: null,
		},
		queryType: {
			type: String,
		},
		queryDescription: {
			type: String,
		},
		queryStatus: {
			type: String,
			enum: ["PENDING", "RESOLVED"],
			default: "PENDING",
		},
	},
	{ timestamps: true },
);
module.exports = mongoose.model("UserQuery", UserQuerySchema);
