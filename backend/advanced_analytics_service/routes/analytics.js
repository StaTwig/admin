var express = require("express");
const AnalyticsController = require("../controllers/AnalyticsController");

var router = express.Router();

router.get("/getAllAnalyticss", AnalyticsController.getAllAnalyticss);
router.get("/getAnalyticsByActorId/:actorId/:AnalyticsTypePrimary/:AnalyticsTypeDesc", AnalyticsController.getAnalyticsByActorId);
router.get("/getAnalyticsByCaId/:caId/:AnalyticsTypePrimary/:AnalyticsTypeDesc", AnalyticsController.getAnalyticsByCaId);
router.get("/getAnalyticsByAnalyticsId/:AnalyticsID/:AnalyticsTypePrimary/:AnalyticsTypeDesc", AnalyticsController.getAnalyticsById);
router.get("/getAnalyticsBySecondaryOrgId/:secondaryOrgId/:AnalyticsTypePrimary/:AnalyticsTypeDesc", AnalyticsController.getAnalyticsBySecondOrgId);
router.get("/getAnalyticsByActorOrgId/:actorOrgId/:AnalyticsTypePrimary/:AnalyticsTypeDesc", AnalyticsController.getAnalyticsByActorOrgId);
router.delete("/deleteAnalyticsById/:AnalyticsID", AnalyticsController.deleteAnalyticsById);

module.exports = router;