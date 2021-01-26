const OrganisationModel = require('../models/OrganisationModel');
const WarehouseModel = require("../models/WarehouseModel")

const auth = require('../middlewares/jwt');

exports.getOrganisations= [
    auth,
    async(req,res)=>{
        await OrganisationModel.find({}).select('name id').then((list)=>{
            return res.status(200).json({Organisations:list})
        }).catch((err)=>{ res.status(500).json({error:err})})
    }
]

exports.getWarehouses=[
    auth,
    (req,res)=>{
        OrganisationModel.find({id:req.query.id}).select('warehouses').then((list)=>{
        WarehouseModel.find().where('id').in(list[0].warehouses).select('id').exec((err, records) =>{
            if(err){ return res.status(500).json({errors:err})}
            return res.status(200).json({warehouses:records})})
    }).catch((err)=>{
        return res.status(404).json({errors:`Organization of id ${req.query.id} not found`})
    })}
]