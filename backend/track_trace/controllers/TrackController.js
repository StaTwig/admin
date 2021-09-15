const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
const ShipmentModel = require("../models/ShipmentModel");
const ShippingOrderModel = require("../models/ShippingOrderModel");
const RecordModel = require("../models/RecordModel");
const AtomModel = require("../models/AtomModel");
const OrganisationModel = require("../models/OrganisationModel");
const ProductModel = require("../models/ProductModel");
const RequestModel = require("../models/RequestModel");
const { ScanShipment, ScanProduct } = require("../helpers/scan");
const checkPermissions =
  require("../middlewares/rbac_middleware").checkPermissions;

exports.fetchGoodsByID = [
  (req, res) => {
    try {
      goodsObject = [
        {
          Product: "OPV",
          Quantity: "20000",
          Manafacturer: "ABC Pharma Ltd",
          MfDate: "29/06/2019",
          ExpDate: "04/01/2023",
          user: req.user.email,
        },
        {
          Product: "Hib",
          Quantity: "20000",
          Manafacturer: "ABC Pharma Ltd",
          MfDate: "29/06/2019",
          ExpDate: "04/01/2023",
        },
        {
          Product: "HEPB",
          Quantity: "20000",
          Manafacturer: "ABC Pharma Ltd",
          MfDate: "29/06/2019",
          ExpDate: "04/01/2023",
        },
      ];
      return apiResponse.successResponseWithData(res, "Data sent", goodsObject);
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchTracking = [
  (req, res) => {
    try {
      trackingObject = [
        {
          user: req.user.email,
          Location: "Hyderabad, India",
          Date: "01/02/2020",
          Info: "Added to inventory by the manufacturer",
          Wallet: "0x5cdeca3cf356ad83B813fC2c8eA483AAC76A736e",
        },
        {
          Location: "Hyderabad Airport",
          Date: "15/02/2020",
          Info: "Delivered",
          Wallet: "",
        },
        {
          Location: "Kenya Airport",
          Date: "",
          Info: "In Transit",
          Wallet: "0x5cdeca3cf356ad83B813fC2c8eA483AAC76A736e",
        },
      ];
      return apiResponse.successResponseWithData(
        res,
        "Data sent",
        trackingObject
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.fetchTemp = [
  (req, res) => {
    try {
      var date_obj = new Date();

      var hours = date_obj.getHours();
      var minutes = date_obj.getMinutes();
      var seconds = date_obj.getSeconds();

      const max = 4.99; //req.body.max;
      const min = -9.97; //req.body.min;

      var tempData = {};

      for (var i = 0; i < 5; i++) {
        seconds = seconds + 5;

        if (seconds >= 60) {
          seconds -= 60;
          minutes += 1;
        }
        if (minutes >= 60) {
          minutes -= 60;
          hours += 1;
        }
        if (hours >= 24) hours -= 24;

        var time = hours + ":" + minutes + ":" + seconds;
        var temp = (Math.random() * (max - min) + min).toFixed(2);

        tempData[time] = temp;
      }
      return apiResponse.successResponseWithData(
        res,
        "Time-Temperature Data sent",
        tempData
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.track = [
  auth,
  async (req, res) => {
    try {
      const { role } = req.user;
      const permission_request = {
        role: role,
        permissionRequired: ["trackAndTrace"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (permissionResult.success) {
          const { trackingNumber } = req.query;
          if (trackingNumber.includes("po") || trackingNumber.includes("PO")) {
            var type = "poNumber";
            var shipment_array = [];
            RecordModel.findOne({
              id: trackingNumber,
            }).then(async (user) => {
              var arr = JSON.parse(JSON.stringify(user)).shipments.length;
              var val = JSON.parse(JSON.stringify(user)).shipments;
              shipment_array.push(val);
              var poDetails = {
                id: user.id,
                supplier: user.supplier,
                customer: user.customer,
                date: user.creationDate,
                craetedBy: user.createdBy,
                status: user.poStatus,
              };
              res.json({
                poDetails: poDetails,
                shipments: shipment_array,
              });
            });
          } else if (
            trackingNumber.includes("SH") ||
            trackingNumber.includes("zp")
          ) {
            var shippingOrderDetails,
              shippingOrderDetails,
              poDetails,
              poCustodyDetails,
              soCustodayDetails,
              supplierOrgId,
              supplierOrgName,
              supplierOrgCountry,
              customerOrgId,
              customerOrgName,
              customerOrgCountry = "";

            var poDetails,
              shipmentDetails,
              shippingOrderDetails,
              shippingOrderId;
            var poCustodyDetails = [];
            var soCustodayDetails = [];
            var shipmentCustodyDetails = [];

            ShipmentModel.find({
              id: trackingNumber,
            }).then(async (user) => {
              shipmentDetails = user;
              var products = JSON.parse(
                JSON.stringify(shipmentDetails[0])
              ).products;
              var quantity = JSON.parse(JSON.stringify(shipmentDetails[0]))
                .products.productQuantity;
              var productArray = [];
              for (j = 0; j < products.length; j++) {
                const product = await ProductModel.find({
                  name: products[j].productName,
                });
                console.log("pro", product);
                var product1 = {
                  productName: product[0].name,
                  manufacturer: product[0].manufacturer,
                  quantity: quantity,
                };
                productArray.push(product1);
              }
              var shipmentCustody = {
                shipmentStatus: shipmentDetails[0].status,
                poId: shipmentDetails[0].poId,
                shipmentId: shipmentDetails[0].id,
                dateTime: shipmentDetails[0].updatedAt,
              };
              shipmentCustodyDetails.push(shipmentCustody);
              const shippingOrderId = JSON.parse(
                JSON.stringify(user[0])
              ).shippingOrderId;
              const poId = JSON.parse(JSON.stringify(user[0])).poId;
              if (shippingOrderId != null) {
                shippingOrderDetails = await ShippingOrderModel.find({
                  id: shippingOrderId,
                });
                var shippingOrderCustody = {
                  shippingOrderId: shippingOrderDetails[0].id,
                  status: shippingOrderDetails[0].soStatus,
                  warehouseId: shippingOrderDetails[0].soAssignedTo.warehouseId,
                  warehouseLocation:
                    shippingOrderDetails[0].soAssignedTo.warehouseLocation,
                  dateTime: shippingOrderDetails[0].updatedAt,
                };
                soCustodayDetails.push(shippingOrderCustody);
                console.log("soc", soCustodayDetails);
              }

              if (poId != null) {
                poDetails = await RecordModel.find({
                  id: poId,
                });
                var poCustody = {
                  poId: poDetails[0].id,
                  status: poDetails[0].poStatus,
                  dateTime: poDetails[0].updatedAt,
                };
                poCustodyDetails.push(poCustody);
                console.log("poc", poCustodyDetails);
                var supplierOrganisationId = JSON.parse(
                  JSON.stringify(poDetails[0])
                ).supplier.supplierOrganisation;
                var customerOrganisationId = JSON.parse(
                  JSON.stringify(poDetails[0])
                ).customer.customerOrganisation;
                var supplierOrgDetails = await OrganisationModel.find({
                  id: supplierOrganisationId,
                });
                var customerOrgDetails = await OrganisationModel.find({
                  id: customerOrganisationId,
                });
                var supplierOrgId = supplierOrgDetails[0].id;
                var supplierOrgName = supplierOrgDetails[0].name;
                var supplierOrgCountry = supplierOrgDetails[0].country.name;
                var customerOrgId = customerOrgDetails[0].id;
                var customerOrgName = customerOrgDetails[0].name;
                var customerOrgCountry = customerOrgDetails[0].country.name;
              }

              res.json({
                shipmentDetails: shipmentDetails,
                shippingOrderDetails: shippingOrderDetails,
                poDetails: poDetails,
                poChainOfCustody: poCustodyDetails,
                soChainOfCustody: soCustodayDetails,
                shipmentChainOfCustody: shipmentCustodyDetails,
                supplierOrgId: supplierOrgId,
                supplierOrgName: supplierOrgName,
                fromLocation: supplierOrgCountry,
                customerOrgId: customerOrgId,
                customerOrgName: customerOrgName,
                toLocation: customerOrgCountry,
                productDetails: productArray,
              });
            });
          } else {
            var type = "serialNumber";
            var shipment_array = [];
            AtomModel.findOne({
              id: trackingNumber,
            }).then(async (user) => {
              console.log(user.shipmentIds[0]);
              var shipmentIds = user.shipmentIds;
              RecordModel.find({
                "shipments.shipment_id": shipmentIds[0],
              }).then(async (user) => {
                var arr = JSON.parse(JSON.stringify(user)).length;
                var poDetails = {
                  id: user[0].id,
                  supplier: user[0].supplier,
                  customer: user[0].customer,
                  date: user[0].creationDate,
                  createdBy: user[0].createdBy,
                  status: user[0].poStatus,
                };
                for (i = 0; i < arr; i++) {
                  var val = JSON.parse(JSON.stringify(user))[i].shipments;
                  shipment_array.push(val);
                }
                res.json({
                  inventoryDetails: user,
                  poDetails: poDetails,
                  shipments: shipment_array,
                });
              });
            });
          }
        } else {
          return apiResponse.ErrorResponse(
            res,
            `Access Denied, User with Role ${req.user.role} doesn't have Permision to Track & Trace`
          );
        }
      });
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.fetchDataByQRCode = [
  auth,
  async (req, res) => {
    try {
      let data = {};
      let requestType = [];
      let messages = [];
      let locationMatch = false;
      let permission = false;
      const { QRcode } = req.query;
      const { role, warehouseId, organisationId, id } = req.user;
      const shipmentCheck = await ShipmentModel.findOne({
        "label.labelId": QRcode,
      });
      if (shipmentCheck != null) {
        data.type = "Shipment";
        const receiver = await ShipmentModel.findOne({
          "label.labelId": QRcode,
        }).select("receiver");
        if (receiver.receiver.id == organisationId) {
          if (receiver.receiver.locationId == warehouseId) {
            locationMatch = true;
          } else {
            requestType.push("LOCATION_MISMATCH");
            messages.push(
              "Access Denied, User location is not same as Delivery Location"
            );
          }
        } else {
          requestType.push("ORGANISATION_MISMATCH");
          messages.push(
            "Access Denied, User doesn't belong to Receiver Organisation"
          );
        }
        const permission_request = {
          role: role,
          permissionRequired: ["viewShipment"],
        };
        checkPermissions(permission_request, async (permissionResult) => {
          if (!permissionResult.success) {
            permission = false;
            requestType.push("UNSUFFICIENT_ROLE");
            messages.push(
              "Access Denied, User doesn't have Permission to Track & Trace"
            );
          } else {
            permission = true;
          }
        });
        if (locationMatch == false) {
          const request = await RequestModel.findOne({
            "from.id": id,
            "label.labelId": QRcode,
            type: { $in: ["LOCATION_MISMATCH", "ORGANISATION_MISMATCH"] },
          });
          if (request != null && request.status == "ACCEPTED") {
            locationMatch = true;
          }
        }
        if (permission == false) {
          const request = await RequestModel.findOne({
            "from.id": id,
            "label.labelId": QRcode,
            type: { $in: ["UNSUFFICIENT_ROLE"] },
          });
          if (request != null && request.status == "ACCEPTED") {
            permission = true;
          }
        }
        if ((permission && locationMatch) == true) {
          const shipments = await ScanShipment(QRcode);
          data.shipments = shipments;
          return apiResponse.successResponseWithData(
            res,
            "Shipment Details",
            data
          );
        } else {
          if (messages.length == 1 && requestType.length == 1) {
            data.requestType = requestType[0];
            data.message = messages[0];
          } else {
            data.requestType = requestType;
            data.message = messages;
          }
          return apiResponse.forbiddenResponse(res, data);
        }
      } else {
        const permission_request = {
          role: role,
          permissionRequired: ["viewProductInfo"],
        };
        checkPermissions(permission_request, async (permissionResult) => {
          if (permissionResult.success) {
            const product = await ScanProduct(QRcode);
            data.type = "Product";
            data.product = product;
            return apiResponse.successResponseWithData(
              res,
              "Product Details",
              data
            );
          } else {
            data.message = `Access Denied, User with Role ${req.user.role} doesn't have Permision to View Product`;
            data.type = "Product";
            return apiResponse.forbiddenResponse(res, data);
          }
        });
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
