var mongoose = require('mongoose');
var RecordSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    externalId: { type: 'String' },
    creationDate: {
      type: Date,
    },
    createdBy: {
      type: String,
    },
    supplier: {
      type: Object,
    },
    customer: {
      type: Object,
    },
    products: {
      type: Array,
      default: [],
    },
    poStatus: { type: String, default: 'CREATED' },
    poUpdates : { type: Array,default: []},
    lastUpdatedBy: { type: String },
    lastUpdatedOn: {
      type: String,
      required: false,
    },
    shippingOrders: {
      type: Array,
      required: false,
      default: [],
    },
    shipments: {
      type: Array,
      required: false,
      default: [],
    },
    createdBy: {
      type: String,
    },
    lastUpdatedBy : {
      type: String,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Record', RecordSchema);
