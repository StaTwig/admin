const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  ignoreTLS: false,
  secure: false,
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
    from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
    to: to, // list of receivers e.g. bar@example.com, baz@example.com
    subject: subject, // Subject line e.g. 'Hello ✔'
    //text: text, // plain text body e.g. Hello world?
    html: html, // html body e.g. '<b>Hello world?</b>'
  });
};

exports.validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    if (
      email.indexOf("@statwig.com", email.length - "@statwig.com".length) !==
        -1 ||
      email.indexOf(
        "@cloudleaf.com",
        email.length - "@cloudleaf.com".length
      ) !== -1
    ) {
      //VALID
      return true;
    }
  }
  //return false;
  return true; 
};
