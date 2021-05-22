const OrganisationModel = require('../models/ConfigurationModel');
const apiResponse = require("../utils/apiResponse")
const auth = require("../middlewares/jwt");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 10);
const checkToken = require("../middlewares/middleware").checkToken;
const { options } = require('../app');
 const uniqid = require("uniqid");

 exports.addneworgtypeinstance=[
        auth,
        async(req,res)=>{
        try{
          const {id,name}=req.body;
          //instance created
              const u_id = uniqid('CONF-');
              const Org_id = uniqid('ORG-');
              const organisationModel =new OrganisationModel({
                id:u_id,
              })
              const addtype=organisationModel.organisationTypes.push({
                id:Org_id,
                name:req.body.name,
                approvalAuthority:0,
              })
              const result=await organisationModel.save()
              console.log(result);
              res.send({
                message:"success",
                payload:result,
              })
        }
        catch(error)
        {
          console.log(error.message);
        }
      }
      ];


      exports.addneworgtype=[
        auth,
        async(req,res)=>{
        try{
          //instance created
          const Org_id = uniqid('ORG-');
          var newObject2 = { id :Org_id , name :req.body.name,approvalAuthority:0 }
          const organisations=await OrganisationModel.update({id:req.query.id},{"$push":{"organisationTypes": newObject2 }})
              console.log(organisations);
              res.send({
                message:"success",
                payload:organisations,
              })
        }
        catch(error)
        {
          console.log(error.message);
        }
      }
      ];
  

 
      exports.updateOrganizationsByType = [
        auth,
          async (req, res) => {
            try {
              const outId=req.query.id;
              const {id,name}=req.body
              const organisations=await OrganisationModel.update(
                { id: outId, "organisationTypes.id":id},
                {
                    $set: {
                        "organisationTypes.$.name":name,
                     }
                }
            )         
              return apiResponse.successResponseWithData(
                res,
                "Operation success",
                organisations
              );
            } catch (err) {
              return apiResponse.ErrorResponse(res, err);
            }
          },
        ];
    


exports.getOrganizationsByType = [
  auth,
    async (req, res) => {
      try {
        const organisationId=req.query.id;
        const organisations=await OrganisationModel.find({id:organisationId},'organisationTypes.id organisationTypes.name')
        return apiResponse.successResponseWithData(
          res,
          "Operation success",
          organisations
        );
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];

 
  exports.getwarehouseByType = [
    auth,
      async (req, res) => {
        try {
          const organisationId=req.query.id;
          console.log(organisationId);
          const organisations=await OrganisationModel.find({id:organisationId},'warehouseTypes.id warehouseTypes.name')
          console.log(organisations)
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            organisations
          );
        } catch (err) {
          return apiResponse.ErrorResponse(res, err);
        }
      },
    ];

    exports.updatewareHouseByType = [
      auth,
        async (req, res) => {
          try {
             const outId=req.query.id;
            const {id,name}=req.body
            const warehouse=await OrganisationModel.update(
              { id: outId, "warehouseTypes.id":id},
              {
                  $set: {
                      "warehouseTypes.$.name":name,
                   }
              }
          )         
            return apiResponse.successResponseWithData(
              res,
              "Operation success",
              warehouse
            );
          } catch (err) {
            return apiResponse.ErrorResponse(res, err);
          }
        },
      ];


      exports.addnewwarehousetypeinstance=[
        auth,
        async(req,res)=>{
        try{
          const {id,name}=req.body;
          //instance created
              const u_id = uniqid('CONF-');
              const Org_id = uniqid('WAR-');
              const organisationModel =new OrganisationModel({
                id:u_id,
              })
              const addtype=organisationModel.warehouseTypes.push({
                id:Org_id,
                name:req.body.name,
                
              })
              const result=await organisationModel.save()
              console.log(result);
              res.send({
                message:"success",
                payload:result,
              })
        }
        catch(error)
        {
          console.log(error.message);
        }
      }
      ];


      exports.addnewwarehousetype=[
        auth,
        async(req,res)=>{
        try{
          //instance created
          const Org_id = uniqid('WAR-');
          var newObject2 = { id :Org_id , name :req.body.name}
          const organisations=await OrganisationModel.update({id:req.query.id},{"$push":{"warehouseTypes": newObject2 }})
              console.log(organisations);
              res.send({
                message:"success",
                payload:organisations,
              })
        }
        catch(error)
        {
          console.log(error.message);
        }
      }
      ];
  
