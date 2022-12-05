var mongoose = require("mongoose");

var POSchema = new mongoose.Schema({
  orderID: {type: String, required: true, unique: true},
  txnId: {type: String},
  shipmentIds: {type: Array},
  sender: {type: String, required: true},
  receiver: {type: String, required: true},
  client: {type: String},
  client: {type: String},
  clientId: {type: String},
  date: {type: String},
  destination: {type: String},
  incoterms: {type: String},
  incoterms2: {type: String},
  ipCode: {type: String},
  ipName: {type: String},
  material: {type: String},
  materialDescription: {type: String},
  plant: {type: String},
  poItem: {type: String},
  products: {type: Array},
  quantity: {type: Number},
  reference: {type: String},
  unit: {type: String},
  vendor: {type: String},
  vendorName: {type: String},
  status:{type: String, required: true, default: 'Created'}
}, {timestamps: true});


module.exports = mongoose.model("PurchaseOrder", POSchema);
