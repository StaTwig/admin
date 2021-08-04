const OrganisationModel = require("../models/OrganisationModel");
const EmployeeModel = require("../models/EmployeeModel");
const WarehouseModel = require("../models/WarehouseModel")
const auth = require("../middlewares/jwt");
const apiResponse = require("../helpers/apiResponse");

const checkToken = require("../middlewares/middleware").checkToken;
let EmployeeIdMap = new Map();



function getOrgCondition(query){
  let matchCondition = {};
  if(query.orgType && query.orgType!=''){
    matchCondition.type = query.orgType;
  }
  if(query.country && query.country!=''){
    matchCondition['country.countryName'] = query.country ;
  }
  if(query.status && query.status!=''){
    matchCondition.status = query.status;
  }
  if(query.region && query.region!=''){
    matchCondition['region.name'] = query.region;
  }
  if(query.creationFilter && query.creationFilter=='true'){
    matchCondition.createdAt = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate)
    };
  }
  return matchCondition;
}


exports.getOrgs = [
  auth,
  async (req, res) => {
    try {
      console.log(getOrgCondition(req.query))
      const users = await OrganisationModel.aggregate([{
        $match: getOrgCondition(req.query)
      }])
      console.log(users)
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
      console.log(err)
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
