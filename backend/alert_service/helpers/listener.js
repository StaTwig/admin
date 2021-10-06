const {
  shipmentCreate,
  shipmentDelayed,
  shipmentReceive,
  shipmentUpdate,
} = require("./shipment");
const {
  orderAccept,
  orderPending,
  orderReceive,
  orderReject,
  orderDefault,
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
        await shipmentCreate(event);
        break;
      case "UPDATE":
        await shipmentUpdate(event);
        break;
      case "RECEIVE":
        await shipmentReceive(event);
        break;
      case "DELAYED":
        await shipmentDelayed(event);
        break;
      default:
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
        await orderPending(event);
        break;
      case "RECEIVE":
        await orderReceive(event);
        break;
      case "ACCEPT":
        await orderAccept(event);
        break;
      case "REJECT":
        await orderReject(event);
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
        await inventoryAdd(event);
        break;
      case "UPDATE":
        await inventoryUpdate(event);
        break;
      case "EXPIRED":
        await inventoryExpired(event);
        break;
      case "NEAR_EXPIRY":
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
    if (event.eventTypeDesc == "SHIPMENT" || "SHIPMENT_TRACKING") {
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
  let params = {
    "alerts.event_type_primary": event.eventTypePrimary,
    "alerts.event_type_secondary": event.eventTypeDesc,
    "alerts.actorOrgId": event.actorOrgId,
  };
  for await (const row of Alert.find({
    ...params,
  })) {
    if (row.alertMode.mobile && row.alertMode.email) {
      // alertMobile(event, row.user.mobile_number);
      // Send notification to user email & Mobile
    } else {
      if (row.alertMode.mobile) {
        // alertMobile(event, row.user.mobile_number);
      }
      if (row.alertMode.email) {
        // Send notification to user email & Mobile
      }
    }
  }

  let params = {
    "alerts.event_type_primary": event.eventTypePrimary,
    "alerts.event_type_secondary": event.eventTypeDesc,
    "alerts.transactionId": event.transactionId,
  };
  for await (const element of Alert.find({
    ...params,
  })) {
    if (element.alertMode.mobile && element.alertMode.email) {
      // alertMobile(event, element.user.mobile_number);
      // Send notification to user email & Mobile
    } else {
      if (element.alertMode.mobile) {
        // alertMobile(event, element.user.mobile_number);
      }
      if (element.alertMode.email) {
        // Send notification to user email & Mobile
      }
    }
  }
}
