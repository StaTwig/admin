const {
    body,
    validationResult,
    sanitizeBody
} = require('express-validator');
const {
    nanoid
} = require('nanoid');
const apiResponse = require('../helpers/apiResponse');
const auth = require('../middlewares/jwt');
const checkToken = require('../middlewares/middleware').checkToken;
const ShipmentModel = require('../models/ShipmentModel');
const RecordModel = require('../models/RecordModel');
const ShippingOrderModel = require('../models/ShippingOrderModel');
const WarehouseModel = require('../models/WarehouseModel')
const InventoryModel = require('../models/InventoryModel')

const init = require('../logging/init');
const logger = init.getLog();

const inventoryUpdate = async (id, quantity, suppId, recvId, poId, shipmentStatus, next) => {
    if (shipmentStatus == "CREATED") {
        const suppUpdate = await InventoryModel.update({
            'id': suppId,
            "inventoryDetails.productId": id
        }, {
            $inc: {
                "inventoryDetails.$.quantity": -quantity
            }
        })
        const suppUpdateTransit = await InventoryModel.update({
            'id': suppId,
            "inventoryDetails.productId": id
        }, {
            $inc: {
                "inventoryDetails.$.quantityInTransit": quantity
            }
        })
    }
    if (shipmentStatus == "RECEIVED") {
        const recvUpdate = await InventoryModel.update({
            'id': recvId,
            "inventoryDetails.productId": id
        }, {
            $inc: {
                "inventoryDetails.$.quantity": quantity
            }
        })
        const suppUpdateRecvTransit = await InventoryModel.update({
            'id': suppId,
            "inventoryDetails.productId": id
        }, {
            $inc: {
                "inventoryDetails.$.quantityInTransit": -quantity
            }
        })
    }
    //next("Success")
};

const poUpdate = async (id, quantity, poId, shipmentStatus, next) => {
    if (shipmentStatus == "CREATED") {
        const poUpdateShipped = await RecordModel.update({
            "id": poId,
            "products.productId": id
        }, {
            $inc: {
                "products.$.productQuantityShipped": quantity
            }
        })
    }
    if (shipmentStatus == "RECEIVED") {
        const poUpdate = await RecordModel.update({
            "id": poId,
            "products.productId": id
        }, {
            $inc: {
                "products.$.productQuantityShipped": -quantity
            }
        })
        const poUpdateRecvDelivered = await RecordModel.update({
            "id": poId,
            "products.productId": id
        }, {
            $inc: {
                "products.$.productQuantityDelivered": quantity
            }
        })
    }
    //next("Success")
};

exports.createShipment = [
    auth,
    async (req, res) => {
        try {
            const data = req.body;
            data.id = 'SH' + nanoid(10);
            const po = await RecordModel.findOne({
                id: data.poId
            });
            let quantityMismatch = false;
            po.products.every(product => {
                data.products.every(p => {
                    if (parseInt(p.productQuantity) < parseInt(product.productQuantity)) {
                        quantityMismatch = true;
                        return false;
                    }
                })
            })
            if (quantityMismatch) {
                po.poStatus = 'TRANSIT&PARTIALLYFULFILLED';
            } else {
                po.poStatus = 'TRANSIT&FULLYFULFILLED';
            }
            await po.save();

            const suppWarehouseDetails = await WarehouseModel.findOne({
                id: data.supplier.locationId
            })
            var suppInventoryId = suppWarehouseDetails.warehouseInventory;
            const suppInventoryDetails = await InventoryModel.findOne({
                id: suppInventoryId
            })

            const recvWarehouseDetails = await WarehouseModel.findOne({
                id: data.receiver.locationId
            })
            var recvInventoryId = recvWarehouseDetails.warehouseInventory;
            const recvInventoryDetails = await InventoryModel.findOne({
                id: recvInventoryId
            })

            data.products.every(p => {
                inventoryUpdate(p.productId, p.productQuantity, suppInventoryId, recvInventoryId, data.poId, "CREATED")
                poUpdate(p.productId, p.productQuantity, data.poId, "CREATED")
            })

            const shipment = new ShipmentModel(data);
            const result = await shipment.save();
            await ShippingOrderModel.findOneAndUpdate({
                id: data.shippingOrderId
            }, {
                $push: {
                    shipmentIds: result.id
                }
            }, );
            return apiResponse.successResponseWithData(
                res,
                'Shipment Created',
                result,
            );
        } catch (err) {
            logger.log(
                'error',
                '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
            );
            return apiResponse.ErrorResponse(res, err);
        }
    },
];

