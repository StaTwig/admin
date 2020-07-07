var mongoose = require("mongoose");

var UserTransactionSchema = new mongoose.Schema({
  destinationUser: {type: String, required: true},
  shipmentIds: {type: Array, required: true},
}, {timestamps: true});


module.exports = mongoose.model("UserTransaction", UserTransactionSchema);