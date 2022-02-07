const OTPTemplate = require("./OTP");
const alertTemplate = require("./alert");

function emailBodyGenerator(body, source, isOTP) {
  if (isOTP) return OTPTemplate(body, source);
  return alertTemplate(body, source);
}

module.exports = {
  emailBodyGenerator,
};
