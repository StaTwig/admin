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
const cuid = require("cuid");

function sendEmail(subject, data, emailId, cc) {
  return mailer.send(constants.confirmEmails.from, emailId, subject, data, cc);
}

function sendSMS(content, mobile) {
  return client.messages.create({
    body: content,
    from: fromMobile,
    to: mobile,
  });
}

function sendWhatsApp(content, mobile) {
  return client.messages.create({
    from: `whatsapp:${fromMobile}`,
    body: content,
    to: `whatsapp:${mobile}`,
  });
}

async function pushNotification(body) {
  try {
    const { content, user, type, transactionId, eventType } = body;
    let notification = new Notification({
      id: cuid(),
      title: "Vaccine Ledger Alert",
      message: content,
      user: user,
      eventType: eventType,
      transactionId: transactionId,
    });
    type == "ALERT"
      ? (notification.type = "ALERT")
      : (notification.type = "TRANSACTION");
    await notification.save();
    await client.notify.services(twilio_service_id).notifications.create({
      fcm: { notification: { body: content, title: "New Notification" } },
      apn: { notification: { body: content, title: "New Notification" } },
      identity: user,
    });
  } catch (err) {
    console.log(err);
  }
}

exports.getNotifications = [
  auth,
  async (req, res) => {
    try {
      let resPerPage = Number(req.query.limit) || 20;
      if (resPerPage > 100) resPerPage = 100;
      const userId = req.user.id;
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
          "List of Notifications",
          data
        );
      } else {
        return apiResponse.successResponseWithData(
          res,
          "No Notifications Found",
          []
        );
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.createTwilioBinding = [
  auth,
  async (req, res) => {
    try {
      await client.notify.services(twilio_service_id).bindings.create({
        identity: req.user.id,
        bindingType: req.body.device_type == "ios" ? "apn" : "fcm",
        address: req.body.token_id,
      });
      return apiResponse.successResponse(res, "Successfully Registered");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.sendOtp = [
  async (req, res) => {
    try {
      const content =
        "Your OTP to login to " +
        req.body.source +
        " is " +
        req.body.OTP +
        ". It is valid for only 10 minutes";
      if (req.body.mobile) {
        if (req.body.whatsapp && req.body.whatsapp == true)
          sendWhatsApp(content, req.body.mobile);
        else sendSMS(content, req.body.mobile);
      }
      const data = {
        body: req.body.OTP,
        source: req.body.source,
        isOTP: true,
      };
      if (req.body.email) sendEmail("OTP To Login", data, req.body.email);
      return apiResponse.successResponse(res, "OTP Sent Successfully");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.sendMessage = [
  async (req, res) => {
    try {
      if (req?.body?.mobile) {
        if (req?.body?.whatsapp && req?.body?.whatsapp == true)
          sendWhatsApp(req.body?.content, req.body.mobile);
        sendSMS(req.body?.content, req.body.mobile);
      }
      if (req.body.email)
        sendEmail(
					req.body.subject,
					{
						body: req?.body?.content,
						source: req?.body?.source,
						isOTP: false,
						isCustom: req.body?.isCustom || false,
					},
					req.body.email,
					req?.body?.cc,
				);
      return apiResponse.successResponse(res, "Message Sent Success");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.pushNotifications = [
  async (req, res) => {
    try {
      await pushNotification(req.body);
      if (!process.env.ENVIRONMENT == "TEST") {
        if (req.body.mobile) {
          if (req.body.whatsapp && req.body.whatsapp == true)
            sendWhatsApp(req.body.content, req.body.mobile);
          else sendSMS(req.body.content, req.body.mobile);
        }
      }
      if (req.body.email)
        sendEmail(
          req.body.subject,
          {
            body: req.body.content,
            source: req.body.source,
            isOTP: false,
          },
          req.body.email
        );
      return apiResponse.successResponse(res, "Push Notification Sent");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.readNotification = [
  auth,
  async (req, res) => {
    try {
      const { id } = req.query;
      await Notification.findOneAndUpdate({ id }, { $set: { isRead: true } });
      return apiResponse.successResponse(res, "Notification Read Success");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
