const apiResponse = require("../utils/apiResponse")
const Organisation = require("../models/organisationModel")
const Warehouse = require("../models/warehouseModel")

/**
 * LOGGING
 */
// const init = require("../utils/logging")
// const logger = init.getLog()

exports.addressesOfOrg = [
    async(req,res)=>{
        try{
            await Organisation.find({id:req.query.orgId}).then(orgs=>{
               return apiResponse.successResponseWithData(res,"Organisations Addresses",orgs)
            })
        } catch{
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.addressesOfOrgWarehouses = [
    async(req,res)=>{
        try{
            await Warehouse.find({organisationId:req.query.orgId}).then(warehouses=>{
               return apiResponse.successResponseWithData(res,"Warehouses Addresses",warehouses)
            })
        } catch{
            return apiResponse.ErrorResponse(res, err);
        }
    }
]