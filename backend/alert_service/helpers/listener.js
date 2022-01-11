const {
  shipmentCreate,
  shipmentDelayed,
  shipmentReceive,
  shipmentUpdate,
} = require("./shipment");
const {
  orderAccept,
  orderPending,
  orderReject,
  orderDefault,
  orderCreated,
  orderUpdate,
} = require("./order");
const {
  inventoryAdd,
  inventoryExpired,
  inventoryNearExpiry,
  inventoryUpdate,
} = require("./inventory");
const Alert = require("../models/AlertModel");

async function shipmentListener(event) {
  try {
    switch (event.eventTypePrimary) {
      case "CREATE":
        console.log("Shipment Create == > ", event);
        await shipmentCreate(event);
        break;
      case "UPDATE":
        console.log("Shipment Update == > ", event);
        await shipmentUpdate(event);
        break;
      case "RECEIVE":
        console.log("Shipment Receive == > ", event);
        await shipmentReceive(event);
        break;
      case "DELAYED":
        console.log("Shipment Delayed == > ", event);
        await shipmentDelayed(event);
        break;
      default:
        console.log("Shipment Default", event);
        console.log("Shipment Default");
        await shipmentUpdate(event);
    }
  } catch (err) {
    console.log(err);
  }
}

async function orderListener(event) {
  try {
    switch (event.eventTypePrimary) {
      case "PENDING":
        console.log("Order Pending == > ", event);
        await orderPending(event);
        break;
      case "CREATE":
        console.log("Order Create == > ", event);
        await orderCreated(event);
        break;
      case "RECEIVE":
        console.log("Order Receive == > ", event);
        await orderAccept(event);
        break;
      case "REJECT":
        console.log("Order Reject == > ", event);
        await orderReject(event);
        break;
      case "UPDATE":
        console.log("Order Update == > ", event);
        await orderUpdate(event);
        break;
      default:
        console.log("Order Default");
        await orderDefault(event);
    }
  } catch (err) {
    console.log(err);
  }
}

async function inventoryListener(event) {
  try {
    switch (event.eventTypePrimary) {
      case "ADD":
        console.log("Inventory Add == > ", event);
        await inventoryAdd(event);
        break;
      case "UPDATE":
        console.log("Inventory Update == > ", event);
        await inventoryUpdate(event);
        break;
      case "EXPIRED":
        console.log("Inventory Expired == > ", event);
        await inventoryExpired(event);
        break;
      case "NEAR_EXPIRY":
        console.log("Inventory Near Expiry == > ", event);
        await inventoryNearExpiry(event);
        break;
      default:
        console.log("Inventory Default");
    }
  } catch (err) {
    console.log(err);
  }
}

async function alertListener(event) {
  try {
    console.log("EVENT TYPE == > ", event.eventTypeDesc);
    if (
      event.eventTypeDesc == "SHIPMENT" ||
      event.eventTypeDesc == "SHIPMENT_TRACKING"
    ) {
      await shipmentListener(event);
    } else if (event.eventTypeDesc == "ORDER") {
      await orderListener(event);
    } else if (event.eventTypeDesc == "INVENTORY") {
      await inventoryListener(event);
    }
    await subscribedAlerts(event);
  } catch (err) {
    console.log(err);
  }
}

async function subscribedAlerts(event) {
  let actorOrgIdParam = {
    "alerts.event_type_primary": event.eventTypePrimary,
    "alerts.event_type_secondary": event.eventTypeDesc,
    "alerts.actorOrgId": event.actorOrgId,
  };
  for await (const row of Alert.find({
    ...actorOrgIdParam,
  })) {
    if (row.alertMode.mobile && row.alertMode.email) {
      // alertMobile(event, row.user.mobile_number);
      // Send notification to user email & Mobile
      console.log("Send notification to user email & Mobile");
    } else {
      if (row.alertMode.mobile) {
        // alertMobile(event, row.user.mobile_number);
        console.log("Send notification to user in Mobile");
      }
      if (row.alertMode.email) {
        // Send notification to user email & Mobile
        console.log("Send notification to user in Email");
      }
    }
  }

  let txnIdParam = {
    "alerts.event_type_primary": event.eventTypePrimary,
    "alerts.event_type_secondary": event.eventTypeDesc,
    "alerts.transactionId": event.transactionId,
  };
  for await (const element of Alert.find({
    ...txnIdParam,
  })) {
    if (element.alertMode.mobile && element.alertMode.email) {
      // alertMobile(event, element.user.mobile_number);
      // Send notification to user email & Mobile
      console.log("Send notification to user email & Mobile");
    } else {
      if (element.alertMode.mobile) {
        // alertMobile(event, element.user.mobile_number);
        console.log("Send notification to user in Mobile");
      }
      if (element.alertMode.email) {
        // Send notification to user email & Mobile
        console.log("Send notification to user in Email");
      }
    }
  }
}

module.exports = {
  alertListener,
  inventoryListener,
};
