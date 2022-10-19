const mongoose = require("mongoose");

const DemoRequestSchema = new mongoose.Schema(
	{
		id: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		emailId: { type: String, required: true },
		phoneNumber: { type: String, required: false },
		companyName: { type: String, required: true },
		designation: { type: String, required: true },
		softwareAppication: { type: String, required: false },
		numberOfEmployees: { type: String, required: false },
	},
	{ timestamps: true },
);
module.exports = mongoose.model("DemoRequest", DemoRequestSchema);