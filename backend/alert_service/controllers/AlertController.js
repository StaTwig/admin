//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const { body} = require('express-validator');
const auth = require("../middlewares/jwt");
//models
const utility = require('../helpers/utility');
const Alerts = require('../models/AlertModel')
const Notification = require('../models/NotificationsModel')
const EmployeeModel = require('../models/EmployeeModel')

exports.getAllAlerts = [
  auth,
  async function (req, res) {
    try {
      let alerts = await Alerts.find({ username: req.user.id })
      return apiResponse.successResponseWithData(res, 'Alerts fetched successfully', alerts)
    } catch (err) {
      return apiResponse.ErrorResponse(res, err)
    }
  },
]

exports.getAlertNotifications = [
  auth,
  async function (req, res) {
    try {
      // let notifications = await Notification.find({ user : req.user.id, type : 'ALERT'})
      let notifications = await Notification.find({ user : req.user.id, type : req.query.type})
      return apiResponse.successResponseWithData(res, 'Notifications fetched successfully', notifications)
    } catch (err) {
      return apiResponse.ErrorResponse(res, err)
    }
  }
]

exports.getTransactionNotifications = [
  auth,
  async function (req, res) {
    try {
      let notifications = await Notification.find({ user : req.user.id, type : "TRANSACTION"})
      return apiResponse.successResponseWithData(res, 'Notifications fetched successfully', notifications)
    } catch (err) {
      return apiResponse.ErrorResponse(res, err)
    }
  }
]


exports.createNewAlert = [
  auth,
  async function (req, res) {
    try {
      let eventOptions = ["UPDATE", "DELETE", "ADD" ,"CREATE" , "RECEIVE"]
      let alertSubscription = req.body.eventSecondary.split(',');
      let Alert
      Alert = await Alerts.findOneAndDelete({ username: req.user.id })
        EmployeeModel.findOne({ id : req.user.id }).then(async (user) => {
          if (user) {
            console.log(user)
            const { id, firstName, lastName, emailId, phoneNumber } = user
            if(!req.body.eventPrimary){              
              var alertData = []
              for(eventSecondary of alertSubscription){
                console.log("EVENT SECONDARY IS ",eventSecondary)
                let newAlert;
                if(eventSecondary!='SHIPMENT'){
                  for(eventType of eventOptions){
                    console.log(alertData)
                    newAlert = {
                      id: utility.randomNumber(10),
                      event_type_primary: eventType,
                      event_type_secondary: eventSecondary,          
                      actorOrgId: req.body.actorOrgId || req.user.organisationId,
                      createdBy: req.user.id
                    }
                    alertData.push(newAlert)
                  }
                }
                else{
                  for(eventType of eventOptions){
                    newAlert = {
                      id: utility.randomNumber(10),
                      event_type_primary: eventType,
                      event_type_secondary: eventSecondary,          
                      actorOrgId: req.body.actorOrgId || req.user.organisationId,
                      createdBy: req.user.id
                    }
                    alertData.push(newAlert)
                  }
                  for(eventType of eventOptions){
                    newAlert = {
                      id: utility.randomNumber(10),
                      event_type_primary: eventType,
                      event_type_secondary: "SHIPMENT TRACKING",          
                      actorOrgId: req.body.actorOrgId || req.user.organisationId,
                      createdBy: req.user.id
                    }
                    alertData.push(newAlert)
                  }
                }
            }
            }
            //console.log(alertData)
            const alert = new Alerts({
              id: utility.randomNumber(10),
              username: req.user.id,
              label: { labelId: req.body.label || null },
              user: {
                user_id: id,
                user_name: firstName + ' ' + lastName,
                emailId: emailId,
                mobile_number: phoneNumber || null,
              },
              //transactionIds:[...req.body.transactioId],
              alerts: alertData,
              alertMode: {
                mobile: req.body.alertMobile || false,
                email: req.body.alertEmail || false,
                telegram: req.body.alertTelegram || false,
                web_push: req.body.alertWebPush || false,
              },
            })
            alert.active = alertSubscription;
            alert.save(function (err, result) {
              if (err) {
                console.log(err)
                apiResponse.ErrorResponse(res, err)
              } else {
                return apiResponse.successResponse(
                  res,
                  'Alert Added successfully',
                )
              }
            })
          }
          else return apiResponse.ErrorResponse(res,"NO USER FOUND")
        })
    } catch (err) {
      apiResponse.ErrorResponse(res, err)
    }
  },
]





