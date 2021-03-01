const RejectedApproval = ({ name,organisation }) => {
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
                  <h2>We are sorry to say that : </h2>
                  <p>The Admin of ${organisation} has REJECTED your approval to join Vaccine Ledger on behalf of organisation ${organisation}</p>
                  <p>Contact the Admin of the Organisation to know about your request Rejection</p>
                  <span style="margin-bottom:15px"></span>
                  <span style="margin-bottom:15px"></span>
                  <a href="http://test.vaccineledger.com/login">Continue</a>
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
  
  module.exports = RejectedApproval;
  