exports.receiveShipment = [
    auth,
    async (req, res) => {
        try {
            const shipmentId = req.query.shipmentId;
            const data = await ShipmentModel.findOne({id: shipmentId})

            const po = await RecordModel.findOne({
                id: data.poId
            });
            let quantityMismatch = false;
            po.products.every(product => {
            	data.products.every(p => {
                    if (parseInt(p.productQuantity) < parseInt(product.productQuantity)) {
                        quantityMismatch = true;
                        return false;
                    }
                })
            })

            if (quantityMismatch) {
                po.poStatus = 'PARTIALLYFULFILLED';
                await po.save();
            } else {
                po.poStatus = 'FULLYFULFILLED';
                await po.save();
            }

            const suppWarehouseDetails = await WarehouseModel.findOne({
                id: data.supplier.locationId
            })
            var suppInventoryId = suppWarehouseDetails.warehouseInventory;
            const suppInventoryDetails = await InventoryModel.findOne({
                id: suppInventoryId
            })

            const recvWarehouseDetails = await WarehouseModel.findOne({
                id: data.receiver.locationId
            })
            var recvInventoryId = recvWarehouseDetails.warehouseInventory;
            const recvInventoryDetails = await InventoryModel.findOne({
                id: recvInventoryId
            })
            var products = data.products;

            products.every(p => {
                inventoryUpdate(p.productId, p.productQuantity, suppInventoryId, recvInventoryId, data.poId, "RECEIVED")
                poUpdate(p.productId, p.productQuantity, data.poId, "RECEIVED")
            })

            await ShipmentModel.findOneAndUpdate({
                id: data.id
            }, {
                status: "RECEIVED"
            }, );


            return apiResponse.successResponseWithData(
                res,
                'Shipment Received',
                products
            );
        } catch (err) {
            logger.log(
                'error',
                '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
            );
            return apiResponse.ErrorResponse(res, err);
        }
    },
];

exports.fetchShipments = [
    auth,
    async (req, res) => {
        try {
            const { skip, limit } = req.query
            checkToken(req, res, async result => {
                if (result.success) {
                    const {
                        warehouseId
                    } = req.user;
                    try {
                        const shipments = await ShipmentModel.find({
                            $or: [{
                                'supplier.locationId': warehouseId
                            },
                                {
                                    'receiver.locationId': warehouseId
                                },
                            ],
                        }).sort({createdAt: -1}).skip(parseInt(skip))
                            .limit(parseInt(limit));
                        return apiResponse.successResponseWithData(
                            res,
                            'Shipments Table',
                            shipments,
                        );
                    }catch(err) {
                        return apiResponse.ErrorResponse(res, err);
                    }

                } else {
                    logger.log(
                        'warn',
                        '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
                    );
                    res.status(403).json('Auth failed');
                }
            });
        } catch (err) {
            logger.log(
                'error',
                '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
            );
            return apiResponse.ErrorResponse(res, err);
        }
    },
];

exports.Shipment = [
    auth,
    async (req, res) => {
        try {
            const {
                authorization
            } = req.headers;
            checkToken(req, res, async result => {
                if (result.success) {
                    await ShipmentModel.findOne({
                            id: req.query.shipmentId
                        })
                        .then(shipment => {
                            return apiResponse.successResponseWithData(
                                res,
                                'Shipment',
                                shipment,
                            );
                        })
                        .catch(err => {
                            return apiResponse.ErrorResponse(res, err);
                        });
                } else {
                    logger.log(
                        'warn',
                        '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
                    );
                    res.status(403).json('Auth failed');
                }
            });
        } catch (err) {
            logger.log(
                'error',
                '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
            );
            return apiResponse.ErrorResponse(res, err);
        }
    },
];

exports.fetchAllShipments = [
    auth,
    async (req, res) => {
        try {
            const {
                authorization
            } = req.headers;
            checkToken(req, res, async result => {
                if (result.success) {
                    await ShipmentModel.find({})
                        .then(shipments => {
                            return apiResponse.successResponseWithData(
                                res,
                                'All Shipments',
                                shipments,
                            );
                        })
                        .catch(err => {
                            return apiResponse.ErrorResponse(res, err);
                        });
                } else {
                    logger.log(
                        'warn',
                        '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
                    );
                    res.status(403).json('Auth failed');
                }
            });
        } catch (err) {
            logger.log(
                'error',
                '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
            );
            return apiResponse.ErrorResponse(res, err);
        }
    },
];

exports.fetch_po_Shipments = [
    auth,
    async (req, res) => {
        try {
            const {
                authorization
            } = req.headers;
            checkToken(req, res, async result => {
                if (result.success) {
                    const poId = req.query.poId;
                    await ShipmentModel.findOne({
                            poId: poId
                        })
                        .then(shipment => {
                            return apiResponse.successResponseWithData(
                                res,
                                'Shipment by PO ID',
                                shipment,
                            );
                        })
                        .catch(err => {
                            return apiResponse.ErrorResponse(res, err);
                        });
                } else {
                    logger.log(
                        'warn',
                        '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
                    );
                    res.status(403).json('Auth failed');
                }
            });
        } catch (err) {
            logger.log(
                'error',
                '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
            );
            return apiResponse.ErrorResponse(res, err);
        }
    },
];

exports.updateStatus = [
    auth,
    async (req, res) => {
        try {
            const {
                authorization
            } = req.headers;
            checkToken(req, res, async result => {
                if (result.success) {
                    await Record.update({
                            id: req.query.shipmentId
                        }, {
                            status: req.body.status
                        }, )
                        .then(result => {
                            return apiResponse.successResponseWithData(
                                res,
                                'Status Updated',
                                result,
                            );
                        })
                        .catch(err => {
                            return apiResponse.ErrorResponse(res, err);
                        });
                } else {
                    logger.log(
                        'warn',
                        '<<<<< ShipmentService < ShipmentController < modifyShipment : refuted token',
                    );
                    res.status(403).json('Auth failed');
                }
            });
        } catch (err) {
            logger.log(
                'error',
                '<<<<< ShipmentService < ShipmentController < modifyShipment : error (catch block)',
            );
            return apiResponse.ErrorResponse(res, err);
        }
    },
];
