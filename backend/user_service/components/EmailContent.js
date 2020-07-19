const EmailContent = ({ name, origin, otp }) => {
  const verifyLink = `${origin}/verify`;
  return `<head>
        <title>VaccineLedger</title>
        <style>
            body {
                font-family: Helvetica, sans-serif;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="logo">
                <img src="http://test.vaccineledger.com/dist/97b8f67db5b802bef872b0d34d7baf06.png" style="width: 200px;"/>
            </div>
            <div class="email-body">
                <h4>Dear ${name},</h4>
                <h2>Welcome to VaccineLedger!</h2>
                <p>To help you get started using VaccineLedger, we need to make sure that we have your right email address.</p>
                <p>By verifying your email just once, you can use all of our services!</p>
                <span style="margin-bottom:15px"></span>
                <h2>OTP - ${otp}</h2>
                <span style="margin-bottom:15px"></span>
                <a href=${verifyLink}>${verifyLink}</a>
                <span style="margin-bottom:15px"></span>
                <h2>What is VaccineLedger?</h2>
                <p>VaccineLedger is a Blockchain based platform, to track and trace vaccine's journey across the suplly chain.</p>
                <span style="margin-bottom:15px"></span>
                <p>
                    Please mail us at <a href="mailto:contactus@statwig.com">contactus@statwig.com</a> in case of any queries or if you've not initiated this request.
                </p>
            </div>
        </div>
    </body>`;
};

module.exports = EmailContent;
