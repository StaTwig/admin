const EmployeeModel = require("../models/EmployeeModel");
const CounterModel = require("../models/CounterModel");
const auth = require("../middlewares/jwt");
const mailer = require("../helpers/mailer");
const { constants } = require("../helpers/constants");
const RequestApproved = require("../components/RequestApproved");
const RejectedApproval = require("../components/RejectedApproval");
const AddUserEmail = require("../components/AddUser");
const checkToken = require("../middlewares/middleware").checkToken;
const apiResponse = require("../helpers/apiResponse");
const axios = require("axios");
const uniqid = require("uniqid");
const dotenv = require("dotenv").config();
const { URL } = require('url')
const blockchain_service_url = process.env.URL;

exports.getApprovals = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { organisationId } = req.user;
          await EmployeeModel.find({
            $and: [
              { accountStatus: "NOTAPPROVED" },
              { organisationId: organisationId },
            ],
          })
            .then((employees) => {
              return apiResponse.successResponseWithData(
                res,
                "List of Users Not verified / get Approval List",
                employees
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          return apiResponse.unauthorizedResponse(res, "Auth Failed")
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.acceptApproval = [
  auth,
  (req, res) => {
    try {
      var errorList = [];
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { organisationName } = req.user;
          const { id, role, warehouseId } = req.query;
          EmployeeModel.findOne({
            $and: [{ accountStatus: "NOTAPPROVED" }, { id: id }],
          })
            .then((employee) => {
              if (employee) {
                try{
                  axios
                  .get(`${blockchain_service_url}/createUserAddress`)
                  .then((response) => {
                    const walletAddress = response.data.items;
                    const userData = {
                      walletAddress,
                    }
                    axios
                    .post(
                      `${blockchain_service_url}/grantPermission`,
                      userData
                    )
                    .then(() => console.log("posted"))
                    .catch((err)=>{
                      console.log(err);
                      errorList.push(err);
                    });
                    EmployeeModel.findOneAndUpdate(
                      { id: id },
                      {
                        $set: {
                          accountStatus: "ACTIVE",
                          isConfirmed: true,
                          walletAddress,
                          role
                        },
                        $push: {warehouseId}
                      },
                      { new: true }
                    )
                      .exec()
                      .then((emp) => {
                        let emailBody = RequestApproved({
                          name: emp.firstName,
                          organisation: organisationName,
                        });
                        // Send confirmation email
                        try {
                          mailer.send(
                            constants.appovalEmail.from,
                            emp.emailId,
                            constants.appovalEmail.subject,
                            emailBody
                          );
                        } catch (mailError) {
                          console.log(mailError);
                          errorList.push(mailError);
                        }
                        return apiResponse.successResponseWithData(
                          res,
                          `User Verified`,
                          emp
                        );
                      });
                  }  
                  ).catch((err)=>{
                      console.log(err);
                      errorList.push(errorList);
                    })
                }
                catch(error){
                  console.log(error);
                  errorList.push(error);
                }
              } else {
                return apiResponse.notFoundResponse(res, "User Not Found");
              }
            })
            .catch((err) => {
              errorList.push(err);
              return apiResponse.ErrorResponse(res, errorList);
            });
        } else {
          return apiResponse.unauthorizedResponse(res, "Auth Failed")
        }
      });
    } catch (err) {
      errorList.push(err)
      return apiResponse.ErrorResponse(res, errorList);
    }
  },
];

