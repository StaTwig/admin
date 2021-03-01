const EmployeeModel = require("../models/EmployeeModel")
const auth = require("../middlewares/jwt");
const init = require("../logging/init");
const logger = init.getLog();
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
const RequestApproved = require("../components/RequestApproved")
const RejectedApproval = require("../components/RejectedApproval")
const AddUserEmail = require("../components/AddUser")
const checkToken = require("../middlewares/middleware").checkToken;
const apiResponse = require("../helpers/apiResponse");
const axios = require("axios")
const uniqid = require("uniqid");
const dotenv = require('dotenv').config();
const blockchain_service_url = process.env.URL;

exports.getApprovals = [
    auth,
    async (req,res) =>{
      try {
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
            res.status(403).json('Auth failed');
          }
        });
      } catch (err) {
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
            const { organisationName } = req.user;
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
                  axios.post(
                    `${blockchain_service_url}/grantPermission`,
                    userData
                  ).then(()=>console.log("posted")) 
                  EmployeeModel.findOneAndUpdate({'id':id},{$set: { accountStatus:"ACTIVE" , isConfirmed: true , walletAddress , role}},{ "new": true}).exec().then(emp=>{
                    let emailBody = RequestApproved({
                      name: emp.firstName,
                      organisationName,
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
            res.status(403).json('Auth failed');
          }
        });
      } catch (err) {
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
            const { organisationId, organisationName} = req.user;
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
                    organisationName,
                  })
                  try{
                    mailer.send(
                      constants.rejectEmail.from,
                      emp.emailId,
                      constants.rejectEmail.subject,
                      emailBody)
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
            res.status(403).json('Auth failed');
          }
        });
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    }
  ]

  exports.addUser = [
    auth,
    (req,res) =>{
      try {
        checkToken(req, res, async result => {
          if (result.success) {
            const { organisationId, organisationName} = req.user;
            const user = new EmployeeModel({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              emailId: req.body.emailId,
              organisationId: organisationId,
              id: uniqid('emp-'),
            });
            await user.save()
            let emailBody = AddUserEmail({
              name: req.body.emailId,
              organisationName,
            })
            try{
                    mailer.send(
                      constants.addUser.from,
                      req.body.emailId,
                      constants.addUser.subject,
                      emailBody)
                  }
                  catch(err){console.log(err)}
                return apiResponse.successResponse(res,'User Added');
          } else {
            res.status(403).json('Auth failed');
          }
        });
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    }
  ]