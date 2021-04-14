var express = require("express");
const EventController = require("../controllers/EventController");

var router = express.Router();

router.get("/getAllEvents", EventController.getAllEvents);
router.get("/getEventByActorId/:actorId/:eventTypePrimary/:eventTypeDesc", EventController.getEventByActorId);
router.get("/getEventByCaId/:caId/:eventTypePrimary/:eventTypeDesc", EventController.getEventByCaId);
router.get("/getEventByEventId/:eventID/:eventTypePrimary/:eventTypeDesc", EventController.getEventById);
router.get("/getEventBySecondaryOrgId/:secondaryOrgId/:eventTypePrimary/:eventTypeDesc", EventController.getEventBySecondOrgId);
router.get("/getEventByActorOrgId/:actorOrgId/:eventTypePrimary/:eventTypeDesc", EventController.getEventByActorOrgId);
router.delete("/deleteEventById/:eventID", EventController.deleteEventById);

module.exports = router;