const { body, validationResult, sanitizeBody} = require('express-validator');
//this helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const utility = require('../helpers/utility');
const auth = require('../middlewares/jwt');
const checkToken = require('../middlewares/middleware').checkToken;
const checkPermissions = require('../middlewares/rbac_middleware')
  .checkPermissions;
const dotenv = require('dotenv').config();
const Record = require("../models/RecordsModel");

const blockchain_service_url = process.env.URL;
const stream_name = process.env.SHIP_STREAM;
const po_stream_name = process.env.PO_STREAM;

const init = require('../logging/init');
const logger = init.getLog();

exports.createShipment = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          const shipment = req.body.shipment;
          const shippingOrderId = req.body.shippingOrderId;
          const po = req.body.po;
              const POFound = await RecordModel.findOne({ poId: po });
              if(!POFound){
                logger.log(
                  'info',
                  '<<<<< ShippingService < Controller < createSO : PO not found in collection',
                );
                return res.status(404).json({error: `${po} PO Not Found`})  
              } else{
                await Record.updateOne({"shippingOrders.shippingOrderId":shippingOrderId}, {shipments:shipment}).then((result)=>{
                  return res.status(200).json({ response: "Success - Shipment order created", shipments:result });
                 }).catch((err)=>{
                   return res.status(500).json({error:`${err} Error Occured `})
                 }) 
              }
    }
     else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
          );
          res.status(403).json("Auth Failed");
        }
     }
      )} catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
      }    
  }
];

exports.fetchShipments= [
auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          const poId = req.body.poId;
          const POFound = await RecordModel.findOne({ poId: poId });
          if(!POFound){
            logger.log(
              'info',
              '<<<<< ShippingService < Controller < createSO : PO not found in collection',
            );
            return res.status(404).json({error:`${poId} Not found `})  
          } else{
              Record.find({"shipments.shipmentId":req.query.id}).select('shipments')
              .then((shipments)=>{
                return res.json({response:shipments})
              }).catch((err)=>{
                return res.json({error:err})
              })
          }
        } else {
          logger.log(
            'warn',
            '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
          );
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

// exports.Shipment= [
//   auth,
//     async (req, res) => {
//       try {
//         const { authorization } = req.headers;
//         checkToken(req, res, async result => {
//           if (result.success) {
//             const poId = req.body.poId;
//             const POFound = await RecordModel.findOne({ id: poId });
//             if(!POFound){
//               logger.log(
//                 'info',
//                 '<<<<< ShippingService < Controller < createSO : PO not found in collection',
//               );  
//             } else{
//               Record.find({_id:req.query.id}).select('shipments')
//               .then((shipments)=>{
//               return res.json({response:shipments})
//               }).catch((err)=>{
//               return res.json({error:err})
//               })
//             }
//           } else {
//             logger.log(
//               'warn',
//               '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
//             );
//             res.status(403).json("Auth failed");
//           }
//         });
//       } catch (err) {
//         logger.log(
//           'error',
//           '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
//         );
//         return apiResponse.ErrorResponse(res, err);
//       }
//     },
//   ];
  
exports.fetchAllShipments= [
  auth,
    async (req, res) => {
      try {
        const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
              await Record.find().select('shipments').then((result)=>{
                return res
                .status(200)
                .json({AllShipments: result});
              }).catch((err)=> {return res.json({error:err})})
            }
          else {
            logger.log(
              'warn',
              '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
            );
            res.status(403).json("Auth failed");
          }
        });
      } catch (err) {
        logger.log(
          'error',
          '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];

exports.fetch_po_Shipments= [
  auth,
    async (req, res) => {
      try {
        const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
            const poId = req.query.poId;
            const POFound = await RecordModel.findOne({ id: poId });
            if(!POFound){
              logger.log(
                'info',
                '<<<<< ShippingService < Controller < createSO : PO not found in collection',
              );  
            } else{
              Record.findOne({ poId: req.params.poId}).then((shipments)=>{
                return res.status(200).json({ response: shipments})
              }).catch((err)=>{
                return res.status(500).json({error:err})
              })  
            }
          } else {
            logger.log(
              'warn',
              '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
            );
            res.status(403).json("Auth failed");
          }
        });
      } catch (err) {
        logger.log(
          'error',
          '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];

exports.updateStatus= [
  auth,
    async (req, res) => {
      try {
        const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
              await Record.update({"shipments.shipmentId":req.query.id},
                    {$set: {
                     "shipments.$.shipmentStatus": req.body.update                  
                    }}).then((result)=>{
                    return res.json({ response: result});
                  }).catch((err)=>{ return res.json({ error: err, message:"ERROR OCC"})}) 
          } else {
            logger.log(
              'warn',
              '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
            );
            res.status(403).json("Auth failed");
          }
        });
      } catch (err) {
        logger.log(
          'error',
          '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];
