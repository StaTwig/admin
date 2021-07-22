const OrganisationModel = require("../models/OrganisationModel");
const EmployeeModel = require("../models/EmployeeModel");
const WarehouseModel = require("../models/WarehouseModel")
const auth = require("../middlewares/jwt");
const apiResponse = require("../helpers/apiResponse");

const checkToken = require("../middlewares/middleware").checkToken;
let EmployeeIdMap = new Map();

exports.getOrgs = [
  auth,
  async (req, res) => {
    try {
      const users = await OrganisationModel.find({
        // status: "NOTVERIFIED",
      }).select(
        "name postalAddress country primaryContactId createdAt type status logoId id"
      );
      for (var c = 0; c < users.length; c++) {
        if (EmployeeIdMap.has(users[c].primaryContactId)) {
          users[c].primaryContactId = EmployeeIdMap.get(
            users[c].primaryContactId
          );
        } else {
          try {
            const employeeEmail = await EmployeeModel.findOne({
              id: users[c].primaryContactId,
            }).select("emailId");
            EmployeeIdMap.set(users[c].primaryContactId, employeeEmail.emailId);
            users[c].primaryContactId = employeeEmail.emailId;
          } catch (err) {}
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
                type: type,
                typeId: typeId || "",
              },
            },
            {
              new: true,
            }
          )
            .then(async (org) => {
              if(req.body.status === "REJECTED"){
                try{
                  await OrganisationModel.findOneAndDelete({id: id})
                  await EmployeeModel.findOneAndDelete(
                    { id: org.primaryContactId },
                  );
                  await WarehouseModel.findOneAndDelete({id: org.warehouses[0]})
                  return apiResponse.successResponseWithData(
                    res,
                    "Organisation updated ",
                    org
                  );
                }catch(err){
                  console.log(err);
                  return apiResponse.ErrorResponse(res, err);
                }
              }
              await EmployeeModel.findOneAndUpdate(
                { id: org.primaryContactId },
                {
                  $set: {
                    accountStatus: status,
                  },
                }
              );
              return apiResponse.successResponseWithData(
                res,
                "Organisation updated ",
                org
              );
            })
            .catch((err) => {
              console.log(err);
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          return apiResponse.unauthorizedResponse(res, result);
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
