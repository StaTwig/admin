const EmployeeModel = require("../models/EmployeeModel")
const auth = require("../middlewares/jwt");
const init = require("../logging/init");
const logger = init.getLog();
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
const RequestApproved = require("../components/RequestApproved")
const RejectedApproval = require("../components/RejectedApproval")
const checkToken = require("../middlewares/middleware").checkToken;
const apiResponse = require("../helpers/apiResponse");

exports.getApprovals = [
    auth,
    async (req,res) =>{
      try {
        // const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
            const { organisationId } = req.user;
            await EmployeeModel.find({
              $and: [
                { 'accountStatus': "NOTAPPROVED"},
                { 'organisationId': organisationId },
              ],
            })
              .then(employees => {
                return apiResponse.successResponseWithData(
                  res,
                  'Users Not verified',
                  employees,
                );
              })
              .catch(err => {
                return apiResponse.ErrorResponse(res, err);
              });
          } else {
            logger.log(
              'warn',
              '<<<<< EmployeeService < ApprovalController < getApprovals : refuted token',
            );
            res.status(403).json('Auth failed');
          }
        });
      } catch (err) {
        logger.log(
          'error',
          '<<<<< EmployeeService < ApprovalController < getApprovals : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
      }
    }
  ]

  exports.acceptApproval = [
    auth,
    (req,res) =>{
      try {
        // const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
            const { organisation } = req.user;
            const { id } =req.query;
            EmployeeModel.find({
              $and: [
                { 'accountStatus': "NOTAPPROVED"},
                { 'id': id },
              ],
            })
              .then(employee => {
                if(employee)
                {
                  const response = axios.get(
                    `${blockchain_service_url}/createUserAddress`
                  );
                  const walletAddress = response.data.items;
                  const userData = {
                    walletAddress,
                  };
                  logger.log(
                    "info",
                    "<<<<< EmployeeService < Approval Controller < accepet Approval : granting permission to user"
                  );
                  axios.post(
                    `${blockchain_service_url}/grantPermission`,
                    userData
                  ); //Granting permissons to the user
                  logger.log(
                    "info",
                    "<<<<< EmployeeService < Approval Controller < accept Approval : granted permission to user"
                  );
                  EmployeeModel.findOneAndUpdate({'id':id},{$set: { accountStatus:"ACTIVE" , isConfirmed: true , walletAddress}},{ "new": true}).exec().then(emp=>{
                    let emailBody = RequestApproved({
                      name: emp.firstName,
                      organisation,
                    });
                    // Send confirmation email
                    mailer
                      .send(
                        constants.appovalEmail.from,
                        emp.emailId,
                        constants.appovalEmail.subject,
                        emailBody
                      )
                    return apiResponse.successResponseWithData(
                      res,
                      'User Verified',
                      emp,
                    );
                  })
                } else{
                  return apiResponse.notFoundResponse(res, "User Not Found")
                }  
              })
              .catch(err => {
                return apiResponse.ErrorResponse(res, err);
              });
          } else {
            logger.log(
              'warn',
              '<<<<< EmployeeService < ApprovalController < Accept Approval : refuted token',
            );
            res.status(403).json('Auth failed');
          }
        });
      } catch (err) {
        logger.log(
          'error',
          '<<<<< EmployeeService < ApprovalController < Accept Approval : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
      }
    }
  ]
  
  exports.rejectApproval = [
    auth,
    async (req,res) =>{
      try {
        // const { authorization } = req.headers;
        checkToken(req, res, async result => {
          if (result.success) {
            const { organisationId } = req.user;
            const { id } = req.query;
            await EmployeeModel.find({
              $and: [
                { 'accountStatus': "NOTAPPROVED"},
                { 'organisationId': organisationId },
                { 'id' : id },
              ],
            })
              .then(employees => {
                EmployeeModel.findOneAndUpdate({id},{$set: { accountStatus:"REJECTED"}},{"new": true}).exec().then(emp=>{
                  let emailBody = RejectedApproval({
                    name: emp.firstName,
                    organisation,
                  });
                  mailer
                    .send(
                      constants.appovalEmail.from,
                      emp.emailId,
                      constants.appovalEmail.subject,
                      emailBody
                    )  
                return apiResponse.successResponseWithData(
                  res,
                  'User Rejected',
                  emp,
                );
              }).catch(err => {
                return apiResponse.ErrorResponse(res, err);
              });
            })
              .catch(err => {
                return apiResponse.ErrorResponse(res, err);
              });
          } else {
            logger.log(
              'warn',
              '<<<<< EmployeeService < ApprovalController < reject Approvals : refuted token',
            );
            res.status(403).json('Auth failed');
          }
        });
      } catch (err) {
        logger.log(
          'error',
          '<<<<< EmployeeService < ApprovalController < reject Approvals : error (catch block)',
        );
        return apiResponse.ErrorResponse(res, err);
      }
    }
  ]