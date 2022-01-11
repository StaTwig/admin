const apiResponse = require("../helpers/apiResponse");
const date = require("date-and-time");
require("dotenv").config();
const auth = require("../middlewares/jwt");
const ShipmentModel = require("../models/ShipmentModel");
const RecordModel = require("../models/RecordModel");
const RequestModel = require("../models/RequestModel");
const WarehouseModel = require("../models/WarehouseModel");
const InventoryModel = require("../models/InventoryModel");
const EmployeeModel = require("../models/EmployeeModel");
const ConfigurationModel = require("../models/ConfigurationModel");
const OrganisationModel = require("../models/OrganisationModel");
const CounterModel = require("../models/CounterModel");
const ProductModel = require("../models/ProductModel");
const AtomModel = require("../models/AtomModel");
const Event = require("../models/EventModal");
const Record = require("../models/RecordModel");
const moment = require("moment");
const CENTRAL_AUTHORITY_ID = null;
const CENTRAL_AUTHORITY_NAME = null;
const CENTRAL_AUTHORITY_ADDRESS = null;
const checkPermissions =
  require("../middlewares/rbac_middleware").checkPermissions;
const logEvent = require("../../../utils/event_logger");
const hf_blockchain_url = process.env.HF_BLOCKCHAIN_URL;
const axios = require("axios");
const { uploadFile, getFileStream } = require("../helpers/s3");
const fs = require("fs");
const util = require("util");
const cuid = require("cuid");
const unlinkFile = util.promisify(fs.unlink);
const excel = require("node-excel-export");
const { resolve } = require("path");
const PdfPrinter = require("pdfmake");
const { asyncForEach } = require("../helpers/utility");
const fontDescriptors = {
  Roboto: {
    normal: resolve("./controllers/Roboto-Regular.ttf"),
    bold: resolve("./controllers/Roboto-Medium.ttf"),
    italics: resolve("./controllers/Roboto-Italic.ttf"),
    bolditalics: resolve("./controllers/Roboto-MediumItalic.ttf"),
  },
};
const printer = new PdfPrinter(fontDescriptors);
async function inventoryUpdate(
  id,
  quantity,
  suppId,
  recvId,
  poId,
  shipmentStatus
) {
  if (shipmentStatus == "CREATED") {
    await InventoryModel.updateOne(
      {
        id: suppId,
        "inventoryDetails.productId": id,
      },
      {
        $inc: {
          "inventoryDetails.$.quantity": -quantity,
        },
      }
    );
    await InventoryModel.updateOne(
      {
        id: suppId,
        "inventoryDetails.productId": id,
      },
      {
        $inc: {
          "inventoryDetails.$.quantityInTransit": parseInt(quantity),
        },
      }
    );
  }
  const checkProduct = await InventoryModel.find({
    $and: [{ id: recvId }, { "inventoryDetails.productId": id }],
  });
  if (shipmentStatus == "RECEIVED" && checkProduct != "") {
    await InventoryModel.updateOne(
      {
        id: recvId,
        "inventoryDetails.productId": id,
      },
      {
        $inc: {
          "inventoryDetails.$.quantity": quantity,
        },
      }
    );
    await InventoryModel.updateOne(
      {
        id: suppId,
        "inventoryDetails.productId": id,
      },
      {
        $inc: {
          "inventoryDetails.$.quantityInTransit": -quantity,
        },
      }
    );
  } else if (shipmentStatus == "RECEIVED" && checkProduct == "") {
    await InventoryModel.updateOne(
      { id: recvId },
      { $addToSet: { inventoryDetails: { productId: id, quantity: quantity } } }
    );
    await InventoryModel.updateOne(
      {
        id: suppId,
        "inventoryDetails.productId": id,
      },
      {
        $inc: {
          "inventoryDetails.$.quantityInTransit": -quantity,
        },
      }
    );
  }
}

