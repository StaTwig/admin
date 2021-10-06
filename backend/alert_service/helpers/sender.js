const axios = require("axios");

exports.sendNotification = async function (data) {
  const {
    user,
    email,
    mobile,
    subject,
    content,
    type,
    eventType,
    transactionId,
  } = data;
  let res = await axios.post(process.env.NOTIFICATION, {
    user,
    email,
    mobile,
    whatsapp: false,
    subject,
    content,
    type,
    eventType,
    transactionId,
  });
  return res.data;
};