exports.rejectApproval = [
  auth,
  (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { organisationId, organisationName } = req.user;
          const { id } = req.query;
          await EmployeeModel.findOne({
            $and: [
              { accountStatus: "NOTAPPROVED" },
              { organisationId: organisationId },
              { id: id },
            ],
          })
            .then((employees) => {
              if (employees) {
                EmployeeModel.findOneAndUpdate(
                  { id },
                  { $set: { accountStatus: "REJECTED" } },
                  { new: true }
                )
                  .exec()
                  .then((emp) => {
                    console.log("REJECTED");
                    let emailBody = RejectedApproval({
                      name: emp.firstName,
                      organisation: organisationName,
                    });
                    try {
                      mailer.send(
                        constants.rejectEmail.from,
                        emp.emailId,
                        constants.rejectEmail.subject,
                        emailBody
                      );
                    } catch (err) {
                      console.log(err);
                    }
                    try{
                      EmployeeModel.findOneAndDelete({id}).then(()=>console.log("deleted"))
                    }catch(err){
                      console.log(err)
                      return apiResponse.ErrorResponse(res, err);
                    }
                    return apiResponse.successResponseWithData(
                      res,
                      "User Rejected",
                      emp
                    );
                  })
                  .catch((err) => {
                    return apiResponse.ErrorResponse(res, err);
                  });
              } else {
                return apiResponse.notFoundResponse(res, "User not Found");
              }
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          return apiResponse.unauthorizedResponse(res, "Auth Failed")
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addUser = [
  auth,
  (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { organisationId, organisationName } = req.user;
          const email = req.body.emailId;
          const warehouse = req.body.warehouse;
          const firstName = email.split("@")[0];
          
          const incrementCounterEmployee = await CounterModel.update({
                  'counters.name': "employeeId"
               },{
                    $inc: {
                      "counters.$.value": 1
                  }
             })

          const employeeCounter = await CounterModel.findOne({'counters.name':"employeeId"},{"counters.$":1})
          var employeeId = employeeCounter.counters[0].format + employeeCounter.counters[0].value;
          
          const user = new EmployeeModel({
            firstName: firstName,
            lastName: firstName,
            emailId: email,
            organisationId: organisationId,
            role: req.body.role,
            accountStatus: "ACTIVE",
            warehouseId: warehouse,
            isConfirmed: true,
            id : employeeId
            //id: uniqid("emp-"),
          });
          await user.save();
          let emailBody = AddUserEmail({
            name: firstName,
            organisation: organisationName,
          });
          try {
            mailer.send(
              constants.addUser.from,
              req.body.emailId,
              constants.addUser.subject,
              emailBody
            );
          } catch (err) {
            console.log(err);
          }
          return apiResponse.successResponse(res, "User Added");
        } else {
          return apiResponse.unauthorizedResponse(res, "Auth Failed")
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.activateUser = [
  auth,
  (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { organisationName } = req.user;
          const { id, role } = req.query;
          EmployeeModel.findOne({ id: id })
            .then((employee) => {
              if (employee) {
                if (
                  employee.isConfirmed &&
                  employee.accountStatus == "ACTIVE"
                ) {
                  return apiResponse.successResponseWithData(
                    res,
                    " User is already Active",
                    employee
                  );
                } else {
                  axios
                    .get(`${blockchain_service_url}/createUserAddress`)
                    .then((response) => {
                      const walletAddress = response.data.items;
                      const userData = {
                        walletAddress,
                      };
                      axios
                        .post(
                          `${blockchain_service_url}/grantPermission`,
                          userData
                        )
                        .then(() => console.log("posted"));
                      EmployeeModel.findOneAndUpdate(
                        { id: id },
                        {
                          $set: {
                            accountStatus: "ACTIVE",
                            isConfirmed: true,
                            walletAddress,
                            role,
                          },
                        },
                        { new: true }
                      )
                        .exec()
                        .then((emp) => {
                          let emailBody = RequestApproved({
                            name: emp.firstName,
                            organisation: organisationName,
                          });
                          // Send confirmation email
                          try {
                            mailer.send(
                              constants.appovalEmail.from,
                              emp.emailId,
                              constants.appovalEmail.subject,
                              emailBody
                            );
                          } catch (mailError) {
                            console.log(mailError);
                          }
                          return apiResponse.successResponseWithData(
                            res,
                            `User Activated`,
                            emp
                          );
                        });
                    });
                }
              } else {
                return apiResponse.notFoundResponse(res, "User Not Found");
              }
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          return apiResponse.unauthorizedResponse(res, "Auth Failed")
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.deactivateUser = [
  auth,
  (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { organisationName } = req.user;
          const { id } = req.query;
          EmployeeModel.findOneAndUpdate(
            { id },
            { $set: { accountStatus: "REJECTED" } },
            { new: true }
          )
            .exec()
            .then((emp) => {
              console.log("REJECTED");
              let emailBody = RejectedApproval({
                name: emp.firstName,
                organisationName,
              });
              try {
                mailer.send(
                  constants.rejectEmail.from,
                  emp.emailId,
                  constants.rejectEmail.subject,
                  emailBody
                );
              } catch (err) {
                console.log(err);
              }
              return apiResponse.successResponseWithData(
                res,
                "User Rejected",
                emp
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          return apiResponse.unauthorizedResponse(res, "Auth Failed")
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