async function poUpdate(id, quantity, poId, shipmentStatus, actor) {
  try {
    const event = await Event.findOne({ "payloadData.data.order_id": poId });
    const event_data = {
      eventID: cuid(),
      eventTime: new Date().toISOString(),
      transactionId: poId,
      actorWarehouseId: actor.warehouseId,
      eventType: {
        primary: "UPDATE",
        description: "ORDER",
      },
      actor: {
        actorid: actor.id,
        actoruserid: actor.emailId,
      },
      stackholders: {
        ca: {
          id: null,
          name: null,
          address: null,
        },
        actororg: {
          id: actor.organisationId,
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
        data: event.payloadData || null,
      },
    };
    await logEvent(event_data);
    if (shipmentStatus == "CREATED") {
      await RecordModel.updateOne(
        {
          id: poId,
          "products.productId": id,
        },
        {
          $inc: {
            "products.$.productQuantityShipped": parseInt(quantity, 10),
          },
        }
      );
    }
    if (shipmentStatus == "RECEIVED") {
      await RecordModel.updateOne(
        {
          id: poId,
          "products.productId": id,
        },
        {
          $inc: {
            "products.$.productQuantityShipped": -quantity,
          },
        }
      );
      await RecordModel.updateOne(
        {
          id: poId,
          "products.productId": id,
        },
        {
          $inc: {
            "products.$.productQuantityDelivered": quantity,
          },
        }
      );
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const shipmentUpdate = async (id, quantity, shipmentId) => {
  await ShipmentModel.updateOne(
    {
      id: shipmentId,
      "products.productID": id,
    },
    {
      $inc: {
        "products.$.productQuantityDelivered": quantity,
      },
    }
  );
};

async function userShipments(mode, warehouseId, skip, limit) {
  const matchCondition = {};
  let criteria;
  if (mode != "id") criteria = mode + ".locationId";
  else criteria = mode;
  matchCondition[criteria] = warehouseId;
  const shipments = await ShipmentModel.aggregate([
    {
      $match: matchCondition,
    },
    {
      $lookup: {
        from: "warehouses",
        localField: "supplier.locationId",
        foreignField: "id",
        as: "supplier.warehouse",
      },
    },
    {
      $unwind: {
        path: "$supplier.warehouse",
      },
    },
    {
      $lookup: {
        from: "organisations",
        localField: "supplier.warehouse.organisationId",
        foreignField: "id",
        as: "supplier.org",
      },
    },
    {
      $unwind: {
        path: "$supplier.org",
      },
    },
    {
      $lookup: {
        from: "warehouses",
        localField: "receiver.locationId",
        foreignField: "id",
        as: "receiver.warehouse",
      },
    },
    {
      $unwind: {
        path: "$receiver.warehouse",
      },
    },
    {
      $lookup: {
        from: "organisations",
        localField: "receiver.warehouse.organisationId",
        foreignField: "id",
        as: "receiver.org",
      },
    },
    {
      $unwind: {
        path: "$receiver.org",
      },
    },
  ])
    .sort({
      createdAt: -1,
    })
    .skip(parseInt(skip))

    .limit(parseInt(limit));
  return shipments;
}

async function taggedShipmentUpdate(id, quantity, shipmentId) {
  await ShipmentModel.updateOne(
    {
      id: shipmentId,
      "products.productID": id,
    },
    {
      $inc: {
        "products.$.productQuantityTaggedSent": quantity,
      },
    }
  );
}

exports.createShipment = [
  auth,
  async (req, res) => {
    try {
      let data = req.body;
      data.originalReceiver = data.receiver;
      if (req.body.shippingDate.includes("/")) {
        var shipmentData = req.body.shippingDate.split("/");
        const shippingDate =
          shipmentData[2] +
          "-" +
          shipmentData[1] +
          "-" +
          shipmentData[0] +
          "T00:00:00.000Z";
        data.shippingDate = shippingDate;
      }
      data.shippingDate = new Date(data.shippingDate);
      data.products.forEach(async (element) => {
        var product = await ProductModel.findOne({ id: element.productID });
        element.type = product.type;
        element.unitofMeasure = product.unitofMeasure;
        console.log(product);
      });
      const shipmentCounter = await CounterModel.findOneAndUpdate(
        {
          "counters.name": "shipmentId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        },
        {
          new: true,
        }
      ).select({ counters: { $elemMatch: { name: "shipmentId" } } });
      const shipmentId =
        shipmentCounter.counters[0].format + shipmentCounter.counters[0].value;
      data.id = shipmentId;
      const email = req.user.emailId;
      const user_id = req.user.id;
      const empData = await EmployeeModel.findOne({
        emailId: req.user.emailId,
      });
      if (empData == null) {
        return apiResponse.ErrorResponse(res, "Email is not found");
      }
      const orgId = empData.organisationId;
      const orgName = empData.name;
      const orgData = await OrganisationModel.findOne({ id: orgId });
      if (orgData == null) {
        return apiResponse.ErrorResponse(res, "orgData is not found");
      }
      const address = orgData.postalAddress;
      const confId = orgData.configuration_id;
      const confData = await ConfigurationModel.findOne({ id: confId });
      if (confData == null) {
        return apiResponse.ErrorResponse(res, "Configuration is not found");
      }
      const process = confData.process;
      const supplierID = req.body.supplier.id;
      const supplierOrgData = await OrganisationModel.findOne({
        id: req.body.supplier.id,
      });
      if (supplierOrgData == null) {
        console.log("Supplier not defined");
        return apiResponse.ErrorResponse(res, "Supplier  not defined");
      }

      const receiverOrgData = await OrganisationModel.findOne({
        id: req.body.receiver.id,
      });
      if (receiverOrgData == null) {
        return apiResponse.ErrorResponse(res, "Receiver not defined");
      }

      const supplierName = supplierOrgData.name;
      const supplierAddress = supplierOrgData.postalAddress;
      const receiverId = req.body.receiver.id;
      const receiverName = receiverOrgData.name;
      const receiverAddress = receiverOrgData.postalAddress;
      var flag = "Y";
      //if (data.shippingOrderId === null || data.poId === null) {
      if (data.poId === null) {
        if (process == true) {
          flag = "YS";
        } else {
          flag = "N";
        }
      }

      if (flag == "Y") {
        const po = await RecordModel.findOne({
          id: data.poId,
        });
        if (po == null) {
          return apiResponse.ErrorResponse(res, "Order ID  not defined");
        }
        let quantityMismatch = false;
        po.products.every((product) => {
          data.products.every((p) => {
            const po_product_quantity =
              product.productQuantity || product.quantity;
            const alreadyShipped = product.productQuantityShipped || null;
            let shipment_product_qty;
            if (alreadyShipped) {
              console.log(
                "values are" + parseInt(p.productQuantity),
                parseInt(alreadyShipped)
              );
              shipment_product_qty =
                parseInt(p.productQuantity) + parseInt(alreadyShipped);
            } else {
              shipment_product_qty = p.productQuantity;
            }

            console.log(
              po_product_quantity,
              shipment_product_qty,
              alreadyShipped
            );
            if (
              parseInt(shipment_product_qty, 10) <
              parseInt(po_product_quantity, 10)
            ) {
              quantityMismatch = true;
              console.log("quantityMismatch is ", quantityMismatch);
              return false;
            }
          });
        });

        if (quantityMismatch) {
          if (po.poStatus === "CREATED" || po.poStatus === "ACCEPTED") {
            try {
              let date = new Date(po.createdAt);
              let milliseconds = date.getTime();
              let d = new Date();
              let currentTime = d.getTime();
              let orderProcessingTime = currentTime - milliseconds;
              let prevOrderCount = await OrganisationModel.find({
                id: req.user.organisationId,
              });
              prevOrderCount = prevOrderCount.totalProcessingTime
                ? prevOrderCount.totalProcessingTime
                : 0;
              OrganisationModel.updateOne(
                { id: req.user.organisationId },
                {
                  $set: {
                    totalProcessingTime: prevOrderCount + orderProcessingTime,
                  },
                }
              );
            } catch (err) {
              console.log("failed to set ORDER PROCESSING TIME");
              console.log(err);
            }
          }
          po.poStatus = "TRANSIT&PARTIALLYFULFILLED";
        } else {
          if (po.poStatus === "CREATED" || po.poStatus === "ACCEPTED") {
            try {
              let date = new Date(po.createdAt);
              let milliseconds = date.getTime();
              let d = new Date();
              let currentTime = d.getTime();
              let orderProcessingTime = currentTime - milliseconds;
              let prevOrderCount = await OrganisationModel.find({
                id: req.user.organisationId,
              });
              prevOrderCount = prevOrderCount.totalProcessingTime
                ? prevOrderCount.totalProcessingTime
                : 0;
              OrganisationModel.updateOne(
                { id: req.user.organisationId },
                {
                  $set: {
                    totalProcessingTime: prevOrderCount + orderProcessingTime,
                  },
                }
              );
            } catch (err) {
              console.log("failed to set orderpror");
              console.log(err);
            }
          }
          po.poStatus = "TRANSIT&FULLYFULFILLED";
        }
        await po.save();
        const poidupdate = await RecordModel.findOneAndUpdate(
          {
            id: data.poId,
          },
          {
            $push: {
              shipments: data.id,
            },
          }
        );
        if (poidupdate == null) {
          return apiResponse.ErrorResponse(res, "Product not Updated");
        }
      }
      if (flag != "N") {
        const suppWarehouseDetails = await WarehouseModel.findOne({
          id: data.supplier.locationId,
        });
        if (suppWarehouseDetails == null) {
          return apiResponse.ErrorResponse(
            res,
            "suppWarehouseDetails not Found"
          );
        }
        var suppInventoryId = suppWarehouseDetails.warehouseInventory;
        const suppInventoryDetails = await InventoryModel.findOne({
          id: suppInventoryId,
        });
        if (suppInventoryDetails == null) {
          return apiResponse.ErrorResponse(
            res,
            "suppInventoryDetails not Found"
          );
        }
        const recvWarehouseDetails = await WarehouseModel.findOne({
          id: data.receiver.locationId,
        });
        if (recvWarehouseDetails == null) {
          return apiResponse.ErrorResponse(
            res,
            "recvWarehouseDetails not Found"
          );
        }
        var recvInventoryId = recvWarehouseDetails.warehouseInventory;
        const recvInventoryDetails = await InventoryModel.findOne({
          id: recvInventoryId,
        });
        if (recvInventoryDetails == null) {
          return apiResponse.ErrorResponse(
            res,
            "recvInventoryDetails not Found"
          );
        }
        var products = data.products;
        for (let count = 0; count < products.length; count++) {
          data.products[count]["productId"] = data.products[count].productID;
          await inventoryUpdate(
            products[count].productID,
            products[count].productQuantity,
            suppInventoryId,
            recvInventoryId,
            data.poId,
            "CREATED"
          );
          if (flag == "Y")
            await poUpdate(
              products[count].productId,
              products[count].productQuantity,
              data.poId,
              "CREATED",
              req.user
            );
          //Case - create shipment with Batch Number
          if (products[count].batchNumber != null) {
            await AtomModel.updateOne(
              {
                batchNumbers: products[count].batchNumber,
                inventoryIds: suppInventoryId,
              },
              {
                $inc: {
                  quantity: -parseInt(products[count].productQuantity),
                },
              }
            );
          } else if (products[count].serialNumber != null) {
            const serialNumbers = product.serialNumbersRange.split("-");
            let atomsArray = [];
            if (serialNumbers.length > 1) {
              const serialNumbersFrom = parseInt(
                serialNumbers[0].split(/(\d+)/)[1]
              );
              const serialNumbersTo = parseInt(
                serialNumbers[1].split(/(\d+)/)[1]
              );

              const serialNumberText = serialNumbers[1].split(/(\d+)/)[0];
              for (let i = serialNumbersFrom; i <= serialNumbersTo; i++) {
                const updateAtoms = await AtomModel.findOneAndUpdate(
                  {
                    id: `${serialNumberText}${i}`,
                    inventoryIds: suppInventoryId,
                  },
                  {
                    $set: {
                      "inventoryIds.$": recvInventoryId,
                    },
                  }
                );
                atomsArray.push(updateAtoms);
              }
            }
          }
        }
        const currDateTime = date.format(new Date(), "DD/MM/YYYY HH:mm");
        const updates = {
          updatedOn: currDateTime,
          status: "CREATED",
          products: products,
        };
        data.shipmentUpdates = updates;
        const event_data = {
          eventID: cuid(),
          eventTime: new Date().toISOString(),
          eventType: {
            primary: "CREATE",
            description: "SHIPMENT",
          },
          transactionId: data.id,
          actor: {
            actorid: user_id,
            actoruserid: email,
          },
          actorWarehouseId: req.user.warehouseId || null,
          stackholders: {
            ca: {
              id: CENTRAL_AUTHORITY_ID || null,
              name: CENTRAL_AUTHORITY_NAME || null,
              address: CENTRAL_AUTHORITY_NAME || null,
            },
            actororg: {
              id: orgId,
              name: orgName,
              address: address,
            },
            secondorg: {
              id: null,
              name: null,
              address: null,
            },
          },
          payload: {
            data: data,
          },
        };
        if (orgId === supplierID) {
          event_data.stackholders.secondorg.id = receiverId || null;
          event_data.stackholders.secondorg.name = receiverName || null;
          event_data.stackholders.secondorg.address = receiverAddress || null;
        } else {
          event_data.stackholders.secondorg.id = supplierID || null;
          event_data.stackholders.secondorg.name = supplierName || null;
          event_data.stackholders.secondorg.address = supplierAddress || null;
        }
        const shipment = new ShipmentModel(data);
        const result = await shipment.save();
        if (result == null) {
          return apiResponse.ErrorResponse(res, "Shipment Not saved");
        }

        //Blockchain Integration
        const bc_data = {
          Id: data.id,
          CreatedOn: "",
          CreatedBy: "",
          IsDelete: true,
          ShippingOrderId: "",
          PoId: "",
          Label: JSON.stringify(data.label),
          ExternalShipping: "",
          Supplier: JSON.stringify(data.supplier),
          Receiver: JSON.stringify(data.receiver),
          ImageDetails: "",
          TaggedShipments: JSON.stringify(data.taggedShipments),
          TaggedShipmentsOutward: "",
          ShipmentUpdates: JSON.stringify(data.shipmentUpdates),
          AirwayBillNo: data.airWayBillNo,
          ShippingDate: data.shippingDate,
          ExpectedDelDate: data.expectedDeliveryDate,
          ActualDelDate: data.actualDeliveryDate,
          Status: data.status,
          TransactionIds: "",
          RejectionRate: "",
          Products: JSON.stringify(data.products),
          Misc: "",
        };

        const token =
          req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

        await axios.post(
          `${hf_blockchain_url}/api/v1/transactionapi/shipment/create`,
          bc_data,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (data.taggedShipments) {
          const prevTaggedShipments = await ShipmentModel.findOne(
            {
              id: data.taggedShipments,
            },
            {
              _id: 0,
              taggedShipments: 1,
              products: 1,
            }
          );
          let quantityMismatch = false;
          prevTaggedShipments.products.every((product) => {
            products.every((p) => {
              const shipment_product_quantity =
                product.productQuantity - product.productQuantityTaggedSent;
              const tagged_product_qty = p.productQuantity || p.quantity;
              if (
                parseInt(tagged_product_qty) <=
                parseInt(shipment_product_quantity)
              ) {
                quantityMismatch = true;
                return false;
              }
            });
          });

          if (!quantityMismatch)
            throw new Error("Tagged product quantity not available");
          await ShipmentModel.findOneAndUpdate(
            {
              id: shipmentId,
            },
            {
              $push: {
                taggedShipments: prevTaggedShipments.taggedShipments,
              },
            }
          );

          for (let count = 0; count < products.length; count++) {
            taggedShipmentUpdate(
              products[count].productId,
              products[count].productQuantity,
              data.taggedShipments
            );
          }
        }
        await logEvent(event_data);
        return apiResponse.successResponseWithData(
          res,
          "Shipment Created Successfully",
          result
        );
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.newShipment = [
  auth,
  async (req, res) => {
    try {
      let data = req.body;
      data.originalReceiver = data.receiver;
      if (req.body.shippingDate.includes("/")) {
        var shipmentData = req.body.shippingDate.split("/");
        const shippingDate =
          shipmentData[2] +
          "-" +
          shipmentData[1] +
          "-" +
          shipmentData[0] +
          "T00:00:00.000Z";
        data.shippingDate = shippingDate;
      }
      data.shippingDate = new Date(data.shippingDate);
      const shipmentCounter = await CounterModel.findOneAndUpdate(
        {
          "counters.name": "shipmentId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        },
        {
          new: true,
        }
      ).select({ counters: { $elemMatch: { name: "shipmentId" } } });
      const shipmentId =
        shipmentCounter.counters[0].format + shipmentCounter.counters[0].value;
      data.id = shipmentId;

      const currDateTime = date.format(new Date(), "DD/MM/YYYY HH:mm");
      const updates = {
        updatedOn: currDateTime,
        status: "CREATED",
        products: data.products,
      };
      data.shipmentUpdates = updates;
      data.isCustom
        ? (data.vehicleId = data.airWayBillNo)
        : (data.vehicleId = null);
      const shipment = new ShipmentModel(data);
      const result = await shipment.save();
      if (result == null) {
        return apiResponse.ErrorResponse(res, "Shipment Not saved");
      }

      //Blockchain Integration
      const bc_data = {
        Id: data.id,
        CreatedOn: "",
        CreatedBy: "",
        IsDelete: true,
        ShippingOrderId: "",
        PoId: "",
        Label: JSON.stringify(data.label),
        ExternalShipping: "",
        Supplier: JSON.stringify(data.supplier),
        Receiver: JSON.stringify(data.receiver),
        ImageDetails: "",
        TaggedShipments: JSON.stringify(data.taggedShipments),
        TaggedShipmentsOutward: "",
        ShipmentUpdates: JSON.stringify(data.shipmentUpdates),
        AirwayBillNo: data.airWayBillNo,
        ShippingDate: data.shippingDate,
        ExpectedDelDate: data.expectedDeliveryDate,
        ActualDelDate: data.actualDeliveryDate,
        Status: data.status,
        TransactionIds: "",
        RejectionRate: "",
        Products: JSON.stringify(data.products),
        Misc: "",
      };
      const token =
        req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
      await axios.post(
        `${hf_blockchain_url}/api/v1/transactionapi/shipment/create`,
        bc_data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return apiResponse.successResponseWithData(
        res,
        "Shipment Created Successfully",
        result
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.receiveShipment = [
  auth,
  async (req, res) => {
    try {
      let locationMatch = false;
      let permission = false;
      const { role, warehouseId, organisationId, id } = req.user;
      const receiver = await ShipmentModel.findOne({
        id: req.body.id,
      }).select("receiver");
      if (
        receiver.receiver.id == organisationId &&
        receiver.receiver.locationId == warehouseId
      ) {
        locationMatch = true;
      }
      const permission_request = {
        role: role,
        permissionRequired: ["receiveShipment"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          permission = true;
        }
      });
      if (locationMatch == false) {
        const request = await RequestModel.findOne({
          "from.id": id,
          shipmentId: req.body.id,
          type: { $in: ["LOCATION_MISMATCH", "ORGANISATION_MISMATCH"] },
        });
        if (request != null && request.status == "ACCEPTED") {
          locationMatch = true;
        }
      }
      if (permission == false) {
        const request = await RequestModel.findOne({
          "from.id": id,
          shipmentId: req.body.id,
          type: { $in: ["UNSUFFICIENT_ROLE"] },
        });
        if (request != null && request.status == "ACCEPTED") {
          permission = true;
        }
      }
      if ((permission && locationMatch) == true) {
        const data = req.body;
        const shipmentID = data.id;
        const shipmentInfo = await ShipmentModel.find({ id: shipmentID });

        const email = req.user.emailId;
        const user_id = req.user.id;
        const empData = await EmployeeModel.findOne({
          emailId: req.user.emailId,
        });
        const orgId = empData.organisationId;
        const orgName = empData.name;
        const orgData = await OrganisationModel.findOne({ id: orgId });
        const address = orgData.postalAddress;
        const supplierID = req.body.supplier.id;
        const receiverId = req.body.receiver.id;
        let supplierName = "";
        let supplierAddress = "";
        let receiverName = "";
        let receiverAddress = "";
        if (supplierID) {
          const supplierOrgData = await OrganisationModel.findOne({
            id: req.body.supplier.id,
          });
          supplierName = supplierOrgData.name;
          supplierAddress = supplierOrgData.postalAddress;
        }

        if (receiverId) {
          const receiverOrgData = await OrganisationModel.findOne({
            id: req.body.receiver.id,
          });
          receiverName = receiverOrgData.name;
          receiverAddress = receiverOrgData.postalAddress;
        }

        var actuallyShippedQuantity = 0;
        var productNumber = -1;
        if (shipmentInfo != null) {
          const receivedProducts = data.products;
          var shipmentProducts = shipmentInfo[0].products;
          shipmentProducts.forEach((product) => {
            productNumber = productNumber + 1;
            receivedProducts.forEach((reqProduct) => {
              if (product.productID === reqProduct.productID) {
                actuallyShippedQuantity = product.productQuantity;
                var receivedQuantity = reqProduct.productQuantity;

                if (receivedQuantity > actuallyShippedQuantity)
                  throw new Error(
                    "Received quantity cannot be greater than Actual quantity"
                  );

                var quantityDifference =
                  actuallyShippedQuantity - receivedQuantity;
                var rejectionRate =
                  (quantityDifference / actuallyShippedQuantity) * 100;
                shipmentProducts[productNumber].quantityDelivered =
                  receivedQuantity;
                shipmentProducts[productNumber].rejectionRate = rejectionRate;
                ShipmentModel.updateOne(
                  {
                    id: shipmentID,
                    "products.productID": product.productID,
                  },
                  {
                    $set: {
                      "products.$.rejectionRate": rejectionRate,
                    },
                  }
                )
                  .then((e) => {
                    console.log(e);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          });
        }
        var flag = "Y";
        if (data.poId === null) {
          flag = "YS";
        }

        if (flag == "Y") {
          const po = await RecordModel.findOne({
            id: data.poId,
          });
          let quantityMismatch = false;
          po.products.every((product) => {
            data.products.every((p) => {
              const po_product_quantity =
                product.productQuantity || product.quantity;
              let shipment_product_qty = 0;
              if (product.productQuantityDelivered)
                shipment_product_qty =
                  parseInt(product.productQuantityDelivered, 10) +
                  parseInt(p.productQuantity, 10);
              else shipment_product_qty = p.productQuantity;

              if (
                parseInt(shipment_product_qty) < parseInt(po_product_quantity)
              ) {
                quantityMismatch = true;
                return false;
              }
            });
          });
          if (quantityMismatch) {
            po.poStatus = "PARTIALLYFULFILLED";
            await po.save();
          } else {
            po.poStatus = "FULLYFULFILLED";
            await po.save();
          }
        }
        if (flag != "N") {
          const suppWarehouseDetails = await WarehouseModel.findOne({
            id: data.supplier.locationId,
          });
          var suppInventoryId = suppWarehouseDetails.warehouseInventory;
          const recvWarehouseDetails = await WarehouseModel.findOne({
            id: data.receiver.locationId,
          });
          var recvInventoryId = recvWarehouseDetails.warehouseInventory;
          var products = data.products;
          var count = 0;
          var totalProducts = 0;
          var totalReturns = 0;
          var shipmentRejectionRate = 0;
          for (count = 0; count < products.length; count++) {
            var shipmentProducts = shipmentInfo[0].products;
            totalProducts =
              totalProducts + shipmentProducts[count].productQuantity;
            totalReturns = totalReturns + products[count].productQuantity;
            shipmentRejectionRate =
              ((totalProducts - totalReturns) / totalProducts) * 100;
            data.products[count]["productId"] = data.products[count].productID;
            await inventoryUpdate(
              products[count].productID,
              products[count].productQuantity,
              suppInventoryId,
              recvInventoryId,
              data.poId,
              "RECEIVED"
            );
            shipmentUpdate(
              products[count].productID,
              products[count].productQuantity,
              data.id,
              "RECEIVED"
            );
            if (flag == "Y")
              await poUpdate(
                products[count].productId,
                products[count].productQuantity,
                data.poId,
                "RECEIVED",
                req.user
              );

            if (products[count].batchNumber != null) {
              const checkBatch = await AtomModel.find({
                $and: [
                  { inventoryIds: recvInventoryId },
                  { batchNumbers: products[count].batchNumber },
                ],
              });

              if (checkBatch.length > 0) {
                const update = await AtomModel.update(
                  {
                    batchNumbers: products[count].batchNumber,
                    inventoryIds: recvInventoryId,
                  },
                  {
                    $inc: {
                      quantity: parseInt(products[count].productQuantity),
                    },
                  }
                );
              } else {
                const atom = new AtomModel({
                  id: "batch-" + cuid(),
                  label: {
                    labelId: "QR_2D",
                    labelType: "3232", // ?? What is this ??
                  },
                  quantity: products[count].productQuantity,
                  productId: products[count].productID,
                  inventoryIds: recvInventoryId,
                  lastInventoryId: "",
                  lastShipmentId: "",
                  poIds: [],
                  shipmentIds: [],
                  txIds: [],
                  batchNumbers: products[count].batchNumber,
                  atomStatus: "Healthy",
                  attributeSet: {
                    mfgDate: products[count].mfgDate,
                    expDate: products[count].batchNumber.expDate,
                  },
                  eolInfo: {
                    eolId: "IDN29402-23423-23423",
                    eolDate: "2021-03-31T18:30:00.000Z",
                    eolBy: req.user.id,
                    eolUserInfo: "",
                  },
                });
                await atom.save();
              }
            }
          }

          const currDateTime = date.format(new Date(), "DD/MM/YYYY HH:mm");
          const updates = {
            updatedOn: currDateTime,
            updateComment: data.comment,
            status: "RECEIVED",
            products: products,
          };

          const updateData = await ShipmentModel.findOneAndUpdate(
            { id: req.body.id },
            {
              $push: { shipmentUpdates: updates },
              $set: {
                status: "RECEIVED",
                rejectionRate: shipmentRejectionRate,
              },
            },
            { new: true }
          );

          //await ShipmentModel.findOneAndUpdate({
          //  id: data.id
          //}, {
          //  status: "RECEIVED"
          //}, );
          const shipmentData = await ShipmentModel.findOne({
            id: req.body.id,
          });

          const bc_data = {
            Id: shipmentData.id,
            CreatedOn: "",
            CreatedBy: "",
            IsDelete: true,
            ShippingOrderId: "",
            PoId: "",
            Label: JSON.stringify(shipmentData.label),
            ExternalShipping: "",
            Supplier: JSON.stringify(shipmentData.supplier),
            Receiver: JSON.stringify(shipmentData.receiver),
            ImageDetails: "",
            TaggedShipments: "",
            ShipmentUpdates: JSON.stringify(shipmentData.shipmentUpdates),
            AirwayBillNo: shipmentData.airWayBillNo,
            ShippingDate: shipmentData.shippingDate,
            ExpectedDelDate: shipmentData.expectedDeliveryDate,
            ActualDelDate: shipmentData.actualDeliveryDate,
            Status: shipmentData.status,
            TransactionIds: "",
            RejectionRate: "",
            Products: JSON.stringify(shipmentData.products),
            Misc: "",
          };
          const token =
            req.headers["x-access-token"] || req.headers["authorization"];
          await axios.put(
            `${hf_blockchain_url}/api/v1/transactionapi/shipment/update`,
            bc_data,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const event_data = {
            eventID: cuid(),
            eventTime: new Date().toISOString(),
            eventType: {
              primary: "RECEIVE",
              description: "SHIPMENT",
            },
            transactionId: data.id,
            actor: {
              actorid: user_id || null,
              actoruserid: email || null,
            },
            actorWarehouseId: req.user.warehouseId || null,
            stackholders: {
              ca: {
                id: CENTRAL_AUTHORITY_ID || null,
                name: CENTRAL_AUTHORITY_NAME || null,
                address: CENTRAL_AUTHORITY_ADDRESS || null,
              },
              actororg: {
                id: orgId || null,
                name: orgName || null,
                address: address || null,
              },
              secondorg: {
                id: null,
                name: null,
                address: null,
              },
            },
            payload: {
              data: data,
            },
          };
          if (orgId === supplierID) {
            event_data.stackholders.secondorg.id = receiverId || null;
            event_data.stackholders.secondorg.name = receiverName || null;
            event_data.stackholders.secondorg.address = receiverAddress || null;
          } else {
            event_data.stackholders.secondorg.id = supplierID || null;
            event_data.stackholders.secondorg.name = supplierName || null;
            event_data.stackholders.secondorg.address = supplierAddress || null;
          }
          await logEvent(event_data);

          return apiResponse.successResponseWithData(
            res,
            "Shipment Received",
            updateData
          );
        } else {
          return apiResponse.successResponse(
            res,
            "Cannot receive  a Shipment without SO and PO"
          );
        }
      } else {
        return apiResponse.forbiddenResponse(res, "Access denied");
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

function getFilterConditions(filters) {
  let matchCondition = {};
  if (filters.orgType && filters.orgType !== "") {
    if (
      filters.orgType === "BREWERY" ||
      filters.orgType === "S1" ||
      filters.orgType === "S2" ||
      filters.orgType === "S3"
    ) {
      matchCondition.type = filters.orgType;
    } else if (filters.orgType === "ALL_VENDORS") {
      matchCondition.$or = [{ type: "S1" }, { type: "S2" }, { type: "S3" }];
    }
  }

  if (filters.state && filters.state.length) {
    matchCondition.state = filters.state;
  }
  if (filters.district && filters.district.length) {
    matchCondition.district = filters.district;
  }
  if (filters.organization && filters.organization.length) {
    matchCondition.id = filters.organization;
  }
  return matchCondition;
}

function matchConditionShipment(filters) {
  let matchCondition = { $and: [] };
  if (filters.orgType && filters.orgType !== "") {
    if (
      filters.orgType === "BREWERY" ||
      filters.orgType === "S1" ||
      filters.orgType === "S2" ||
      filters.orgType === "S3"
    ) {
      matchCondition.$and.push({
        $or: [
          { "supplier.org.type": filters.orgType },
          { "receiver.org.type": filters.orgType },
        ],
      });
    } else if (filters.orgType === "ALL_VENDORS") {
      matchCondition.$and.push({
        $or: [
          { "supplier.org.type": "S1" },
          { "supplier.org.type": "S2" },
          { "supplier.org.type": "S3" },
          { "receiver.org.type": "S1" },
          { "receiver.org.type": "S2" },
          { "receiver.org.type": "S3" },
        ],
      });
    }
  }

  if (filters.state && filters.state.length) {
    matchCondition.$and.push({
      $or: [
        {
          "supplier.warehouse.warehouseAddress.state":
            filters.state.toUpperCase(),
        },
        {
          "receiver.warehouse.warehouseAddress.state":
            filters.state.toUpperCase(),
        },
      ],
    });
  }
  if (filters.district && filters.district.length) {
    matchCondition.$and.push({
      $or: [
        {
          "supplier.warehouse.warehouseAddress.city":
            filters.district.toUpperCase(),
        },
        {
          "receiver.warehouse.warehouseAddress.city":
            filters.district.toUpperCase(),
        },
      ],
    });
  }

  return matchCondition;
}

function getShipmentFilterCondition(filters, warehouseIds) {
  let matchCondition = {};
  if (filters.organization && filters.organization !== "") {
    if (filters.txn_type === "ALL") {
      matchCondition.$or = [
        {
          "supplier.id": filters.organization,
        },
        {
          "receiver.id": filters.organization,
        },
      ];
    } else if (filters.txn_type === "SENT") {
      matchCondition["supplier.id"] = filters.organization;
    } else if (filters.txn_type === "RECEIVED") {
      matchCondition["receiver.id"] = filters.organization;
    }
  }

  if (filters.txn_type && filters.txn_type !== "") {
    if (filters.txn_type === "SENT") {
      matchCondition.status = { $in: ["CREATED", "SENT"] };
    } else if (filters.txn_type === "RECEIVED") {
      matchCondition.status = "RECEIVED";
    }
  }

  if (filters.date_filter_type && filters.date_filter_type.length) {
    const DATE_FORMAT = "YYYY-MM-DD";
    if (filters.date_filter_type === "by_range") {
      let startDate = filters.start_date ? filters.start_date : new Date();
      let endDate = filters.end_date ? filters.end_date : new Date();
      matchCondition.createdAt = {
        $gte: new Date(`${startDate}T00:00:00.0Z`),
        $lt: new Date(`${endDate}T23:59:59.0Z`),
      };
    } else if (filters.date_filter_type === "by_monthly") {
      let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
      let startDateOfTheMonth = moment(startDateOfTheYear)
        .add(filters.month - 1, "months")
        .format(DATE_FORMAT);
      let endDateOfTheMonth = moment(startDateOfTheMonth)
        .endOf("month")
        .format(DATE_FORMAT);
      console.log(startDateOfTheMonth, endDateOfTheMonth);
      matchCondition.createdAt = {
        $gte: new Date(`${startDateOfTheMonth}T00:00:00.0Z`),
        $lte: new Date(`${endDateOfTheMonth}T23:59:59.0Z`),
      };
    } else if (filters.date_filter_type === "by_quarterly") {
      let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
      let startDateOfTheQuarter = moment(startDateOfTheYear)
        .quarter(filters.quarter)
        .startOf("quarter")
        .format(DATE_FORMAT);
      let endDateOfTheQuarter = moment(startDateOfTheYear)
        .quarter(filters.quarter)
        .endOf("quarter")
        .format(DATE_FORMAT);
      console.log(startDateOfTheQuarter, endDateOfTheQuarter);
      matchCondition.createdAt = {
        $gte: new Date(`${startDateOfTheQuarter}T00:00:00.0Z`),
        $lte: new Date(`${endDateOfTheQuarter}T23:59:59.0Z`),
      };
    } else if (filters.date_filter_type === "by_yearly") {
      const currentDate = moment().format(DATE_FORMAT);
      const currentYear = moment().year();

      let startDateOfTheYear = moment([filters.year]).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      let endDateOfTheYear = moment([filters.year])
        .endOf("year")
        .format("YYYY-MM-DDTHH:mm:ss");

      if (filters.year === currentYear) {
        endDateOfTheYear = currentDate;
      }
      console.log(startDateOfTheYear, endDateOfTheYear);
      matchCondition.createdAt = {
        $gte: new Date(startDateOfTheYear),
        $lte: new Date(endDateOfTheYear),
      };
    }
  }

  return matchCondition;
}

exports.fetchShipmentsForAbInBev = [
  auth,
  async (req, res) => {
    try {
      const { skip, limit } = req.query;
      // const { warehouseId } = req.user;
      const filters = req.query;
      try {
        // const warehouses = await OrganisationModel.aggregate([
        //   {
        //     $match: getFilterConditions(filters)
        //   },
        //   {
        //     $group: {
        //       _id: 'warehouses',
        //       warehouses: {
        //         $addToSet: '$warehouses'
        //       }
        //     }
        //   },
        //   {
        //     $unwind: {
        //       path: '$warehouses'
        //     }
        //   },
        //   {
        //     $unwind: {
        //       path: '$warehouses'
        //     }
        //   },
        //   {
        //     $group: {
        //       _id: 'warehouses',
        //       warehouseIds: {
        //         $addToSet: '$warehouses'
        //       }
        //     }
        //   }
        // ]);
        let warehouseIds = [];
        // if (warehouses[0] && warehouses[0].warehouseIds) {
        //   warehouseIds = warehouses[0].warehouseIds;
        // }
        const shipments = await ShipmentModel.aggregate([
          {
            $match: getShipmentFilterCondition(filters, warehouseIds),
          },
          {
            $lookup: {
              from: "warehouses",
              localField: "supplier.locationId",
              foreignField: "id",
              as: "supplier.warehouse",
            },
          },
          {
            $unwind: {
              path: "$supplier.warehouse",
            },
          },
          {
            $lookup: {
              from: "organisations",
              localField: "supplier.warehouse.organisationId",
              foreignField: "id",
              as: "supplier.org",
            },
          },
          {
            $unwind: {
              path: "$supplier.org",
            },
          },
          {
            $lookup: {
              from: "organisations",
              localField: "supplier.org.authority",
              foreignField: "id",
              as: "supplier.org.S1",
            },
          },
          {
            $unwind: {
              path: "$supplier.org.S1",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "warehouses",
              localField: "receiver.locationId",
              foreignField: "id",
              as: "receiver.warehouse",
            },
          },
          {
            $unwind: {
              path: "$receiver.warehouse",
            },
          },
          {
            $lookup: {
              from: "organisations",
              localField: "receiver.warehouse.organisationId",
              foreignField: "id",
              as: "receiver.org",
            },
          },
          {
            $unwind: {
              path: "$receiver.org",
            },
          },
          { $match: matchConditionShipment(filters) },
        ])
          .sort({
            createdAt: -1,
          })
          .skip(parseInt(skip))
          .limit(parseInt(limit));

        return apiResponse.successResponseWithMultipleData(
          res,
          "Shipments Table",
          shipments
        );
      } catch (err) {
        return apiResponse.ErrorResponse(res, err.message);
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchShipments = [
  auth,
  async (req, res) => {
    try {
      const { skip, limit } = req.query;
      const { warehouseId } = req.user;
      const outboundShipments = await userShipments(
        "supplier",
        warehouseId,
        skip,
        limit
      );
      const inboundShipments = await userShipments(
        "receiver",
        warehouseId,
        skip,
        limit
      );

      const shipments = await ShipmentModel.aggregate([
        {
          $match: {
            $or: [
              {
                "supplier.locationId": warehouseId,
              },
              {
                "receiver.locationId": warehouseId,
              },
            ],
          },
        },
        {
          $lookup: {
            from: "warehouses",
            localField: "supplier.locationId",
            foreignField: "id",
            as: "supplier.warehouse",
          },
        },
        {
          $unwind: {
            path: "$supplier.warehouse",
          },
        },
        {
          $lookup: {
            from: "organisations",
            localField: "supplier.warehouse.organisationId",
            foreignField: "id",
            as: "supplier.org",
          },
        },
        {
          $unwind: {
            path: "$supplier.org",
          },
        },
        {
          $lookup: {
            from: "warehouses",
            localField: "receiver.locationId",
            foreignField: "id",
            as: "receiver.warehouse",
          },
        },
        {
          $unwind: {
            path: "$receiver.warehouse",
          },
        },
        {
          $lookup: {
            from: "organisations",
            localField: "receiver.warehouse.organisationId",
            foreignField: "id",
            as: "receiver.org",
          },
        },
        {
          $unwind: {
            path: "$receiver.org",
          },
        },
      ])
        .sort({
          createdAt: -1,
        })
        .skip(parseInt(skip))
        .limit(parseInt(limit));

      return apiResponse.successResponseWithMultipleData(
        res,
        "Shipments Table",
        shipments,
        inboundShipments,
        outboundShipments
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.viewShipment = [
  auth,
  async (req, res) => {
    try {
      const { role } = req.user;
      const permission_request = {
        role: role,
        permissionRequired: ["viewShipment"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          const shipment = await ShipmentModel.aggregate([
            {
              $match: {
                $or: [
                  {
                    id: req.query.shipmentId,
                  },
                  {
                    airWayBillNo: req.query.shipmentId,
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "warehouses",
                localField: "supplier.locationId",
                foreignField: "id",
                as: "supplier.warehouse",
              },
            },
            {
              $unwind: {
                path: "$supplier.warehouse",
              },
            },
            {
              $lookup: {
                from: "organisations",
                localField: "supplier.warehouse.organisationId",
                foreignField: "id",
                as: "supplier.org",
              },
            },
            {
              $unwind: {
                path: "$supplier.org",
              },
            },
            {
              $lookup: {
                from: "warehouses",
                localField: "receiver.locationId",
                foreignField: "id",
                as: "receiver.warehouse",
              },
            },
            {
              $unwind: {
                path: "$receiver.warehouse",
              },
            },
            {
              $lookup: {
                from: "organisations",
                localField: "receiver.warehouse.organisationId",
                foreignField: "id",
                as: "receiver.org",
              },
            },
            {
              $unwind: {
                path: "$receiver.org",
              },
            },
          ]);
          const Shipment = shipment.length ? shipment[0] : [];
          await asyncForEach(Shipment.products, async (element) => {
            const product = await ProductModel.findOne({
              id: element.productID,
            });
            element.unitofMeasure = product.unitofMeasure;
          });
          return apiResponse.successResponseWithData(
            res,
            "View Shipment",
            Shipment
          );
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

exports.viewShipmentGmr = [
  auth,
  async (req, res) => {
    try {
      const { role } = req.user;
      const permission_request = {
        role: role,
        permissionRequired: ["viewShipment"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          const shipment = await ShipmentModel.findOne({
            id: req.query.shipmentId,
          });
          return apiResponse.successResponseWithData(
            res,
            "View Shipment Details",
            shipment
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

exports.fetchAllShipments = [
  auth,
  async (req, res) => {
    try {
      const shipments = await ShipmentModel.find({});
      return apiResponse.successResponseWithData(
        res,
        "All Shipments",
        shipments
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchGMRShipments = [
  auth,
  async (req, res) => {
    try {
      const skip = req.query || 0;
      const limit = req.query || 30;
      const count = await ShipmentModel.count({ isCustom: true });
      const shipments = await ShipmentModel.find({ isCustom: true })
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });
      return apiResponse.successResponseWithData(res, "GMR Shipments", {
        data: shipments,
        count: count,
      });
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetch_po_Shipments = [
  auth,
  async (req, res) => {
    try {
      const shipment = await ShipmentModel.findOne({
        poId: req.query.poId,
      });
      return apiResponse.successResponseWithData(
        res,
        "Shipment by PO ID",
        shipment
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.updateStatus = [
  auth,
  async (req, res) => {
    try {
      const update = await Record.findOneAndUpdate(
        {
          id: req.query.shipmentId,
        },
        {
          status: req.body.status,
        },
        { new: true }
      );
      if (!update) {
        return apiResponse.notFoundResponse(res, "Shipment not found");
      }
      return apiResponse.successResponseWithData(
        res,
        " Status Updated ",
        update
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getProductsByInventory = [
  auth,
  async (req, res) => {
    try {
      const { invId } = req.query;
      const inventories = await InventoryModel.aggregate([
        { $match: { id: invId } },
        { $unwind: "$inventoryDetails" },
        {
          $lookup: {
            from: "products",
            localField: "inventoryDetails.productId",
            foreignField: "id",
            as: "products",
          },
        },
        { $unwind: "$products" },
        {
          $group: {
            _id: "$inventoryDetails.productId",
            productCategory: { $first: "$products.type" },
            productName: { $first: "$products.name" },
            unitofMeasure: { $first: "$products.unitofMeasure" },
            manufacturer: { $first: "$products.manufacturer" },
            productQuantity: { $sum: "$inventoryDetails.quantity" },
            quantity: { $sum: "$inventoryDetails.quantity" },
          },
        },
        {
          $match: { productQuantity: { $gt: 0 } },
        },
      ]);

      return apiResponse.successResponseWithData(
        res,
        "Products by inventory ",
        inventories
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.uploadImage = [
  auth,
  async (req, res) => {
    try {
      const Id = req.query.id;
      const Upload = await uploadFile(req.file);
      await unlinkFile(req.file.path);
      const update = await ShipmentModel.findOneAndUpdate(
        { id: Id },
        { $push: { imageDetails: `${Upload.key}` } },
        { new: true }
      );
      return apiResponse.successResponseWithData(
        res,
        "Image uploaded successfully",
        update
      );
    } catch (e) {
      return apiResponse.ErrorResponse(res, e.message);
    }
  },
];

exports.fetchImage = [
  auth,
  async (req, res) => {
    try {
      const Id = req.query.id;
      let imageArray = [];
      const result = await ShipmentModel.find({ id: Id }, { imageDetails: 1 });
      imageArray = result[0].imageDetails;
      const resArray = [];
      for (let i = 0; i < imageArray.length; i++) {
        const s = "/images/" + imageArray[i];
        resArray.push(s);
      }
      return apiResponse.successResponseWithData(res, "Images", resArray);
    } catch (e) {
      return apiResponse.ErrorResponse(res, e.message);
    }
  },
];

exports.updateTrackingStatus = [
  auth,
  async (req, res) => {
    try {
      const data = req.body;
      data.shipmentUpdates.updatedOn = date.format(
        new Date(),
        "DD/MM/YYYY HH:mm"
      );
      data.shipmentUpdates.updatedBy = req.user.id;
      data.shipmentUpdates.status = "UPDATED";
      const shipment = await ShipmentModel.findOneAndUpdate(
        { id: req.body.id },
        { $push: { shipmentUpdates: data.shipmentUpdates } }
      );
      const event_data = {
        eventID: cuid(),
        eventTime: new Date().toISOString(),
        actorWarehouseId: req.user.warehouseId,
        transactionId: req.body.id,
        eventType: {
          primary: "UPDATE",
          description: "SHIPMENT_TRACKING",
        },
        actor: {
          actorid: req.user.id || null,
          actoruserid: req.user.emailId || null,
        },
        stackholders: {
          ca: {
            id: null,
            name: null,
            address: null,
          },
          actororg: {
            id: req.user.organisationId,
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
          data: shipment,
        },
      };
      await logEvent(event_data);
      return apiResponse.successResponse(res, "Status Updated");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.chainOfCustody = [
  auth,
  async (req, res) => {
    try {
      const { role } = req.user;
      const permission_request = {
        role: role,
        permissionRequired: ["viewShipment"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          var poDetails = "";
          const id = req.query.shipmentId;
          if (id.includes("PO")) {
            const idCheck = await RecordModel.findOne({
              id: id,
            });

            if (idCheck != null) {
              poDetails = await RecordModel.aggregate([
                {
                  $match: {
                    id: id,
                  },
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
              ]);

              const shipmentIds = poDetails[0].shipments;
              var shipments = [];
              for (let i = 0; i < shipmentIds.length; i++) {
                const shipmentDetails = await userShipments(
                  "id",
                  shipmentIds[i],
                  0,
                  100
                );
                shipments.push(shipmentDetails);
              }

              return apiResponse.successResponseWithData(
                res,
                "Status Updated",
                {
                  poChainOfCustody: poDetails,
                  shipmentChainOfCustody: shipments,
                }
              );
            } else {
              return apiResponse.validationErrorWithData(
                res,
                "ID does not exists, please try tracking existing IDs"
              );
            }
          } else {
            const shipmentDetails = await ShipmentModel.findOne({
              $or: [
                {
                  id: req.query.shipmentId,
                },
                {
                  airWayBillNo: req.query.shipmentId,
                },
              ],
            });

            if (shipmentDetails != null) {
              const poId = shipmentDetails.poId;

              if (poId != null) {
                poDetails = await RecordModel.aggregate([
                  {
                    $match: {
                      id: poId,
                    },
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
                ]);
              }

              shipments = await ShipmentModel.aggregate([
                {
                  $match: {
                    $or: [
                      {
                        id: req.query.shipmentId,
                      },
                      {
                        airWayBillNo: req.query.shipmentId,
                      },
                    ],
                  },
                },
                {
                  $lookup: {
                    from: "warehouses",
                    localField: "supplier.locationId",
                    foreignField: "id",
                    as: "supplier.warehouse",
                  },
                },
                {
                  $unwind: {
                    path: "$supplier.warehouse",
                  },
                },
                {
                  $lookup: {
                    from: "organisations",
                    localField: "supplier.warehouse.organisationId",
                    foreignField: "id",
                    as: "supplier.org",
                  },
                },
                {
                  $unwind: {
                    path: "$supplier.org",
                  },
                },
                {
                  $lookup: {
                    from: "warehouses",
                    localField: "receiver.locationId",
                    foreignField: "id",
                    as: "receiver.warehouse",
                  },
                },
                {
                  $unwind: {
                    path: "$receiver.warehouse",
                  },
                },
                {
                  $lookup: {
                    from: "organisations",
                    localField: "receiver.warehouse.organisationId",
                    foreignField: "id",
                    as: "receiver.org",
                  },
                },
                {
                  $unwind: {
                    path: "$receiver.org",
                  },
                },
              ]).sort({
                createdAt: -1,
              });

              return apiResponse.successResponseWithData(
                res,
                "Status Updated",
                {
                  poChainOfCustody: poDetails,
                  shipmentChainOfCustody: shipments,
                }
              );
            } else {
              return apiResponse.validationErrorWithData(
                res,
                "ID does not exists, please try tracking existing IDs"
              );
            }
          }
        } else {
          return apiResponse.forbiddenResponse(res, "Access denied");
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchShipmentIds = [
  auth,
  async (req, res) => {
    try {
      const { role } = req.user;
      const permission_request = {
        role: role,
        permissionRequired: ["viewShipment"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          var poDetails = "";
          const id = req.query.shipmentId;
          if (id.includes("PO")) {
            const idCheck = await RecordModel.findOne({
              id: id,
            });

            if (idCheck != null) {
              poDetails = await RecordModel.aggregate([
                {
                  $match: {
                    id: id,
                  },
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
              ]);

              const shipmentIds = poDetails[0].shipments;
              var shipments = [];
              for (let i = 0; i < shipmentIds.length; i++) {
                const shipmentDetails = await userShipments(
                  "id",
                  shipmentIds[i],
                  0,
                  100
                );
                shipments.push(shipmentDetails);
              }

              return apiResponse.successResponseWithData(
                res,
                "Status Updated",
                {
                  poChainOfCustody: poDetails,
                  shipmentChainOfCustody: shipments,
                }
              );
            } else {
              return apiResponse.validationErrorWithData(
                res,
                "ID does not exists, please try tracking existing IDs"
              );
            }
          } else {
            const shipmentDetails = await ShipmentModel.findOne({
              $or: [
                {
                  id: req.query.shipmentId,
                },
                {
                  airWayBillNo: req.query.shipmentId,
                },
              ],
            });

            if (shipmentDetails != null) {
              const poId = shipmentDetails.poId;

              if (poId != null) {
                poDetails = await RecordModel.aggregate([
                  {
                    $match: {
                      id: poId,
                    },
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
                ]);
              }

              shipments = await ShipmentModel.aggregate([
                {
                  $match: {
                    $or: [
                      {
                        id: req.query.shipmentId,
                      },
                      {
                        airWayBillNo: req.query.shipmentId,
                      },
                    ],
                  },
                },
                {
                  $lookup: {
                    from: "warehouses",
                    localField: "supplier.locationId",
                    foreignField: "id",
                    as: "supplier.warehouse",
                  },
                },
                {
                  $unwind: {
                    path: "$supplier.warehouse",
                  },
                },
                {
                  $lookup: {
                    from: "organisations",
                    localField: "supplier.warehouse.organisationId",
                    foreignField: "id",
                    as: "supplier.org",
                  },
                },
                {
                  $unwind: {
                    path: "$supplier.org",
                  },
                },
                {
                  $lookup: {
                    from: "warehouses",
                    localField: "receiver.locationId",
                    foreignField: "id",
                    as: "receiver.warehouse",
                  },
                },
                {
                  $unwind: {
                    path: "$receiver.warehouse",
                  },
                },
                {
                  $lookup: {
                    from: "organisations",
                    localField: "receiver.warehouse.organisationId",
                    foreignField: "id",
                    as: "receiver.org",
                  },
                },
                {
                  $unwind: {
                    path: "$receiver.org",
                  },
                },
              ]).sort({
                createdAt: -1,
              });

              return apiResponse.successResponseWithData(
                res,
                "Status Updated",
                {
                  poChainOfCustody: poDetails,
                  shipmentChainOfCustody: shipments,
                }
              );
            } else {
              return apiResponse.validationErrorWithData(
                res,
                "ID does not exists, please try tracking existing IDs"
              );
            }
          }
        } else {
          return apiResponse.forbiddenResponse(res, "Access denied");
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchShipmentIds = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId } = req.user;
      await ShipmentModel.find(
        {
          $or: [
            {
              "supplier.locationId": warehouseId,
            },
            {
              "receiver.locationId": warehouseId,
            },
          ],
        },
        "id"
      )
        .then((shipments) => {
          return apiResponse.successResponseWithData(
            res,
            "All Shipments",
            shipments
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err.message);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchInboundShipments = [
  //inbound shipments with filter(shipmentId, from, to, status, date)
  auth,
  async (req, res) => {
    try {
      const { skip, limit } = req.query;
      const { warehouseId } = req.user;
      let currentDate = new Date();
      let fromDateFilter = 0;
      let status = req.query.status ? req.query.status : undefined;
      let fromSupplier = req.query.from ? req.query.from : undefined;
      let toReceiver = req.query.to ? req.query.to : undefined;
      let shipmentId = req.query.shipmentId ? req.query.shipmentId : undefined;
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

      if (shipmentId) {
        whereQuery["id"] = shipmentId;
      }

      if (fromDate && toDate) {
        var firstDate = new Date(fromDate);
        var nextDate = new Date(toDate);
        whereQuery[`shippingDate`] = { $gte: firstDate, $lte: nextDate };
      }

      if (status) {
        if (status == "RECEIVED") {
          whereQuery["status"] = status;
        } else {
          whereQuery["status"] = { $ne: "RECEIVED" };
        }
      }

      if (fromDateFilter) {
        whereQuery["createdAt"] = { $gte: fromDateFilter };
      }

      if (warehouseId) {
        whereQuery["receiver.locationId"] = warehouseId;
      }

      if (fromSupplier) {
        whereQuery["supplier.id"] = fromSupplier;
      }

      if (toReceiver) {
        whereQuery["receiver.id"] = toReceiver;
      }
      console.log("In bound whereQuery ======>", whereQuery);
      try {
        let inboundShipmentsCount = await ShipmentModel.count(whereQuery);
        ShipmentModel.find(whereQuery)
          .skip(parseInt(skip))
          .limit(parseInt(limit))
          .sort({ createdAt: -1 })
          .then((inboundShipmentsList) => {
            let inboundShipmentsRes = [];
            let findInboundShipmentData = inboundShipmentsList.map(
              async (inboundShipment) => {
                let inboundShipmentData = JSON.parse(
                  JSON.stringify(inboundShipment)
                );
                let supplierOrganisation = await OrganisationModel.findOne({
                  id: inboundShipmentData.supplier.id,
                });
                let supplierWarehouse = await WarehouseModel.findOne({
                  id: inboundShipmentData.supplier.locationId,
                });
                let receiverOrganisation = await OrganisationModel.findOne({
                  id: inboundShipmentData.receiver.id,
                });
                let receiverWarehouse = await WarehouseModel.findOne({
                  id: inboundShipmentData.receiver.locationId,
                });
                inboundShipmentData.supplier[`org`] = supplierOrganisation;
                inboundShipmentData.supplier[`warehouse`] = supplierWarehouse;
                inboundShipmentData.receiver[`org`] = receiverOrganisation;
                inboundShipmentData.receiver[`warehouse`] = receiverWarehouse;
                inboundShipmentsRes.push(inboundShipmentData);
              }
            );

            Promise.all(findInboundShipmentData).then(function (results) {
              return apiResponse.successResponseWithMultipleData(
                res,
                "Inbound Shipment Records",
                {
                  inboundShipments: inboundShipmentsRes,
                  count: inboundShipmentsCount,
                }
              );
            });
          });
      } catch (err) {
        return apiResponse.ErrorResponse(res, err.message);
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchOutboundShipments = [
  //outbound shipments with filter(shipmentId, from, to, status, date)
  auth,
  async (req, res) => {
    try {
      const { skip, limit } = req.query;
      const { warehouseId } = req.user;
      let currentDate = new Date();
      let fromDateFilter = 0;
      let status = req.query.status ? req.query.status : undefined;
      let fromSupplier = req.query.from ? req.query.from : undefined;
      let toReceiver = req.query.to ? req.query.to : undefined;
      let shipmentId = req.query.shipmentId ? req.query.shipmentId : undefined;
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

      if (shipmentId) {
        whereQuery["id"] = shipmentId;
      }
      if (fromDate && toDate) {
        var firstDate = new Date(fromDate);
        var nextDate = new Date(toDate);
        whereQuery[`shippingDate`] = { $gte: firstDate, $lte: nextDate };
      }
      if (status) {
        whereQuery["status"] = status;
      }

      if (fromDateFilter) {
        whereQuery["createdAt"] = { $gte: fromDateFilter };
      }

      if (warehouseId) {
        whereQuery["supplier.locationId"] = warehouseId;
      }

      if (fromSupplier) {
        whereQuery["supplier.id"] = fromSupplier;
      }

      if (toReceiver) {
        whereQuery["receiver.id"] = toReceiver;
      }
      try {
        let outboundShipmentsCount = await ShipmentModel.count(whereQuery);
        ShipmentModel.find(whereQuery)
          .skip(parseInt(skip))
          .limit(parseInt(limit))
          .sort({ createdAt: -1 })
          .then((outboundShipmentsList) => {
            let outboundShipmentsRes = [];
            let findOutboundShipmentData = outboundShipmentsList.map(
              async (outboundShipment) => {
                let outboundShipmentData = JSON.parse(
                  JSON.stringify(outboundShipment)
                );
                let supplierOrganisation = await OrganisationModel.findOne({
                  id: outboundShipmentData.supplier.id,
                });
                let supplierWarehouse = await WarehouseModel.findOne({
                  id: outboundShipmentData.supplier.locationId,
                });
                let receiverOrganisation = await OrganisationModel.findOne({
                  id: outboundShipmentData.receiver.id,
                });
                let receiverWarehouse = await WarehouseModel.findOne({
                  id: outboundShipmentData.receiver.locationId,
                });
                outboundShipmentData.supplier[`org`] = supplierOrganisation;
                outboundShipmentData.supplier[`warehouse`] = supplierWarehouse;
                outboundShipmentData.receiver[`org`] = receiverOrganisation;
                outboundShipmentData.receiver[`warehouse`] = receiverWarehouse;
                outboundShipmentsRes.push(outboundShipmentData);
              }
            );

            Promise.all(findOutboundShipmentData).then(function (results) {
              return apiResponse.successResponseWithMultipleData(
                res,
                "Outbound Shipment Records",
                {
                  outboundShipments: outboundShipmentsRes,
                  count: outboundShipmentsCount,
                }
              );
            });
          });
      } catch (err) {
        return apiResponse.ErrorResponse(res, err.message);
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchSupplierAndReceiverList = [
  auth,
  async (req, res) => {
    try {
      // const { warehouseId } = req.user;
      // let supplierReceiverList = await OrganisationModel.find( { warehouses: warehoueseId }, ['id', 'name']);
      let supplierReceiverList = await OrganisationModel.find({}, [
        "id",
        "name",
      ]);

      if (supplierReceiverList) {
        return apiResponse.successResponseWithMultipleData(
          res,
          "supplierReceiverList",
          supplierReceiverList
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchAllWarehouseShipments = [
  auth,
  async (req, res) => {
    try {
      const { skip, limit } = req.query;
      const { emailId, phoneNumber } = req.user;
      let empDetails;
      if (emailId) empDetails = await EmployeeModel.findOne({ emailId });
      else {
        empDetails = await EmployeeModel.findOne({ phoneNumber });
      }
      const warehouses = empDetails.warehouseId;
      const shipments = await ShipmentModel.aggregate([
        {
          $match: {
            $or: [
              {
                "supplier.locationId": { $in: warehouses },
              },
              {
                "receiver.locationId": { $in: warehouses },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "warehouses",
            localField: "supplier.locationId",
            foreignField: "id",
            as: "supplier.warehouse",
          },
        },
        {
          $unwind: {
            path: "$supplier.warehouse",
          },
        },
        {
          $lookup: {
            from: "organisations",
            localField: "supplier.warehouse.organisationId",
            foreignField: "id",
            as: "supplier.org",
          },
        },
        {
          $unwind: {
            path: "$supplier.org",
          },
        },
        {
          $lookup: {
            from: "warehouses",
            localField: "receiver.locationId",
            foreignField: "id",
            as: "receiver.warehouse",
          },
        },
        {
          $unwind: {
            path: "$receiver.warehouse",
          },
        },
        {
          $lookup: {
            from: "organisations",
            localField: "receiver.warehouse.organisationId",
            foreignField: "id",
            as: "receiver.org",
          },
        },
        {
          $unwind: {
            path: "$receiver.org",
          },
        },
      ])
        .sort({
          createdAt: -1,
        })
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      return apiResponse.successResponseWithData(
        res,
        "Shipments Table",
        shipments
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.trackJourney = [
  auth,
  async (req, res) => {
    try {
      var shipmentsArray = [];
      var inwardShipmentsArray = [];
      var outwardShipmentsArray = [];
      var poDetails, trackedShipment;
      const trackingId = req.query.trackingId;
      var poShipmentsArray = "";
      try {
        if (!trackingId.includes("PO")) {
          const inwardShipments = await ShipmentModel.findOne(
            {
              $or: [
                {
                  id: trackingId,
                },
                {
                  airWayBillNo: trackingId,
                },
              ],
            },
            {
              _id: 0,
              taggedShipments: 1,
              poId: 1,
            }
          );

          if (inwardShipments == null)
            throw new Error(
              "ID does not exists..Please try searching with existing IDs"
            );

          shipmentsArray = inwardShipments.taggedShipments;
          shipmentsArray.push(trackingId);
          poDetails = await RecordModel.findOne({
            shipments: {
              $in: shipmentsArray,
            },
          });
          if (inwardShipments.taggedShipments) {
            if (
              inwardShipments.taggedShipments.length > 0 &&
              inwardShipments.taggedShipments[0] !== ""
            )
              inwardShipmentsArray = await ShipmentModel.aggregate([
                {
                  $match: {
                    $and: [
                      {
                        id: { $in: shipmentsArray.pull(trackingId) },
                      },
                      {
                        status: "RECEIVED",
                      },
                    ],
                  },
                },
                {
                  $lookup: {
                    from: "warehouses",
                    localField: "supplier.locationId",
                    foreignField: "id",
                    as: "supplier.warehouse",
                  },
                },
                {
                  $unwind: {
                    path: "$supplier.warehouse",
                  },
                },
                {
                  $lookup: {
                    from: "organisations",
                    localField: "supplier.warehouse.organisationId",
                    foreignField: "id",
                    as: "supplier.org",
                  },
                },
                {
                  $unwind: {
                    path: "$supplier.org",
                  },
                },
                {
                  $lookup: {
                    from: "warehouses",
                    localField: "receiver.locationId",
                    foreignField: "id",
                    as: "receiver.warehouse",
                  },
                },
                {
                  $unwind: {
                    path: "$receiver.warehouse",
                  },
                },
                {
                  $lookup: {
                    from: "organisations",
                    localField: "receiver.warehouse.organisationId",
                    foreignField: "id",
                    as: "receiver.org",
                  },
                },
                {
                  $unwind: {
                    path: "$receiver.org",
                  },
                },
              ]);
          }
          trackedShipment = await ShipmentModel.aggregate([
            {
              $match: {
                $or: [
                  {
                    id: trackingId,
                  },
                  {
                    airWayBillNo: trackingId,
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "warehouses",
                localField: "supplier.locationId",
                foreignField: "id",
                as: "supplier.warehouse",
              },
            },
            {
              $unwind: {
                path: "$supplier.warehouse",
              },
            },
            {
              $lookup: {
                from: "organisations",
                localField: "supplier.warehouse.organisationId",
                foreignField: "id",
                as: "supplier.org",
              },
            },
            {
              $unwind: {
                path: "$supplier.org",
              },
            },
            {
              $lookup: {
                from: "warehouses",
                localField: "receiver.locationId",
                foreignField: "id",
                as: "receiver.warehouse",
              },
            },
            {
              $unwind: {
                path: "$receiver.warehouse",
              },
            },
            {
              $lookup: {
                from: "organisations",
                localField: "receiver.warehouse.organisationId",
                foreignField: "id",
                as: "receiver.org",
              },
            },
            {
              $unwind: {
                path: "$receiver.org",
              },
            },
          ]);

          outwardShipmentsArray = await ShipmentModel.aggregate([
            {
              $match: {
                $and: [
                  {
                    taggedShipments: trackingId,
                  },
                  {
                    status: "RECEIVED",
                  },
                ],
              },
            },
            {
              $lookup: {
                from: "warehouses",
                localField: "supplier.locationId",
                foreignField: "id",
                as: "supplier.warehouse",
              },
            },
            {
              $unwind: {
                path: "$supplier.warehouse",
              },
            },
            {
              $lookup: {
                from: "organisations",
                localField: "supplier.warehouse.organisationId",
                foreignField: "id",
                as: "supplier.org",
              },
            },
            {
              $unwind: {
                path: "$supplier.org",
              },
            },
            {
              $lookup: {
                from: "warehouses",
                localField: "receiver.locationId",
                foreignField: "id",
                as: "receiver.warehouse",
              },
            },
            {
              $unwind: {
                path: "$receiver.warehouse",
              },
            },
            {
              $lookup: {
                from: "organisations",
                localField: "receiver.warehouse.organisationId",
                foreignField: "id",
                as: "receiver.org",
              },
            },
            {
              $unwind: {
                path: "$receiver.org",
              },
            },
          ]);
        } else if (trackingId.includes("PO")) {
          poDetails = await RecordModel.findOne({
            id: trackingId,
          });

          if (poDetails == null)
            throw new Error(
              "Order ID does not exists..Please try searching with existing IDs"
            );

          if (poDetails.shipments.length > 0) {
            outwardShipmentsArray = await ShipmentModel.aggregate([
              {
                $match: {
                  $or: [
                    {
                      id: { $in: poDetails.shipments },
                    },
                    {
                      taggedShipments: { $in: poDetails.shipments },
                    },
                  ],
                },
              },
              {
                $lookup: {
                  from: "warehouses",
                  localField: "supplier.locationId",
                  foreignField: "id",
                  as: "supplier.warehouse",
                },
              },
              {
                $unwind: {
                  path: "$supplier.warehouse",
                },
              },
              {
                $lookup: {
                  from: "organisations",
                  localField: "supplier.warehouse.organisationId",
                  foreignField: "id",
                  as: "supplier.org",
                },
              },
              {
                $unwind: {
                  path: "$supplier.org",
                },
              },
              {
                $lookup: {
                  from: "warehouses",
                  localField: "receiver.locationId",
                  foreignField: "id",
                  as: "receiver.warehouse",
                },
              },
              {
                $unwind: {
                  path: "$receiver.warehouse",
                },
              },
              {
                $lookup: {
                  from: "organisations",
                  localField: "receiver.warehouse.organisationId",
                  foreignField: "id",
                  as: "receiver.org",
                },
              },
              {
                $unwind: {
                  path: "$receiver.org",
                },
              },
            ]);

            poShipmentsArray = await ShipmentModel.aggregate([
              {
                $match: {
                  id: { $in: poDetails.shipments },
                },
              },
              {
                $lookup: {
                  from: "warehouses",
                  localField: "supplier.locationId",
                  foreignField: "id",
                  as: "supplier.warehouse",
                },
              },
              {
                $unwind: {
                  path: "$supplier.warehouse",
                },
              },
              {
                $lookup: {
                  from: "organisations",
                  localField: "supplier.warehouse.organisationId",
                  foreignField: "id",
                  as: "supplier.org",
                },
              },
              {
                $unwind: {
                  path: "$supplier.org",
                },
              },
              {
                $lookup: {
                  from: "warehouses",
                  localField: "receiver.locationId",
                  foreignField: "id",
                  as: "receiver.warehouse",
                },
              },
              {
                $unwind: {
                  path: "$receiver.warehouse",
                },
              },
              {
                $lookup: {
                  from: "organisations",
                  localField: "receiver.warehouse.organisationId",
                  foreignField: "id",
                  as: "receiver.org",
                },
              },
              {
                $unwind: {
                  path: "$receiver.org",
                },
              },
            ]);
          }
        }
        return apiResponse.successResponseWithData(res, "Shipments Table", {
          poDetails: poDetails,
          inwardShipmentsArray: inwardShipmentsArray,
          trackedShipment: trackedShipment,
          outwardShipmentsArray: outwardShipmentsArray,
          poShipmentsArray: poShipmentsArray,
        });
      } catch (err) {
        return apiResponse.ErrorResponse(res, err.message);
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.checkShipmentID = [
  auth,
  async (req, res) => {
    try {
      const { shipmentId } = req.query;
      const checkShipment = await ShipmentModel.find({ id: shipmentId });
      if (checkShipment.length > 0)
        return apiResponse.successResponse(res, "Shipment found");
      else return apiResponse.ErrorResponse(res, "Shipment not found");
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchairwayBillNumber = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId } = req.user;
      await ShipmentModel.find(
        {
          $or: [
            {
              "supplier.locationId": warehouseId,
            },
            {
              "receiver.locationId": warehouseId,
            },
          ],
        },
        "airWayBillNo id status"
      )
        .then((shipments) => {
          return apiResponse.successResponseWithData(
            res,
            "All Shipments",
            shipments
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err.message);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.Image = [
  auth,
  async (req, res) => {
    const FileStream = getFileStream(req.params.key);
    FileStream.pipe(res);
  },
];

exports.exportInboundShipments = [
  //inbound shipments with filter(shipmentId, from, to, status, date)
  auth,
  async (req, res) => {
    try {
      // const { skip, limit } = req.query;
      const { warehouseId } = req.user;
      let currentDate = new Date();
      let fromDateFilter = 0;
      let status = req.query.status ? req.query.status : undefined;
      let fromSupplier = req.query.from ? req.query.from : undefined;
      let toReceiver = req.query.to ? req.query.to : undefined;
      let shipmentId = req.query.shipmentId ? req.query.shipmentId : undefined;
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

      if (shipmentId) {
        whereQuery["id"] = shipmentId;
      }

      if (status) {
        if (status == "RECEIVED") {
          whereQuery["status"] = status;
        } else {
          whereQuery["status"] = { $ne: "RECEIVED" };
        }
      }

      if (fromDateFilter) {
        whereQuery["createdAt"] = { $gte: fromDateFilter };
      }

      if (warehouseId) {
        whereQuery["receiver.locationId"] = warehouseId;
      }

      if (fromSupplier) {
        whereQuery["supplier.id"] = fromSupplier;
      }

      if (toReceiver) {
        whereQuery["receiver.id"] = toReceiver;
      }
      console.log("In bound whereQuery ======>", whereQuery);
      try {
        let inboundShipmentsCount = await ShipmentModel.count(whereQuery);
        ShipmentModel.find(whereQuery)
          .sort({ createdAt: -1 })
          .then((inboundShipmentsList) => {
            let inboundShipmentsRes = [];
            let findInboundShipmentData = inboundShipmentsList.map(
              async (inboundShipment) => {
                let inboundShipmentData = JSON.parse(
                  JSON.stringify(inboundShipment)
                );
                let supplierOrganisation = await OrganisationModel.findOne({
                  id: inboundShipmentData.supplier.id,
                });
                let supplierWarehouse = await WarehouseModel.findOne({
                  id: inboundShipmentData.supplier.locationId,
                });
                let receiverOrganisation = await OrganisationModel.findOne({
                  id: inboundShipmentData.receiver.id,
                });
                let receiverWarehouse = await WarehouseModel.findOne({
                  id: inboundShipmentData.receiver.locationId,
                });
                inboundShipmentData.supplier[`org`] = supplierOrganisation;
                inboundShipmentData.supplier[`warehouse`] = supplierWarehouse;
                inboundShipmentData.receiver[`org`] = receiverOrganisation;
                inboundShipmentData.receiver[`warehouse`] = receiverWarehouse;
                inboundShipmentsRes.push(inboundShipmentData);
              }
            );

            Promise.all(findInboundShipmentData).then(function (results) {
              let data = [];
              let rowData;
              for (const row of inboundShipmentsRes) {
                for (const product of row.products) {
                  rowData = {
                    id: row.id,
                    poId: row.poId,
                    productCategory: product.productCategory,
                    productName: product.productName,
                    productID: product.productID,
                    productQuantity:
                      product.productQuantity +
                      " " +
                      product?.unitofMeasure?.name,
                    batchNumber: product.batchNumber,
                    manufacturer: product.manufacturer,
                    supplierOrgName: row?.supplier?.org?.name,
                    supplierOrgId: row?.supplier?.org?.id,
                    supplierOrgLocation: row?.supplier?.locationId,
                    recieverOrgName: row?.receiver?.org?.name,
                    recieverOrgId: row?.receiver?.org?.id,
                    recieverOrgLocation: row?.receiver?.locationId,
                    airWayBillNo: row.airWayBillNo,
                    label: row?.label?.labelId,
                    shippingDate: row.shippingDate,
                    expectedDeliveryDate: row.expectedDeliveryDate || "unknown",
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
                  "Inbound Shipment Records"
                );
              }
            });
          });
      } catch (err) {
        return apiResponse.ErrorResponse(res, err.message);
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.exportOutboundShipments = [
  //outbound shipments with filter(shipmentId, from, to, status, date)
  auth,
  async (req, res) => {
    try {
      // const { skip, limit } = req.query;
      const { warehouseId } = req.user;
      let currentDate = new Date();
      let fromDateFilter = 0;
      let status = req.query.status ? req.query.status : undefined;
      let fromSupplier = req.query.from ? req.query.from : undefined;
      let toReceiver = req.query.to ? req.query.to : undefined;
      let shipmentId = req.query.shipmentId ? req.query.shipmentId : undefined;
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

      if (shipmentId) {
        whereQuery["id"] = shipmentId;
      }

      if (status) {
        whereQuery["status"] = status;
      }

      if (fromDateFilter) {
        whereQuery["createdAt"] = { $gte: fromDateFilter };
      }

      if (warehouseId) {
        whereQuery["supplier.locationId"] = warehouseId;
      }

      if (fromSupplier) {
        whereQuery["supplier.id"] = fromSupplier;
      }

      if (toReceiver) {
        whereQuery["receiver.id"] = toReceiver;
      }

      console.log("Out bound whereQuery ======>", whereQuery);
      try {
        let outboundShipmentsCount = await ShipmentModel.count(whereQuery);
        ShipmentModel.find(whereQuery)
          .sort({ createdAt: -1 })
          .then((outboundShipmentsList) => {
            let outboundShipmentsRes = [];
            let findOutboundShipmentData = outboundShipmentsList.map(
              async (outboundShipment) => {
                let outboundShipmentData = JSON.parse(
                  JSON.stringify(outboundShipment)
                );
                let supplierOrganisation = await OrganisationModel.findOne({
                  id: outboundShipmentData.supplier.id,
                });
                let supplierWarehouse = await WarehouseModel.findOne({
                  id: outboundShipmentData.supplier.locationId,
                });
                let receiverOrganisation = await OrganisationModel.findOne({
                  id: outboundShipmentData.receiver.id,
                });
                let receiverWarehouse = await WarehouseModel.findOne({
                  id: outboundShipmentData.receiver.locationId,
                });
                outboundShipmentData.supplier[`org`] = supplierOrganisation;
                outboundShipmentData.supplier[`warehouse`] = supplierWarehouse;
                outboundShipmentData.receiver[`org`] = receiverOrganisation;
                outboundShipmentData.receiver[`warehouse`] = receiverWarehouse;
                outboundShipmentsRes.push(outboundShipmentData);
              }
            );

            Promise.all(findOutboundShipmentData).then(function (results) {
              let data = [];
              let rowData;
              for (const row of outboundShipmentsRes) {
                for (const product of row.products) {
                  rowData = {
                    id: row.id,
                    poId: row.poId,
                    productCategory: product.productCategory,
                    productName: product.productName,
                    productID: product.productID,
                    productQuantity:
                      product.productQuantity +
                      " " +
                      product?.unitofMeasure?.name,
                    batchNumber: product.batchNumber,
                    manufacturer: product.manufacturer,
                    supplierOrgName: row?.supplier?.org?.name,
                    supplierOrgId: row?.supplier?.org?.id,
                    supplierOrgLocation: row?.supplier?.locationId,
                    recieverOrgName: row?.receiver?.org?.name,
                    recieverOrgId: row?.receiver?.org?.id,
                    recieverOrgLocation: row?.receiver?.locationId,
                    airWayBillNo: row.airWayBillNo,
                    label: row?.label?.labelId,
                    shippingDate: row.shippingDate,
                    expectedDeliveryDate: row.expectedDeliveryDate || "unknown",
                  };
                  data.push(rowData);
                }
              }
              if (req.query.type == "pdf") {
                res = buildPdfReport(req, res, data, "Outbound");
              } else {
                res = buildExcelReport(req, res, data);
                return apiResponse.successResponseWithMultipleData(
                  res,
                  "Outbound Shipment Records"
                );
              }
            });
          });
      } catch (err) {
        return apiResponse.ErrorResponse(res, err.message);
      }
    } catch (err) {
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
      displayName: "Shipment ID",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 120,
    },
    poId: {
      displayName: "Reference Order ID",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: "10",
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
    productID: {
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
    batchNumber: {
      displayName: "Batch Number",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    note: {
      displayName: "Expiry Date",
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
    supplierOrgName: {
      displayName: "From Organization Name",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    supplierOrgId: {
      displayName: "From Organization ID",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    supplierOrgLocation: {
      displayName: "From Organization Location Details",
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
    airWayBillNo: {
      displayName: "Transit Number",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    label: {
      displayName: "Label Code",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    shippingDate: {
      displayName: "Shipment Date",
      headerStyle: styles.headerDark,
      cellStyle: styles.cellGreen,
      width: 220,
    },
    expectedDeliveryDate: {
      displayName: "Shipment Estimate Date",
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

function buildPdfReport(req, res, data, orderType) {
  // console.log(data)
  var rows = [];
  rows.push([
    { text: "Shipment ID", bold: true },
    { text: "Reference Order ID", bold: true },
    { text: "Product Category", bold: true },
    { text: "Product Name", bold: true },
    { text: "Product ID", bold: true },
    { text: "Quantity", bold: true },
    { text: "Batch Number", bold: true },
    { text: "Manufacturer", bold: true },
    { text: "From Organization Name", bold: true },
    { text: "From Organization ID", bold: true },
    { text: "From Organization Location Details", bold: true },
    { text: "Delivery Organization Name", bold: true },
    { text: "Delivery Organization ID", bold: true },
    { text: "Delivery Organization Location Details", bold: true },
    { text: "Transit Number", bold: true },
    { text: "Label Code", bold: true },
    { text: "Shipment Date", bold: true },
    { text: "Shipment Estimate Date", bold: true },
  ]);
  // console.log(rows[0].length)
  for (var i = 0; i < data.length; i++) {
    rows.push([
      data[i].id || "N/A",
      data[i].poId || "N/A",
      data[i].productCategory || "N/A",
      data[i].productName || "N/A",
      data[i].productID || "N/A",
      data[i].productQuantity || "N/A",
      data[i].batchNumber || "N/A",
      data[i].manufacturer || "N/A",
      data[i].supplierOrgName || "N/A",
      data[i].supplierOrgId || "N/A",
      data[i].supplierOrgLocation || "N/A",
      data[i].recieverOrgName || "N/A",
      data[i].recieverOrgId || "N/A",
      data[i].recieverOrgLocation || "N/A",
      data[i].airWayBillNo || "N/A",
      data[i].label || "N/A",
      data[i].shippingDate || "N/A",
      data[i].expectedDeliveryDate || "N/A",
    ]);
  }

  var docDefinition = {
    pageSize: "A3",
    pageOrientation: "landscape",
    pageMargins: [30, 30, 1, 5],
    content: [
      { text: `${orderType} shipments`, fontSize: 34, style: "header" },
      {
        table: {
          margin: [1, 1, 1, 1],
          headerRows: 1,
          headerStyle: "header",
          widths: [
            60, 60, 55, 55, 55, 45, 48, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55,
            55,
          ],
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

  var options = { fontLayoutCache: true };
  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  var temp123;
  var pdfFile = pdfDoc.pipe((temp123 = fs.createWriteStream("./output.pdf")));
  var path = pdfFile.path;
  pdfDoc.end();
  temp123.on("finish", async function () {
    // do send PDF file
    return res.sendFile(resolve(path));
  });
  return;
}

exports.trackJourneyOnBlockchain = [
  auth,
  async (req, res) => {
    try {
      var shipmentsArray = [];
      var inwardShipmentsArray = [];
      var outwardShipmentsArray = [];
      const trackingId = req.query.trackingId;
      try {
        if (!trackingId.includes("PO")) {
          const inwardShipmentsQuery = {
            selector: {
              $or: [
                {
                  Id: trackingId,
                },
                {
                  AirwayBillNo: trackingId,
                },
              ],
            },
          };
          let token =
            req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
          const inwardShipments = await axios.post(
            "http://13.235.113.206:8080/api/v1/transactionapi/shipment/querystring",
            inwardShipmentsQuery,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          shipmentsArray = JSON.parse(
            inwardShipments.data.data[0].TaggedShipments
          );
          //shipmentsArray.push(trackingId;

          const shipmentQuery = {
            selector: {
              Id: {
                $in: shipmentsArray,
              },
            },
          };

          const shipmentResult = await axios.post(
            `${hf_blockchain_url}/api/v1/transactionapi/shipment/querystring`,
            shipmentQuery,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const len = shipmentResult.data.data;

          for (let count = 0; count < len.length; count++) {
            const supplierDetails = JSON.parse(
              shipmentResult.data.data[count].Supplier
            );
            const receiverDetails = JSON.parse(
              shipmentResult.data.data[count].Receiver
            );

            const supplierWarehouseDetails = await axios.get(
              `${hf_blockchain_url}/api/v1/participantapi/Warehouse/get/WAR100451`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            const supplierOrgDetails = await axios.get(
              `${hf_blockchain_url}/api/v1/participantapi/Organizations/get/${supplierDetails.id}`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            const receiverWarehouseDetails = await axios.get(
              `${hf_blockchain_url}/api/v1/participantapi/Warehouse/get/WAR100451`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            const receiverOrgDetails = await axios.get(
              `${hf_blockchain_url}/api/v1/participantapi/Organizations/get/${receiverDetails.id}`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            const shipmentInwardData = {
              Shipmentdata: shipmentResult.data.data[count],
              supplierWarehouseDetails: supplierWarehouseDetails.data.data,
              supplierOrgDetails: supplierOrgDetails.data.data,
              receiverWarehouseDetails: receiverWarehouseDetails.data.data,
              receiverOrgDetails: receiverOrgDetails.data.data,
            };
            inwardShipmentsArray.push(shipmentInwardData);
          }
          const shipmentQueryOutward = {
            selector: {
              $or: [
                {
                  taggedShipments: trackingId,
                },
                {
                  status: "RECEIVED",
                },
              ],
            },
          };

          const shipmentResultOutward = await axios.post(
            `${hf_blockchain_url}/api/v1/transactionapi/shipment/querystring`,
            shipmentQueryOutward,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const len1 = shipmentResult.data.data;

          for (let count = 0; count < len.length; count++) {
            const supplierDetails = JSON.parse(
              shipmentResultOutward.data.data[count].Supplier
            );
            const receiverDetails = JSON.parse(
              shipmentResultOutward.data.data[count].Receiver
            );

            const supplierWarehouseDetails = await axios.get(
              `${hf_blockchain_url}/api/v1/participantapi/Warehouse/get/WAR100451`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            const supplierOrgDetails = await axios.get(
              `${hf_blockchain_url}/api/v1/participantapi/Organizations/get/${supplierDetails.id}`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            const receiverWarehouseDetails = await axios.get(
              `${hf_blockchain_url}/api/v1/participantapi/Warehouse/get/WAR100451`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            const receiverOrgDetails = await axios.get(
              `${hf_blockchain_url}/api/v1/participantapi/Organizations/get/${receiverDetails.id}`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            const shipmentOutwardData = {
              Shipmentdata: shipmentResult.data.data[count],
              supplierWarehouseDetails: supplierWarehouseDetails.data.data,
              supplierOrgDetails: supplierOrgDetails.data.data,
              receiverWarehouseDetails: receiverWarehouseDetails.data.data,
              receiverOrgDetails: receiverOrgDetails.data.data,
            };
            outwardShipmentsArray.push(shipmentOutwardData);
          }
          console.log("outwardShipmentArray", outwardShipmentsArray);

          const shipmentQueryTracked = {
            selector: {
              $or: [
                {
                  Id: trackingId,
                },
                {
                  AirwayBillNo: trackingId,
                },
              ],
            },
          };

          const shipmentResultTracked = await axios.post(
            `${hf_blockchain_url}/api/v1/transactionapi/shipment/querystring`,
            shipmentQueryTracked,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          const supplierDetails = JSON.parse(
            shipmentResultTracked.data.data[0].Supplier
          );
          const receiverDetails = JSON.parse(
            shipmentResultTracked.data.data[0].Receiver
          );

          const supplierWarehouseDetailsTracked = await axios.get(
            `${hf_blockchain_url}/api/v1/participantapi/Warehouse/get/WAR100451`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          const supplierOrgDetailsTracked = await axios.get(
            `${hf_blockchain_url}/api/v1/participantapi/Organizations/get/${supplierDetails.id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          const receiverWarehouseDetailsTracked = await axios.get(
            `${hf_blockchain_url}/api/v1/participantapi/Warehouse/get/WAR100451`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          const receiverOrgDetailsTracked = await axios.get(
            `${hf_blockchain_url}/api/v1/participantapi/Organizations/get/${receiverDetails.id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const trackedShipment = {
            Shipmentdata: shipmentResultTracked.data.data,
            supplierWarehouseDetails: supplierWarehouseDetailsTracked.data.data,
            supplierOrgDetails: supplierOrgDetailsTracked.data.data,
            receiverWarehouseDetails: receiverWarehouseDetailsTracked.data.data,
            receiverOrgDetails: receiverOrgDetailsTracked.data.data,
          };

          return apiResponse.successResponseWithData(res, "Shipments Table", {
            //poDetails: poDetails,
            inwardShipmentsArray: inwardShipmentsArray,
            trackedShipment: trackedShipment,
            outwardShipmentsArray: outwardShipmentsArray,
            //poShipmentsArray: poShipmentsArray,
          });
        }
      } catch (err) {
        return apiResponse.ErrorResponse(res, err.message);
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

function matchConditionShipmentOnBlockchain(filters) {
  console.log("mc", filters);
  let matchCondition = {
    $and: [],
  };
  if (filters.orgType && filters.orgType !== "") {
    if (
      filters.orgType === "BREWERY" ||
      filters.orgType === "S1" ||
      filters.orgType === "S2" ||
      filters.orgType === "S3"
    ) {
      matchCondition.$and.push({
        $or: [
          {
            "supplier.org.type": filters.orgType,
          },
          {
            "receiver.org.type": filters.orgType,
          },
        ],
      });
    } else if (filters.orgType === "ALL_VENDORS") {
      matchCondition.$and.push({
        $or: [
          {
            "supplier.org.type": "S1",
          },
          {
            "supplier.org.type": "S2",
          },
          {
            "supplier.org.type": "S3",
          },
          {
            "receiver.org.type": "S1",
          },
          {
            "receiver.org.type": "S2",
          },
          {
            "receiver.org.type": "S3",
          },
        ],
      });
    }
  }

  if (filters.state && filters.state.length) {
    matchCondition.$and.push({
      $or: [
        {
          "supplier.warehouse.warehouseAddress.state":
            filters.state.toUpperCase(),
        },
        {
          "receiver.warehouse.warehouseAddress.state":
            filters.state.toUpperCase(),
        },
      ],
    });
  }
  if (filters.district && filters.district.length) {
    matchCondition.$and.push({
      $or: [
        {
          "supplier.warehouse.warehouseAddress.city":
            filters.district.toUpperCase(),
        },
        {
          "receiver.warehouse.warehouseAddress.city":
            filters.district.toUpperCase(),
        },
      ],
    });
  }
  console.log("mcres", JSON.stringify(matchCondition));
  return matchCondition;
}

function getShipmentFilterConditionOnBlockhain(filters, warehouseIds) {
  let matchCondition = {};
  if (filters.organization && filters.organization !== "") {
    if (filters.txn_type === "ALL") {
      matchCondition.$or = [
        {
          "supplier.id": filters.organization,
        },
        {
          "receiver.id": filters.organization,
        },
      ];
    } else if (filters.txn_type === "SENT") {
      matchCondition["supplier.id"] = filters.organization;
    } else if (filters.txn_type === "RECEIVED") {
      matchCondition["receiver.id"] = filters.organization;
    }
  }

  if (filters.txn_type && filters.txn_type !== "") {
    if (filters.txn_type === "SENT") {
      matchCondition.Status = {
        $in: ["CREATED", "SENT"],
      };
    } else if (filters.txn_type === "RECEIVED") {
      matchCondition.Status = "RECEIVED";
    }
  }

  if (filters.date_filter_type && filters.date_filter_type.length) {
    const DATE_FORMAT = "YYYY-MM-DD";
    if (filters.date_filter_type === "by_range") {
      let startDate = filters.start_date ? filters.start_date : new Date();
      let endDate = filters.end_date ? filters.end_date : new Date();
      matchCondition.createdOn = {
        $gte: new Date(`${startDate}T00:00:00.0Z`),
        $lt: new Date(`${endDate}T23:59:59.0Z`),
      };
    } else if (filters.date_filter_type === "by_monthly") {
      let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
      let startDateOfTheMonth = moment(startDateOfTheYear)
        .add(filters.month - 1, "months")
        .format(DATE_FORMAT);
      let endDateOfTheMonth = moment(startDateOfTheMonth)
        .endOf("month")
        .format(DATE_FORMAT);
      console.log(startDateOfTheMonth, endDateOfTheMonth);
      matchCondition.createdOn = {
        $gte: new Date(`${startDateOfTheMonth}T00:00:00.0Z`),
        $lte: new Date(`${endDateOfTheMonth}T23:59:59.0Z`),
      };
    } else if (filters.date_filter_type === "by_quarterly") {
      let startDateOfTheYear = moment([filters.year]).format(DATE_FORMAT);
      let startDateOfTheQuarter = moment(startDateOfTheYear)
        .quarter(filters.quarter)
        .startOf("quarter")
        .format(DATE_FORMAT);
      let endDateOfTheQuarter = moment(startDateOfTheYear)
        .quarter(filters.quarter)
        .endOf("quarter")
        .format(DATE_FORMAT);
      console.log(startDateOfTheQuarter, endDateOfTheQuarter);
      matchCondition.createdOn = {
        $gte: new Date(`${startDateOfTheQuarter}T00:00:00.0Z`),
        $lte: new Date(`${endDateOfTheQuarter}T23:59:59.0Z`),
      };
    } else if (filters.date_filter_type === "by_yearly") {
      const currentDate = moment().format(DATE_FORMAT);
      const currentYear = moment().year();

      let startDateOfTheYear = moment([filters.year]).format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      let endDateOfTheYear = moment([filters.year])
        .endOf("year")
        .format("YYYY-MM-DDTHH:mm:ss");

      if (filters.year === currentYear) {
        endDateOfTheYear = currentDate;
      }
      console.log(startDateOfTheYear, endDateOfTheYear);
      matchCondition.createdOn = {
        $gte: new Date(startDateOfTheYear),
        $lte: new Date(endDateOfTheYear),
      };
    }
  }
  return matchCondition;
}

exports.fetchShipmentsForAbInBevOnBlockchain = [
  auth,
  async (req, res) => {
    try {
      const shipmentsArray = [];
      const filters = req.query;
      let warehouseIds = [];
      const shipmentQuery = {
        selector: getShipmentFilterConditionOnBlockhain(filters, warehouseIds),
        //selector:  matchConditionShipment(filters)
      };

      const token =
        req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

      const shipmentResult = await axios.post(
        `${hf_blockchain_url}/api/v1/transactionapi/shipment/querystring`,
        shipmentQuery,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const len = shipmentResult.data.data;
      for (let count = 0; count < len.length; count++) {
        const supplierDetails = JSON.parse(
          shipmentResult.data.data[count].Supplier
        );
        const receiverDetails = JSON.parse(
          shipmentResult.data.data[count].Receiver
        );

        const supplierWarehouseDetails = await axios.get(
          `${hf_blockchain_url}/api/v1/participantapi/Warehouse/get/${supplierDetails.locationId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        await axios.get(
          `${hf_blockchain_url}/api/v1/participantapi/Organizations/get/${supplierDetails.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const receiverWarehouseDetails = await axios.get(
          `${hf_blockchain_url}/api/v1/participantapi/Warehouse/get/${receiverDetails.locationId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        await axios.get(
          `${hf_blockchain_url}/api/v1/participantapi/Organizations/get/${receiverDetails.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const shipmentInwardData = {
          Shipmentdata: shipmentResult.data.data[count],
          supplierWarehouseDetails: supplierWarehouseDetails.data.data,
          //supplierOrgDetails: supplierOrgDetails.data.data,
          receiverWarehouseDetails: receiverWarehouseDetails.data.data,
          //receiverOrgDetails: receiverOrgDetails.data.data,
        };
        //                console.log("123",shipmentInwardData)
        shipmentsArray.push(shipmentInwardData);
      }

      //path: "$supplier.org.S1",
      //{ $match: matchConditionShipment(filters) },

      return apiResponse.successResponseWithMultipleData(
        res,
        "Shipments Table",
        shipmentsArray
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.warehousesOrgsExportToBlockchain = [
  auth,
  async (req, res) => {
    try {
      const warehouses = await WarehouseModel.find({
        status: "ACTIVE",
      });
      for (const warehouse of warehouses) {
        const supplierWarehouseDetails = await axios.get(
          `${hf_blockchain_url}/api/v1/participantapi/Warehouse/get/${warehouse.id}`,
          {
            headers: {
              Authorization: req.headers["x-access-token"],
            },
          }
        );

        if (supplierWarehouseDetails.data.status == false) {
          const warehouseDetails = await WarehouseModel.findOne({
            id: supplierWarehouseDetails.data.data.id,
          });

          const bc_data = {
            Id: warehouseDetails.id,
            Participant_id: "",
            CreatedOn: "",
            CreatedBy: "",
            IsDelete: true,
            OrganizationId: warehouseDetails.organisationId,
            PostalAddress:
              warehouseDetails.postalAddress == null
                ? ""
                : warehouseDetails.postalAddress,
            Region: JSON.stringify(warehouseDetails.region),
            Country: JSON.stringify(warehouseDetails.country),
            Location: JSON.stringify(warehouseDetails.location),
            Supervisors: warehouseDetails.supervisors,
            Employees: warehouseDetails.employees,
            WarehouseInventory: warehouseDetails.warehouseInventory,
            Name: warehouseDetails.title,
            Gender: "",
            Age: "",
            Aadhar: "",
            Vaccineid: "",
            Title: warehouseDetails.title,
            Warehouseaddr: warehouseDetails.warehouseAddress,
            Status: warehouseDetails.status,
            Misc1: "",
            Misc2: "",
          };

          const token =
            req.headers["x-access-token"] || req.headers["authorization"];
          await axios.post(
            `${hf_blockchain_url}/api/v1/participantapi/Warehouse/create`,
            bc_data,
            {
              headers: {
                Authorization: token,
              },
            }
          );
        }
      }

      const orgs = await OrganisationModel.find({
        status: "ACTIVE",
      });

      for (let i = 0; i < orgs.length; i++) {
        const token =
          req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
        const s = orgs[i].id;
        const supplierOrgDetails = await axios.get(
          `${hf_blockchain_url}/api/v1/participantapi/Organizations/get/${s}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (supplierOrgDetails.data.status == false) {
          const orgDetails = await OrganisationModel.findOne({
            id: s,
          });

          const bc_data = {
            Id: orgDetails.id,
            Participant_id: "",
            CreatedOn: "",
            CreatedBy: "",
            IsDelete: true,
            OrganizationName: orgDetails.name,
            PostalAddress: orgDetails.postalAddress,
            Region: JSON.stringify(orgDetails.region),
            Country: JSON.stringify(orgDetails.country),
            Location: JSON.stringify(orgDetails.location),
            PrimaryContractId: orgDetails.primaryContactId,
            Logoid: "",
            Type: orgDetails.type,
            Status: "ACTIVE",
            Configuration_id: orgDetails.configuration_id,
            Warehouses: orgDetails.warehouses,
            Supervisors: orgDetails.supervisors,
            WarehouseEmployees: orgDetails.warehouseEmployees,
            Authority: "",
          };

          await axios.post(
            `${hf_blockchain_url}/api/v1/participantapi/Organizations/create`,
            bc_data,
            {
              headers: {
                Authorization: token,
              },
            }
          );
        }
      }
      return apiResponse.successResponseWithData(res, "Export success", orgs);
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
