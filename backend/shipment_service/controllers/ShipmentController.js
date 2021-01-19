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
        if (true) {
              const body= req.body.shipments;
              const shipment = new Record({shipments:body});
              shipment.save().then((result)=>{
               return res.status(200).json({ response: "Success - Shipment order created", shipments:result });
              }).catch((err)=>{
                return res.status(500).json({error:err})
              })
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
              Record.find({"shipments.shipment_id":req.params.id}).select('shipments')
              .then((shipments)=>{
                return res.json({response:shipments})
              }).catch((err)=>{
                return res.json({error:err})
              })
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

exports.Shipment= [
  auth,
    async (req, res) => {
      try {
        const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
                Record.find({_id:req.params.id}).select('shipments')
                .then((shipments)=>{
                return res.json({response:shipments})
                }).catch((err)=>{
            return res.json({error:err})
  })
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
                async (req, res) => {
                  Record.findOne({"shipments.shipment_id":req.params.id}).then((old)=>{
                    old.shipments.shipment_status=req.body.update;
                    console.log(old);
                    // console.log(old.shipment_status)
                    old.save().then((updated)=>{
                      return res.json({ response: updated});
              }).catch((err)=>{ return res.json({ error: err, message:"ERROR OCC"})})
               return res.json({ response: " Not updated "});
              }).catch((err)=>{ return res.json({ error: err})})
                  }]

exports.fetchAllShipments= [
  auth,
    async (req, res) => {
      try {
        const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
                Record.find().select('shipments').then((result)=>{
                  return res
                  .status(200)
                  .json({AllShipments: result});
                }).catch((err)=> {return res.json({error:err})})
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

exports.fetch_po_Shipments= [
  auth,
    async (req, res) => {
      try {
        const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
            Record.findOne({ po_id: req.params.po_id}).then((shipments)=>{
              return res.status(200).json({ response: shipments})
            }).catch((err)=>{
              return res.status(500).json({error:err})
            })
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

// exports.updateStatus= [
//   auth,
//     async (req, res) => {
//       try {
//         const { authorization } = req.headers;
//         checkToken(req, res, async result => {
//           if (result.success) {
//               Record.update({"shipments.shipment_id":req.params.id},{shipment_status:req.body.update}).select('shipments').then((updated)=>{
//                 return res.json({ response: updated});
//               }).catch((err)=>{ return res.json({ error: err})})
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
