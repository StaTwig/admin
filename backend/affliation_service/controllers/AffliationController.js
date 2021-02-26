const apiResponse = require("../utils/apiResponse")
const Organisation = require("../models/organisationModel")
const Warehouse = require("../models/warehouseModel")
const AffliationModel = require("../models/affliationModel")
const EmployeeModel = require("../models/employeeModel")
const auth = require("../middlewares/jwt")
const checkToken = require("../middlewares/middleware").checkToken;

exports.pendingRequests = [
    auth,
    async(req,res)=>{
        try {
            checkToken(req, res, async result => {
              if (result.success) {
                const { organisationId } = req.user;
                await AffliationModel.find({
                  $and: [
                    { 'status': "PENDING"},
                    { 'to.organisationId': organisationId }
                  ],
                })
                  .then(employees => {
                    return apiResponse.successResponseWithData(
                      res,
                      'Pending Requests',
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

exports.sentRequests = [
  auth,
  async(req,res)=>{
      try {
          checkToken(req, res, async result => {
            if (result.success) {
              const { organisationId } = req.user;
              await AffliationModel.find(
                  { 'from.organisationId': organisationId }).then(employees => {
                  return apiResponse.successResponseWithData(
                    res,
                    'Sent Requests',
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

exports.affliatedOrgs = [
    async(req,res)=>{
        try{
            await EmployeeModel.find({id:req.user.id}).select("affiliatedOrganisations").then(orgs=>{
              Organisation.find({id:{$in: orgs}}).then(Organisations=>{
                return apiResponse.successResponseWithData(res,"Affliated Organisations Details",Organisations)
              }).catch(err=>{
                return apiResponse.ErrorResponse(res, err)
            })
            }).catch(err=>{
                return apiResponse.ErrorResponse(res, err)
            })
        } catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.acceptAffliate = [
    async(req,res)=>{
        try{
            await Organisation.findOneAndUpdate({id:req.query.orgId},{ postalAddress: req.body.address},{new: true}).then(org=>{
                return apiResponse.successResponseWithData(res,"Organisation Address Updated" , org)
            }).catch(err=>{
                return apiResponse.ErrorResponse(res, err)
            })
        } catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.rejectAffliate = [
    async(req,res)=>{
        try{
            await Warehouse.findOneAndUpdate({id:req.query.warehouseId}, req.body.WarehouseAddress,{new: true}).then(warehouse=>{
                return apiResponse.successResponseWithData(res,"Warehouse Address Updated" , warehouse)
            }).catch(err=>{
                return apiResponse.ErrorResponse(res, err)
            })
        } catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.unAffliate = [
  async(req,res)=>{
      try{
          await Warehouse.findOneAndUpdate({id:req.query.warehouseId}, req.body.WarehouseAddress,{new: true}).then(warehouse=>{
              return apiResponse.successResponseWithData(res,"Warehouse Address Updated" , warehouse)
          }).catch(err=>{
              return apiResponse.ErrorResponse(res, err)
          })
      } catch(err){
          return apiResponse.ErrorResponse(res, err);
      }
  }
]