const express = require("express");
const TrackController = require("../controllers/TrackController");

const router = express.Router();

router.get("/fetchGoodsByID", TrackController.fetchGoodsByID);
router.get("/fetchTracking", TrackController.fetchTracking);
router.get("/fetchTemp", TrackController.fetchTemp);
router.get("/track", TrackController.track);
router.get("/fetchDataByQRCode", TrackController.fetchDataByQRCode);

module.exports = router;
