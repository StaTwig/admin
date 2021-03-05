const { body, validationResult, sanitizeBody } = require('express-validator');
const { nanoid } = require('nanoid');
const apiResponse = require('../helpers/apiResponse');
const auth = require('../middlewares/jwt');
const checkToken = require('../middlewares/middleware').checkToken;
const ShipmentModel = require('../models/ShipmentModel');
const RecordModel = require('../models/RecordModel');
const ShippingOrderModel = require('../models/ShippingOrderModel');
const init = require('../logging/init');
const logger = init.getLog();

exports.createShipment = [
  auth,
  async (req, res) => {
    try {
      const data = req.body;
      data.id = 'SH' + nanoid(10);
      const po = await RecordModel.findOne({ id: data.poId});
      let quantityMismatch = false;
      po.products.every(product => {
        data.products.every(p => {
          if(parseInt(p.productQuantity) < parseInt(product.productQuantity) ) {
            quantityMismatch = true;
            return false;
          }
        })
      })
      if(quantityMismatch) {
        po.poStatus = 'PARTIALLYFULFILLED';
        await po.save();
      }
      const shipment = new ShipmentModel(data);
      const result = await shipment.save();
      await ShippingOrderModel.findOneAndUpdate(
        { id: data.shippingOrderId },
        { $push: { shipmentIds: result.id } },
      );
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

exports.fetchShipments = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          const { warehouseId } = req.user;
          await ShipmentModel.find({
            $or: [
              { 'supplier.locationId': warehouseId },
              { 'receiver.locationId': warehouseId },
            ],
          })
            .then(shipments => {
              return apiResponse.successResponseWithData(
                res,
                'Shipments Table',
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

exports.Shipment = [
  auth,
  async (req, res) => {
    try {
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          await ShipmentModel.findOne({ id: req.query.shipmentId })
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
      const { authorization } = req.headers;
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
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          const poId = req.query.poId;
          await ShipmentModel.findOne({ poId: poId })
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
      const { authorization } = req.headers;
      checkToken(req, res, async result => {
        if (result.success) {
          await Record.update(
            { id: req.query.shipmentId },
            { status: req.body.status },
          )
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
