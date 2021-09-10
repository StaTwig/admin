const mongoose = require("mongoose");
NotificationSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    user: {
      type: String,
    },
    type: { type: String },
    eventType: { type: String },
    transactionId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
