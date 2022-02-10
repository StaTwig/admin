module.exports = function template(body, source) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
      @media screen and (max-width: 600px) {
              img.brandlogo{
                width: 200px !important;
                max-width: 200px !important;
              }
              img.bannerImg{
                width: 260px !important;
                max-width: 260px !important;
              }
            }
            @media screen and (max-width: 400px) {
              img.brandlogo{
                width: 160px !important;
                max-width: 160px !important;
              }
              img.bannerImg{
                width: 200px !important;
                max-width: 200px !important;
              }
            }
            @media screen and (max-width: 300px) {
              img.brandlogo{
                width: 120px !important;
                max-width: 120px !important;
              }
              img.bannerImg{
                width: 160px !important;
                max-width: 160px !important;
              }
            }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f9f9fc;">
    <center class="wrapper" style="width:100%;table-layout:fixed;background-color:#f9f9fc;">
      <div class="webkit" style="max-width:600px;background-color:#ffffff;">
        <table class="outer" align="center" style="Margin:0 auto;width:100%;max-width:600px;border-spacing:0;font-family:sans-serif;color:#333333;">
          <tr>
            <td style="padding:0;">
              <table width="100%" style="border-spacing:0;border-spacing: 0;">
                <tr>
                  <td style="padding:0;background-color: #8fc5f8;padding: 30px;text-align: center;">
                    <a href="${source}" style="text-decoration: none;"><img class="brandlogo" src="https://test.vaccineledger.com/logo.png" width="280" alt="logo" style="border:0;"></a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <table width="100%" style="border-spacing:0;border-spacing: 0;">
                <tr>
                  <td style="padding:0;padding: 30px;text-align: center;">
                    <img class="bannerImg" src="https://test.vaccineledger.com/alert.png" width="360" alt="logo" style="border:0;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <table width="100%" style="border-spacing:0;border-spacing: 0;">
                <tr>
                  <td style="padding:0;padding: 10px 30px;text-align: center;">
                    <p style="font-size: 1rem;font-weight: 700;color: #222222;line-height: 1.5rem;Margin-bottom: 20px">${body}</p>
                    <a href="${source}" class="link-text" style="font-size: 0.9rem;font-weight: 600;color: #008cff;text-decoration: none;Margin-bottom: 20px;">Click here to Login</a>
                    <p class="small-text" style="font-size: 0.9rem;font-weight: 500;color: #6b6b6b;line-height: 1.5rem;Margin-bottom: 20px;padding: 0 20px;">
                      In case of any queries or if you didn't request this, you can
                      ignore this email or let us know at
                      <strong><a href="mailto:contactus@statwig.com" style="font-size: 1rem;color: #4a4a4a;text-decoration: none;">contactus@statwig.com</a></strong>
                    </p>
                    <p style="font-size: 1rem;font-weight: 700;color: #222222;line-height: 1.5rem;Margin-bottom: 20px">Thanks</p>
                    <p style="font-size: 1rem;font-weight: 700;color: #222222;line-height: 1.5rem;Margin-bottom: 20px">Team Statwig</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;background-color: #8fc5f8;height: 5rem;">
              <table width="100%" style="border-spacing:0;border-spacing: 0;">
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>`;
};
