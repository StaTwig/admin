const EmployeeModel = require("../models/EmployeeModel");
const WarehouseModel = require("../models/WarehouseModel");

async function getEligibleUsers(warehouseId) {
  let eligibleUsers = [];
  const users = await EmployeeModel.find({
    organisation: { $in: [warehouseId] },
    accountStatus: "ACTIVE",
  });
  users.forEach((user) => {
    const permission_request = {
      role: user.role,
      permissionRequired: [
        "viewInventory",
        "addInventory",
        "importInventory",
        "inventoryAnalytics",
        "inventoryFilters",
        "inventoryExportReport",
      ],
    };
    const permission = await checkPermissionAwait(permission_request);
    if (permission) {
      eligibleUsers.push(user);
    }
  });
}

exports.inventoryAdd = async (event) => {
  let txnId = event.transactionId;
  let template = `"Inventory - ${txnId}" has been Added`;
  if (event.actorId) {
    const actor = await EmployeeModel.findOne(event.actorId);
    let dataSender = {
      user: event?.actorId,
      email: actor.emailId,
      mobile: actor.phoneNumber,
      subject: `Inventory Alert`,
      content: template,
      type: "ALERT",
      eventType: "INVENTORY",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
    // template = `${actor.firstName} ${actor.lastName} has added "Inventory - ${txnId}" to the inventory`;
  }
};
exports.inventoryUpdate = async (event) => {
  let txnId = event.transactionId;
  let template = `"Inventory - ${txnId}" has been Updated`;
  if (event.actorId) {
    const actor = await EmployeeModel.findOne(event.actorId);
    let dataSender = {
      user: event?.actorId,
      email: actor.emailId,
      mobile: actor.phoneNumber,
      subject: `Inventory Alert`,
      content: template,
      type: "ALERT",
      eventType: "INVENTORY",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
  }
};
exports.inventoryNearExpiry = async (event) => {
  let txnId = event.transactionId;
  let template = `"Inventory - ${txnId}" will expire soon`;
  if (event.actorId) {
    const actor = await EmployeeModel.findOne(event.actorId);
    let dataSender = {
      user: event?.actorId,
      email: actor.emailId,
      mobile: actor.phoneNumber,
      subject: `Inventory Alert`,
      content: template,
      type: "ALERT",
      eventType: "INVENTORY",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
  }
};
exports.inventoryExpired = async (event) => {
  let txnId = event.transactionId;
  let template = `"Inventory - ${txnId}" has expired`;
  const warehouseId = await WarehouseModel.find({ warehouseInventory: txnId });
  for (warehouse of warehouseId) {
    const employees = await getEligibleUsers(warehouse.id);
    employees.forEach((user) => {
      let dataReceiver = {
        user: user.id,
        email: user.emailId,
        mobile: user.phoneNumber,
        subject: `Inventory Alert`,
        content: template,
        type: "ALERT",
        eventType: "INVENTORY",
        transactionId: txnId,
      };
      await sendNotification(dataReceiver);
    });
  }
};
