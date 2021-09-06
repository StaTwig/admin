const NotificationModel = require('../models/NotificationModel');
//helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const auth = require('../middlewares/jwt');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_service_id = process.env.TWILIO_SERVICE_ID;
const Notification = require('../models/NotificationModel')
const client = require('twilio')(accountSid, authToken, {
  lazyLoading: true
});
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
const fromMobile = '+1234567890'
function sendEmail(subject,content,emailId){
  mailer.send(
    constants.confirmEmails.from,
    emailId,
    subject,
    content
  ).then(function () {
    return true
  }).catch(err => {
    console.log(err);
    return err;
  });
}

function sendSMS(content,mobile){
  client.messages
  .create({
     body: content,
     from: fromMobile,
     to: mobile
   })
  .then(message => console.log(message.sid));
}
function sendWhatsApp(content,mobile){
  client.messages
      .create({
         from: `whatsapp:${fromMobile}`,
         body: content,
         to: `whatsapp:${mobile}`
       })
      .then(message => console.log(message.sid));
}
exports.getAlertNotifications = [
  auth,
  async function (req, res) {
    try {
      // let notifications = await Notification.find({ user : req.user.id, type : 'ALERT'})
      const resPerPage = Number(req.query.limit) || 10; 
			const page = Number(req.query.page) || 1; 
			const totalRecords = await Alerts.count({...req.params})
      Notification.find({ user : req.user.id, type : req.query.type}).skip((resPerPage * page) - resPerPage)
      .limit(resPerPage).then(
        Alerts => {
          if (Alerts.length > 0) {
            const finalData = {
              totalRecords : totalRecords,
              data : Alerts
            }
            return apiResponse.successResponseWithData(
              res,
              "Operation success",
              finalData
            );
          } else {
            return apiResponse.successResponseWithData(
              res,
              "No Results Found",
              []
            );
          }
        }
      )
    } catch (err) {
      return apiResponse.ErrorResponse(res, err)
    }
  }
]

exports.getTransactionNotifications = [
  auth,
  async function (req, res) {
    try {
      Notification.find({ user : req.user.id, type : "TRANSACTION"}).skip((resPerPage * page) - resPerPage)
      .limit(resPerPage).then(
        Notifications => {
          if (Notifications.length > 0) {
            const finalData = {
              totalRecords : totalRecords,
              data : Notifications
            }
            return apiResponse.successResponseWithData(
              res,
              "Operation success",
              finalData
            );
          } else {
            return apiResponse.successResponseWithData(
              res,
              "No Results Found",
              []
            );
          }
        }
      )
    } catch (err) {
      return apiResponse.ErrorResponse(res, err)
    }
  }
]

exports.createTwilioBinding = [
  auth,
  async (req, res) => {
    try {
      console.log("REGISTERING")
      console.log(req.user)
      client.notify.services(twilio_service_id)
                      .bindings
                      .create({
                      identity: req.user.id,
                      bindingType: req.body.device_type == 'ios' ? 'apn' : 'fcm',
                      address: req.body.token_id
                      })
                      .then(binding => console.log(binding));
      return apiResponse.successResponse(res,"Succesfully Registered")
    } catch (err) {
      console.log(err)
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.sendOtp = [
  async (req, res) => {
    try {

    } catch (err) {
      console.log(err)
      return apiResponse.ErrorResponse(res, err);
    }
  },
];