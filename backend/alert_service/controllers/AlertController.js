const UserModel = require('../models/UserModel')
//helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse')
const utility = require('../helpers/utility')
const jwt = require('jsonwebtoken')
const { body, validationResult, oneOf, check } = require('express-validator')
const { sanitizeBody } = require('express-validator')
const { constants } = require('../helpers/constants')

//models
const Alerts = require('../models/AlertModel')
const EmployeeModel = require('../models/EmployeeModel')

exports.getAllAlerts = [
  (req, res) => {
    try {
      res.json('Alert Received')
    } catch (err) {
      return apiResponse.ErrorResponse(res, err)
    }
  },
]

exports.createNewAlert = [
  //	auth,
  body('user', 'username must not be empty.').isLength({ min: 1 }).trim(),
  sanitizeBody('*').escape(),
  async function (req, res) {
    try {
      let Alert
      Alert = await Alerts.findOne({ username: req.body.user })
      console.log(Alert)
      if (Alert) {
        const newAlert = {
          productId: req.body.productId,
          productName: req.body.productName,
          manufacturer: req.body.manufacturer,
          event_type_primary: req.body.eventPrimary,
          event_type_secondary: req.body.eventSecondary,          
          actorOrgId: req.body.actorOrgId,
          createdBy: req.body.createdBy
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
        EmployeeModel.findOne({ emailId: req.body.user }).then(async (user) => {
          if (user) {
            const { id, firstName, lastName, emailId, phoneNumber } = user
            const alertData = {
              productId: req.body.productId,
              productName: req.body.productName,
              manufacturer: req.body.manufacturer,
              event_type_primary: req.body.eventPrimary,
              event_type_secondary: req.body.eventSecondary,
              actorOrgId: req.body.actorOrgId,
              createdBy: req.body.createdBy,
            }
            console.log(alertData)
            const alert = new Alerts({
              id: utility.randomNumber(10),
              username: req.body.user,
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
                  result,
                  'Alert Added successfully',
                )
              }
            })
          }
        })
      }
    } catch (err) {
      apiResponse.ErrorResponse(res, err)
    }
  },
]
