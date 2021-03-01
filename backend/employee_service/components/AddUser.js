const AddUser = ({ name,organisation }) => {
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
                  <h4>Hi ${name},</h4>
                  <h2>Welcome to VaccineLedger!</h2>
                  <p>Admin has Appproved your Reuqest to join Vaccine Ledger on organisation ${organisation}</p>
                  <p>By logging in & verifying your email just once, you can use all of our services!</p>
                  <span style="margin-bottom:15px"></span>
                  <span style="margin-bottom:15px"></span>
                  Continue to <a href="http://test.vaccineledger.com/login">Login</a>
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
  
  module.exports = AddUser;
  