const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  //secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
  auth: {
    user: `${process.env.EMAIL_SMTP_USERNAME}`,
    pass: `${process.env.EMAIL_SMTP_PASSWORD}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.send = function (from, to, subject, html) {
  return transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    //text: text,
    html: html,
  });
};

exports.validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    if (
      email.indexOf("@statwig.com", email.length - "@statwig.com".length) !==
      -1 ||
      email.indexOf(
        "@cloudleaf.com",
        email.length - "@cloudleaf.com".length
      ) !== -1
    ) {
      return true;
    }
    return true;
  }
  return false;
};
