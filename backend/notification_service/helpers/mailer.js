const nodemailer = require("nodemailer");
const { emailBodyGenerator } = require("../templates");
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP_HOST,
  port: process.env.EMAIL_SMTP_PORT,
  //secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
  auth: {
    user: process.env.EMAIL_SMTP_USERNAME,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
});

exports.send = function (from, to, subject, data, cc) {
  return transporter.sendMail({
		from: from,
		to: to,
		...(cc ? { cc: cc } : {}),
		subject: subject,
		html: emailBodyGenerator(data.body, data.source, data?.isOTP, data?.isCustom),
	});
};
