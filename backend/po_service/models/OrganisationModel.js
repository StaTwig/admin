var mongoose = require("mongoose");

var OrganisationSchema = new mongoose.Schema({
  organisationId: {type: String, required: true},
	shipmentNumbers: {type: Array, required: true},
}, {timestamps: true});


module.exports = mongoose.model("Organisation", OrganisationSchema);