const OTPTemplate = require("./OTP");
const alertTemplate = require("./alert");
const customTemplate = require("./custom");
function emailBodyGenerator(body, source, isOTP, isCustom) {
  if (isCustom) return customTemplate(body, source);
  if (isOTP) return OTPTemplate(body, source);
  return alertTemplate(body, source);
}

module.exports = {
  emailBodyGenerator,
};
