var express = require("express");
const TrackController = require("../controllers/TrackController");

var router = express.Router();

router.get("/fetchGoodsByID" , TrackController.fetchGoodsByID);
router.get("/fetchTracking" , TrackController.fetchTracking);
router.get("/fetchTemp", TrackController.fetchTemp);
router.get("/track", TrackController.track);

module.exports = router;
