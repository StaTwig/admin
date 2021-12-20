const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_service_id = process.env.TWILIO_SERVICE_ID;
const Notification = require("../models/NotificationModel");
const client = require("twilio")(accountSid, authToken, {
  lazyLoading: false,
});
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
const fromMobile = process.env.FROMNO;
var uuid = require("uuid");

function sendEmail(subject, content, emailId) {
  mailer
    .send(constants.confirmEmails.from, emailId, subject, content)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

function sendSMS(content, mobile) {
  console.log("SENDING " + content + " TO " + mobile);
  client.messages
    .create({
      body: content,
      from: fromMobile,
      to: mobile,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
}

function sendWhatsApp(content, mobile) {
  client.messages
    .create({
      from: `whatsapp:${fromMobile}`,
      body: content,
      to: `whatsapp:${mobile}`,
    })
    .then((message) => console.log("WhatsApp SENT", message.sid))
    .catch((err) => console.log(err));
}

exports.getNotifications = [
  auth,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const resPerPage = Number(req.query.limit) || 20;
      const page = Number(req.query.page) || 1;
      const totalRecords = await Notification.countDocuments({
        user: userId,
        type: req.query.type,
      });
      const totalUnRead = await Notification.countDocuments({
        user: userId,
        isRead: false,
      });
      const newNotifications = await Notification.countDocuments({
        user: userId,
        type: req.query.type,
        isRead: false,
      });
      const notifications = await Notification.find({
        user: userId,
        type: req.query.type,
      })
        .sort({ _id: -1 })
        .skip(resPerPage * page - resPerPage)
        .limit(resPerPage);
      if (notifications.length > 0) {
        const data = {
          totalUnRead: totalUnRead,
          totalRecords: totalRecords,
          new: newNotifications,
          data: notifications,
        };
        return apiResponse.successResponseWithData(
          res,
          "Operation Success",
          data
        );
      } else {
        return apiResponse.successResponseWithData(res, "No Results Found", []);
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.createTwilioBinding = [
  auth,
  async (req, res) => {
    try {
      console.log("REGISTERING");
      console.log(req.user);
      client.notify
        .services(twilio_service_id)
        .bindings.create({
          identity: req.user.id,
          bindingType: req.body.device_type == "ios" ? "apn" : "fcm",
          address: req.body.token_id,
        })
        .then((binding) => console.log(binding));
      return apiResponse.successResponse(res, "Succesfully Registered");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.sendOtp = [
  async (req, res) => {
    try {
      let content =
        "Your OTP to login to " +
        req.body.source +
        " is " +
        req.body.OTP +
        ". It is valid for 10 minutes";
      if (req.body.mobile) {
        if (req.body.whatsapp && req.body.whatsapp == true)
          sendWhatsApp(content, req.body.mobile);
        else sendSMS(content, req.body.mobile);
      }
      if (req.body.email) sendEmail("OTP To Login", content, req.body.email);
      return apiResponse.successResponse(res, "SENT");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.sendMessage = [
  async (req, res) => {
    try {
      if (req.body.mobile) {
        if (req.body.whatsapp && req.body.whatsapp == true)
          sendWhatsApp(req.body.content, req.body.mobile);
        else sendSMS(req.body.content, req.body.mobile);
      }
      if (req.body.email)
        sendEmail(req.body.subject, req.body.content, req.body.email);
      return apiResponse.successResponse(res, "SENT");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.pushNotifications = [
  async (req, res) => {
    try {
      pushNotification(
        req,
        req.body.user,
        req.body.type,
        req.body.transactionId
      );
      if (req.body.mobile) {
        if (req.body.whatsapp && req.body.whatsapp == true)
          sendWhatsApp(req.body.content, req.body.mobile);
        else sendSMS(req.body.content, req.body.mobile);
      }
      if (req.body.email)
        sendEmail(req.body.subject, req.body.content, req.body.email);
      return apiResponse.successResponse(res, "SENT");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

function pushNotification(req, userId, type, transactionId) {
  try {
    const content = req.body.content;
    var notification = new Notification({
      id: uuid.v4(),
      title: "Vaccine Ledger Alert",
      message: content,
      user: userId,
      eventType: req.body.eventType,
      transactionId: transactionId,
    });
    if (type == "ALERT") notification.type = "ALERT";
    else notification.type = "TRANSACTION";
    notification.save(function (err, doc) {
      if (err) return console.error(err);
      console.log("Document inserted succussfully!", doc);
    });
  } catch (err) {
    console.log(err);
  }
}

exports.readNotification = [
  auth,
  async (req, res) => {
    try {
      const { id } = req.query;
      await Notification.findOneAndUpdate({ id }, { $set: { isRead: true } });
      return apiResponse.successResponse(res, "Notification READ Success");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
