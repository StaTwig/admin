var mongoose = require("mongoose");

var RbacSchema = new mongoose.Schema({
	role: {type: String, required: false},
	permissions: {type: Array, required: false},
}, {timestamps: true});


module.exports = mongoose.model("User", RbacSchema);
