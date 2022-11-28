const OrganisationModel = require("../models/ConfigurationModel");
const apiResponse = require("../utils/apiResponse");
const auth = require("../middlewares/jwt");
const checkToken = require("../middlewares/middleware").checkToken;
const CounterModel = require("../models/CounterModel");

exports.addNewOrgTypeInstance = [
  auth,
  async (req, res) => {
    try {
      const { id, name } = req.body;
      //instance created
      const incrementCounterOrg = await CounterModel.update(
        {
          "counters.name": "orgId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const orgCounter = await CounterModel.findOne(
        { "counters.name": "orgId" },
        { "counters.$": 1 }
      );
      organisatId =
        orgCounter.counters[0].format + orgCounter.counters[0].value;
      const incrementCounterWarehouse = await CounterModel.update(
        {
          "counters.name": "warehouseId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const warehouseCounter = await CounterModel.findOne(
        { "counters.name": "warehouseId" },
        { "counters.$": 1 }
      );
      configid =
        warehouseCounter.counters[0].format +
        warehouseCounter.counters[0].value;
      const u_id = configid;
      const Org_id = organisatId;
      const organisationModel = new OrganisationModel({
        id: u_id,
      });
      const addtype = organisationModel.organisationTypes.push({
        id: Org_id,
        name: req.body.name,
        approvalAuthority: 0,
      });
      const result = await organisationModel.save();
      return apiResponse.successResponseWithData(
        res,
        "New Organisation Type Instance Addded",
        result
      );
    } catch (error) {
      console.log(error.message);
      return apiResponse.ErrorResponse(res, error.message);
    }
  },
];

exports.addNewOrgType = [
  auth,
  async (req, res) => {
    try {
      //instance created
      const incrementCounterOrg = await CounterModel.update(
        {
          "counters.name": "orgId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const orgCounter = await CounterModel.findOne(
        { "counters.name": "orgId" },
        { "counters.$": 1 }
      );
      organisatId =
        orgCounter.counters[0].format + orgCounter.counters[0].value;

      const Org_id = organisatId;
      var newObject2 = {
        id: Org_id,
        name: req.body.name,
        approvalAuthority: 0,
      };
      const organisations = await OrganisationModel.update(
        { id: req.query.id },
        { $push: { organisationTypes: newObject2 } }
      );
      return apiResponse.successResponseWithData(
        res,
        "Organisation Type Added",
        organisations
      );
    } catch (error) {
      console.log(error.message);
      return apiResponse.ErrorResponse(res, error.message);
    }
  },
];

exports.updateOrganizationsByType = [
  auth,
  async (req, res) => {
    try {
      const outId = req.query.id;
      const { id, name } = req.body;
      const organisations = await OrganisationModel.update(
        { id: outId, "organisationTypes.id": id },
        {
          $set: {
            "organisationTypes.$.name": name,
          },
        }
      );
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
      const organisationId = req.query.id;
      const organisations = await OrganisationModel.find(
        { id: organisationId },
        "organisationTypes.id organisationTypes.name"
      );
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

// exports.getOrgTypes =[
//   auth,
//   async(req,res) =>{
//     try{
//       checkToken(req, res, async (result) => {
//         if (result.success) {
//           const organisations=await OrganisationModel.find({},'organisationTypes.id organisationTypes.name')
//           return apiResponse.successResponseWithData(
//             res,
//             "Success - Organisations Types List",
//             organisations
//           );
//       } else{
//         return apiResponse.unauthorizedResponse(res, "Auth Failed")
//     }
//   }
//   )
//   }
//   catch(err){
//     return apiResponse.ErrorResponse(res, err);
//   }
//   }
// ]

// exports.getWarehouseTypes =[
//   auth,
//   async(req,res) =>{
//     try{
//       checkToken(req, res, async (result) => {
//         if (result.success) {
//           const warehouses=await OrganisationModel.find({},'warehouseTypes.id warehouseTypes.name')
//           return apiResponse.successResponseWithData(
//             res,
//             "Warehouse Types List",
//             warehouses
//           );
//       } else{
//         return apiResponse.unauthorizedResponse(res, "Auth Failed")
//     }
//   }
//   )
//   }
//   catch(err){
//     return apiResponse.ErrorResponse(res, err);
//   }
//   }
// ]

exports.getWarehouseByType = [
  auth,
  async (req, res) => {
    try {
      const organisationId = req.query.id;
      console.log(organisationId);
      const organisations = await OrganisationModel.find(
        { id: organisationId },
        "warehouseTypes.id warehouseTypes.name"
      );
      console.log(organisations);
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

exports.updateWareHouseByType = [
  auth,
  async (req, res) => {
    try {
      const outId = req.query.id;
      const { id, name } = req.body;
      const warehouse = await OrganisationModel.update(
        { id: outId, "warehouseTypes.id": id },
        {
          $set: {
            "warehouseTypes.$.name": name,
          },
        }
      );
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

exports.addNewWarehouseTypeInstance = [
  auth,
  async (req, res) => {
    try {
      const { id, name } = req.body;
      //instance created
      const incrementCounterOrg = await CounterModel.update(
        {
          "counters.name": "orgId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const orgCounter = await CounterModel.findOne(
        { "counters.name": "orgId" },
        { "counters.$": 1 }
      );
      configid = orgCounter.counters[0].format + orgCounter.counters[0].value;

      //organisationId = uniqid('org-');
      const incrementCounterWarehouse = await CounterModel.update(
        {
          "counters.name": "warehouseId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const warehouseCounter = await CounterModel.findOne(
        { "counters.name": "warehouseId" },
        { "counters.$": 1 }
      );
      organisatId =
        warehouseCounter.counters[0].format +
        warehouseCounter.counters[0].value;

      const u_id = configid;
      const Org_id = organisatId;
      const organisationModel = new OrganisationModel({
        id: u_id,
      });
      const addtype = organisationModel.warehouseTypes.push({
        id: Org_id,
        name: req.body.name,
      });
      const result = await organisationModel.save();
      return apiResponse.successResponseWithData(
        res,
        "Added New Warehouse Instance",
        result
      );
    } catch (error) {
      console.log(error.message);
      return apiResponse.ErrorResponse(res, error.message);
    }
  },
];

exports.addNewWarehouseType = [
  auth,
  async (req, res) => {
    try {
      //instance created
      const incrementCounterWarehouse = await CounterModel.update(
        {
          "counters.name": "warehouseId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const warehouseCounter = await CounterModel.findOne(
        { "counters.name": "warehouseId" },
        { "counters.$": 1 }
      );
      organisatId =
        warehouseCounter.counters[0].format +
        warehouseCounter.counters[0].value;

      const Org_id = organisatId;
      var newObject2 = { id: Org_id, name: req.body.name };
      const organisations = await OrganisationModel.update(
        { id: req.query.id },
        { $push: { warehouseTypes: newObject2 } }
      );
      return apiResponse.successResponseWithData(
        res,
        "Warehouse Type Added",
        organisations
      );
    } catch (error) {
      console.log(error.message);
      return apiResponse.ErrorResponse(res, error.message);
    }
  },
];
