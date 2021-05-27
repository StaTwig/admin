var express = require("express");
const AlertController = require("../controllers/AlertController");

var router = express.Router();

/** 
* @route GET /getAllAlerts
* @group Alerts - Will Return All the Alerts Created by the User 
* @param {string} eventId.query - Event ID - eg: ev0001 
* @returns {object} 200 - An array of Alerts 
* @returns {Error}  default - Unexpected error 
*/
router.get("/getAllAlerts", AlertController.getAllAlerts);
/** 
* @route POST /createNewAlert
* @group Alerts - Will Return All the Alerts Created by the User 
* @param {object} Data.body - Sample: 
*{ 
*"user" : "sanath@statwig.com",
*"transactionId":"tss001",
*"productId":"prood001",
*"productName":"COVAXINE",
*"manufacturer":"BHARATBIOTECH",
*"eventPrimary" : "CREATE",
*"eventSecondary" : "ORGANIZATION",
*"actorOrgId" : "org002",
*"createdBy" :"sanath@statwig.com",
*"alertMobile" : true,
*"alertEmail" : true
*}
* @returns {object} 200 - An array of Alerts 
* @returns {Error}  default - Unexpected error 
*/
router.post("/createNewAlert", AlertController.createNewAlert)

module.exports = router;
