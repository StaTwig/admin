const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");

const InventoryModel = require('../models/InventoryModel');
const ShipmentModel = require('../models/ShipmentModel');
const ShippingOrderModel = require ('../models/ShippingOrderModel')
const POModel = require('../models/POModel');
const RecordModel = require('../models/RecordModel');
const AtomModel = require('../models/AtomModel');

const checkToken = require('../middlewares/middleware').checkToken;
const checkPermissions = require('../middlewares/rbac_middleware').checkPermissions;
const axios = require('axios');

const fs = require('fs');
const stream_name = process.env.SHIP_STREAM;
const po_stream_name = process.env.PO_STREAM;
const blockchain_service_url = process.env.URL;

const init = require('../logging/init');
const logger = init.getLog();


const UserModel = require('../models/UserModel');
const utility = require('../helpers/utility');
const jwt = require('jsonwebtoken');
const { constants } = require('../helpers/constants');

exports.trackStats = [
  auth,
  (req, res) => {
    try {
      overviewObject = {
        TotalTransactions: 532,
        TotalShipments: 132,
        TotalBlocks: 132,
        TotalUsers: 132,
        TotalUnitsShipped: 132,
        user: req.user.email
      };
      logger.log('info', '<<<<< TrackTraceService < TrackController < trackStats : successfully sending response with data ');
      return apiResponse.successResponseWithData(
        res,
        "Data sent",
        overviewObject
      );
    } catch (err) {
      //throw error in json response with status 500.
      logger.log('error', '<<<<< TrackTraceService < TrackController < trackStats : error (catch block) ');
      return apiResponse.ErrorResponse(res, err);
    }
  }
];

