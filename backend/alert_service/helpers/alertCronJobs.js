const Atoms = require("../models/AtomsModel");
const WarehouseModel = require("../models/WarehouseModel");
const OrderModel = require("../models/RecordModel");
const moment = require("moment");
const { alertListener, inventoryListener } = require("./listener");

async function checkProductExpiry() {
  try {
    const params = {
      "attributeSet.expDate": { $lt: moment().format() },
    };
    for await (const product of Atoms.find({
      ...params,
    })) {
      productExpired(
        product.productId,
        product.quantity,
        product.inventoryIds,
        "EXPIRED"
      );
    }
  } catch (err) {
    console.log(err);
  }
}

async function checkProductNearExpiry() {
  try {
    let params = {
      "attributeSet.expDate": {
        $lt: moment().add(30, "d").format(),
        $gt: moment().format(),
      },
    };
    for await (const product of Atoms.find({
      ...params,
    })) {
      productExpired(
        product.productId,
        product.quantity,
        product.inventoryIds,
        "NEAR_EXPIRY"
      );
    }
  } catch (err) {
    console.log(err);
  }
}

async function productExpired(productId, quantity, owner, expired) {
  for (const inventoryId of owner) {
    for await (const warehouse of WarehouseModel.find({
      warehouseInventory: inventoryId,
    })) {
      productExpiryEvent(
        productId,
        quantity,
        warehouse.id,
        warehouse.organisationId,
        expired
      );
    }
  }
}

async function productExpiryEvent(
  productId,
  quantity,
  warehouse,
  organization,
  expired
) {
  const eventData = {
    actorOrgId: organization,
    actorWarehouseId: warehouse,
    eventTypePrimary: expired,
    eventTypeDesc: "INVENTORY",
    quantity: quantity,
    transactionId: productId,
  };
  inventoryListener(eventData);
}

async function ordersPending() {
  try {
    const orders = await OrderModel.find({ poStatus: "CREATED" });
    for (const order of orders) {
      const event = {
        transactionId: order.id,
        actorOrgId: order.supplier.supplierOrganisation,
        secondaryOrgId: order.customer.customerOrganisation,
        eventTypePrimary: "PENDING",
        eventTypeDesc: "ORDER",
      };
      alertListener(event);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  checkProductExpiry,
  checkProductNearExpiry,
  ordersPending,
};
