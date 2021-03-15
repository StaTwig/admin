const EmailContent = ({ name, origin, otp }) => {
  const verifyLink = `${origin}/verify`;
  return `<head>
        <title>OTP</title>
        <style>
            body {
                font-family: Helvetica, sans-serif;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            
            <div class="email-body">
                <h4>Dear ${name},</h4>
                
                
                <p>To verify please use the below OTP</p>
                <span style="margin-bottom:15px"></span>
                <h2>OTP - ${otp}</h2>
                <span style="margin-bottom:15px"></span>
                <a href=${verifyLink}>${verifyLink}</a>
                <span style="margin-bottom:15px"></span>
                
                <span style="margin-bottom:15px"></span>
                <p>
                    Please mail us at <a href="mailto:contactus@statwig.com">contactus@statwig.com</a> in case of any queries or if you've not initiated this request.
                </p>
            </div>
        </div>
    </body>`;
};

module.exports = EmailContent;
