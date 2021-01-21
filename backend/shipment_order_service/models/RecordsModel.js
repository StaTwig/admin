var mongoose = require('mongoose');

var RecordsSchema = new mongoose.Schema(
  {
    po_id:String,
    po_external_id:String,
    po_creation_date:String,
    po_created_by:String,
    // type: Date, default: Date.now => Created_at
    supplier:{
      supplier_organization:String,
      supplier_incharge:String
    },
    customer: {
      customer_organization:String,
      customer_incharge:String,
      shipping_address: {
        shipping_address_id:String,
        shipment_receiver_id:String
    }},
    products:[
      {
        po_product_id: String,
        po_product_quantity: Number,
        po_quantity_delivered:Number
      }
    ],
    po_status:String,
    last_updated_by:String,
    last_updated_on:{},
    shipping_orders:[
      {
        shipping_order_id:String,
        so_created_by:String,
        so_assigned_to:[String],
        so_updated_on:String,
        so_updated_by:String,
        so_status:String
        },
    ],
    shipments:[
    {
      shipment_id:String,
      label: {
          label_id:String,
          label_type:String,
        },
      external_shipment_id:String ,
      shipment_supplier: {
            supplier_id:String,
            supplier_location_id:String,
      },
      receiver:{
        receiver_id:String,
        receiver_location_id:String,
      },
      shipping_date:String,
      expected_delivery_date:String,
      actual_delivery_date:String,
      shipment_status:String,
      transaction_ids:[String],
      products:[
        {
          shipment_product_id:String,
          shipment_product_quantity:Number
        }
      ]
    }
  ]
},{timestamps: true});

module.exports = mongoose.model('Record', RecordsSchema);
