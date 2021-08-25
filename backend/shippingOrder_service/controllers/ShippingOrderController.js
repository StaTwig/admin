const RecordModel = require('../models/RecordModel');
const ShippingOrderModel = require('../models/ShippingOrderModel');
const OrganisationModel = require('../models/OrganisationModel');
const WarehouseModel = require('../models/WarehouseModel');
//this helper file to prepare responses.
const apiResponse = require('../helpers/apiResponse');

const auth = require('../middlewares/jwt');
const checkPermissions = require('../middlewares/rbac_middleware')
  .checkPermissions;
const wrapper = require('../models/DBWrapper');
const uniqid = require('uniqid');

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
      if (!POFound) {
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
      return apiResponse.ErrorResponse(res, err.message);
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
      }).sort({createdAt: -1});
      return apiResponse.successResponseWithData(
        res,
        'Shipping Orders',
        shippingOrders,
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
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
      return apiResponse.ErrorResponse(res, err.message);
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
        'soPurchaseOrderId products soAssignedTo',
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
      { id: poDetails.customer.shippingAddress.shippingAddressId }
      );
      const data = {
        purchaseOrderId: shippingOrder.soPurchaseOrderId,
        supplierDetails: {
          ...poDetails.supplier,
          supplierOrgName: supplierOrg.name,
          locationId: shippingOrder.soAssignedTo.warehouseId
        },
        customerDetails: {
          ...poDetails.customer,
          customerOrgName: customerOrg.name,
          deliveryLocation: warehouse.postalAddress
        },
        products: shippingOrder.products,
      };
      return apiResponse.successResponseWithData(
        res,
        'Shipping Order Details',
        data,
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.assignShippingOrder = [
  auth,
  async (req, res) => {
    try {
      const { role } = req.user;
          const permission_request = {
            role: role,
            permissionRequired: ['receiveSO'],
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              try {
                const { address } = req.user;
                const { orderID, assignedTo, poId } = req.body;
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
              } catch (e) {
                return apiResponse.ErrorResponse(res, e.message);
              }
            } else {
              return apiResponse.forbiddenResponse(res, 'User doesnot have enough permissions'); 
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.updateShippingOrder = [
  auth,
  async (req, res) => {
    try {
      const {role} = req.user;
          const permission_request = {
            role: role,
            permissionRequired: ['receiveSO'],
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
                  return apiResponse.ErrorResponse(res, 'PO Not found');
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
                    return apiResponse.forbiddenResponse(
                      res,
                      'You are not authorised to update Shipping Order',
                    );
                  }
                }
              } catch (e) {
                return apiResponse.ErrorResponse(res, e.message);
              }
            } else {
              return apiResponse.forbiddenResponse(res,'Sorry! User does not have enough Permissions');
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.changeSOStatus = [
  auth,
  async (req, res) => {
    try {
      const { address,role } = req.user;
          const permission_request = {
            role: role,
            permissionRequired: ['receiveSO'],
          };
          checkPermissions(permission_request, async permissionResult => {
            if (permissionResult.success) {
              try {
                const { orderID, status, poId } = req.body;
                const POFound = await RecordModel.findOne({ id: poId });
                if (!POFound) {
                  return apiResponse.ErrorResponse(res, 'PO Not found');
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
              } catch (e) {
                return apiResponse.ErrorResponse(res, e.message);
              }
            } else {
              return apiResponse.forbiddenResponse(res, 'Sorry! User does not have enough Permissions');
            }
          });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
