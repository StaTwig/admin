var mongoose = require('mongoose');

var AtomSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
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
    batchNos: {
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
        mfg_date: '2020-12-31T18:30:00.000Z',
        exp_date: '2021-12-30T18:30:00.000Z',
      },
    },
    eolInfo: {
      type: Object,
      required: false,
      default: {
        eol_id: 'IDN29402-23423-23423',
        eol_date: '2021-03-31T18:30:00.000Z',
        eol_by: 'user_id',
        eol_user_info: 'TO_NEED_DEFINE',
      },
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model('Atom', AtomSchema);
