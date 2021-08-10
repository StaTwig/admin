var mongoose = require('mongoose');

var AtomSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    label: {
      type: Object,
      required: false,
      default: {
        id: 'uuid1234567899',
        type: 'QR_2DBAR',
      },
    },
    productId: { type: String, required: true },
    inventoryIds: {
      type: Array,
      required: false,
      default: [],
    },
    quantity: {
      type: Number,
      required: false
    },
    poIds: {
      type: Array,
      required: false,
    },
    shipmentIds: {
      type: Array,
      required: false,
    },
    txIds: {
      type: Array,
      required: false,
    },
    batchNumbers: {
      type: Array,
      required: false,
    },
    atomStatus: {
      type: String,
      required: false,
    },
    attributeSet: {
      type: Object,
      required: false,
      default: {
        mfgDate: '2020-12-31T18:30:00.000Z',
        expDate: '2021-12-30T18:30:00.000Z',
      },
    },
    eolInfo: {
      type: Object,
      required: false,
      default: {
        eolId: 'IDN29402-23423-23423',
        eolDate: '2021-03-31T18:30:00.000Z',
        eolBy: 'user_id',
        eolUserInfo: 'TO_NEED_DEFINE',
      },
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Atom', AtomSchema);
