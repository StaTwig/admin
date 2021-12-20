const dotenv = require("dotenv").config();
const fs = require("fs");
const moveFile = require("move-file");
const XLSX = require("xlsx");
const axios = require("axios");
const uniqid = require("uniqid");
const date = require("date-and-time");
const moment = require("moment");
const POModel = require("../models/POModel");
const RecordModel = require("../models/RecordModel");
const Event = require("../models/EventModal");
const CounterModel = require("../models/CounterModel");
const OrganisationModel = require("../models/OrganisationModel");
const ProductModel = require("../models/ProductModel");
const EmployeeModel = require("../models/EmployeeModel");
const logEvent = require("../../../utils/event_logger");
const WarehouseModel = require("../models/WarehouseModel");
const InventoryModel = require("../models/InventoryModel");
//this helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const checkPermissions =
  require("../middlewares/rbac_middleware").checkPermissions;
const wrapper = require("../models/DBWrapper");
const excel = require("node-excel-export");
const blockchain_service_url = process.env.URL;
const hf_blockchain_url = process.env.HF_BLOCKCHAIN_URL;
const stream_name = process.env.SHIP_STREAM;
const po_stream_name = process.env.PO_STREAM;
var pdf = require("pdf-creator-node");
resolve = require("path").resolve;
const CENTRAL_AUTHORITY_ID = null;
const CENTRAL_AUTHORITY_NAME = null;
const CENTRAL_AUTHORITY_ADDRESS = null;

const userPurchaseOrders = async (
  mode,
  orgMode,
  organisationId,
  type,
  id,
  skip,
  limit,
  callback
) => {
  var matchCondition = {};
  if (orgMode != "") var criteria = mode + "." + orgMode;
  else {
    var criteria = mode;
  }
  let newObj = {};
  if (type == "outbound") {
    newObj[criteria] = organisationId;
    matchCondition["$or"] = [newObj, { createdBy: id }];
  } else matchCondition[criteria] = organisationId;
  var poDetails = [];
  poDetails = await RecordModel.aggregate([
    {
      $match: matchCondition,
    },
    {
      $lookup: {
        from: "organisations",
        localField: "supplier.supplierOrganisation",
        foreignField: "id",
        as: "supplier.organisation",
      },
    },
    {
      $unwind: {
        path: "$supplier.organisation",
      },
    },
    {
      $lookup: {
        from: "organisations",
        localField: "customer.customerOrganisation",
        foreignField: "id",
        as: "customer.organisation",
      },
    },
    {
      $unwind: {
        path: "$customer.organisation",
      },
    },
    {
      $lookup: {
        from: "warehouses",
        localField: "customer.shippingAddress.shippingAddressId",
        foreignField: "id",
        as: "customer.warehouse",
      },
    },
    {
      $unwind: {
        path: "$customer.warehouse",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "products.productId",
        foreignField: "id",
        as: "productDetails",
      },
    },
  ])
    .sort({
      createdAt: -1,
    })
    .skip(parseInt(skip))
    .limit(parseInt(limit));
  callback(undefined, poDetails);
};

