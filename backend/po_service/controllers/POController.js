const fs = require("fs");
const XLSX = require("xlsx");
const PdfPrinter = require("pdfmake");
const { resolve } = require("path");
const fontDescriptors = {
  Roboto: {
    normal: resolve("./controllers/Roboto-Regular.ttf"),
    bold: resolve("./controllers/Roboto-Medium.ttf"),
    italics: resolve("./controllers/Roboto-Italic.ttf"),
    bolditalics: resolve("./controllers/Roboto-MediumItalic.ttf"),
  },
};
const printer = new PdfPrinter(fontDescriptors);
const axios = require("axios");
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
const apiResponse = require("../helpers/apiResponse");
const { responses } = require("../helpers/responses");
const auth = require("../middlewares/jwt");
const checkPermissions =
  require("../middlewares/rbac_middleware").checkPermissions;
const wrapper = require("../models/DBWrapper");
const excel = require("node-excel-export");
const { compareArrays } = require("../helpers/utility");
const blockchain_service_url = process.env.URL;
const hf_blockchain_url = process.env.HF_BLOCKCHAIN_URL;
const po_stream_name = process.env.PO_STREAM;
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
  let criteria;
  let matchCondition = {};
  orgMode != "" ? (criteria = mode + "." + orgMode) : (criteria = mode);
  let newObj = {};
  if (type == "outbound") {
    newObj[criteria] = organisationId;
    matchCondition["$or"] = [newObj, { createdBy: id }];
  } else matchCondition[criteria] = organisationId;
  const poDetails = await RecordModel.aggregate([
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
          let inboundPOs, outboundPOs, poDetails;
          try {
            if (poId != null) {
              await userPurchaseOrders(
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
              if (poDetails.length)
                await Promise.all(
                  poDetails[0]?.products.map(async (element) => {
                    const product = await ProductModel.findOne({
                      $or: [{ name: element.id }, { id: element.id }],
                    });
                    element.unitofMeasure = product?.unitofMeasure;
                    element.manufacturer = product?.manufacturer;
                    element.type = product?.type;
                  })
                );
            } else {
              await userPurchaseOrders(
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
              await userPurchaseOrders(
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
          try {
            const { orderID, status } = req.body;
            const po = await RecordModel.findOne({ id: orderID });
            if (po && po.customer.customer_incharge === address) {
              const currDateTime = date.format(new Date(), "DD/MM/YYYY HH:mm");
              const updates = {
                updatedOn: currDateTime,
                status: status,
              };
              await RecordModel.findOneAndUpdate(
                { id: orderID },
                {
                  $push: { poUpdates: updates },
                  $set: { poStatus: status },
                }
              );
              try {
                console.log(req.user);
                let event = await Event.findOne({ transactionId: orderID });
                console.log(event);
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
                if (status === "ACCEPTED")
                  newEvent.eventTypePrimary = "RECEIVE";
                else newEvent.eventTypePrimary = "REJECT";
                newEvent.payloadData.data = req.body;
                let event_body = new Event(newEvent);
                await event_body.save();
              } catch (error) {
                console.log(error);
              }
              return apiResponse.successResponseWithData(
                res,
                responses(req.user.preferredLanguage).po_status,
                responses(req.user.preferredLanguage).success
              );
            } else {
              return apiResponse.ErrorResponse(
                res,
                responses(req.user.preferredLanguage).not_authorized
              );
            }
          } catch (e) {
            return apiResponse.ErrorResponse(res, e.message);
          }
        } else {
          return apiResponse.forbiddenResponse(
            res,
            responses(req.user.preferredLanguage).no_permission
          );
        }
      });
    } catch (err) {
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
      const poId = await CounterModel.findOneAndUpdate(
        {
          "counters.name": "productId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        },
        {
          new: true,
        }
      );
      const purchaseOrder = new RecordModel({
        id: poId.counters[5].format + poId.counters[5].value,
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
        responses(req.user.preferredLanguage).success,
        result.id
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addPOsFromExcel = [
  auth,
  async (req, res) => {
    try {
      const workbook = XLSX.readFile(req.file.path);
      const sheet_name_list = workbook.SheetNames;
      let errorsArr = [];
      let warningArr = [];
      let invalidArr = [];
      const data = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]],
        { dateNF: "dd/mm/yyyy;@", cellDates: true, raw: false }
      );

      // Validate incoming Excel columns
      const expectedColNames =
        req.user.preferredLanguage === "EN"
          ? [
              "UNICEf PO Number",
              "PO Item#",
              "Vendor",
              "Vendor Name",
              "Document Date",
              "Your Reference",
              "Incoterms",
              "Incoterms (Part 2)",
              "Material",
              "Material Description",
              "Plant",
              "Country Name",
              "Region Name",
              "Order Quantity",
              "Order Unit",
              "Unit Id",
              "IP Code",
              "IP Name",
            ]
          : [
              "UNICEf PO Número",
              "PO Articulo#",
              "Vendedor",
              "Nombre Del Vendedor",
              "Fecha Del Documento",
              "Tu Referencia",
              "Incoterms",
              "Incoterms (Part 2)",
              "Material",
              "Material Descripción",
              "Planta",
              "Nombre Del País",
              "Nombre De La Región",
              "Ordene La Cantidad",
              "Unidad De Pedido",
              "Unidad Id",
              "IP Código",
              "IP Nombre",
            ];

      if (!compareArrays(expectedColNames, Object.keys(data[0]))) {
        // Invalid format logic
        return apiResponse.validationErrorWithData(
          res,
          responses(req.user.preferredLanguage).invalid_excel,
          Object.keys(data[0])
        );
      }

      const createdBy = req.user.id;
      let poDataArray = [];
      poDataArray = data.map((po) => {
        return {
          id: po.id || 0,
          externalId: po["UNICEf PO Number"],
          creationDate: new Date().toISOString(),
          lastUpdatedOn: new Date().toISOString(),
          poStatus: req.user.id == po["Vendor"] ? "APPROVED" : "CREATED",
          supplier: {
            supplierOrganisation: po["Vendor"],
            name: po["Vendor Name"],
          },
          customer: {
            customerOrganisation: po["IP Code"],
            name: po["IP Name"],
            country: po["Country Name"],
            region: po["Region Name"],
            address: "NA",
            shippingAddress: {
              shippingAddressId: po["Plant"],
              shipmentReceiverId: po["Shipment Receiver Id"] || "NA",
            },
          },
          products: [
            {
              // productId: po["Material"],
              name: po["Material"],
              productQuantity: po["Order Quantity"],
              quantity: po["Order Quantity"],
              unitofMeasure: {
                id: po["Unit Id"],
                name: po["Order Unit"],
              },
            },
          ],
          createdBy: createdBy,
          lastUpdatedBy: createdBy,
        };
      });
      let incrementCounter = await CounterModel.updateOne(
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
          const duplicate = await RecordModel.findOne({
            externalId: poDataArray[i].externalId,
          });
          if (duplicate != null) {
            console.log("****** Duplicate PO");
            errorsArr.push(poDataArray[i]);
            delete poDataArray[i];
            i--;
          } else {
            poDataArray[i].id =
              poCounter.counters[0].format + poCounter.counters[0].value++;

            let productDetails = await ProductModel.findOne({
              name: poDataArray[i].products[0].name,
            });
            if (productDetails) {
              (poDataArray[i].products[0].productId =
                productDetails.productId || productDetails.id || ""),
                (poDataArray[i].products[0].id = productDetails.id || ""),
                (poDataArray[i].products[0].type = productDetails.type || ""),
                (poDataArray[i].products[0].manufacturer =
                  productDetails.manufacturer || "");
            } else {
              console.log(
                'Product not found -- "' +
                  poDataArray[i].products[0].name +
                  '" -- Skipping it.'
              );
              invalidArr.push(poDataArray[i]);
              delete poDataArray[i];
              i--;
              continue;
            }
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
              poDataArray[i].customer.customerType = customerOrganisation.type;
              if (
                !customerOrganisation.warehouses.includes(
                  poDataArray[i].customer.shippingAddress.shippingAddressId
                )
              ) {
                warningArr.push(
                  `Warehouse ${poDataArray[i].customer.shippingAddress.shippingAddressId} doesn't exist in customer organisation`
                );
                delete poDataArray[i];
                continue;
              }
            } else if (customerOrganisationExternal) {
              poDataArray[i].customer.name = customerOrganisationExternal.name;
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
              const organisationId =
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
              const warehouseId =
                warehouseCounter.counters[0].format +
                warehouseCounter.counters[0].value;
              const empCounter = await CounterModel.findOne(
                { "counters.name": "employeeId" },
                { "counters.$": 1 }
              );
              const employeeId =
                empCounter.counters[0].format + empCounter.counters[0].value;
              const employeeStatus = "NOTAPPROVED";
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
                country: country,
                region: region,
                configuration_id: "CONF000",
                authority: req.body?.authority,
                externalId: poDataArray[i].customer.customerOrganisation,
              });
              await org.save();
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
								region: {
									regionName: region,
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
              poDataArray[i].supplier.supplierType = supplierOrganisation.type;
              poDataArray[i].supplier.shippingAddress = {
                shippingAddressId: "NA",
                shipmentReceiverId: "NA",
              };
            } else if (supplierOrganisationExternal) {
              poDataArray[i].supplier.name = supplierOrganisationExternal.name;
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
              const organisationId =
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
              const warehouseId =
                warehouseCounter.counters[0].format +
                warehouseCounter.counters[0].value;
              const empCounter = await CounterModel.findOne(
                { "counters.name": "employeeId" },
                { "counters.$": 1 }
              );
              const employeeId1 =
                empCounter.counters[0].format + empCounter.counters[0].value;
              const employeeStatus1 = "NOTAPPROVED";
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
                id: employeeId1,
                postalAddress: address,
                accountStatus: employeeStatus1,
                warehouseId: [warehouseId],
              });
              await user.save();
              const org = new OrganisationModel({
                primaryContactId: employeeId1 ? employeeId1 : null,
                name: poDataArray[i].supplier.name,
                id: organisationId,
                type: "CUSTOMER_SUPPLIER",
                status: "NOTVERIFIED",
                postalAddress: address,
                warehouses: [warehouseId],
                warehouseEmployees: [employeeId1],
                country: country,
                region: region,
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
								region: {
									regionName: region,
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
        responses(req.user.preferredLanguage || "EN").upload_result,
        {
          inserted: poDataArray,
          unininserted: warningArr,
          duplicate: errorsArr,
          invalid: invalidArr,
        }
      );
    } catch (err) {
      console.log(err);
      if (err.code == "11000") {
        return apiResponse.successResponseWithData(
          res,
          responses(req.user.preferredLanguage).inserted_ex_duplicates,
          err
        );
      } else {
        return apiResponse.ErrorResponse(res, err.message);
      }
    }
  },
];

exports.success = [
  async (req, res) => {
    try {
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
      });
      const createdBy = req.user.id;
      const purchaseOrder = new RecordModel({
        id: poId,
        externalId,
        creationDate,
        supplier,
        customer,
        products,
        lastUpdatedOn,
        createdBy,
        lastUpdatedBy: createdBy,
      });
      const supplierID = req.body.supplier.supplierOrganisation;
      const supplierOrgData = await OrganisationModel.findOne({
        id: req.body.supplier.supplierOrganisation,
      });
      if (supplierOrgData == null) {
        return apiResponse.ErrorResponse(
          res,
          responses(req.user.preferredLanguage).supplier_not_defined
        );
      }

      const receiverOrgData = await OrganisationModel.findOne({
        id: req.body.customer.customerOrganisation,
      });
      if (receiverOrgData == null) {
        return apiResponse.ErrorResponse(
          res,
          responses(req.user.preferredLanguage).receiver_not_defined
        );
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
      await axios.post(
        `${hf_blockchain_url}/api/v1/transactionapi/record/create`,
        bc_data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      await purchaseOrder.save();

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
        await logEvent(event_data);
        return apiResponse.successResponseWithData(
          res,
          responses(req.user.preferredLanguage).created_order,
          {
            poId: poId,
          }
        );
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
      return apiResponse.ErrorResponse(res, err);
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
      return apiResponse.ErrorResponse(res, err);
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
                    id: creator?.organisationId,
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
            responses(req.user.preferredLanguage).no_permission
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
            responses(req.user.preferredLanguage).no_permission
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
      const { organisationId } = req.user;
      // const { skip, limit } = req.query;
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

      try {
        let inboundPOsCount = await RecordModel.count(whereQuery);
        RecordModel.find(whereQuery)
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
                id: creator?.organisationId,
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
              for (const row of inboundPORes) {
                for (const product of row.products) {
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
                res = buildPdfReport(req, res, data, "Inbound");
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
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.exportOutboundPurchaseOrders = [
  //outbound po with filter(to, orderId, productName, deliveryLocation, date)
  auth,
  async (req, res) => {
    try {
      const { organisationId, id } = req.user;
      // let { skip, limit } = req.query;
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

      if (fromDate && toDate) {
        var firstDate = new Date(fromDate);
        var nextDate = new Date(toDate);
        whereQuery[`creationDate`] = { $gte: firstDate, $lte: nextDate };
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
      let outboundPOsCount = await RecordModel.count(whereQuery);
      RecordModel.find(whereQuery)
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
            for (const row of outboundPORes) {
              for (const product of row.products) {
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
              res = buildPdfReport(req, res, data, "Outbound");
            } else {
              res = buildExcelReport(req, res, data);
            }
          });
        });
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
      displayName: req.t("Order_ID"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 120,
    },
    createdBy: {
      displayName: req.t("Order_Created_By"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: "10",
    },
    supplierOrgId: {
      displayName: req.t("ORG_ID_-_Creator"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    orderReceiveIncharge: {
      displayName: req.t("Order_Received_By"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    orderReceiverOrg: {
      displayName: req.t("ORG_ID_-_Receiver"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    productCategory: {
      displayName: req.t("Product_Category"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    productName: {
      displayName: req.t("Product_Name"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    productId: {
      displayName: req.t("Product_ID"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    productQuantity: {
      displayName: req.t("Quantity"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    manufacturer: {
      displayName: req.t("Manufacturer"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    recieverOrgName: {
      displayName: req.t("Delivery_Organization_Name"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    recieverOrgId: {
      displayName: req.t("Delivery_Organization_ID"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    recieverOrgLocation: {
      displayName: req.t("Delivery_Organization_Location_Details"),
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    status: {
      displayName: req.t("Status"),
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

async function buildPdfReport(req, res, data, orderType) {
  const rows = [];
  rows.push([
    { text: req.t("Order_ID"), bold: true },
    { text: req.t("Order_Created_By"), bold: true },
    { text: req.t("Creator_Org_Id"), bold: true },
    { text: req.t("Creator_Org_Name"), bold: true },
    { text: req.t("ORG_ID_-_Receiver"), bold: true },
    { text: req.t("Product_Category"), bold: true },
    { text: req.t("Product_Name"), bold: true },
    { text: req.t("Product_ID"), bold: true },
    { text: req.t("Quantity"), bold: true },
    { text: req.t("Manufacturer"), bold: true },
    { text: req.t("Delivery_Organization_Name"), bold: true },
    { text: req.t("Delivery_Organization_ID"), bold: true },
    { text: req.t("Delivery_Organization_Location_Details"), bold: true },
    { text: req.t("Status"), bold: true },
  ]);
  for (let i = 0; i < data.length; i++) {
    let OrgName = await OrganisationModel.findOne({
      id: data[i].supplierOrgId,
    });
    OrgName = OrgName?.name;
    rows.push([
      data[i].id || "N/A",
      data[i].createdBy || "N/A",
      data[i].supplierOrgId || "N/A",
      OrgName || "N/A",
      data[i].orderReceiverOrg || "N/A",
      data[i].productCategory || "N/A",
      data[i].productName || "N/A",
      data[i].productId || "N/A",
      data[i].productQuantity || "N/A",
      data[i].manufacturer || "N/A",
      data[i].recieverOrgName || "N/A",
      data[i].recieverOrgId || "N/A",
      data[i].recieverOrgLocation || "N/A",
      data[i].status || "N/A",
    ]);
  }

  const docDefinition = {
    pageSize: "A3",
    pageOrientation: "landscape",
    content: [
      {
        text: req.t(`${orderType}_Purchase_order`),
        fontSize: 34,
        style: "header",
      },
      {
        table: {
          headerRows: 1,
          headerStyle: "header",
          widths: [70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
          body: rows,
        },
      },
    ],
    styles: {
      header: {
        bold: true,
        margin: [10, 10, 10, 10],
      },
    },
  };

  const options = { fontLayoutCache: true };
  const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  let temp123;
  const pdfFile = pdfDoc.pipe((temp123 = fs.createWriteStream("./output.pdf")));
  const path = pdfFile.path;
  pdfDoc.end();
  temp123.on("finish", async function () {
    return res.sendFile(resolve(path));
  });
  return;
}
