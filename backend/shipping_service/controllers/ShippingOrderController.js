const RecordModel = require('../models/RecordModel');
const ShippingOrderModel = require('../models/ShippingOrderModel');
const OrganisationModel = require('../models/OrganisationModel');
const WarehouseModel = require('../models/WarehouseModel');
//this helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');
const utility = require('../helpers/utility');
const auth = require('../middlewares/jwt');
const checkToken = require('../middlewares/middleware').checkToken;
const checkPermissions = require('../middlewares/rbac_middleware')
  .checkPermissions;
const wrapper = require('../models/DBWrapper');
const uniqid = require('uniqid');

const init = require('../logging/init');
const logger = init.getLog();

exports.createShippingOrder = [
  auth,
  async (req, res) => {
    try {
      const {
        soPurchaseOrderId,
        soAssignedTo,
        soUpdatedOn,
        products,
      } = req.body;
      const { id: soCreatedBy, id: soUpdatedBy } = req.user;
      const id = uniqid('so-');

      const POFound = await RecordModel.findOne({ id: soPurchaseOrderId });

      console.log('POFound', POFound);

      if (!POFound) {
        logger.log(
          'info',
          '<<<<< ShippingOrderService < ShippingController < createShippingOrder : PO not found in collection',
        );
        return apiResponse.ErrorResponse(res, 'PO Not found');
      } else {
        await RecordModel.findOneAndUpdate(
          { id: soPurchaseOrderId },
          { $push: { shippingOrders: id } },
        );
        const so = new ShippingOrderModel({
          id,
          soPurchaseOrderId,
          soCreatedBy,
          soAssignedTo,
          soUpdatedBy,
          soUpdatedOn,
          products,
        });
        const result = await so.save();
        return apiResponse.successResponseWithData(
          res,
          'Shipping Order Created Success',
          result,
        );
      }
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingOrderService < ShippingController < createShippingOrder : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getShippingOrders = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId } = req.user;
      const shippingOrders = await ShippingOrderModel.find({
        'soAssignedTo.warehouseId': warehouseId,
      });
      return apiResponse.successResponseWithData(
        res,
        'Shipping Orders',
        shippingOrders,
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingOrderService < ShippingController < fetchAllShippingOrders : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getShippingOrderIds = [
  auth,
  async (req, res) => {
    try {
      const { warehouseId } = req.user;
      const shippingOrderIds = await ShippingOrderModel.find(
        { 'soAssignedTo.warehouseId': warehouseId },
        'id',
      );
      return apiResponse.successResponseWithData(
        res,
        'Shipping Order Ids',
        shippingOrderIds,
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingOrderService < ShippingController < fetchAllShippingOrders : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.viewShippingOrder = [
  auth,
  async (req, res) => {
    try {
      const { soId } = req.query;
      const shippingOrder = await ShippingOrderModel.findOne(
        {
          id: soId,
        },
        'soPurchaseOrderId products',
      );
      const poDetails = await RecordModel.findOne(
        { id: shippingOrder.soPurchaseOrderId },
        'supplier customer',
      );
      const supplierOrg = await OrganisationModel.findOne(
        { id: poDetails.supplier.supplierOrganisation },
        'name',
      );
      const customerOrg = await OrganisationModel.findOne(
        { id: poDetails.customer.customerOrganisation },
        'name',
      );
      const warehouse = await WarehouseModel.findOne(
        { id: poDetails.customer.shippingAddress.shippingAddressId },
        'postalAddress',
      );
      const data = {
        purchaseOrderId: shippingOrder.soPurchaseOrderId,
        supplierDetails: {
          ...poDetails.supplier,
          supplierOrgName: supplierOrg.name,
        },
        customerDetails: {
          ...poDetails.customer,
          customerOrgName: customerOrg.name,
          deliveryLocation: warehouse.postalAddress,
        },
        products: shippingOrder.products,
      };
      return apiResponse.successResponseWithData(
        res,
        'Shipping Order Details',
        data,
      );
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingOrderService < ShippingController < viewShippingOrder : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.assignShippingOrder = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log(
            'info',
            '<<<<< ShippingService < Controller < assignShippingOrder : token verified successfully',
          );

          const permission_request = {
            result: result,
            permissionRequired: 'receiveSO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              try {
                const { address } = req.user;
                const { orderID, assignedTo, poId } = req.body;
                const POFound = await RecordModel.findOne({ id: poId });
                if (!POFound) {
                  logger.log(
                    'info',
                    '<<<<< ShippingService < Controller < createSO : PO not found in collection',
                  );
                } else {
                  const so = await RecordModel.findOne({
                    shippingOrders: { orderId: orderID },
                  });
                  console.log('test', so, so.shippingOrders.createdBy, address);
                  if (so && so.shippingOrders.createdBy === address) {
                    //await POModel.update({ orderID }, { status });
                    wrapper.updateRecord(
                      RecordModel,
                      { shippingOrders: { orderId: orderID } },
                      { shippingOrders: { assignedTo: assignedTo } },
                    );
                    return apiResponse.successResponseWithData(
                      res,
                      'Assign Shipping Order',
                      'Success',
                    );
                  } else {
                    return apiResponse.ErrorResponse(
                      res,
                      'You are not authorised to assign Shipping Order',
                    );
                  }
                }

                logger.log(
                  'info',
                  '<<<<< ShippingService < Controller < assignShippingOrder : Changed Successfully',
                );
              } catch (e) {
                return apiResponse.ErrorResponse(res, 'Error from Blockchain');
              }
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShippingService < Controller < assignShippingOrder : refuted token',
          );
          return apiResponse.ErrorResponse(res, result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingService < Controller < assignShippingOrder  : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updateShippingOrder = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log(
            'info',
            '<<<<< ShippingService < Controller < updateShippingOrder : token verified successfully',
          );

          const permission_request = {
            result: result,
            permissionRequired: 'receiveSO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              try {
                const { address } = req.user;
                const { orderID, assignedTo, status, poId } = req.body;
                const { updatedBy } = req.user;
                let date_ob = new Date();
                let date = ('0' + date_ob.getDate()).slice(-2);
                let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
                let year = date_ob.getFullYear();
                let time = date_ob.getTime();
                var timestamp = date + '-' + month + '-' + year + 'T' + time;
                const { updatedAt } = timestamp;

                const POFound = await RecordModel.findOne({ id: poId });
                if (!POFound) {
                  logger.log(
                    'info',
                    '<<<<< ShippingService < Controller < createSO : PO not found in collection',
                  );
                } else {
                  const so = await RecordModel.findOne({
                    shippingOrders: { orderId: orderID },
                  });
                  console.log('test', so, so.shippingOrders.createdBy, address);
                  if (so && so.shippingOrders.createdBy === address) {
                    //await POModel.update({ orderID }, { status });
                    wrapper.updateRecord(
                      RecordModel,
                      { shippingOrders: { orderId: orderID } },
                      { shippingOrders: { assignedTo: assignedTo } },
                      { shippingOrders: { status: status } },
                      { shippingOrders: { updatedBy: updatedBy } },
                      { shippingOrders: { updatedAt: updatedAt } },
                    );
                    return apiResponse.successResponseWithData(
                      res,
                      'Update Shipping Order',
                      'Success',
                    );
                  } else {
                    return apiResponse.ErrorResponse(
                      res,
                      'You are not authorised to update Shipping Order',
                    );
                  }
                }

                logger.log(
                  'info',
                  '<<<<< ShippingService < Controller < updateShippingOrder : Changed Successfully',
                );
              } catch (e) {
                return apiResponse.ErrorResponse(res, 'Error from Blockchain');
              }
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShippingService < Controller < updateShippingOrder : refuted token',
          );
          return apiResponse.ErrorResponse(res, result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingService < Controller < updateShippingOrder  : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.changeSOStatus = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log(
            'info',
            '<<<<< ShippingService < Controller < changeSOStatus : token verified successfully',
          );

          const permission_request = {
            result: result,
            permissionRequired: 'receiveSO',
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              try {
                const { address } = req.user;
                const { orderID, status, poId } = req.body;

                const POFound = await RecordModel.findOne({ id: poId });
                if (!POFound) {
                  logger.log(
                    'info',
                    '<<<<< ShippingService < Controller < createSO : PO not found in collection',
                  );
                } else {
                  const so = await RecordModel.findOne({
                    shippingOrders: { orderId: orderID },
                  });
                  console.log('test', so, so.shippingOrders.createdBy, address);
                  if (so && so.shippingOrders.createdBy === address) {
                    //await POModel.update({ orderID }, { status });
                    wrapper.updateRecord(
                      RecordModel,
                      { shippingOrders: { orderId: orderID } },
                      { shippingOrders: { status: status } },
                    );
                    return apiResponse.successResponseWithData(
                      res,
                      'SO Status',
                      'Success',
                    );
                  } else {
                    return apiResponse.ErrorResponse(
                      res,
                      'You are not authorised to change the status',
                    );
                  }
                }

                logger.log(
                  'info',
                  '<<<<< ShippingService < Controller < changeSOStatus : Changed Successfully',
                );
              } catch (e) {
                return apiResponse.ErrorResponse(res, 'Error from Blockchain');
              }
            } else {
              res.json('Sorry! User does not have enough Permissions');
            }
          });
        } else {
          logger.log(
            'warn',
            '<<<<< ShippingService < Controller < changeSOStatus : refuted token',
          );
          return apiResponse.ErrorResponse(res, result);
        }
      });
    } catch (err) {
      logger.log(
        'error',
        '<<<<< ShippingService < Controller < changeSOStatus  : error (catch block)',
      );
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
