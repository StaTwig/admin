const mongoose = require("mongoose");

const ProductNamesSchema = new mongoose.Schema({
	productName: {type: String, required: true, unique: true},
	manufacturer: {type: String, required: true},
	productCategory: {type: String, required: true},
	productSubCategory: {type: String, required: true},
	storageConditions: {type: String, required: true},
	description: {type: String, required: false},
	image: {type: String, required: false},
}, {timestamps: true});


module.exports = mongoose.model("ProductName", ProductNamesSchema);