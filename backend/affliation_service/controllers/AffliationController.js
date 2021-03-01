const apiResponse = require("../utils/apiResponse")
const Organisation = require("../models/organisationModel")
const Warehouse = require("../models/warehouseModel")
const AffliationModel = require("../models/affliationModel")
const EmployeeModel = require("../models/employeeModel")
const auth = require("../middlewares/jwt")
const { customAlphabet } = require("nanoid")
const nanoid = customAlphabet('1234567890abcdef', 10)
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
                  .then(affliations => {
                    return apiResponse.successResponseWithData(
                      res,
                      'Pending Requests',
                      affliations
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
                  { 'from.organisationId': organisationId }).then(affliations => {
                  return apiResponse.successResponseWithData(
                    res,
                    'Sent Requests',
                    affliations,
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
  auth,
    async(req,res)=>{
        try{
            await EmployeeModel.findOne({id:req.user.id}).select("affiliatedOrganisations").then(orgs=>{
              const orgArray = orgs.affiliatedOrganisations              
              if((orgArray.length)>0){
              Organisation.find({id:{$in: orgArray}}).then(Organisations=>{
                console.log("aff-orgs" + Organisations)
                return apiResponse.successResponseWithData(res,"Affliated Organisations Details",Organisations)
              }).catch(err=>{
                return apiResponse.ErrorResponse(res, err)
            })
              }else{
                return apiResponse.notFoundResponse(res, " No Affiliated Organisations Found")
              }
            }).catch(err=>{
                return apiResponse.ErrorResponse(res, err)
            })
        } catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.allAffliatedOrgs = [
  auth,
    async(req,res)=>{
        try{
            await EmployeeModel.find({organisationId:req.user.organisationId}).select("affiliatedOrganisations").then(orgs=>{
              var orgSet = new Set();
              orgs.map(item=>{ 
                item.affiliatedOrganisations.map(e=>{
                  orgSet.add(e)
                })
                })             
              if((orgSet.size)>0){
                var orgArray = [...orgSet]
              Organisation.find({id:{$in: orgArray}}).then(Organisations=>{
                return apiResponse.successResponseWithData(res,"All Affliated Organisations Details",Organisations)
              }).catch(err=>{
                return apiResponse.ErrorResponse(res, err)
            })
              }else{
                return apiResponse.notFoundResponse(res, " No Affiliated Organisations Found")
              }
            }).catch(err=>{
                return apiResponse.ErrorResponse(res, err)
            })
        } catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.acceptAffliate = [
  auth,
    async(req,res)=>{
        try{
          checkToken(req, res, async result => {
            if (result.success) {
              const { organisationId } = req.user;
              const { affId } = req.query;
              await AffliationModel.findOneAndUpdate({
                $and: [
                  { 'status': "PENDING"},
                  { 'id': affId },
                  { 'to.organisationId': organisationId}
                ],
              },{ status:"APPROVED"},{new: true})
                .then(exist => {
            EmployeeModel.findOneAndUpdate({id:exist.to.id},{
              $push: { affiliatedOrganisations: exist.from.id},
            },
            {
              new: true,
            }).then(employee=>{
              return apiResponse.successResponseWithData(
                res,
                'Pending Requests',
                employee,
              );
            }).catch(err=>{
              return apiResponse.ErrorResponse(res, err);
            })
          }).catch(err => {
                  return apiResponse.ErrorResponse(res, err);
                });
            } else {
              res.status(403).json('Auth failed');
            }
          });
        } catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.rejectAffliate = [
    auth,
    async(req,res)=>{
        try{
          checkToken(req, res, async result => {
            if (result.success) {
              const { organisationId } = req.user;
              const { affId } = req.query;
              await AffliationModel.findOneAndUpdate({
                $and: [
                  { 'status': "PENDING"},
                  { 'id': affId },
                  { 'to.organisationId': organisationId}
                ],
              },{ status:"REJECTED"},{new: true})
                .then(exist => {
              return apiResponse.successResponseWithData(
                res,
                'Affilate Request Rejected',
                exist
              );
            }).catch(err=>{
              return apiResponse.ErrorResponse(res, err);
            })
            } else {
              res.status(403).json('Auth failed');
            }
          });
        } catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
]

exports.unAffliate = [
  auth,
  async(req,res)=>{
      try{
        const { id } = req.user;
        const { orgId } = req.query;
        await EmployeeModel.findOneAndUpdate({id:id},{
          $pull: { affiliatedOrganisations: orgId},
        },
        {
          new: true,
        }).then(employee=>{
          return apiResponse.successResponseWithData(
            res,
            'UnAffliated Organisation',
            employee,
          );
        }).catch(err=>{
          return apiResponse.ErrorResponse(res, err);
        })
      } catch(err){
          return apiResponse.ErrorResponse(res, err);
      }
  }
]

exports.Affliate = [
  auth,
  async(req,res)=>{
      try{
        const affId = 'aff-'+nanoid()
        const affliation = new AffliationModel({
          id: affId,
          from:req.body.from,
          to:req.body.to,
        });
        await affliation.save().then(affliation=>{
          return apiResponse.successResponseWithData(res,"Affliation Request Sent" ,affliation)
        }).catch(err=>{
          return apiResponse.ErrorResponse(res, err);
        })
      } catch(err){
          return apiResponse.ErrorResponse(res, err);
      }
  }
]