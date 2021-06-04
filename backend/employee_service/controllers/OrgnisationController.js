const OrganisationModel = require("../models/OrganisationModel");
const EmployeeModel = require("../models/EmployeeModel");
const auth = require("../middlewares/jwt");
const apiResponse = require("../helpers/apiResponse");

const checkToken = require("../middlewares/middleware").checkToken;

exports.getOrgs = [
  auth,
  async (req, res) => {
    try {
      const users = await OrganisationModel.find({
        // status: "NOTVERIFIED",
      }).select(
        "name postalAddress country primaryContactId createdAt type status logoId id"
      );
      for(var c = 0; c < users.length; c++){
        try {
          const employeeEmail = await EmployeeModel.findOne({id:users[c].primaryContactId}).select("emailId");
          users[c].primaryContactId = employeeEmail.emailId;
        } catch (err) {
          console.log(err);
        }
      }
      return apiResponse.successResponseWithData(
        res,
        "Organisation list",
        users
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updateOrg = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { id, status, type, typeId } = req.body;
          await OrganisationModel.findOneAndUpdate(
            {
              id: id,
            },
            {
              $set: {
                status: status,
                type:type,
                typeId : typeId || ""
              },
            }
          )
            .then(async (org) => {
              let res_message = "Organisation updated!!";
              await EmployeeModel.updateOne(
                { id: org.primaryContactId },
                {
                  $set: {
                    accountStatus: status,
                  },
                }
              );
              return apiResponse.successResponseWithData(res, res_message);
            })
            .catch((err) => {
              console.log(err);

              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
