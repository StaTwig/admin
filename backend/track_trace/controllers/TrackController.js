const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");

const init = require('../logging/init');
const logger = init.getLog();

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
      logger.log('info', '<<<<< TrackTraceService < TrackController < trackStats : successfully sending response with data ', overviewObject);
      return apiResponse.successResponseWithData(
        res,
        "Data sent",
        overviewObject
      );
    } catch (err) {
      //throw error in json response with status 500.
      logger.log('error', '<<<<< TrackTraceService < TrackController < trackStats : error (catch block) ', err);
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
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchTransactions : successfully sending response with data ', transactionObject);
      return apiResponse.successResponseWithData(
        res,
        "Transactions Sent",
        transactionObject
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchTransactions : error (catch block) ', err);
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
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchShipmentDetails : successfully sending response with data ', shipmentObject);
      return apiResponse.successResponseWithData(
        res,
        "Data sent",
        shipmentObject
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchShipmentDetails : error (catch block) ', err);
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
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchLocation : successfully sending response with data ', locationObject);
      return apiResponse.successResponseWithData(
        res,
        "Data sent",
        locationObject
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchLocation : error (catch block) ', err);
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
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchTemperature : successfully sending response with data ', temperatureObject);
      return apiResponse.successResponseWithData(
        res,
        "Data sent",
        temperatureObject
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchTemperature : error (catch block) ', err);
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
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchGoodsByID : successfully sending response with data ', goodsObject);
      return apiResponse.successResponseWithData(res, "Data sent", goodsObject);
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchGoodsByID : error (catch block) ', err);
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
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchTracking : successfully sending response with data ', trackingObject);
      return apiResponse.successResponseWithData(
        res,
        "Data sent",
        trackingObject
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchTracking : error (catch block) ', err);
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
    
      for(var i=0; i<20; i++){
          
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
      logger.log('info', '<<<<< TrackTraceService < TrackController < fetchTemp : successfully sending response with data ', tempData);
      return apiResponse.successResponseWithData(
        res,
        "Time-Temperature Data sent",
        tempData
      );
    } catch (err) {
      logger.log('error', '<<<<< TrackTraceService < TrackController < fetchTemp : error (catch block) ', err);
      return apiResponse.ErrorResponse(res, err);
    }
  }
];
