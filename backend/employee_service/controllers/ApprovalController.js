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
const axios = require("axios")
const dotenv = require('dotenv').config();
const blockchain_service_url = process.env.URL;

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
                  'List of Users Not verified / get Approval List',
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
      errors = []
      try {
        checkToken(req, res, async result => {
          if (result.success) {
            const { organisation } = req.user;
            const { id , role } =req.query;
            EmployeeModel.findOne({
              $and: [
                { 'accountStatus': "NOTAPPROVED"},
                { 'id': id }
              ]
            })
              .then(employee => {
                if(employee)
                {
                  axios.get(
                    `${blockchain_service_url}/createUserAddress`
                  ).then(response =>{
                    const walletAddress = response.data.items;
                  const userData = {
                    walletAddress,
                  };
                  // logger.log(
                  //   "info",
                  //   "<<<<< EmployeeService < Approval Controller < accepet Approval : granting permission to user"
                  // );
                  axios.post(
                    `${blockchain_service_url}/grantPermission`,
                    userData
                  ).then(()=>console.log("posted")) 
                  //Granting permissons to the user
                  logger.log(
                    "info",
                    "<<<<< EmployeeService < Approval Controller < accept Approval : granted permission to user"
                  );
                  EmployeeModel.findOneAndUpdate({'id':id},{$set: { accountStatus:"ACTIVE" , isConfirmed: true , walletAddress , role}},{ "new": true}).exec().then(emp=>{
                    let emailBody = RequestApproved({
                      name: emp.firstName,
                      organisation,
                    });
                    // Send confirmation email
                    try {
                      mailer
                      .send(
                        constants.appovalEmail.from,
                        emp.emailId,
                        constants.appovalEmail.subject,
                        emailBody
                      )
                    }
                    catch(mailerr){
                      console.log(mailerr)
                    }
                    return apiResponse.successResponseWithData(
                      res,
                      `User Verified`,
                      emp
                    );
                  })
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
    (req,res) =>{
      try {
        checkToken(req, res, async result => {
          if (result.success) {
            const { organisationId, organisation} = req.user;
            const { id } = req.query;
            await EmployeeModel.findOne({
              $and: [
                { 'accountStatus': "NOTAPPROVED"},
                { 'organisationId': organisationId },
                { 'id' : id }
              ]
            })
              .then(employees => {
                if(employees)
                {
                EmployeeModel.findOneAndUpdate({id},{$set:{accountStatus:"REJECTED"}},{"new": true}).exec().then(emp=>{
                  console.log("REJECTED")
                  let emailBody = RejectedApproval({
                    name: emp.firstName,
                    organisation,
                  })
                  try{
                    mailer.send(
                      constants.appovalEmail.from,
                      emp.emailId,
                      constants.appovalEmail.subject,
                      emailBody)
                    console.log("MAIL SENDING")  
                  }
                  catch(err){console.log(err)}
                return apiResponse.successResponseWithData(res,'User Rejected',emp);
              }).catch(err => {
                return apiResponse.ErrorResponse(res, err);
              });
            }
            else{
              return apiResponse.notFoundResponse(res, "User not Found")
            }
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