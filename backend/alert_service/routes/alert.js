const express = require("express");
const AlertController = require("../controllers/AlertController");

const router = express.Router();

/**
 * @route POST /createNewAlert
 * @group Alerts - Will Return All the Alerts Created by the User
 * @param {object} Data.body - Sample:
 *{
 *"eventSecondary" : "SHIPMENT,ORDER,INVENTORY",
 *"alertMobile" : true,
 *"alertEmail" : true,
 *"alertWebPush" : false
 *}
 * @returns {object} 200 - An array of Alerts
 * @returns {Error}  default - Unexpected error
 */
router.post("/createNewAlert", AlertController.createNewAlert);

/**
 * @route DELETE /deleteAlert/:alertId
 * @group Alerts - Will Delete the Alert for the Self User
 * @param {string} alertId.params - alert ID - eg: 6918321081
 * @returns {object} 200 - An array of Alerts
 * @returns {Error}  default - Unexpected error
 */
router.delete("/deleteAlert/:alertId", AlertController.deleteAlert);

module.exports = router;
