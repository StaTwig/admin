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
            await Organisation.find({id:req.user.organisationId}).then(orgs=>{
               return apiResponse.successResponseWithData(res,"Organisations Addresses",orgs)
            }).catch(err=>{
                return apiResponse.ErrorResponse(res, err)
            })
        } catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.addressesOfOrgWarehouses = [
    async(req,res)=>{
        try{
            await Warehouse.find({organisationId:req.user.organisationId}).then(warehouses=>{
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
            await Organisation.findOneAndUpdate({id:req.user.organisationId},{ postalAddress: req.body.address},{new: true}).then(org=>{
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

exports.AddWarehouse = [
    async(req,res)=>{
        try{

            }
            catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.AddOffice = [
    async(req,res)=>{
        try{
        } catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
]