exports.fetchTransactions = [
  (req, res) => {
    try {
      transactionObject = [
        {
          txnID: "8frd8n439nf308fb",
          from: "7g34983nf89f3ufh938",
          to: "7sbdvbiwuvigjwb823rii",
          Date: "29/03/2014",
          vaccine: "Polio",
          user: req.user.email
        },
        {
          txnID: "d8g93mf7g93h7f9",
          from: "7g34983nf89f3ufh938f",
          to: "7sbdvbiwuvigjwb823rii",
          Date: "01/08/1997",
          vaccine: "MMR",
          user: req.user.email
        }
      ];
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchTransactions : successfully sending response with data ');
      return apiResponse.successResponseWithData(
        res,
        "Transactions Sent",
        transactionObject
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchTransactions : error (catch block) ');
      return apiResponse.ErrorResponse(res, err);
    }
  }
];

exports.fetchShipmentDetails = [
  (req, res) => {
    try {
      shipmentObject = {
        TransactionID: "Jhsivugfw73y39r2y7y37y29d297g",
        ShipmentID: "SN324876DFHJ32",
        ClientName: "UNICEF",
        TotalQuantity: "60,000",
        user: req.user.email
      };
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchShipmentDetails : successfully sending response with data ');
      return apiResponse.successResponseWithData(
        res,
        "Data sent",
        shipmentObject
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchShipmentDetails : error (catch block) ');
      return apiResponse.ErrorResponse(res, err);
    }
  }
];

exports.fetchLocation = [
  (req, res) => {
    try {
      locationObject = {
        Name: "Hyderabad",
        GPS: "17.54537,67.37463298",
        user: req.user.email
      };
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchLocation : successfully sending response with data ');
      return apiResponse.successResponseWithData(
        res,
        "Data sent",
        locationObject
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchLocation : error (catch block) ');
      return apiResponse.ErrorResponse(res, err);
    }
  }
];

exports.fetchTemperature = [
  (req, res) => {
    try {
      temperatureObject = [
        {
          "0100": "3",
          "0200": "4",
          "0300": "1",
          "0400": "2",
          "0500": "2",
          "0600": "3",
          user: req.user.email
        }
      ];
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchTemperature : successfully sending response with data ');
      return apiResponse.successResponseWithData(
        res,
        "Data sent",
        temperatureObject
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchTemperature : error (catch block) ');
      return apiResponse.ErrorResponse(res, err);
    }
  }
];

exports.fetchGoodsByID = [
  (req, res) => {
    try {
      goodsObject = [
        {
          Product: "OPV",
          Quantity: "20000",
          Manafacturer: "ABC Pharma Ltd",
          MfDate: "29/06/2019",
          ExpDate: "04/01/2023",
          user: req.user.email
        },
        {
          Product: "Hib",
          Quantity: "20000",
          Manafacturer: "ABC Pharma Ltd",
          MfDate: "29/06/2019",
          ExpDate: "04/01/2023"
        },
        {
          Product: "HEPB",
          Quantity: "20000",
          Manafacturer: "ABC Pharma Ltd",
          MfDate: "29/06/2019",
          ExpDate: "04/01/2023"
        }
      ];
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchGoodsByID : successfully sending response with data ');
      return apiResponse.successResponseWithData(res, "Data sent", goodsObject);
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchGoodsByID : error (catch block) ');
      return apiResponse.ErrorResponse(res, err);
    }
  }
];

exports.fetchTracking = [
  (req, res) => {
    try {
      trackingObject = [
        { 
          user: req.user.email,
          Location: "Hyderabad, India",
          Date: "01/02/2020",
          Info: "Added to inventory by the manufacturer",
          Wallet: "0x5cdeca3cf356ad83B813fC2c8eA483AAC76A736e"
        },
        {
          Location: "Hyderabad Airport",
          Date: "15/02/2020",
          Info: "Delivered",
          Wallet: ""
        },
        {
          Location: "Kenya Airport",
          Date: "",
          Info: "In Transit",
          Wallet: "0x5cdeca3cf356ad83B813fC2c8eA483AAC76A736e"
        }
      ];
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchTracking : successfully sending response with data ');
      return apiResponse.successResponseWithData(
        res,
        "Data sent",
        trackingObject
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchTracking : error (catch block) ');
      return apiResponse.ErrorResponse(res, err);
    }
  }
];


exports.fetchTemp = [
  (req, res) => {
    try {
      var date_obj = new Date();

      var hours = date_obj.getHours();
      var minutes = date_obj.getMinutes();
      var seconds = date_obj.getSeconds();

      const max = 4.99; //req.body.max;
      const min = -9.97; //req.body.min;
      
      var tempData = {}
    
      for(var i=0; i<5; i++){
          
        seconds = seconds  + 5;

        if(seconds >= 60) { 
          seconds -= 60;
          minutes += 1;
        } 
        if(minutes >= 60) {
          minutes -= 60;
          hours += 1;
        }
        if(hours >= 24) hours -= 24;

        var time = hours + ":" + minutes + ":" + seconds;
        var temp = (Math.random() * (max - min) + min).toFixed(2);

        tempData[time] = temp;
      }
      
      // console.log(tempData);
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchTemp : successfully sending response with data ');
      return apiResponse.successResponseWithData(
        res,
        "Time-Temperature Data sent",
        tempData
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchTemp : error (catch block) ');
      return apiResponse.ErrorResponse(res, err);
    }
  }
];

exports.track = [
  auth,
  async (req, res) => {
    try {
      const { trackingNumber } = req.query;
      logger.log(
        'info',
        '<<<<< ShipmentService < ShipmentController < trackNumber : tracking , querying by transaction hash',
      );

    if (trackingNumber.includes("po") || trackingNumber.includes("PO") ) {
    var type = "poNumber";
    var shipment_array = [];
    RecordModel.findOne({
        id: trackingNumber
    }).then(async user => {
            var arr = JSON.parse(JSON.stringify(user)).shipments.length
            var val  = JSON.parse(JSON.stringify(user)).shipments
            shipment_array.push(val)
            var poDetails = {"id":user.id,"supplier":user.supplier,"customer":user.customer,"date":user.creationDate,"craetedBy":user.createdBy,"status":user.poStatus}
            logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < trackShipment : tracked PO, queried data by transaction hash',
        );
        res.json({
            poDetails: poDetails,
            shipments: shipment_array,
        });
    });
  } else if (trackingNumber.includes("SH") || trackingNumber.includes("zp") ) {
     var poDetails,shipmentDetails,shippingOrderDetails,shippingOrderId;
     ShipmentModel.find({
     "id": trackingNumber
    }).then(async user => {
      shipmentDetails = user;
      shippingOrderId = JSON.parse(JSON.stringify(user[0])).shippingOrderId;
      poId = JSON.parse(JSON.stringify(user[0])).poId;
       shippingOrderDetails = await ShippingOrderModel.find({id: shippingOrderId})
       poDetails = await RecordModel.find({id: poId})
            res.json({
            shipmentDetails: shipmentDetails,
            shippingOrderDetails: shippingOrderDetails,
            poDetails: poDetails
        });
        });
  } else {
  var type = "serialNumber";
  var shipment_array = [];
  AtomModel.findOne({
        id: trackingNumber
    }).then(async user => {
         console.log(user.shipmentIds[0])
        var shipmentIds = user.shipmentIds
        RecordModel.find({
       "shipments.shipment_id": shipmentIds[0]
    }).then(async user => {
            var arr = JSON.parse(JSON.stringify(user)).length
            var poDetails = {"id":user[0].id,"supplier":user[0].supplier,"customer":user[0].customer,"date":user[0].creationDate,"createdBy":user[0].createdBy,"status":user[0].poStatus}
            for (i = 0; i < arr; i++){
            var val = JSON.parse(JSON.stringify(user))[i].shipments
            shipment_array.push(val)
            }
         res.json({
            inventoryDetails: user,
            poDetails: poDetails,
            shipments: shipment_array
        });
      })

         logger.log(
            'info',
            '<<<<< ShipmentService < ShipmentController < trackProduct : tracked product, queried data by transaction hash',
        );
    });
}
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShipmentService < ShipmentController < trackProduct : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
