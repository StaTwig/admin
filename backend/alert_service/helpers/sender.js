const axios = require("axios");

exports.sendNotification = async function (
  user,
  email,
  content,
  subject,
  mobile
) {
  let res = axios.post(process.env.NOTICATION, {
    user,
    email,
    whatsapp: false,
    mobile,
  });
};
