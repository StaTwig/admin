var express = require("express");
const TrackController = require("../controllers/TrackController");

var router = express.Router();

router.get("/trackStats", TrackController.trackStats);
router.get("/fetchTransactions", TrackController.fetchTransactions);
router.get("/fetchShipmentDetails" , TrackController.fetchShipmentDetails);
router.get("/fetchLocation"  , TrackController.fetchLocation);
router.get("/fetchTemperature" , TrackController.fetchTemperature);
router.get("/fetchGoodsByID" , TrackController.fetchGoodsByID);
router.get("/fetchTracking" , TrackController.fetchTracking);

router.get("/fetchTemp", TrackController.fetchTemp);



module.exports = router;