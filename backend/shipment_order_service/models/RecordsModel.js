var mongoose = require('mongoose');

var RecordsSchema = new mongoose.Schema(
  {
    poId:String,
    poExternalId:String,
    poCreationDate:String,
    poCreatedBy:String,
    supplier:{
      supplierOrganization:String,
      supplierIncharge:String
    },
    customer: {
      customerOrganization:String,
      customerIncharge:String,
      shippingAddress: {
        shippingAddressId:String,
        shipmentReceiverId:String,
    }},
    products:[
      {
        poProductId: String,
        poProductQuantity: Number,
        poQuantityDelivered:Number
      }
    ],
    poStatus:String,
    lastUpdatedBy:String,
    lastUpdatedOn:{},
    shippingOrders:[
      {
        shippingOrderId:String,
        soCreatedBy:String,
        soAssignedTo:String,
        soUpdatedOn:String,
        soUpdatedBy:String,
        soStatus:String,
        },
    ],
    shipments:[
    {
      shipmentId:String,
      label: {
          labelId:String,
          labelType:{type:String,default:"QR_2DBAR"},
        },
      externalShipmentId:String ,
      supplier: {
            supplierId:String,
            supplierName:String,
            supplierLocationId:String,
      },
      receiver:{
        receiverId:String,
        receiverLocationId:String,
      },
      shippingDate:String,
      expectedDeliveryDate:String,
      actualDeliveryDate:String,
      shipmentStatus:String,
      transactionIds:[String],
      products:[
        {
          productId:String,
          productQuantity:Number,
          productName:String,
          manufacturerName:String,
          labelId:String
        }
      ],
      airWayBillNo:String,

    }
  ]
},{timestamps: true});

module.exports = mongoose.model('Record', RecordsSchema);
