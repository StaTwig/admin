const mongoose = require("mongoose");

const ProductNamesSchema = new mongoose.Schema({
	productName: {type: String, required: true},
}, {timestamps: true});


module.exports = mongoose.model("ProductName", ProductNamesSchema);