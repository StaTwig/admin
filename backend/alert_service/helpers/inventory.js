const EmployeeModel = require("../models/EmployeeModel");
const { sendNotification } = require("./sender");
const { checkPermissionAwait } = require("../middlewares/rbac_middleware");
const { asyncForEach } = require("./utility");

async function getEligibleUsers(warehouseId) {
  const eligibleUsers = [];
  const users = await EmployeeModel.find({
    warehouseId: { $in: [warehouseId] },
    accountStatus: "ACTIVE",
  });
  asyncForEach(users, async (user) => {
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
  let txnId = event?.transactionId;
  let template = `"Inventory - ${txnId}" has been Added`;
  let templateSpanish = `Se agregó "Inventario - ${txnId}"`;
  if (event?.actorId) {
    const actor = await EmployeeModel.findOne({ id: event.actorId });
    let dataSender = {
      user: actor.id,
      email: actor.emailId,
      mobile: actor.phoneNumber,
      subject: `Inventory Alert`,
      content: actor.preferredLanguage == "EN" ? template : templateSpanish,
      type: "ALERT",
      eventType: "INVENTORY",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
  }
};
exports.inventoryUpdate = async (event) => {
  let txnId = event?.transactionId;
  let template = `"Inventory - ${txnId}" has been Updated`;
  let templateSpanish = `"Inventario - ${txnId}" ha sido actualizado`;
  if (event?.actorId) {
    const actor = await EmployeeModel.findOne({ id: event.actorId });
    let dataSender = {
      user: event.actorId,
      email: actor.emailId,
      mobile: actor.phoneNumber,
      subject: `Inventory Alert`,
      content: actor.preferredLanguage == "EN" ? template : templateSpanish,
      type: "ALERT",
      eventType: "INVENTORY",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
  }
};
exports.inventoryNearExpiry = async (event) => {
  let txnId = event?.transactionId;
  let template = `"Inventory - ${txnId}" (Quantity : ${event?.quantity}) will expire soon`;
  let templateSpanish = `"Inventario - ${txnId}" (Cantidad: ${event?.cantidad}) caducará pronto`;
  const employees = await getEligibleUsers(event.actorWarehouseId);
  await asyncForEach(employees, async (user) => {
    const dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Inventory Alert`,
      content: user.preferredLanguage == "EN" ? template : templateSpanish,
      type: "ALERT",
      eventType: "INVENTORY",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
};
exports.inventoryExpired = async (event) => {
  const txnId = event.transactionId;
  const template = `"Inventory - ${txnId}" (Quantity : ${event?.quantity}) has expired`;
  const templateSpanish = `"Inventario - ${txnId}" (Cantidad: ${event?.quantity}) ha caducado`;
  const employees = await getEligibleUsers(event.actorWarehouseId);
  await asyncForEach(employees, async (user) => {
    const dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Inventory Alert`,
      content: user.preferredLanguage == "EN" ? template : templateSpanish,
      type: "ALERT",
      eventType: "INVENTORY",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
};
