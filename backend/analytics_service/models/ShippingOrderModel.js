var mongoose = require('mongoose');
var ShippingOrderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    soPurchaseOrderId: {
      type: String,
      default: 'po-12345',
    },
    soCreatedBy: {
        type: String,
        default: 'user_id',
      },
    soAssignedTo: {
        type: Object,
    },
    soUpdatedOn: {
        type: String,
        required: false,
        default: '2020-12-31T18:30:00.000Z',
    },
    soUpdatedBy: { type: String, required: false, default: 'USER_ID' },
    soStatus: { type: String, required: false, default: 'CREATED' },
    products: {type: Array, default: []},
    shipmentIds: {type: Array, default: []},
    },{ timestamps: true },
);
module.exports = mongoose.model('ShippingOrder', ShippingOrderSchema);