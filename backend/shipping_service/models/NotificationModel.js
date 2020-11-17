const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
  {
    owner: { type: String, required: true },
    message: { type: String },

  },
  { timestamps: true },
);
module.exports = mongoose.model('Notification', NotificationSchema);
