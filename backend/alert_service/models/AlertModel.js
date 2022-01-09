const mongoose = require("mongoose");
const AlertSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    username: String,
    label: {
      labelId: String,
    },
    active: { type: Object },
    user: {
      user_id: String,
      user_name: String,
      emailId: String,
      mobile_number: String,
    },
    transactionIds: [String],
    alerts: [
      {
        id: String,
        productID: String,
        actorOrgId: String,
        event_type_primary: String,
        event_type_secondary: String,
        createdBy: String,
        transactionId: String,
      },
    ],
    alertMode: {
      mobile: {
        type: Boolean,
        default: false,
      },
      email: {
        type: Boolean,
        default: true,
      },
      telegram: {
        type: Boolean,
        default: false,
      },
      web_push: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", AlertSchema);
