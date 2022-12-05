const mongoose = require("mongoose");

const RbacSchema = new mongoose.Schema({
	permissions: {type: Array, required: true},
	role:{type: String, required: true}
	// permissions: [{type: String}]
}, {timestamps: true});


module.exports = mongoose.model("permissions", RbacSchema);