exports.fetchPurchaseOrders = [
  auth,
  async (req, res) => {
    try {
      const { organisationId, role, id } = req.user;
      const { skip, limit, poId } = req.query;
      const permission_request = {
        role: role,
        permissionRequired: ["viewPO"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          var inboundPOs, outboundPOs, poDetails;
          try {
            if (poId != null) {
              const POs = await userPurchaseOrders(
                "id",
                "",
                poId,
                "",
                id,
                skip,
                limit,
                (error, data) => {
                  poDetails = data;
                }
              );
              //  console.log(poDetails[0].products)
              await Promise.all(
                poDetails[0].products.map(async (element) => {
                  var product = await ProductModel.findOne({ id: element.id });
                  element.unitofMeasure = product.unitofMeasure;
                })
              );
              //  console.log(poDetails[0].products)
            } else {
              const supplierPOs = await userPurchaseOrders(
                "supplier",
                "supplierOrganisation",
                organisationId,
                "inbound",
                id,
                skip,
                limit,
                (error, data) => {
                  inboundPOs = data;
                }
              );

              const customerPOs = await userPurchaseOrders(
                "customer",
                "customerOrganisation",
                organisationId,
                "outbound",
                id,
                skip,
                limit,
                (error, data) => {
                  outboundPOs = data;
                }
              );
            }

            return apiResponse.successResponseWithData(res, "Shipments Table", {
              inboundPOs: inboundPOs,
              outboundPOs: outboundPOs,
              poDetails: poDetails,
            });
          } catch (err) {
            console.log(err);
            return apiResponse.ErrorResponse(res, err);
          }
        } else {
          return apiResponse.forbiddenResponse(
            res,
            "User doesn't have enough permission to view Resource"
          );
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchAllPurchaseOrdersBC = [
  auth,
  async (req, res) => {
    try {
      const { role } = req.user;
      const permission_request = {
        role: role,
        permissionRequired: ["receivePO"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          const response = await axios.get(
            `${blockchain_service_url}/queryAllStreamKeys?stream=${po_stream_name}`
          );
          const items = response.data.items;
          return apiResponse.successResponseWithData(
            res,
            "fetchAllPurchaseOrdersBC",
            items
          );
        } else {
          return apiResponse.forbiddenResponse(
            res,
            "User does not have enough Permissions"
          );
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchPublisherPurchaseOrders = [
  auth,
  async (req, res) => {
    try {
      const { address, role } = req.user;
      const permission_request = {
        role: role,
        permissionRequired: ["viewPO"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          /*const acceptedPOs = await POModel.find({
                receiver: address,
                status: 'Accepted',
              });*/

          const acceptedPOs = await wrapper.findRecordsAndSort(POModel, {
            receiver: address,
            status: "Accepted",
          });
          const poIds = acceptedPOs.map((po) => po.orderID);
          apiResponse.successResponseWithData(res, "Purchase Orders", poIds);
        } else {
          return apiResponse.forbiddenResponse(
            res,
            "User does not have enough Permissions"
          );
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchPurchaseOrderBC = [
  auth,
  async (req, res) => {
    try {
      const { role } = req.user;
      const { key } = req.query;
      const permission_request = {
        role: role,
        permissionRequired: ["viewPO"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          const response = await axios.get(
            `${blockchain_service_url}/queryDataByKey?stream=${po_stream_name}&key=${key}`
          );
          const items = response.data.items;
          return apiResponse.successResponseWithData(
            res,
            "Purchase Order Info",
            items
          );
        } else {
          return apiResponse.forbiddenResponse(
            res,
            "User does not have enough Permissions"
          );
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.changePOStatus = [
  auth,
  async (req, res) => {
    try {
      const { address, role } = req.user;
      const permission_request = {
        role: role,
        permissionRequired: ["viewPO"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          const { orderID, status } = req.body;
          const po = await RecordModel.findOne({ id: orderID });
          if (po && po.customer.customer_incharge === address) {
            const currDateTime = date.format(new Date(), "DD/MM/YYYY HH:mm");
            const updates = {
              updatedOn: currDateTime,
              status: status,
            };
            const updateData = await RecordModel.findOneAndUpdate(
              { id: orderID },
              {
                $push: { poUpdates: updates },
                $set: { poStatus: status },
              },
              { new: true }
            );
            const event = await Event.findOne({ transactionId: orderID });
            let newEvent = {
              eventID: "ev0000" + Math.random().toString(36).slice(2),
              eventTime: new Date(),
              transactionId: event.transactionId,
              eventTypePrimary: event.eventTypePrimary,
              eventTypeDesc: event.eventTypeDesc,
              actorId: req.user.id || event.actorId,
              actorUserId: req.user.emailId || event.actorUserId,
              caId: event.caId,
              caName: event.caName,
              caAddress: event.caAddress,
              actorOrgId: event.actorOrgId,
              actorOrgName: event.actorOrgName,
              actorOrgAddress: event.actorOrgAddress,
              actorWarehouseId: event.actorWarehouseId,
              secondaryOrgId: event.secondaryOrgId,
              secondaryOrgName: event.secondaryOrgName,
              secondaryOrgAddress: event.secondaryOrgAddress,
              payloadData: {
                data: {},
              },
            };
            if (status === "ACCEPTED") newEvent.eventTypePrimary = "RECEIVE";
            else newEvent.eventTypePrimary = "REJECT";
            newEvent.payloadData.data = req.body;
            const event_body = new Event(newEvent);
            await event_body.save();
            return apiResponse.successResponseWithData(
              res,
              "PO Status",
              updateData
            );
          } else {
            return apiResponse.ErrorResponse(
              res,
              "You are not authorised to change the status"
            );
          }
        } else {
          return apiResponse.forbiddenResponse(
            res,
            "User does not have enough Permissions"
          );
        }
      });
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.createPurchaseOrder = [
  auth,
  async (req, res) => {
    try {
      let {
        externalId,
        creationDate,
        supplier,
        customer,
        products,
        lastUpdatedOn,
      } = req.body;
      const { createdBy, lastUpdatedBy } = req.user.id;
      creationDate = new Date(creationDate);
      const purchaseOrder = new RecordModel({
        id: uniqid("po-"),
        externalId,
        creationDate,
        supplier,
        customer,
        products,
        lastUpdatedOn,
        createdBy,
        lastUpdatedBy,
      });
      const result = await purchaseOrder.save();
      return apiResponse.successResponseWithData(
        res,
        "Created PO Success",
        result.id
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.addPOsFromExcel = [
  auth,
  async (req, res) => {
    try {
      // const permission_request = {
      //   role: req.user.role,
      //   permissionRequired: ['createPO'],
      // };
      // checkPermissions(permission_request, async permissionResult => {
      //   if (permissionResult.success) {
      try {
        console.log(req.user);
        const dir = `uploads`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        await moveFile(req.file.path, `${dir}/${req.file.originalname}`);
        const workbook = XLSX.readFile(`${dir}/${req.file.originalname}`);
        const sheet_name_list = workbook.SheetNames;
        const data = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheet_name_list[0]],
          { dateNF: "dd/mm/yyyy;@", cellDates: true, raw: false }
        );
        //console.log(data)
        const createdBy = (lastUpdatedBy = req.user.id);
        let poDataArray = [];
        poDataArray = data.map((po) => {
          return {
            id: po.id || 0,
            externalId: po["UNICEf PO Number"],
            creationDate: po["Document Date"],
            lastUpdatedOn: new Date().toISOString(),
            poStatus: req.user.id == po["Vendor"] ? "APPROVED" : "CREATED",
            supplier: {
              supplierOrganisation: po["Vendor"],
              name: po["Vendor Name"],
              // "supplierIncharge": po['Supplier Incharge']
            },
            customer: {
              customerOrganisation: po["IP Code"],
              name: po["IP Name"],
              country: po["Country Name"],
              region: po["Region Name"],
              address: "NA",
              // "customerIncharge": po['Customer Incharge'],
              shippingAddress: {
                shippingAddressId: po["Plant"],
                shipmentReceiverId: po["Shipment Receiver Id"] || "NA",
              },
            },
            products: [
              {
                productId: po["Material"],
                id: po["Material"],
                productQuantity: po["Order Quantity"],
                quantity: po["Order Quantity"],
                unitofMeasure: {
                  id: po["Unit Id"],
                  name: po["Order Unit"],
                },
              },
            ],
            createdBy: createdBy,
            lastUpdatedBy: lastUpdatedBy,
          };
        });
        var incrementCounter = await CounterModel.update(
          {
            "counters.name": "poId",
          },
          {
            $inc: {
              "counters.$.value": 1,
            },
          }
        );
        let poCounter = await CounterModel.findOne(
          { "counters.name": "poId" },
          { "counters.$": 1 }
        );
        let dataRows = 0;
        for (let i in poDataArray) {
          if (poDataArray[i].externalId != null) {
            duplicate = await RecordModel.findOne({
              externalId: poDataArray[i].externalId,
            });
            if (duplicate != null) {
              delete poDataArray[i];
              i--;
            } else {
              poDataArray[i].id =
                poCounter.counters[0].format + poCounter.counters[0].value++;
              let productDetails = await ProductModel.findOne({
                id: poDataArray[i].products[0].productId,
              });
              console.log("PRODUCT DETAILS", productDetails);
              if (productDetails) {
                (poDataArray[i].products[0].name = productDetails.name || ""),
                  (poDataArray[i].products[0].type = productDetails.type || ""),
                  (poDataArray[i].products[0].manufacturer =
                    productDetails.manufacturer || "");
              } else console.log("PRODUCT NOT FOUND");
              console.log(dataRows++);
              const organisationName =
                poDataArray[i].customer.customerOrganisation;
              const customerOrganisation = await OrganisationModel.findOne({
                id: new RegExp("^" + organisationName + "$", "i"),
              });
              const customerOrganisationExternal =
                await OrganisationModel.findOne({
                  externalId: new RegExp("^" + organisationName + "$", "i"),
                });
              if (customerOrganisation) {
                poDataArray[i].customer.name = customerOrganisation.name;
                poDataArray[i].customer.customerType =
                  customerOrganisation.type;
                if (
                  !customerOrganisation.warehouses.includes(
                    poDataArray[i].customer.shippingAddress.shippingAddressId
                  )
                ) {
                  delete poDataArray[i];
                  continue;
                }
              } else if (customerOrganisationExternal) {
                poDataArray[i].customer.name =
                  customerOrganisationExternal.name;
                poDataArray[i].customer.customerType =
                  customerOrganisationExternal.type;
                if (
                  !customerOrganisationExternal.warehouses.includes(
                    poDataArray[i].customer.shippingAddress.shippingAddressId
                  )
                ) {
                  delete poDataArray[i];
                  continue;
                }
              } else {
                const country = poDataArray[i].customer?.country
                  ? poDataArray[i].customer?.country
                  : "India";
                const region = poDataArray[i].customer?.region
                  ? poDataArray[i].customer?.region
                  : "Asia";
                const address = poDataArray[i].customer?.address
                  ? poDataArray[i].customer?.address
                  : "";
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
                organisationId =
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
                const incrementCounterEmp = await CounterModel.update(
                  {
                    "counters.name": "employeeId",
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
                warehouseId =
                  warehouseCounter.counters[0].format +
                  warehouseCounter.counters[0].value;
                const empCounter = await CounterModel.findOne(
                  { "counters.name": "employeeId" },
                  { "counters.$": 1 }
                );
                var employeeId =
                  empCounter.counters[0].format + empCounter.counters[0].value;
                var employeeStatus = "NOTAPPROVED";
                let addr = "";
                const emailId =
                  moment().format("YYYY-MM-DDTHH:mm:ss") + "@statledger.com";
                let phone = "";
                if (emailId.indexOf("@") === -1) phone = "+" + emailId;
                const user = new EmployeeModel({
                  firstName: req.user.firstName || "",
                  lastName: req.user.id || "",
                  emailId: phone ? "" : emailId,
                  phoneNumber: phone,
                  organisationId: organisationId,
                  id: employeeId,
                  postalAddress: address,
                  accountStatus: employeeStatus,
                  warehouseId: [warehouseId],
                });
                await user.save();
                const org = new OrganisationModel({
                  primaryContactId: employeeId ? employeeId : null,
                  name: poDataArray[i].customer.name,
                  id: organisationId,
                  type: "CUSTOMER_SUPPLIER",
                  status: "NOTVERIFIED",
                  postalAddress: address,
                  warehouses: [warehouseId],
                  warehouseEmployees: [employeeId],
                  country: {
                    countryId: "001",
                    countryName: country,
                  },
                  region: {
                    id: "reg123",
                    regionName: region,
                    name: region,
                  },
                  configuration_id: "CONF000",
                  authority: req.body?.authority,
                  externalId: poDataArray[i].customer.customerOrganisation,
                });
                const createdOrg = await org.save();
                poDataArray[i].customer.customerOrganisation = organisationId;
                const incrementCounterInv = await CounterModel.update(
                  {
                    "counters.name": "inventoryId",
                  },
                  {
                    $inc: {
                      "counters.$.value": 1,
                    },
                  }
                );
                const invCounter = await CounterModel.findOne(
                  { "counters.name": "inventoryId" },
                  { "counters.$": 1 }
                );
                const inventoryId =
                  invCounter.counters[0].format + invCounter.counters[0].value;
                const inventoryResult = new InventoryModel({ id: inventoryId });
                console.log(inventoryResult);
                await inventoryResult.save();
                const warehouse = new WarehouseModel({
                  title: "Office",
                  id: warehouseId,
                  warehouseInventory: inventoryId,
                  organisationId: organisationId,
                  postalAddress: address,
                  warehouseAddress: {
                    firstLine: address,
                    secondLine: "",
                    region: region,
                    city: address,
                    state: address,
                    country: country,
                    landmark: "",
                  },
                  country: {
                    countryId: "001",
                    countryName: country,
                  },
                });
                await warehouse.save();
                poDataArray[i].customer.shippingAddress = {
                  shippingAddressId: warehouseId,
                  shipmentReceiverId: "NA",
                };
              }
              /////////Supplier ORG DETAILS////////////
              const supplierOrganisationName =
                poDataArray[i].supplier.supplierOrganisation;
              const supplierOrganisation = await OrganisationModel.findOne({
                id: new RegExp("^" + supplierOrganisationName + "$", "i"),
              });
              const supplierOrganisationExternal =
                await OrganisationModel.findOne({
                  externalId: new RegExp(
                    "^" + supplierOrganisationName + "$",
                    "i"
                  ),
                });
              if (supplierOrganisation) {
                poDataArray[i].supplier.name = supplierOrganisation.name;
                poDataArray[i].supplier.supplierType =
                  supplierOrganisation.type;
                poDataArray[i].supplier.shippingAddress = {
                  shippingAddressId: "NA",
                  shipmentReceiverId: "NA",
                };
              } else if (supplierOrganisationExternal) {
                poDataArray[i].supplier.name =
                  supplierOrganisationExternal.name;
                poDataArray[i].supplier.supplierType =
                  supplierOrganisationExternal.type;
                poDataArray[i].supplier.shippingAddress = {
                  shippingAddressId: "NA",
                  shipmentReceiverId: "NA",
                };
              } else {
                const country = poDataArray[i].supplier?.country
                  ? poDataArray[i].supplier?.country
                  : "India";
                const region = poDataArray[i].supplier?.region
                  ? poDataArray[i].supplier?.region
                  : "Asia";
                const address = poDataArray[i].supplier?.address
                  ? poDataArray[i].supplier?.address
                  : "Address NA";
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
                organisationId =
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
                const incrementCounterEmp = await CounterModel.update(
                  {
                    "counters.name": "employeeId",
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
                warehouseId =
                  warehouseCounter.counters[0].format +
                  warehouseCounter.counters[0].value;
                const empCounter = await CounterModel.findOne(
                  { "counters.name": "employeeId" },
                  { "counters.$": 1 }
                );
                var employeeId =
                  empCounter.counters[0].format + empCounter.counters[0].value;
                var employeeStatus = "NOTAPPROVED";
                let addr = "";
                const emailId =
                  moment().format("YYYY-MM-DDTHH:mm:ss") + "@statledger.com";
                let phone = "";
                if (emailId.indexOf("@") === -1) phone = "+" + emailId;
                const user = new EmployeeModel({
                  firstName: req.user.firstName || "",
                  lastName: req.user.id || "",
                  emailId: phone ? "" : emailId,
                  phoneNumber: phone,
                  organisationId: organisationId,
                  id: employeeId,
                  postalAddress: address,
                  accountStatus: employeeStatus,
                  warehouseId: [warehouseId],
                });
                await user.save();
                const org = new OrganisationModel({
                  primaryContactId: employeeId ? employeeId : null,
                  name: poDataArray[i].supplier.name,
                  id: organisationId,
                  type: "CUSTOMER_SUPPLIER",
                  status: "NOTVERIFIED",
                  postalAddress: address,
                  warehouses: [warehouseId],
                  warehouseEmployees: [employeeId],
                  country: {
                    countryId: "001",
                    countryName: country,
                  },
                  region: {
                    id: "reg123",
                    regionName: region,
                    name: region,
                  },
                  configuration_id: "CONF000",
                  authority: req.body?.authority,
                  externalId: poDataArray[i].supplier.supplierOrganisation,
                });
                const createdOrg = await org.save();
                poDataArray[i].supplier.supplierOrganisation = organisationId;
                let incrementCounterInv = await CounterModel.update(
                  {
                    "counters.name": "inventoryId",
                  },
                  {
                    $inc: {
                      "counters.$.value": 1,
                    },
                  }
                );
                const invCounter = await CounterModel.findOne(
                  { "counters.name": "inventoryId" },
                  { "counters.$": 1 }
                );
                const inventoryId =
                  invCounter.counters[0].format + invCounter.counters[0].value;
                const inventoryResult = new InventoryModel({ id: inventoryId });
                console.log(inventoryResult);
                await inventoryResult.save();
                const warehouse = new WarehouseModel({
                  title: "Office",
                  id: warehouseId,
                  warehouseInventory: inventoryId,
                  organisationId: organisationId,
                  postalAddress: address,
                  warehouseAddress: {
                    firstLine: address,
                    secondLine: "",
                    city: address,
                    state: address,
                    region: region,
                    country: country,
                    landmark: "",
                  },
                  country: {
                    countryId: "001",
                    countryName: country,
                  },
                });
                await warehouse.save();
                poDataArray[i].supplier.supplierType = "CUSTOMER_SUPPLIER";
                poDataArray[i].supplier.shippingAddress = {
                  shippingAddressId: warehouseId,
                  shipmentReceiverId: "NA",
                };
              }
              await RecordModel.create(poDataArray[i]);
            }
          }
        }
        incrementCounter = await CounterModel.update(
          {
            "counters.name": "poId",
          },
          {
            $inc: {
              "counters.$.value": dataRows,
            },
          }
        );
        return apiResponse.successResponseWithData(
          res,
          "Upload Result",
          poDataArray
        );
        //else return apiResponse.ErrorResponse(res,'Data Already Exists')
      } catch (e) {
        console.log(e);
        if (e.code == "11000") {
          return apiResponse.successResponseWithData(
            res,
            "Inserted excluding Duplicate Values",
            e
          );
        } else return apiResponse.ErrorResponse(res, e);
      }
      //     } else {
      //       res.json('Sorry! User does not have enough Permissions');
      //     }
      //  });
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.success = [
  async (req, res) => {
    try {
      const data = req.body;
      const { phone, payuMoneyId, amount, productinfo } = data;
      // This check is important as sometimes payumoney is sending multiple success responses
      const redirectUrl = "http://localhost:3000/shipments";

      return res.redirect(redirectUrl);
    } catch (err) {
      //throw error in json response with status 500.
    }
  },
];

exports.createOrder = [
  auth,
  async (req, res) => {
    try {
      const incrementCounter = await CounterModel.update(
        {
          "counters.name": "poId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const poCounter = await CounterModel.findOne(
        { "counters.name": "poId" },
        { "counters.$": 1 }
      );
      const poId = poCounter.counters[0].format + poCounter.counters[0].value;
      const email = req.user.emailId;
      const user_id = req.user.id;

      let {
        externalId,
        supplier,
        customer,
        products,
        creationDate,
        lastUpdatedOn,
      } = req.body;
      creationDate = new Date(creationDate);
      products.forEach(async (element) => {
        var product = await ProductModel.findOne({ id: element.productId });
        element.type = product?.type;
        element.unitofMeasure = product?.unitofMeasure;
        console.log(product);
      });
      const createdBy = (lastUpdatedBy = req.user.id);
      const purchaseOrder = new RecordModel({
        id: poId,
        externalId,
        creationDate,
        supplier,
        customer,
        products,
        lastUpdatedOn,
        createdBy,
        lastUpdatedBy,
      });
      console.log(purchaseOrder);
      const supplierID = req.body.supplier.supplierOrganisation;
      const supplierOrgData = await OrganisationModel.findOne({
        id: req.body.supplier.supplierOrganisation,
      });
      if (supplierOrgData == null) {
        console.log("Supplier not defined");
        return apiResponse.ErrorResponse(res, "Supplier  not defined");
      }

      const receiverOrgData = await OrganisationModel.findOne({
        id: req.body.customer.customerOrganisation,
      });
      if (receiverOrgData == null) {
        console.log("customer not defined");
        return apiResponse.ErrorResponse(res, "Receiver not defined");
      }
      var datee = new Date();
      datee = datee.toISOString();
      const supplierName = supplierOrgData.name;
      const supplierAddress = supplierOrgData.postalAddress;
      const receiverId = receiverOrgData.id;
      const receiverName = receiverOrgData.name;
      const receiverAddress = receiverOrgData.postalAddress;
      const currDateTime = date.format(new Date(), "DD/MM/YYYY HH:mm");
      const updates = {
        updatedOn: currDateTime,
        status: "CREATED",
      };
      purchaseOrder.poUpdates = updates;

      const bc_data = {
        Id: poId,
        CreatedOn: "",
        CreatedBy: "",
        IsDelete: true,
        Externalid: "",
        Supplier: JSON.stringify(req.body.supplier),
        Customer: JSON.stringify(req.body.customer),
        Products: JSON.stringify(req.body.products),
        Postatus: req.body.poStatus,
        Poupdates: JSON.stringify(updates),
        Lastupdatedby: req.user.id,
        Lastupdatedon: req.body.lastUpdatedOn,
        Country: "",
        Warehouses: "",
        Location: "",
        Supervisors: "",
        Employees: "",
      };
      let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

      const bc_response = await axios.post(
        `${hf_blockchain_url}/api/v1/transactionapi/record/create`,
        bc_data,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const result = await purchaseOrder.save();

      try {
        var evid = Math.random().toString(36).slice(2);
        let event_data = {
          eventID: null,
          eventTime: null,
          eventType: {
            primary: "CREATE",
            description: "ORDER",
          },
          actor: {
            actorid: null,
            actoruserid: null,
          },
          stackholders: {
            ca: {
              id: null,
              name: null,
              address: null,
            },
            actororg: {
              id: null,
              name: null,
              address: null,
            },
            secondorg: {
              id: null,
              name: null,
              address: null,
            },
          },
          payload: {
            data: {
              abc: 123,
            },
          },
        };
        event_data.eventID = "ev0000" + evid;
        event_data.eventTime = datee;
        event_data.eventType.primary = "CREATE";
        event_data.eventType.description = "ORDER";
        event_data.actor.actorid = user_id || "null";
        event_data.actor.actoruserid = email || "null";
        event_data.actorWarehouseId = req.user.warehouseId || "null";
        event_data.stackholders.ca.id = CENTRAL_AUTHORITY_ID || "null";
        event_data.stackholders.ca.name = CENTRAL_AUTHORITY_NAME || "null";
        event_data.stackholders.ca.address =
          CENTRAL_AUTHORITY_ADDRESS || "null";
        event_data.stackholders.secondorg.id = receiverId || "null";
        event_data.stackholders.secondorg.name = receiverName || "null";
        event_data.stackholders.secondorg.address = receiverAddress || "null";
        event_data.stackholders.actororg.id = supplierID || "null";
        event_data.stackholders.actororg.name = supplierName || "null";
        event_data.stackholders.actororg.address = supplierAddress || "null";
        event_data.payload.data = req.body;
        event_data.payload.data.order_id = poId;
        event_data.transactionId = poId;
        async function compute(event_data) {
          resultt = await logEvent(event_data);
          return resultt;
        }
        console.log(result);
        compute(event_data).then((response) => {
          console.log(response);
          return apiResponse.successResponseWithData(res, "Created order", {
            poId: poId,
          });
        });
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getOrderIds = [
  auth,
  async (req, res) => {
    try {
      const { organisationId } = req.user;
      const orderID = await RecordModel.find(
        {
          $or: [
            { "supplier.supplierOrganisation": organisationId },
            { "customer.customerOrganisation": organisationId },
            { createdBy: req.user.id },
          ],
        },
        "id"
      );

      return apiResponse.successResponseWithData(res, "Order Ids", orderID);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getOpenOrderIds = [
  auth,
  async (req, res) => {
    try {
      const { organisationId } = req.user;
      const orderID = await RecordModel.find({
        $and: [
          {
            "supplier.supplierOrganisation": organisationId,
          },
          {
            poStatus: {
              $in: [
                "ACCEPTED",
                "PARTIALLYFULFILLED",
                "TRANSIT&PARTIALLYFULFILLED",
              ],
            },
          },
        ],
      });

      return apiResponse.successResponseWithData(
        res,
        "Open Order Ids",
        orderID
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchInboundPurchaseOrders = [
  //inbound po with filter(from, orderId, productName, deliveryLocation, date)
  auth,
  async (req, res) => {
    try {
      const { organisationId, role } = req.user;
      const { skip, limit } = req.query;
      const permission_request = {
        role: role,
        permissionRequired: ["viewInboundOrders"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          let currentDate = new Date();
          let fromDateFilter = 0;
          let fromCustomer = req.query.from ? req.query.from : undefined;
          let productName = req.query.productName
            ? req.query.productName
            : undefined;
          let deliveryLocation = req.query.deliveryLocation
            ? req.query.deliveryLocation
            : undefined;
          let orderId = req.query.orderId ? req.query.orderId : undefined;
          let poStatus = req.query.poStatus ? req.query.poStatus : undefined;
          let fromDate = req.query.fromDate ? req.query.fromDate : undefined;
          let toDate = req.query.toDate ? req.query.toDate : undefined;

          switch (req.query.dateFilter) {
            case "today":
              fromDateFilter = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
              );
              break;
            case "week":
              fromDateFilter = new Date(
                currentDate.setDate(
                  currentDate.getDate() - currentDate.getDay()
                )
              ).toUTCString();
              break;
            case "month":
              fromDateFilter = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                currentDate.getDate()
              );
              break;
            case "threeMonth":
              fromDateFilter = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 3,
                currentDate.getDate()
              );
              break;
            case "sixMonth":
              fromDateFilter = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 6,
                currentDate.getDate()
              );
              break;
            case "year":
              fromDateFilter = new Date(
                currentDate.getFullYear() - 1,
                currentDate.getMonth(),
                currentDate.getDate()
              );
              break;
            default:
              fromDateFilter = 0;
          }

          let whereQuery = {};
          if (orderId) {
            whereQuery["id"] = orderId;
          }

          if (fromDateFilter) {
            whereQuery["createdAt"] = { $gte: fromDateFilter };
          }
          if (fromDate && toDate) {
            var firstDate = new Date(fromDate);
            var nextDate = new Date(toDate);
            whereQuery[`creationDate`] = { $gte: firstDate, $lte: nextDate };
          }

          if (organisationId) {
            whereQuery["supplier.supplierOrganisation"] = organisationId;
          }

          if (deliveryLocation) {
            whereQuery["customer.shippingAddress.shippingAddressId"] =
              deliveryLocation;
          }

          if (fromCustomer) {
            whereQuery["customer.customerOrganisation"] = fromCustomer;
          }

          if (poStatus) {
            whereQuery["poStatus"] = poStatus;
          }

          if (productName) {
            whereQuery.products = {
              $elemMatch: {
                productId: productName,
              },
            };
          }

          console.log("whereQuery ======>", whereQuery);
          try {
            let inboundPOsCount = await RecordModel.count(whereQuery);
            RecordModel.find(whereQuery)
              .skip(parseInt(skip))
              .limit(parseInt(limit))
              .sort({ createdAt: -1 })
              .then((inboundPOList) => {
                let inboundPORes = [];
                let findInboundPOData = inboundPOList.map(async (inboundPO) => {
                  let inboundPOData = JSON.parse(JSON.stringify(inboundPO));
                  inboundPOData[`productDetails`] = [];
                  let inboundProductsArray = inboundPOData.products;
                  let productRes = inboundProductsArray.map(async (product) => {
                    let productDetails = await ProductModel.findOne({
                      id: product.productId,
                    });
                    return productDetails;
                  });
                  Promise.all(productRes).then(async function (productList) {
                    inboundPOData[`productDetails`] = await productList;
                  });

                  let creator = await EmployeeModel.findOne({
                    id: inboundPO.createdBy,
                  });
                  let creatorOrganisation = await OrganisationModel.findOne({
                    id: creator.organisationId,
                  });

                  let supplierOrganisation = await OrganisationModel.findOne({
                    id: inboundPO.supplier.supplierOrganisation,
                  });
                  let customerOrganisation = await OrganisationModel.findOne({
                    id: inboundPOData.customer.customerOrganisation,
                  });
                  let customerWareHouse = await WarehouseModel.findOne({
                    organisationId: inboundPOData.customer.customerOrganisation,
                  });
                  inboundPOData.creatorOrganisation = creatorOrganisation;
                  inboundPOData.supplier[`organisation`] = supplierOrganisation;
                  inboundPOData.customer[`organisation`] = customerOrganisation;
                  inboundPOData.customer[`warehouse`] = customerWareHouse;
                  inboundPORes.push(inboundPOData);
                });

                Promise.all(findInboundPOData).then(function (results) {
                  return apiResponse.successResponseWithData(
                    res,
                    "Inbound PO Records",
                    { inboundPOs: inboundPORes, count: inboundPOsCount }
                  );
                });
              });
          } catch (err) {
            return apiResponse.ErrorResponse(res, err);
          }
        } else {
          return apiResponse.forbiddenResponse(
            res,
            "User doesn't have enough Permissions"
          );
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchOutboundPurchaseOrders = [
  //outbound po with filter(to, orderId, productName, deliveryLocation, date)
  auth,
  async (req, res) => {
    try {
      const { organisationId, role, id } = req.user;
      const { skip, limit } = req.query;
      const permission_request = {
        role: role,
        permissionRequired: ["viewOutboundOrders"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          let currentDate = new Date();
          let fromDateFilter = 0;
          let toSupplier = req.query.to ? req.query.to : undefined;
          let productName = req.query.productName
            ? req.query.productName
            : undefined;
          let deliveryLocation = req.query.deliveryLocation
            ? req.query.deliveryLocation
            : undefined;
          let orderId = req.query.orderId ? req.query.orderId : undefined;
          let poStatus = req.query.poStatus ? req.query.poStatus : undefined;
          let fromDate = req.query.fromDate ? req.query.fromDate : undefined;
          let toDate = req.query.toDate ? req.query.toDate : undefined;

          switch (req.query.dateFilter) {
            case "today":
              fromDateFilter = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
              );
              break;
            case "week":
              fromDateFilter = new Date(
                currentDate.setDate(
                  currentDate.getDate() - currentDate.getDay()
                )
              ).toUTCString();
              break;
            case "month":
              fromDateFilter = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                currentDate.getDate()
              );
              break;
            case "threeMonth":
              fromDateFilter = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 3,
                currentDate.getDate()
              );
              break;
            case "sixMonth":
              fromDateFilter = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 6,
                currentDate.getDate()
              );
              break;
            case "year":
              fromDateFilter = new Date(
                currentDate.getFullYear() - 1,
                currentDate.getMonth(),
                currentDate.getDate()
              );
              break;
            default:
              fromDateFilter = 0;
          }

          let whereQuery = {};
          if (orderId) {
            whereQuery["id"] = orderId;
          }

          if (fromDateFilter) {
            whereQuery["createdAt"] = { $gte: fromDateFilter };
          }

          if (organisationId) {
            //whereQuery["customer.customerOrganisation"] = organisationId
            whereQuery["$or"] = [
              { "customer.customerOrganisation": organisationId },
              { createdBy: id },
            ];
          }

          if (deliveryLocation) {
            whereQuery["customer.shippingAddress.shippingAddressId"] =
              deliveryLocation;
          }

          if (toSupplier) {
            whereQuery["supplier.supplierOrganisation"] = toSupplier;
          }

          if (poStatus) {
            whereQuery["poStatus"] = poStatus;
          }

          if (fromDate && toDate) {
            var firstDate = new Date(fromDate);
            var nextDate = new Date(toDate);
            whereQuery[`creationDate`] = { $gte: firstDate, $lte: nextDate };
          }

          if (productName) {
            whereQuery.products = {
              $elemMatch: {
                productId: productName,
              },
            };
          }
          try {
            let outboundPOsCount = await RecordModel.count(whereQuery);
            RecordModel.find(whereQuery)
              .skip(parseInt(skip))
              .limit(parseInt(limit))
              .sort({ createdAt: -1 })
              .then((outboundPOList) => {
                let outboundPORes = [];
                let findOutboundPOData = outboundPOList.map(
                  async (outboundPO) => {
                    let outboundPOData = JSON.parse(JSON.stringify(outboundPO));
                    outboundPOData[`productDetails`] = [];
                    let outboundProductsArray = outboundPOData.products;
                    let productRes = outboundProductsArray.map(
                      async (product) => {
                        let productDetails = await ProductModel.findOne({
                          id: product.productId,
                        });
                        return productDetails;
                      }
                    );
                    Promise.all(productRes).then(async function (productList) {
                      outboundPOData[`productDetails`] = await productList;
                    });

                    let supplierOrganisation = await OrganisationModel.findOne({
                      id: outboundPO.supplier.supplierOrganisation,
                    });
                    let customerOrganisation = await OrganisationModel.findOne({
                      id: outboundPOData.customer.customerOrganisation,
                    });
                    let customerWareHouse = await WarehouseModel.findOne({
                      organisationId:
                        outboundPOData.customer.customerOrganisation,
                    });
                    outboundPOData.supplier[`organisation`] =
                      supplierOrganisation;
                    outboundPOData.customer[`organisation`] =
                      customerOrganisation;
                    outboundPOData.customer[`warehouse`] = customerWareHouse;
                    outboundPORes.push(outboundPOData);
                  }
                );

                Promise.all(findOutboundPOData).then(function (results) {
                  return apiResponse.successResponseWithData(
                    res,
                    "Outbound PO Records",
                    { outboundPOs: outboundPORes, count: outboundPOsCount }
                  );
                });
              });
          } catch (err) {
            return apiResponse.ErrorResponse(res, err);
          }
        } else {
          return apiResponse.forbiddenResponse(
            res,
            "User doesn't have enough Permissions"
          );
        }
      });
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchProductIdsCustomerLocationsOrganisations = [
  auth,
  async (req, res) => {
    try {
      let responseData = {};
      ProductModel.find({}, "id name").then(function (productIds) {
        WarehouseModel.find(
          {},
          "warehouseAddress.city warehouseAddress.country id title"
        ).then(function (locations) {
          OrganisationModel.find({ status: "ACTIVE" }, "id name").then(
            function (organisation) {
              responseData[`organisations`] = organisation;
              responseData[`deliveryLocations`] = locations;
              responseData[`productIds`] = productIds;
              return apiResponse.successResponseWithData(
                res,
                "Product Ids and Customer Locations for filter dropdown",
                responseData
              );
            }
          );
        });
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.exportInboundPurchaseOrders = [
  //inbound po with filter(from, orderId, productName, deliveryLocation, date)
  auth,
  async (req, res) => {
    try {
      const { organisationId, role } = req.user;
      const { skip, limit } = req.query;
      let currentDate = new Date();
      let fromDateFilter = 0;
      let fromCustomer = req.query.from ? req.query.from : undefined;
      let productName = req.query.productName
        ? req.query.productName
        : undefined;
      let deliveryLocation = req.query.deliveryLocation
        ? req.query.deliveryLocation
        : undefined;
      let orderId = req.query.orderId ? req.query.orderId : undefined;
      let poStatus = req.query.poStatus ? req.query.poStatus : undefined;
      switch (req.query.dateFilter) {
        case "today":
          fromDateFilter = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          );
          break;
        case "week":
          fromDateFilter = new Date(
            currentDate.setDate(currentDate.getDate() - currentDate.getDay())
          ).toUTCString();
          break;
        case "month":
          fromDateFilter = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
          );
          break;
        case "threeMonth":
          fromDateFilter = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 3,
            currentDate.getDate()
          );
          break;
        case "sixMonth":
          fromDateFilter = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 6,
            currentDate.getDate()
          );
          break;
        case "year":
          fromDateFilter = new Date(
            currentDate.getFullYear() - 1,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          break;
        default:
          fromDateFilter = 0;
      }

      let whereQuery = {};
      if (orderId) {
        whereQuery["id"] = orderId;
      }

      if (fromDateFilter) {
        whereQuery["createdAt"] = { $gte: fromDateFilter };
      }

      if (organisationId) {
        whereQuery["supplier.supplierOrganisation"] = organisationId;
      }

      if (deliveryLocation) {
        whereQuery["customer.shippingAddress.shippingAddressId"] =
          deliveryLocation;
      }

      if (fromCustomer) {
        whereQuery["customer.customerOrganisation"] = fromCustomer;
      }

      if (poStatus) {
        whereQuery["poStatus"] = poStatus;
      }

      if (productName) {
        whereQuery.products = {
          $elemMatch: {
            productId: productName,
          },
        };
      }

      try {
        let inboundPOsCount = await RecordModel.count(whereQuery);
        RecordModel.find(whereQuery)
          .skip(parseInt(skip))
          .limit(parseInt(limit))
          .sort({ createdAt: -1 })
          .then((inboundPOList) => {
            let inboundPORes = [];
            let findInboundPOData = inboundPOList.map(async (inboundPO) => {
              let inboundPOData = JSON.parse(JSON.stringify(inboundPO));
              inboundPOData[`productDetails`] = [];
              let inboundProductsArray = inboundPOData.products;
              let productRes = inboundProductsArray.map(async (product) => {
                let productDetails = await ProductModel.findOne({
                  id: product.productId,
                });
                return productDetails;
              });
              Promise.all(productRes).then(async function (productList) {
                inboundPOData[`productDetails`] = await productList;
              });

              let creator = await EmployeeModel.findOne({
                id: inboundPO.createdBy,
              });
              let creatorOrganisation = await OrganisationModel.findOne({
                id: creator.organisationId,
              });

              let supplierOrganisation = await OrganisationModel.findOne({
                id: inboundPO.supplier.supplierOrganisation,
              });
              let customerOrganisation = await OrganisationModel.findOne({
                id: inboundPOData.customer.customerOrganisation,
              });
              let customerWareHouse = await WarehouseModel.findOne({
                organisationId: inboundPOData.customer.customerOrganisation,
              });
              inboundPOData.creatorOrganisation = creatorOrganisation;
              inboundPOData.supplier[`organisation`] = supplierOrganisation;
              inboundPOData.customer[`organisation`] = customerOrganisation;
              inboundPOData.customer[`warehouse`] = customerWareHouse;
              inboundPORes.push(inboundPOData);
            });

            Promise.all(findInboundPOData).then(function (results) {
              let data = [];
              let rowData;
              for (row of inboundPORes) {
                for (product of row.products) {
                  rowData = {
                    id: row.id,
                    createdBy: row.createdBy,
                    supplierOrgId: row?.supplier?.organisation?.id,
                    orderReceiveIncharge: row?.customer?.customerIncharge,
                    orderReceiverOrg: row?.customer?.customerOrganisation,
                    productCategory: product.type,
                    productName: product.name,
                    manufacturer: product.manufacturer,
                    productQuantity: product.productQuantity,
                    productId: product.id,
                    recieverOrgName: row?.customer?.organisation?.name,
                    recieverOrgId: row?.customer?.organisation?.id,
                    recieverOrgLocation:
                      row?.customer.organisation?.postalAddress,
                    status: row.poStatus,
                  };
                  data.push(rowData);
                }
              }
              if (req.query.type == "pdf") {
                res = buildPdfReport(req, res, data);
              } else {
                res = buildExcelReport(req, res, data);
                return apiResponse.successResponseWithData(
                  res,
                  "Outbound PO Records"
                );
              }
            });
          });
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.exportOutboundPurchaseOrders = [
  //outbound po with filter(to, orderId, productName, deliveryLocation, date)
  auth,
  async (req, res) => {
    try {
      const { organisationId, role, id } = req.user;
      const { skip, limit } = req.query;
      let currentDate = new Date();
      let fromDateFilter = 0;
      let toSupplier = req.query.to ? req.query.to : undefined;
      let productName = req.query.productName
        ? req.query.productName
        : undefined;
      let deliveryLocation = req.query.deliveryLocation
        ? req.query.deliveryLocation
        : undefined;
      let orderId = req.query.orderId ? req.query.orderId : undefined;
      let poStatus = req.query.poStatus ? req.query.poStatus : undefined;
      switch (req.query.dateFilter) {
        case "today":
          fromDateFilter = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          );
          break;
        case "week":
          fromDateFilter = new Date(
            currentDate.setDate(currentDate.getDate() - currentDate.getDay())
          ).toUTCString();
          break;
        case "month":
          fromDateFilter = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()
          );
          break;
        case "threeMonth":
          fromDateFilter = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 3,
            currentDate.getDate()
          );
          break;
        case "sixMonth":
          fromDateFilter = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 6,
            currentDate.getDate()
          );
          break;
        case "year":
          fromDateFilter = new Date(
            currentDate.getFullYear() - 1,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          break;
        default:
          fromDateFilter = 0;
      }

      let whereQuery = {};
      if (orderId) {
        whereQuery["id"] = orderId;
      }

      if (fromDateFilter) {
        whereQuery["createdAt"] = { $gte: fromDateFilter };
      }

      if (organisationId) {
        //whereQuery["customer.customerOrganisation"] = organisationId
        whereQuery["$or"] = [
          { "customer.customerOrganisation": organisationId },
          { createdBy: id },
        ];
      }

      if (deliveryLocation) {
        whereQuery["customer.shippingAddress.shippingAddressId"] =
          deliveryLocation;
      }

      if (toSupplier) {
        whereQuery["supplier.supplierOrganisation"] = toSupplier;
      }

      if (poStatus) {
        whereQuery["poStatus"] = poStatus;
      }

      if (productName) {
        whereQuery.products = {
          $elemMatch: {
            productId: productName,
          },
        };
      }

      try {
        let outboundPOsCount = await RecordModel.count(whereQuery);
        RecordModel.find(whereQuery)
          .skip(parseInt(skip))
          .limit(parseInt(limit))
          .sort({ createdAt: -1 })
          .then((outboundPOList) => {
            let outboundPORes = [];
            let findOutboundPOData = outboundPOList.map(async (outboundPO) => {
              let outboundPOData = JSON.parse(JSON.stringify(outboundPO));
              outboundPOData[`productDetails`] = [];
              let outboundProductsArray = outboundPOData.products;
              let productRes = outboundProductsArray.map(async (product) => {
                let productDetails = await ProductModel.findOne({
                  id: product.productId,
                });
                return productDetails;
              });
              Promise.all(productRes).then(async function (productList) {
                outboundPOData[`productDetails`] = await productList;
              });

              let supplierOrganisation = await OrganisationModel.findOne({
                id: outboundPO.supplier.supplierOrganisation,
              });
              let customerOrganisation = await OrganisationModel.findOne({
                id: outboundPOData.customer.customerOrganisation,
              });
              let customerWareHouse = await WarehouseModel.findOne({
                organisationId: outboundPOData.customer.customerOrganisation,
              });
              outboundPOData.supplier[`organisation`] = supplierOrganisation;
              outboundPOData.customer[`organisation`] = customerOrganisation;
              outboundPOData.customer[`warehouse`] = customerWareHouse;
              outboundPORes.push(outboundPOData);
            });

            Promise.all(findOutboundPOData).then(function (results) {
              let data = [];
              let rowData;
              for (row of outboundPORes) {
                for (product of row.products) {
                  rowData = {
                    id: row.id,
                    createdBy: row.createdBy,
                    supplierOrgId: row?.supplier?.organisation?.id,
                    orderReceiveIncharge: row?.customer?.customerIncharge,
                    orderReceiverOrg: row?.customer?.customerOrganisation,
                    productCategory: product.type,
                    productName: product.name,
                    manufacturer: product.manufacturer,
                    productQuantity: product.productQuantity,
                    productId: product.id,
                    recieverOrgName: row?.customer?.organisation?.name,
                    recieverOrgId: row?.customer?.organisation?.id,
                    recieverOrgLocation:
                      row?.customer.organisation?.postalAddress,
                    status: row.poStatus,
                  };
                  data.push(rowData);
                }
              }
              if (req.query.type == "pdf") {
                res = buildPdfReport(req, res, data);
              } else {
                res = buildExcelReport(req, res, data);
                return apiResponse.successResponseWithData(
                  res,
                  "Outbound PO Records"
                );
              }
            });
          });
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

function buildExcelReport(req, res, dataForExcel) {
  const styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: "FF000000",
        },
      },
      font: {
        color: {
          rgb: "FFFFFFFF",
        },
        sz: 14,
        bold: true,
        underline: true,
      },
    },
    cellGreen: {
      fill: {
        fgColor: {
          rgb: "FF00FF00",
        },
      },
    },
  };

  const specification = {
    id: {
      displayName: "Order ID",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 120,
    },
    createdBy: {
      displayName: "Order Created By",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: "10",
    },
    supplierOrgId: {
      displayName: "ORG ID - Creator",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    orderReceiveIncharge: {
      displayName: "Order Received By",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    orderReceiverOrg: {
      displayName: "ORG ID - Receiver",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    productCategory: {
      displayName: "Product Category",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    productName: {
      displayName: "Product Name",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    productId: {
      displayName: "Product ID",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    productQuantity: {
      displayName: "Quantity",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    manufacturer: {
      displayName: "Manufacturer",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    recieverOrgName: {
      displayName: "Delivery Organization Name",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    recieverOrgId: {
      displayName: "Delivery Organization ID",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    recieverOrgLocation: {
      displayName: "Delivery Organization Location Details",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    status: {
      displayName: "Status",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
  };

  const report = excel.buildExport([
    {
      name: "Report Shipment",
      specification: specification,
      data: dataForExcel,
    },
  ]);

  res.attachment("report.xlsx");
  return res.send(report);
}

function buildPdfReport(req, res, data) {
  let finalPath = resolve("./models/pdftemplate.html");
  let html = fs.readFileSync(finalPath, "utf8");
  var options = {
    format: "A4",
    orientation: "landscape",
    border: "10mm",
    header: {
      height: "15mm",
      contents: '<div style="text-align: center;"><h1>Vaccine Ledger<h1></div>',
    },
  };
  var document = {
    html: html,
    data: {
      orders: data,
    },
    path: "./output.pdf",
    type: "",
  };
  pdf
    .create(document, options)
    .then((result) => {
      console.log(result);
      return res.sendFile(result.filename);
    })
    .catch((error) => {
      console.error(error);
    });
}
