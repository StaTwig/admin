var mongoose = require('mongoose');

var RecordsSchema = new mongoose.Schema(
  {
    po_id: { type: String},
    po_external_id: {type: String},
    po_creation_date: {type: String },
    po_created_by: {type: String },
    // type: Date, default: Date.now => Created_at
    supplier:{
      supplier_organization:{type: String},
      supplier_incharge: {type: String}
    },
    customer: {
      customer_organization: {type: String},
      customer_incharge: {type: String},
      shipping_address: {
        shipping_address_id: {type: String},
        shipment_receiver_id: {type: String}
    }},
    products:[
      {
        po_product_id: {type: String},
        po_product_quantity: {type: Number},
        po_quantity_delivered:{type: Number}
      }
    ],
    po_status: { type: String },
    last_updated_by: {type: String},
    last_updated_on:{},
    shipping_orders:[
      {
        shipping_order_id:{type:String},
        so_created_by: {type: String},
        so_assigned_to:[String],
        so_updated_on: {type: String},
        so_updated_by: {type: String},
        so_status: {type: String}
        },
    ],
    shipments:[
    {
      shipment_id: {type: String, required:true},
      label: {
          label_id:{type:String,required:true},
          label_type:{type:String,required:true}
        },
      external_shipment_id: {type: String , required:true},
      shipment_supplier: {
            supplier_id:{type:String,required:true},
            supplier_location_id:{type:String,required:true}
      },
      receiver:{
        receiver_id:{type:String,required:true},
        receiver_location_id:{type:String, required:true}
      },
      shipping_date: {type: String, required: true},
      expected_delivery_date:{type:String, required: true},
      actual_delivery_date:{type:String, required: true},
      shipment_status:{type:String, required:true},
      transaction_ids:[String],
      products:[
        {
          shipment_product_id:{type:String, required:true},
          shipment_product_quantity:{type:Number,required:true}
        }
      ]
    }
  ]
},{timestamps: true});

module.exports = mongoose.model('Record', RecordsSchema);
