var mongoose = require('mongoose');
var ShippingOrderSchema = new mongoose.Schema(
  {
    shippingOrderId: { type: String, required: true, unique: true },
    soPurchaseOrderId: {
      type: String,
      required: true,
      unique: false,
      default: 'po-12345',
    },
    soCreatedBy: {
        type: String,
       // required: true,
        default: 'user_id',
      },
    soAssignedTo: {
        type: String,
       // required: true,
        default: 'warehouse_id 1',
    },
    soUpdatedOn: {
        type: String,
        required: false,
        default: '2020-12-31T18:30:00.000Z',
    },
    soUpdatedBy: { type: String, required: false, default: 'USER_ID' },
    soStatus: { type: String, required: false, default: 'CREATED' },

    },{ timestamps: true },
);
module.exports = mongoose.model('ShippingOrder', ShippingOrderSchema);