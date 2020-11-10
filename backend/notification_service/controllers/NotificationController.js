const NotificationModel = require('../models/NotificationModel');
//helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const auth = require('../middlewares/jwt');

exports.getNotifications = [
  auth,
  async (req, res) => {
    try {
      const { address } = req.user;
      const notifications = await NotificationModel.find({ owner: address });
      return apiResponse.successResponseWithData(
        res,
        'Notifications',
        notifications,
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.deleteNotification = [
  auth,
  async (req, res) => {
    try {
      const { id } = req.body;
      const { address } = req.user;
      await NotificationModel.deleteOne({ _id: id });
      const notifications = await NotificationModel.find({ owner: address });
      return apiResponse.successResponseWithData(
        res,
        'Notifications',
        notifications,
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
