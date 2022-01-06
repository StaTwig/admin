const axios = require("axios");

exports.sendNotification = async function (data) {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

exports.sendMessage = async function (data) {
  const { mobile, content, subject, email } = data;
  let res = await axios.post(process.env.MESSAGE, {
    whatsapp: false,
    content,
    mobile,
    subject,
    email,
  });
  return res.data;
};
