const { body, validationResult, sanitizeBody } = require("express-validator");
const { nanoid } = require("nanoid");
const apiResponse = require("../helpers/apiResponse");
const fs = require("fs");
const moveFile = require("move-file");
const date = require("date-and-time");
const auth = require("../middlewares/jwt");
const checkToken = require("../middlewares/middleware").checkToken;
const ShipmentModel = require("../models/ShipmentModel");
const RecordModel = require("../models/RecordModel");
const ShippingOrderModel = require("../models/ShippingOrderModel");
const WarehouseModel = require("../models/WarehouseModel");
const InventoryModel = require("../models/InventoryModel");
const EmployeeModel = require("../models/EmployeeModel");
const ConfigurationModel = require("../models/ConfigurationModel");
const OrganisationModel = require("../models/OrganisationModel");
const CounterModel = require("../models/CounterModel");
const logEvent = require("../../../utils/event_logger");
const init = require("../logging/init");
const logger = init.getLog();
const imageUrl = process.env.IMAGE_URL;

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
          "inventoryDetails.$.quantityInTransit": quantity,
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

const poUpdate = async (id, quantity, poId, shipmentStatus, next) => {
  if (shipmentStatus == "CREATED") {
    const poUpdateShipped = await RecordModel.update(
      {
        id: poId,
        "products.productId": id,
      },
      {
        $inc: {
          "products.$.productQuantityShipped": quantity,
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
  //next("Success")
};

const shipmentUpdate = async (
  id,
  quantity,
  shipmentId,
  shipmentStatus,
  next
) => {
  const shipmentUpdateDelivered = await ShipmentModel.update(
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
  var matchCondition = {};
  var criteria = mode + ".locationId";
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

exports.createShipment = [
  auth,
  async (req, res) => {
    try {
      console.log(req.user);
      const data = req.body;
      // var i=0;
      const incrementCounter = await CounterModel.update(
        {
          "counters.name": "shipmentId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );
      //  let event_data = {}
      const shipmentCounter = await CounterModel.findOne({
        "counters.name": "shipmentId",
      });
      const shipmentId =
        shipmentCounter.counters[0].format + shipmentCounter.counters[0].value;
      data.id = shipmentId;
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
      const process = confData.process;
      const supplierID = req.body.supplier.id;
      const supplierOrgData = await OrganisationModel.findOne({
        primaryContactId: req.body.supplier.id,
      });
      const receiverOrgData = await OrganisationModel.findOne({
        primaryContactId: req.body.receiver.id,
      });
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
        let quantityMismatch = false;
        po.products.every((product) => {
          data.products.every((p) => {
            if (
              parseInt(p.productQuantity) < parseInt(product.productQuantity)
            ) {
              quantityMismatch = true;
              return false;
            }
          });
        });

        if (quantityMismatch) {
          po.poStatus = "TRANSIT&PARTIALLYFULFILLED";
        } else {
          po.poStatus = "TRANSIT&FULLYFULFILLED";
        }
        await po.save();
        await ShippingOrderModel.findOneAndUpdate(
          {
            id: data.shippingOrderId,
          },
          {
            $push: {
              shipmentIds: data.id,
            },
          }
        );
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
        for (count = 0; count < products.length; count++) {
          inventoryUpdate(
            products[count].productID,
            products[count].productQuantity,
            suppInventoryId,
            recvInventoryId,
            data.poId,
            "CREATED"
          );
          if (flag == "Y")
            poUpdate(
              products[count].productId,
              products[count].productQuantity,
              data.poId,
              "CREATED"
            );
        }

        const currDateTime = date.format(new Date(), "DD/MM/YYYY HH:mm");

        const updates = {
          updatedOn: currDateTime,
          status: "CREATED",
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
        event_data.eventType.description = "SHIPMENT_CREATION";
        event_data.actor.actorid = user_id || "null";
        event_data.actor.actoruserid = email || "null";
        event_data.stackholders.ca.id = supplierID || "null";
        event_data.stackholders.ca.name = supplierName || "null";
        event_data.stackholders.ca.address = supplierAddress || "null";
        event_data.stackholders.actororg.id = orgId  || "null";
        event_data.stackholders.actororg.name = orgName  || "null";
        event_data.stackholders.actororg.address = address  || "null";
        event_data.stackholders.secondorg.id = receiverId || "null";
        event_data.stackholders.secondorg.name = receiverName || "null";
        event_data.stackholders.secondorg.address = receiverAddress || "null";
        event_data.payload.data = data;
        console.log(event_data);
        const shipment = new ShipmentModel(data);
        const result = await shipment.save();
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
          "Shipment Created",
          result
        );
      } else {
        return apiResponse.successResponse(
          res,
          "Cannot create a Shipment without SO and PO"
        );
      }
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.receiveShipment = [
  auth,
  async (req, res) => {
    try {
      const data = req.body;

      const soID = data.shippingOrderId;
      const poID = data.poId;

      const shipmentID = data.id;

      const shipmentInfo = await ShipmentModel.find({ id: shipmentID });

      var actuallyShippedQuantity = 0;
      var productNumber = -1;
      /* if(shipmentInfo !== null){
                const receivedProducts = data.products;
                var shipmentProducts = shipmentInfo[0].products;
                
                shipmentProducts.forEach(product => {
                    productNumber  = productNumber + 1;
                    receivedProducts.forEach(reqProduct => {
                        
                        if(product.productName === reqProduct.productName){
                            actuallyShippedQuantity = product.productQuantity;
                            
                            var receivedQuantity = reqProduct.productQuantity;
                            var quantityDifference = actuallyShippedQuantity - receivedQuantity;
                            var rejectionRate = (quantityDifference/actuallyShippedQuantity)*100;
                            
                            (shipmentProducts[productNumber]).quantityDelivered = receivedQuantity;
                            (shipmentProducts[productNumber]).rejectionRate = rejectionRate;
                        }    
                    })
                });
                
                if(actuallyShippedQuantity !== 0){
                    const updatedDocument =  await ShipmentModel.updateOne({id: shipmentID}, shipmentInfo);    
                }
                
            }*/

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
            if (
              parseInt(p.productQuantity) < parseInt(product.productQuantity)
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
        for (count = 0; count < products.length; count++) {
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
            poUpdate(
              products[count].productId,
              products[count].productQuantity,
              data.poId,
              "RECEIVED"
            );
        }

        const currDateTime = date.format(new Date(), "DD/MM/YYYY HH:mm");
        const updates = {
          updatedOn: currDateTime,
          updateComment: data.comment,
          status: "RECEIVED",
        };

        const updateData = await ShipmentModel.findOneAndUpdate(
          { id: req.body.id },
          {
            $push: { shipmentUpdates: updates },
            $set: { status: "RECEIVED" },
          }
        );

        //await ShipmentModel.findOneAndUpdate({
        //  id: data.id
        //}, {
        //  status: "RECEIVED"
        //}, );
        //   event_data = {
        //     "eventID": "ev0000"+  Math.random().toString(36).slice(2),
        //     "eventTime": new Date().toISOString(),
        //     "eventType": {
        //         "primary": "CREATE",
        //         "description": "SHIPMENT ALERTS"
        //     },
        //     "actor": {
        //         "actorid": "userid1",
        //         "actoruserid": "ashwini@statwig.com"
        //     },
        //     "stackholders": {
        //         "ca": {
        //             "id": "org001",
        //             "name": "Statwig Pvt. Ltd.",
        //             "address": "ca_address_object"
        //         },
        //         "actororg": {
        //             "id": "org002",
        //             "name": "Appollo Hospitals Jublihills",
        //             "address": "actororg_address_object"
        //         },
        //         "secondorg": {
        //             "id": "org003",
        //             "name": "Med Plus Gachibowli",
        //             "address": "secondorg_address_object"
        //         }
        //     },
        //     "payload": {
        //         "data": {
        //             "abc": 123
        //         }
        //     }
        // }
        // async function compute(event_data) {
        //     result = await logEvent(event_data)
        //     return result
        // }

        // compute(event_data).then((response) => console.log(response))
        return apiResponse.successResponseWithData(
          res,
          "Shipment Received",
          products
        );
      } else {
        return apiResponse.successResponse(
          res,
          "Cannot receive  a Shipment without SO and PO"
        );
      }
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchShipmentsByQRCode = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { QRcode } = req.query;
          const s = await ShipmentModel.find({ "label.labelId": QRcode })
            .then((shipments) => {
              return apiResponse.successResponseWithData(
                res,
                "Shipment Details",
                shipments
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          logger.log(
            "warn",
            "<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token"
          );
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchShipments = [
  auth,
  async (req, res) => {
    try {
      const { skip, limit } = req.query;
      checkToken(req, res, async (result) => {
        if (result.success) {
          const { warehouseId } = req.user;
          var shipments, inboundShipments, outboundShipments;
          try {
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
            return apiResponse.ErrorResponse(res, err);
          }
        } else {
          logger.log(
            "warn",
            "<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token"
          );
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.viewShipment = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          await ShipmentModel.aggregate([
            {
              $match: { id: req.query.shipmentId },
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
            .then((shipment) => {
              return apiResponse.successResponseWithData(
                res,
                "Shipment",
                shipment.length ? shipment[0] : []
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          logger.log(
            "warn",
            "<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token"
          );
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchAllShipments = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          await ShipmentModel.find({})
            .then((shipments) => {
              return apiResponse.successResponseWithData(
                res,
                "All Shipments",
                shipments
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          logger.log(
            "warn",
            "<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token"
          );
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetch_po_Shipments = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
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
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          logger.log(
            "warn",
            "<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token"
          );
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updateStatus = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          await Record.update(
            {
              id: req.query.shipmentId,
            },
            {
              status: req.body.status,
            }
          )
            .then((result) => {
              //   event_data = {
              //     "eventID": "ev0000"+  Math.random().toString(36).slice(2),
              //     "eventTime": new Date().toISOString(),
              //     "eventType": {
              //         "primary": "CREATE",
              //         "description": "SHIPMENT ALERTS"
              //     },
              //     "actor": {
              //         "actorid": "userid1",
              //         "actoruserid": "ashwini@statwig.com"
              //     },
              //     "stackholders": {
              //         "ca": {
              //             "id": "org001",
              //             "name": "Statwig Pvt. Ltd.",
              //             "address": "ca_address_object"
              //         },
              //         "actororg": {
              //             "id": "org002",
              //             "name": "Appollo Hospitals Jublihills",
              //             "address": "actororg_address_object"
              //         },
              //         "secondorg": {
              //             "id": "org003",
              //             "name": "Med Plus Gachibowli",
              //             "address": "secondorg_address_object"
              //         }
              //     },
              //     "payload": {
              //         "data": {
              //             "abc": 123
              //         }
              //     }
              // }
              // async function compute(event_data) {
              //     result = await logEvent(event_data)
              //     return result
              // }

              // compute(event_data).then((response) => console.log(response))
              return apiResponse.successResponseWithData(
                res,
                "Status Updated",
                result
              );
            })
            .catch((err) => {
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          logger.log(
            "warn",
            "<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token"
          );
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
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
            productName: { $first: "$products.name" },
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
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.uploadImage = async function (req, res) {
  checkToken(req, res, async (result) => {
    if (result.success) {
      const { data } = result;
      const Id = req.query.id;

      const incrementCounter = await CounterModel.update(
        {
          "counters.name": "shipmentImage",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const poCounter = await CounterModel.find(
        { "counters.name": "shipmentImage" },
        { "counters.name.$": 1 }
      );
      const t = JSON.parse(JSON.stringify(poCounter[0].counters[0]));
      try {
        const filename = Id + "-" + t.format + t.value + ".png";
        let dir = `uploads`;

        await moveFile(req.file.path, `${dir}/${filename}`);
        const update = await ShipmentModel.updateOne(
          { id: Id },
          { $push: { imageDetails: filename } }
        );
        return res.send({
          success: true,
          data: "Image uploaded successfullly.!",
          filename,
        });
      } catch (e) {
        console.log("Error in image upload", e);
        res.status(403).json(e);
      }
    } else {
      res.json(result);
    }
  });
};

exports.fetchImage = async function (req, res) {
  checkToken(req, res, async (result) => {
    if (result.success) {
      const { data } = result;
      const Id = req.query.id;
      var imageArray = [];
      const update = await ShipmentModel.find({ id: Id }, { imageDetails: 1 })
        .then((result) => {
          imageArray = result[0].imageDetails;
        })
        .catch((e) => {
          console.log("Err", e);
        });

      var resArray = [];

      for (i = 0; i < imageArray.length; i++) {
        const s = "/images/" + imageArray[i];
        resArray.push(s);
      }
      return res.send({
        success: true,
        data: resArray,
      });
    } else {
      res.json(result);
    }
  });
};

exports.updateTrackingStatus = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          const data = req.body;
          const currDateTime = date.format(new Date(), "DD/MM/YYYY HH:mm");
          data.shipmentUpdates.updatedOn = currDateTime;
          data.shipmentUpdates.updatedBy = req.user.id;
          data.shipmentUpdates.status = "UPDATED";

          const update = await ShipmentModel.update(
            { id: req.body.id },
            { $push: { shipmentUpdates: data.shipmentUpdates } }
          );

          return apiResponse.successResponse(res, "Status Updated");
        } else {
          logger.log(
            "warn",
            "<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token"
          );
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.chainOfCustody = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async (result) => {
        if (result.success) {
          var chainOfCustody = [];
          var poDetails = "";

          const shipmentDetails = await ShipmentModel.findOne({
            id: req.query.shipmentId,
          });
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

          const shipments = await ShipmentModel.aggregate([
            {
              $match: { id: req.query.shipmentId },
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
          //   event_data = {
          //     "eventID": "ev0000"+  Math.random().toString(36).slice(2),
          //     "eventTime": new Date().toISOString(),
          //     "eventType": {
          //         "primary": "CREATE",
          //         "description": "SHIPMENT ALERTS"
          //     },
          //     "actor": {
          //         "actorid": "userid1",
          //         "actoruserid": "ashwini@statwig.com"
          //     },
          //     "stackholders": {
          //         "ca": {
          //             "id": "org001",
          //             "name": "Statwig Pvt. Ltd.",
          //             "address": "ca_address_object"
          //         },
          //         "actororg": {
          //             "id": "org002",
          //             "name": "Appollo Hospitals Jublihills",
          //             "address": "actororg_address_object"
          //         },
          //         "secondorg": {
          //             "id": "org003",
          //             "name": "Med Plus Gachibowli",
          //             "address": "secondorg_address_object"
          //         }
          //     },
          //     "payload": {
          //         "data": {
          //             "abc": 123
          //         }
          //     }
          // }
          // async function compute(event_data) {
          //     result = await logEvent(event_data)
          //     return result
          // }

          // compute(event_data).then((response) => console.log(response))
          return apiResponse.successResponseWithData(res, "Status Updated", {
            poChainOfCustody: poDetails,
            shipmentChainOfCustody: shipments,
          });
        } else {
          logger.log(
            "warn",
            "<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token"
          );
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchShipmentIds = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async (result) => {
        if (result.success) {
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
              return apiResponse.ErrorResponse(res, err);
            });
        } else {
          logger.log(
            "warn",
            "<<<<< ShipmentService < ShipmentController < fetchShipmentIds : refuted token"
          );
          res.status(403).json("Auth failed");
        }
      });
    } catch (err) {
      logger.log(
        "error",
        "<<<<< ShipmentService < ShipmentController < fetchShipmentIds : error (catch block)"
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
