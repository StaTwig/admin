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
const logEvent = require("../../../utils/event_logger");
const Event = require("../models/EventModal");
const init = require("../logging/init");
const moment = require("moment");
const logger = init.getLog();
const CENTRAL_AUTHORITY_ID = null;
const CENTRAL_AUTHORITY_NAME = null;
const CENTRAL_AUTHORITY_ADDRESS = null;
const checkPermissions =
  require("../middlewares/rbac_middleware").checkPermissions;
const blockchain_service_url = process.env.URL;
const hf_blockchain_url = process.env.HF_BLOCKCHAIN_URL;
const shipment_stream = process.env.SHIP_STREAM;
const axios = require("axios");
const { uploadFile, getFileStream } = require("../helpers/s3");
const fs = require("fs");
const util = require("util");
const uniqid = require("uniqid");
const unlinkFile = util.promisify(fs.unlink);
const excel = require("node-excel-export");
resolve = require("path").resolve;
var pdf = require("pdf-creator-node");
const inventoryUpdate = async (
  id,
  quantity,
  suppId,
  recvId,
  poId,
  shipmentStatus,
  next
) => {
  if (shipmentStatus == "CREATED") {
    const suppUpdate = await InventoryModel.update(
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

    const suppUpdateTransit = await InventoryModel.update(
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
    const recvUpdate = await InventoryModel.update(
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
    const suppUpdateRecvTransit = await InventoryModel.update(
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
    const s = await InventoryModel.update(
      { id: recvId },
      { $addToSet: { inventoryDetails: { productId: id, quantity: quantity } } }
    );
    const suppUpdateRecvTransit = await InventoryModel.update(
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
  // next("Success")
};

const poUpdate = async (id, quantity, poId, shipmentStatus, actor, next) => {
  try {
    let event = await Event.findOne({ "payloadData.data.order_id": poId });
    console.log("event is", event);

    var evid = Math.random().toString(36).slice(2);
    var datee = new Date();
    datee = datee.toISOString();
    let event_data = {
      eventID: null,
      eventTime: null,
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
          id: "null",
          name: "null",
          address: "null",
        },
        actororg: {
          id: actor.organisationId,
          name: "null",
          address: "null",
        },
        secondorg: {
          id: "null",
          name: "null",
          address: "null",
        },
      },
      payload: {
        data: {
          data: null,
        },
      },
    };
    event_data.eventID = "ev0000" + evid;
    event_data.eventTime = datee;
    event_data.eventType.primary = "UPDATE";
    event_data.transactionId = poId;
    event_data.eventType.description = "ORDER";
    if (event) event_data.payload.data = event.payloadData;

    async function compute(event_data) {
      resultt = await logEvent(event_data);
      return resultt;
    }
    let response = await compute(event_data);
    console.log("response is", response);

    if (shipmentStatus == "CREATED") {
      const poUpdateShipped = await RecordModel.update(
        {
          id: poId,
          "products.productId": id,
        },
        {
          $inc: {
            "products.$.productQuantityShipped": parseInt(quantity),
          },
        }
      );
    }
    if (shipmentStatus == "RECEIVED") {
      const poUpdate = await RecordModel.update(
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
      const poUpdateRecvDelivered = await RecordModel.update(
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

    return response;
  } catch (error) {
    console.log(error);
    return apiResponse.ErrorResponse(res, err.message);
  }
};

const shipmentUpdate = async (
  id,
  quantity,
  shipmentId,
  shipmentStatus,
  next
) => {
  const shipmentUpdateDelivered = await ShipmentModel.updateOne(
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

  //next("Success")
};

const userShipments = async (mode, warehouseId, skip, limit, callback) => {
  // var matchCondition = {};
  //var criteria = mode + ".locationId";
  //matchCondition[criteria] = warehouseId

  var matchCondition = {};

  if (mode != "id") var criteria = mode + ".locationId";
  else var criteria = mode;

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
  callback(undefined, shipments);
};

const taggedShipmentUpdate = async (id, quantity, shipmentId, next) => {
  const shipmentUpdate = await ShipmentModel.update(
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
};

exports.createShipment = [
  auth,
  async (req, res) => {
    try {
      let data = req.body;
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
      const soID = data.shippingOrderId;
      const poID = data.poId;
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
              parseInt(shipment_product_qty) < parseInt(po_product_quantity)
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
              console.log("failed to set orderprocesstime");
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
          return apiResponse.ErrorResponse(res, "Product  not Updated");
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
        for (count = 0; count < products.length; count++) {
          data.products[count]["productId"] = data.products[count].productID;
          inventoryUpdate(
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
            const update = await AtomModel.updateOne(
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
                const updateAtoms = await AtomModel.updateMany(
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
                atomsArray.push(atom);
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
        var datee = new Date();
        datee = datee.toISOString();
        var evid = Math.random().toString(36).slice(2);
        let event_data = {
          eventID: null,
          eventTime: null,
          eventType: {
            primary: "CREATE",
            description: "SHIPMENT_CREATION",
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
        event_data.eventType.description = "SHIPMENT";
        event_data.transactionId = data.id;
        event_data.actor.actorid = user_id || "null";
        event_data.actor.actoruserid = email || "null";
        event_data.actorWarehouseId = req.user.warehouseId || "null";
        event_data.stackholders.actororg.id = orgId || "null";
        event_data.stackholders.actororg.name = orgName || "null";
        event_data.stackholders.actororg.address = address || "null";
        event_data.stackholders.ca.id = CENTRAL_AUTHORITY_ID || "null";
        event_data.stackholders.ca.name = CENTRAL_AUTHORITY_NAME || "null";
        event_data.stackholders.ca.address =
          CENTRAL_AUTHORITY_ADDRESS || "null";
        if (orgId === supplierID) {
          event_data.stackholders.secondorg.id = receiverId || "null";
          event_data.stackholders.secondorg.name = receiverName || "null";
          event_data.stackholders.secondorg.address = receiverAddress || "null";
        } else {
          event_data.stackholders.secondorg.id = supplierID || "null";
          event_data.stackholders.secondorg.name = supplierName || "null";
          event_data.stackholders.secondorg.address = supplierAddress || "null";
        }
        event_data.payload.data = data;
        console.log(event_data);
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
          TaggedShipments: "",
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

        let token =
          req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase

        const bc_response = await axios.post(
          `${hf_blockchain_url}/api/v1/transactionapi/shipment/create`,
          bc_data,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        /*const userData = {
          stream: shipment_stream,
          key: shipmentId,
          address: req.user.walletAddress,
          data: data,
        };
        const response = await axios.post(
          `${blockchain_service_url}/publish`,
          userData
        );
        await ShipmentModel.findOneAndUpdate(
          {
            id: shipmentId,
          },
          {
            $push: {
              transactionIds: response.data.transactionId,
            },
          }
        );*/

        if (data.taggedShipments) {
          const prevTaggedShipments = await ShipmentModel.findOne(
            {
              id: data.taggedShipments,
            },
            {
              _id: 0,
              taggedShipments: 1,
            }
          );

          const tagUpdate = await ShipmentModel.findOneAndUpdate(
            {
              id: shipmentId,
            },
            {
              $push: {
                taggedShipments: prevTaggedShipments.taggedShipments,
              },
            }
          );

          for (count = 0; count < products.length; count++) {
            taggedShipmentUpdate(
              products[count].productId,
              products[count].productQuantity,
              data.taggedShipments
            );
          }
        }
        async function compute(event_data) {
          resultt = await logEvent(event_data);
          return resultt;
        }
        console.log(result);
        compute(event_data).then((response) => {
          console.log(response);
        });

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

exports.receiveShipment = [
  auth,
  async (req, res) => {
    try {
      let locationMatch = false;
      let permission = false;
      let change = false;
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
          change = true;
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
        const confId = orgData.configuration_id;
        const confData = await ConfigurationModel.findOne({ id: confId });
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
              if (product.productQuantityDelivered)
                var shipment_product_qty =
                  parseInt(product.productQuantityDelivered) +
                  parseInt(p.productQuantity);
              else var shipment_product_qty = p.productQuantity;

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
          const suppInventoryDetails = await InventoryModel.findOne({
            id: suppInventoryId,
          });

          const recvWarehouseDetails = await WarehouseModel.findOne({
            id: data.receiver.locationId,
          });
          var recvInventoryId = recvWarehouseDetails.warehouseInventory;
          const recvInventoryDetails = await InventoryModel.findOne({
            id: recvInventoryId,
          });
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
            inventoryUpdate(
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
                  id: uniqid("batch-"),
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
          console.log("bc data", bc_data);
          let token =
            req.headers["x-access-token"] || req.headers["authorization"];
          console.log("token", token);
          const bc_response = await axios.put(
            `${hf_blockchain_url}/api/v1/transactionapi/shipment/update`,
            bc_data,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          var datee = new Date();
          datee = datee.toISOString();
          var evid = Math.random().toString(36).slice(2);
          let event_data = {
            eventID: null,
            eventTime: null,
            eventType: {
              primary: "RECEIVE",
              description: "SHIPMENT",
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
          event_data.eventType.primary = "RECEIVE";
          event_data.eventType.description = "SHIPMENT";
          event_data.actor.actorid = user_id || "null";
          event_data.actor.actoruserid = email || "null";
          event_data.actorWarehouseId = req.user.warehouseId || "null";
          event_data.stackholders.actororg.id = orgId || "null";
          event_data.stackholders.actororg.name = orgName || "null";
          event_data.stackholders.actororg.address = address || "null";
          event_data.stackholders.ca.id = CENTRAL_AUTHORITY_ID || "null";
          event_data.stackholders.ca.name = CENTRAL_AUTHORITY_NAME || "null";
          event_data.stackholders.ca.address =
            CENTRAL_AUTHORITY_ADDRESS || "null";
          event_data.transactionId = data.id;

          if (orgId === supplierID) {
            event_data.stackholders.secondorg.id = receiverId || "null";
            event_data.stackholders.secondorg.name = receiverName || "null";
            event_data.stackholders.secondorg.address =
              receiverAddress || "null";
          } else {
            event_data.stackholders.secondorg.id = supplierID || "null";
            event_data.stackholders.secondorg.name = supplierName || "null";
            event_data.stackholders.secondorg.address =
              supplierAddress || "null";
          }

          event_data.payload.data = data;
          console.log(event_data);
          async function compute(event_data) {
            resultt = await logEvent(event_data);
            return resultt;
          }
          compute(event_data).then((response) => {
            console.log(response);
          });

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
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
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
      var inboundShipments, outboundShipments;
      const supplier = await userShipments(
        "supplier",
        warehouseId,
        skip,
        limit,
        (error, data) => {
          outboundShipments = data;
        }
      );
      const receiver = await userShipments(
        "receiver",
        warehouseId,
        skip,
        limit,
        (error, data) => {
          inboundShipments = data;
        }
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
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
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
          await ShipmentModel.aggregate([
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
          ])
            .then(async (shipment) => {
              var Shipment = shipment.length ? shipment[0] : [];
              // var result = []
              let prom = await Promise.all(
                Shipment.products.map(async (element) => {
                  var product = await ProductModel.findOne({
                    id: element.productID,
                  });
                  element.unitofMeasure = product.unitofMeasure;
                })
              );
              console.log(Shipment.products);
              return apiResponse.successResponseWithData(
                res,
                "Shipment",
                Shipment
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err.message);
            });
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
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetch_po_Shipments = [
  auth,
  async (req, res) => {
    try {
      const poId = req.query.poId;
      await ShipmentModel.findOne({
        poId: poId,
      })
        .then((shipment) => {
          return apiResponse.successResponseWithData(
            res,
            "Shipment by PO ID",
            shipment
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

exports.updateStatus = [
  auth,
  async (req, res) => {
    try {
      await Record.update(
        {
          id: req.query.shipmentId,
        },
        {
          status: req.body.status,
        }
      )
        .then((result) => {
          return apiResponse.successResponseWithData(
            res,
            "Status Updated",
            result
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err.message);
        });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
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
        "Image uploaded successfullly",
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
      var imageArray = [];
      const update = await ShipmentModel.find({ id: Id }, { imageDetails: 1 })
        .then((result) => {
          imageArray = result[0].imageDetails;
        })
        .catch((e) => {
          return apiResponse.ErrorResponse(res, e.message);
        });

      var resArray = [];

      for (i = 0; i < imageArray.length; i++) {
        const s = "/images/" + imageArray[i];
        resArray.push(s);
      }
      return apiResponse.successResponseWithData(res, "Images ", resArray);
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
      const currDateTime = date.format(new Date(), "DD/MM/YYYY HH:mm");
      data.shipmentUpdates.updatedOn = currDateTime;
      data.shipmentUpdates.updatedBy = req.user.id;
      data.shipmentUpdates.status = "UPDATED";

      const update = await ShipmentModel.update(
        { id: req.body.id },
        { $push: { shipmentUpdates: data.shipmentUpdates } }
      );
      var datee = new Date();
      datee = datee.toISOString();
      var evid = Math.random().toString(36).slice(2);
      let event_data = {
        eventID: "ev0000" + evid,
        eventTime: datee,
        actorWarehouseId: req.user.warehouseId,
        transactionId: req.body.id,
        eventType: {
          primary: "UPDATE",
          description: "SHIPMENT_TRACKING",
        },
        actor: {
          actorid: req.user.id || "null",
          actoruserid: req.user.emailId || "null",
        },
        stackholders: {
          ca: {
            id: "null",
            name: "null",
            address: "null",
          },
          actororg: {
            id: req.user.organisationId,
            name: "null",
            address: "null",
          },
          secondorg: {
            id: "null",
            name: "null",
            address: "null",
          },
        },
        payload: {
          data: req.body,
        },
      };
      console.log(event_data);
      async function compute(event_data) {
        resultt = await logEvent(event_data);
        return resultt;
      }
      compute(event_data).then((response) => {
        console.log(response);
      });
      return apiResponse.successResponse(res, "Status Updated");
    } catch (err) {
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
              var shipmentDetails = [];

              for (i = 0; i < shipmentIds.length; i++) {
                const shipmentData = await userShipments(
                  "id",
                  shipmentIds[i],
                  0,
                  100,
                  (error, data) => {
                    data.map((shipmentData) => {
                      shipmentDetails = shipmentData;
                    });
                  }
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
              var shipmentDetails = [];

              for (i = 0; i < shipmentIds.length; i++) {
                const shipmentData = await userShipments(
                  "id",
                  shipmentIds[i],
                  0,
                  100,
                  (error, data) => {
                    data.map((shipmentData) => {
                      shipmentDetails = shipmentData;
                    });
                  }
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
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < fetchOutboundShipments : error (catch block)"
      );
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
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < fetchairwayBillNumber : error (catch block)"
      );
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
      const { skip, limit } = req.query;
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
              let data = [];
              let rowData;
              for (row of inboundShipmentsRes) {
                for (product of row.products) {
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
                res = buildPdfReport(req, res, data);
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
      const { skip, limit } = req.query;
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
              let data = [];
              let rowData;
              for (row of outboundShipmentsRes) {
                for (product of row.products) {
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
                res = buildPdfReport(req, res, data);
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
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < fetchOutboundShipments : error (catch block)"
      );
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
