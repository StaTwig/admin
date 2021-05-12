var express = require("express");
const EventController = require("../controllers/EventController");

var router = express.Router();

router.get("/getAllEvents", EventController.getAllEvents);
//Get Events by Actor ID
router.get("/getEventByActorId/:actorId/:eventTypePrimary/:eventTypeDesc", EventController.getAllEvents);
router.get("/getEventByActorId/:actorId/:eventTypePrimary", EventController.getAllEvents);
router.get("/getEventByActorId/:actorId", EventController.getAllEvents);
//Get Events by CA ID 
router.get("/getEventByCaId/:caId/:eventTypePrimary/:eventTypeDesc", EventController.getAllEvents);
router.get("/getEventByCaId/:caId/:eventTypePrimary", EventController.getAllEvents);
router.get("/getEventByCaId/:caId", EventController.getAllEvents);
//Get Events by Event Id 
router.get("/getEventByEventId/:eventID", EventController.getAllEvents);
//Get Events by Secondary Org Id 
router.get("/getEventBySecondaryOrgId/:secondaryOrgId/:eventTypePrimary/:eventTypeDesc", EventController.getAllEvents);
router.get("/getEventBySecondaryOrgId/:secondaryOrgId/:eventTypePrimary", EventController.getAllEvents);
router.get("/getEventBySecondaryOrgId/:secondaryOrgId", EventController.getAllEvents);
//Get events by Actor Org Id 
router.get("/getEventByActorOrgId/:actorOrgId/:eventTypePrimary/:eventTypeDesc", EventController.getAllEvents);
router.get("/getEventByActorOrgId/:actorOrgId/:eventTypePrimary", EventController.getAllEvents);
router.get("/getEventByActorOrgId/:actorOrgId", EventController.getAllEvents);
//Delet Event by Id 
router.delete("/deleteEventById/:eventID", EventController.deleteEventById);

module.exports = router;