/* 
exports.createNewAlert = [
  auth,
  body('user', 'username must not be empty.').isLength({ min: 1 }).trim(),
  async function (req, res) {
    try {
      let Alert
      Alert = await Alerts.findOne({ username: req.user.id })
      console.log(Alert)
      if (Alert) {
        let newAlert = {
          id: utility.randomNumber(10),
          productId: req.body.productId,
          productName: req.body.productName,
          manufacturer: req.body.manufacturer,
          event_type_primary: req.body.eventPrimary,
          event_type_secondary: req.body.eventSecondary,          
          actorOrgId: req.body.actorOrgId,
          createdBy: req.body.createdBy
        }
        if (req.body.eventSecondary== 'SHIPMENT' || req.body.eventSecondary == 'ORDER') {
          newAlert['transactionId'] = req.body.transactionId;
        }
        console.log(newAlert)
        Alert.alerts.push(newAlert)
        Alert.save(function (err, result) {
          if (err) {
            console.log(err)
            apiResponse.ErrorResponse(res, err)
          } else {
            return apiResponse.successResponse(res, 'Alert Added successfully')
          }
        })
      } else {
        EmployeeModel.findOne({ id : req.user.id }).then(async (user) => {
          if (user) {
            console.log(user)
            const { id, firstName, lastName, emailId, phoneNumber } = user
            const alertData = {
              id: utility.randomNumber(10),
              productId: req.body.productId,
              productName: req.body.productName,
              manufacturer: req.body.manufacturer,
              event_type_primary: req.body.eventPrimary,
              event_type_secondary: req.body.eventSecondary,
              actorOrgId: req.body.actorOrgId,
              createdBy: req.user.id,
            }
            if (req.body.eventSecondary == 'SHIPMENT' || req.body.eventSecondary == 'ORDER') {
              alertData['transactionId'] = req.body.transactionId;
             }        
            console.log(alertData)
            const alert = new Alerts({
              id: utility.randomNumber(10),
              username: req.user.id,
              label: { labelId: req.body.label || null },
              user: {
                user_id: id,
                user_name: firstName + ' ' + lastName,
                emailId: emailId,
                mobile_number: phoneNumber || null,
              },
              //transactionIds:[...req.body.transactioId],
              alerts: [alertData],
              alertMode: {
                mobile: req.body.alertMobile || false,
                email: req.body.alertEmail || false,
                telegram: req.body.alertTelegram || false,
                web_push: req.body.alertWebPush || false,
              },
            })
            alert.save(function (err, result) {
              if (err) {
                console.log(err)
                apiResponse.ErrorResponse(res, err)
              } else {
                return apiResponse.successResponse(
                  res,
                  'Alert Added successfully',
                )
              }
            })
          }
          else return apiResponse.ErrorResponse(res,"NO USER FOUND")
        })
      }
    } catch (err) {
      apiResponse.ErrorResponse(res, err)
    }
  },
]
*/
exports.deleteAlert= [
  auth,
  async function (req, res) {
    try {
      let alerts = await Alerts.updateOne({ username : req.user.id , "alerts.id" : req.params.alertId }, {
        $unset: {
          "alerts.$" : ""
        }
      })

      return apiResponse.successResponseWithData(res, 'Alerts fetched successfully', alerts)
    } catch (err) {
      return apiResponse.ErrorResponse(res, err)
    }
  },
]