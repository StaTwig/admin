const OrganizationModel = require('../models/OrganizationModel');
const WarehouseModel = require("../models/WarehouseModel")

const auth = require('../middlewares/jwt');

exports.getOrganizations= [
    auth,
    async(req,res)=>{
        await OrganizationModel.find({}).select('organization_name organization_id').then((list)=>{
            return res.status(200).json({Organizations:list})
        }).catch((err)=>{ res.status(500).json({error:err})})
    }
]

exports.getWarehouses=[
    auth,
    (req,res)=>{
        OrganizationModel.find({organization_id:req.params.id}).select('organization_warehouses').then((list)=>{
        WarehouseModel.find().where('warehouse_id').in(list[0].organization_warehouses).select('warehouse_id').exec((err, records) =>{
            if(err){ return res.status(500).json({errors:err})}
            return res.status(200).json({warehouses:records})})
    }).catch((err)=>{
        return res.status(500).json({errors:err})
    })}
]