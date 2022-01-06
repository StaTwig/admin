const Alert = require("../models/AlertModel");
const Atoms = require("../models/AtomsModel");
const EmployeeModel = require("../models/EmployeeModel");
const WarehouseModel = require("../models/WarehouseModel");
const OrderModel = require("../models/RecordModel");
const {
  alertMobile,
  alertEmail,
  alertPushNotification,
  pushNotification,
} = require("./alertSender");
const moment = require("moment");
const { alertListener, inventoryListener } = require("./listener");

async function processShipmentEvents(event) {
  try {
    const shipmentId = event?.payloadData?.data?.id;
    let params = {
      "alerts.event_type_primary": event.eventTypePrimary,
      "alerts.event_type_secondary": event.eventTypeDesc,
      "alerts.transactionId": shipmentId,
    };
    for await (const row of Alert.find({
      ...params,
    })) {
      if (row.alertMode.mobile) {
        alertMobile(event, row.user.mobile_number);
      }
      if (row.alertMode.email) {
        console.log(row.user.emailId);
        alertEmail(event, row.user.emailId);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function processOrderEvents(event) {
  try {
    const orderId = event?.payloadData?.data?.order_id || event?.transactionId;
    let params = {
      "alerts.event_type_primary": event.eventTypePrimary,
      "alerts.event_type_secondary": event.eventTypeDesc,
      "alerts.transactionId": orderId,
    };
    for await (const row of Alert.find({
      ...params,
    })) {
      if (row.alertMode.mobile) {
        alertMobile(event, row.user.mobile_number);
      }
      if (row.alertMode.email) {
        alertEmail(event, row.user.emailId);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function generateAlert(event) {
  try {
    const txnId =
      event?.payloadData?.data?.id || event?.payloadData?.data?.order_id;
    if (event.eventTypeDesc == "SHIPMENT") await processShipmentEvents(event);
    else if (event.eventTypeDesc == "ORDER") await processOrderEvents(event);
    else if (event.eventTypeDesc == "SHIPMENT_TRACKING")
      await processShipmentEvents(event);
    for await (const user of EmployeeModel.find({
      organisationId: event.actorOrgId,
    })) {
      alertPushNotification(event, user.id);
      if (event.eventTypeDesc == "SHIPMENT")
        pushNotification(event, user.id, "TRANSACTION", txnId);
      else pushNotification(event, user.id, "ALERT", txnId);
    }
    let params = {
      "alerts.event_type_primary": event.eventTypePrimary,
      "alerts.event_type_secondary": event.eventTypeDesc,
      "alerts.actorOrgId": event.actorOrgId,
    };
    for await (const row of Alert.find({
      ...params,
    })) {
      if (row.alertMode.mobile) {
        alertMobile(event, row.user.mobile_number);
      }
      if (row.alertMode.email) {
        alertEmail(event, row.user.emailId);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

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
  generateAlert,
  checkProductExpiry,
  checkProductNearExpiry,
  ordersPending,
};
