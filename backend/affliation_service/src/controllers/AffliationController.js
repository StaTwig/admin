const apiResponse = require("../utils/apiResponse")
const Organisation = require("../models/organisationModel")
const Warehouse = require("../models/warehouseModel")
const AffliationModel = require("../models/affliationModel");
const auth = require("../middlewares/jwt");

/**
 * LOGGING
 */
// const init = require("../utils/logging")
// const logger = init.getLog()

exports.pendingRequests = [
    auth,
    async(req,res)=>{
        try {
            // const { authorization } = req.headers;
            checkToken(req, res, async result => {
              if (result.success) {
                const { organisationId } = req.user;
                await AffliationModel.find({
                  $and: [
                    { 'status': "PENDING"},
                    { 'to.organisationId': organisationId },
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
                logger.log(
                  'warn',
                  '<<<<< AffliationService < Affliate Controller < pending Requests : refuted token',
                );
                res.status(403).json('Auth failed');
              }
            });
          } catch (err) {
            logger.log(
              'error',
              '<<<<< AffliationService < Affliate Controller < pending Requests: catch block)',
            );
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
              logger.log(
                'warn',
                '<<<<< AffliationService < Affliate Controller < Sent Requests : refuted token',
              );
              res.status(403).json('Auth failed');
            }
          });
        } catch (err) {
          logger.log(
            'error',
            '<<<<< AffliationService < Affliate Controller < Sent Requests: catch block)',
          );
          return apiResponse.ErrorResponse(res, err);
        }
  }
]

exports.affliatedOrgs = [
    async(req,res)=>{
        try{
            await Warehouse.find({organisationId:req.query.orgId}).then(warehouses=>{
               return apiResponse.successResponseWithData(res,"Warehouses Addresses",warehouses)
            }).catch(err=>{
                return apiResponse.ErrorResponse(res, err)
            })
        } catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.updateAddressOrg = [
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

exports.updateWarehouseAddress = [
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