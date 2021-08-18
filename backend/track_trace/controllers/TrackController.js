//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");

const InventoryModel = require('../models/InventoryModel');
const ShipmentModel = require('../models/ShipmentModel');
const ShippingOrderModel = require('../models/ShippingOrderModel')
const POModel = require('../models/POModel');
const RecordModel = require('../models/RecordModel');
const AtomModel = require('../models/AtomModel');
const OrganisationModel = require('../models/OrganisationModel');
const ProductModel = require('../models/ProductModel');
const checkPermissions = require('../middlewares/rbac_middleware').checkPermissions;
const axios = require('axios');

const fs = require('fs');
const stream_name = process.env.SHIP_STREAM;
const po_stream_name = process.env.PO_STREAM;
const blockchain_service_url = process.env.URL;

const init = require('../logging/init');
const logger = init.getLog();


const UserModel = require('../models/UserModel');
const utility = require('../helpers/utility');
const jwt = require('jsonwebtoken');
const {
    constants
} = require('../helpers/constants');


exports.fetchGoodsByID = [
    (req, res) => {
        try {
            goodsObject = [{
                    Product: "OPV",
                    Quantity: "20000",
                    Manafacturer: "ABC Pharma Ltd",
                    MfDate: "29/06/2019",
                    ExpDate: "04/01/2023",
                    user: req.user.email
                },
                {
                    Product: "Hib",
                    Quantity: "20000",
                    Manafacturer: "ABC Pharma Ltd",
                    MfDate: "29/06/2019",
                    ExpDate: "04/01/2023"
                },
                {
                    Product: "HEPB",
                    Quantity: "20000",
                    Manafacturer: "ABC Pharma Ltd",
                    MfDate: "29/06/2019",
                    ExpDate: "04/01/2023"
                }
            ];
            logger.log('info', '<<<<< TrackTraceService < TrackController < fetchGoodsByID : successfully sending response with data ');
            return apiResponse.successResponseWithData(res, "Data sent", goodsObject);
        } catch (err) {
            logger.log('error', '<<<<< TrackTraceService < TrackController < fetchGoodsByID : error (catch block) ');
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.fetchTracking = [
    (req, res) => {
        try {
            trackingObject = [{
                    user: req.user.email,
                    Location: "Hyderabad, India",
                    Date: "01/02/2020",
                    Info: "Added to inventory by the manufacturer",
                    Wallet: "0x5cdeca3cf356ad83B813fC2c8eA483AAC76A736e"
                },
                {
                    Location: "Hyderabad Airport",
                    Date: "15/02/2020",
                    Info: "Delivered",
                    Wallet: ""
                },
                {
                    Location: "Kenya Airport",
                    Date: "",
                    Info: "In Transit",
                    Wallet: "0x5cdeca3cf356ad83B813fC2c8eA483AAC76A736e"
                }
            ];
            logger.log('info', '<<<<< TrackTraceService < TrackController < fetchTracking : successfully sending response with data ');
            return apiResponse.successResponseWithData(
                res,
                "Data sent",
                trackingObject
            );
        } catch (err) {
            logger.log('error', '<<<<< TrackTraceService < TrackController < fetchTracking : error (catch block) ');
            return apiResponse.ErrorResponse(res, err);
        }
    }
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

            var tempData = {}

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

            // console.log(tempData);
            logger.log('info', '<<<<< TrackTraceService < TrackController < fetchTemp : successfully sending response with data ');
            return apiResponse.successResponseWithData(
                res,
                "Time-Temperature Data sent",
                tempData
            );
        } catch (err) {
            logger.log('error', '<<<<< TrackTraceService < TrackController < fetchTemp : error (catch block) ');
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.track = [
    auth,
    async (req, res) => {
        try {
            const {
                trackingNumber
            } = req.query;
            logger.log(
                'info',
                '<<<<< ShipmentService < ShipmentController < trackNumber : tracking , querying by transaction hash',
            );

            if (trackingNumber.includes("po") || trackingNumber.includes("PO")) {
                var type = "poNumber";
                var shipment_array = [];
                RecordModel.findOne({
                    id: trackingNumber
                }).then(async user => {
                    var arr = JSON.parse(JSON.stringify(user)).shipments.length
                    var val = JSON.parse(JSON.stringify(user)).shipments
                    shipment_array.push(val)
                    var poDetails = {
                        "id": user.id,
                        "supplier": user.supplier,
                        "customer": user.customer,
                        "date": user.creationDate,
                        "craetedBy": user.createdBy,
                        "status": user.poStatus
                    }
                    logger.log(
                        'info',
                        '<<<<< ShipmentService < ShipmentController < trackShipment : tracked PO, queried data by transaction hash',
                    );
                    res.json({
                        poDetails: poDetails,
                        shipments: shipment_array,
                    });
                });
            } else if (trackingNumber.includes("SH") || trackingNumber.includes("zp")) {
                 var  shippingOrderDetails, shippingOrderDetails,poDetails,poCustodyDetails,soCustodayDetails,supplierOrgId,supplierOrgName,supplierOrgCountry,customerOrgId,customerOrgName,customerOrgCountry = "";

                                var poDetails, shipmentDetails, shippingOrderDetails, shippingOrderId;
                var poCustodyDetails = [];
                var soCustodayDetails = [];
                var shipmentCustodyDetails = [];

                ShipmentModel.find({
                    "id": trackingNumber
                }).then(async user => {
                    shipmentDetails = user;
                    var products = JSON.parse(JSON.stringify(shipmentDetails[0])).products;
                    var quantity = JSON.parse(JSON.stringify(shipmentDetails[0])).products.productQuantity;
                    var productArray = [];
                    for (j = 0; j < products.length; j++) {
                        const product = await ProductModel.find({
                            "name": products[j].productName
                        })
                            console.log("pro",product)
                        var product1 = {
                            productName: product[0].name,
                            manufacturer: product[0].manufacturer,
                            quantity: quantity
                        }
                        productArray.push(product1)
                    }
                    var shipmentCustody = {
                        "shipmentStatus": shipmentDetails[0].status,
                        "poId": shipmentDetails[0].poId,
                        "shipmentId": shipmentDetails[0].id,
                        "dateTime": shipmentDetails[0].updatedAt
                    }
                    shipmentCustodyDetails.push(shipmentCustody)
                    const shippingOrderId = JSON.parse(JSON.stringify(user[0])).shippingOrderId;
                    const poId = JSON.parse(JSON.stringify(user[0])).poId;
                    if ( shippingOrderId != null)
                                        {
                                        shippingOrderDetails = await ShippingOrderModel.find({
                        id: shippingOrderId
                    })
                    var shippingOrderCustody = {
                        "shippingOrderId": shippingOrderDetails[0].id,
                        "status": shippingOrderDetails[0].soStatus,
                        "warehouseId": shippingOrderDetails[0].soAssignedTo.warehouseId,
                        "warehouseLocation": shippingOrderDetails[0].soAssignedTo.warehouseLocation,
                        "dateTime": shippingOrderDetails[0].updatedAt
                    }
                    soCustodayDetails.push(shippingOrderCustody)
                     console.log("soc",soCustodayDetails)
                                        }

                                        if ( poId != null)
                                        {
                    poDetails = await RecordModel.find({
                        id: poId
                    })
                    var poCustody = {
                        "poId": poDetails[0].id,
                        "status": poDetails[0].poStatus,
                        "dateTime": poDetails[0].updatedAt
                    }
                    poCustodyDetails.push(poCustody)
                    console.log("poc",poCustodyDetails)
                    var supplierOrganisationId = JSON.parse(JSON.stringify(poDetails[0])).supplier.supplierOrganisation;
                    var customerOrganisationId = JSON.parse(JSON.stringify(poDetails[0])).customer.customerOrganisation;
                    var supplierOrgDetails = await OrganisationModel.find({
                        id: supplierOrganisationId
                    })
                    var customerOrgDetails = await OrganisationModel.find({
                        id: customerOrganisationId
                    })
                    var supplierOrgId = supplierOrgDetails[0].id
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
                        productDetails: productArray
                    });
                });

            } else {
                var type = "serialNumber";
                var shipment_array = [];
                AtomModel.findOne({
                    id: trackingNumber
                }).then(async user => {
                    console.log(user.shipmentIds[0])
                    var shipmentIds = user.shipmentIds
                    RecordModel.find({
                        "shipments.shipment_id": shipmentIds[0]
                    }).then(async user => {
                        var arr = JSON.parse(JSON.stringify(user)).length
                        var poDetails = {
                            "id": user[0].id,
                            "supplier": user[0].supplier,
                            "customer": user[0].customer,
                            "date": user[0].creationDate,
                            "createdBy": user[0].createdBy,
                            "status": user[0].poStatus
                        }
                        for (i = 0; i < arr; i++) {
                            var val = JSON.parse(JSON.stringify(user))[i].shipments
                            shipment_array.push(val)
                        }
                        res.json({
                            inventoryDetails: user,
                            poDetails: poDetails,
                            shipments: shipment_array
                        });
                    })

                    logger.log(
                        'info',
                        '<<<<< ShipmentService < ShipmentController < trackProduct : tracked product, queried data by transaction hash',
                    );
                });
            }
        } catch (err) {
            logger.log(
                'error',
                '<<<<< ShipmentService < ShipmentController < trackProduct : error (catch block)',
            );
            return apiResponse.ErrorResponse(res, err);
        }
    },
];

exports.fetchDataByQRCode = [
    auth,
    async (req, res) => {
        try {
                    const shipmentCheck = await ShipmentModel.findOne({
                        "label.labelId": QRcode
                    })
                    if (shipmentCheck != null) {
                        const s = await ShipmentModel.aggregate([{
                                    $match: {
                                        "label.labelId": QRcode
                                    }
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
                            .then((shipments) => {
                                return res.json({
                                    "type": "Shipment",
                                    "shipments": shipments
                                });
                            })
                            .catch((err) => {
                                return apiResponse.ErrorResponse(res, err);
                            });
                    } else {
                        const atomCheck = await AtomModel.aggregate([{
                                    $match: {
                                        "label.labelId": QRcode
                                    }
                                },
                                {
                                    $lookup: {
                                        from: "products",
                                        localField: "productId",
                                        foreignField: "id",
                                        as: "productDetails",
                                    },
                                },
                                {
                                    $unwind: {
                                        path: "$productDetails",
                                    },
                                },
                                {
                                    $project: {
                                        productId: 1,
                                        label: 1,
                                        id: 1,
					batchNumbers: 1,
					quantity : 1,
                                        name: "$productDetails.type",
                                        type: "$productDetails.name",
                                        manufacturer: "$productDetails.manufacturer",
					unitofMeasure : {
                                                id : "$productDetails.unitofMeasure.id",
                                                name : "$productDetails.unitofMeasure.name",
                                        },
                                    }
                                }
                            ])
                            .then((products) => {
                                return res.json({
                                    "type": "Product",
                                    "products": products
                                });
                            })
                            .catch((err) => {
                                return apiResponse.ErrorResponse(res, err);
                            });

                    }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err.message);
        }
    },
];
