const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  //secure: process.env.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
  auth: {
    user: "info@babyboo.in",
    pass: "NetStar2019",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.send = function (from, to, subject, html) {
  // send mail with defined transport object
  // visit https://nodemailer.com/ for more options
  return transporter.sendMail({
    from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
    to: to, // list of receivers e.g. bar@example.com, baz@example.com
    subject: subject, // Subject line e.g. 'Hello ✔'
    //text: text, // plain text body e.g. Hello world?
    html: html, // html body e.g. '<b>Hello world?</b>'
  });
};
