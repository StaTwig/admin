const OrganisationModel = require("../models/OrganisationModel");
const EmployeeModel = require("../models/EmployeeModel");
const { sendNotification } = require("./sender");
const { asyncForEach } = require("./utility");
const { checkPermissionAwait } = require("../middlewares/rbac_middleware");

async function getOrgName(orgId) {
  const org = await OrganisationModel.findOne({ id: orgId });
  if (org) {
    return org.name;
  } else {
    return "";
  }
}
async function getUserDetails(userId) {
  const user = await EmployeeModel.findOne({ id: userId });
  return user;
}

async function getEligibleUsers(warehouseId) {
  let eligibleUsers = [];
  const users = await EmployeeModel.find({
    warehouseId: { $in: [warehouseId] },
    accountStatus: "ACTIVE",
  });
  await asyncForEach(users, async (user) => {
    const permission_request = {
      role: user.role,
      permissionRequired: [
        "viewShipment",
        "createShipment",
        "shipmentAnalytics",
        "receiveShipment",
        "inboundShipments",
        "outboundShipments",
      ],
    };
    const permission = await checkPermissionAwait(permission_request);
    if (permission) {
      eligibleUsers.push(user);
    }
  });
  return eligibleUsers;
}

exports.shipmentCreate = async (event) => {
  const txnId = event?.payloadData?.data?.id || event?.transactionId;
  const createdOrgName = await getOrgName(event?.actorOrgId);
  const templateSender = `"Shipment - ${txnId}" to ${event?.secondaryOrgName}has been Created`;
  const templateSenderSpanish = `Se ha creado "Envío - ${txnId}" a ${event?.secondaryOrgName}`;
  const templateReceiver = `"Shipment - ${txnId}" from Organization - ${createdOrgName} has been Created`;
  const templateReceiverSpanish = `"Envío - ${txnId}" de la organización - ${createdOrgName} ha sido creado`;
  const getSenderDetails = await getUserDetails(event?.actorId);
  const dataSender = {
    user: event?.actorId,
    email: getSenderDetails.emailId,
    mobile: getSenderDetails.phoneNumber,
    subject: `Shipment Alert`,
    content:
      getSenderDetails.preferredLanguage == "EN"
        ? templateSender
        : templateSenderSpanish,
    type: "ALERT",
    eventType: "SHIPMENT",
    transactionId: txnId,
  };
  await sendNotification(dataSender);
  // if (event?.payloadData?.data?.receiver?.id) {   // if receiver userId is present then send notification to that user // Not Implemented yet so we are sending notification to all eligible users
  //   const getReceiverDetails = await getUserDetails(
  //     event.payloadData.data.receiverId
  //   );
  //   const dataReceiver = {
  //     user: event.payloadData.data.receiver.id,
  //     email: getReceiverDetails.emailId,
  //     mobile: getReceiverDetails.phoneNumber,
  //     subject: `Shipment Alert`,
  //     content: templateReceiver,
  //     type: "ALERT",
  //     eventType: "SHIPMENT",
  //     transactionId: txnId,
  //   };
  //   await sendNotification(dataReceiver);
  // } else {
  const getReceiverDetails = await getEligibleUsers(
    event?.payloadData?.data?.receiver?.locationId
  );
  getReceiverDetails.forEach(async (user) => {
    const dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Shipment Alert`,
      content:
        user.preferredLanguage == "EN"
          ? templateReceiver
          : templateReceiverSpanish,
      type: "ALERT",
      eventType: "SHIPMENT",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
  // }
};

exports.shipmentUpdate = async (event) => {
  const txnId = event?.payloadData?.data?.id || event?.transactionId;
  const actorOrgName = await getOrgName(event?.actorOrgId);
  const receiverOrgName = await getOrgName(
    event?.payloadData?.data?.receiver?.id
  );
  const templateActor = `"Shipment - ${txnId}" has been Updated`;
  const templateSupplier = `"Shipment - ${txnId}" to Organization - ${receiverOrgName} has been Updated`;
  const templateSupplierSpanish = `"Envío - ${txnId}" a la Organización - ${receiverOrgName} ha sido actualizado`;
  const templateReceiver = `"Shipment - ${txnId}" from Organization - ${actorOrgName} has been Updated`;
  const templateReceiverSpanish = `"Envío - ${txnId}" de la Organización - ${actorOrgName} ha sido actualizado`;
  const getSenderDetails = await getUserDetails(event?.actorId);
  let dataSender = {
    user: event?.actorId,
    email: getSenderDetails.emailId,
    mobile: getSenderDetails.phoneNumber,
    subject: `Shipment Alert`,
    content: templateActor,
    type: "ALERT",
    eventType: "SHIPMENT",
    transactionId: txnId,
  };
  await sendNotification(dataSender);
  let getSupplierDetails = await getEligibleUsers(
    event?.payloadData?.data?.supplier?.locationId
  );
  getSupplierDetails = getSupplierDetails.filter(
    (user) => user.id !== event?.actorId
  );
  await asyncForEach(getSupplierDetails, async (user) => {
    const dataSupplier = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Shipment Alert`,
      content:
        user.preferredLanguage == "EN"
          ? templateSupplier
          : templateSupplierSpanish,
      type: "ALERT",
      eventType: "SHIPMENT",
      transactionId: txnId,
    };
    await sendNotification(dataSupplier);
  });
  const getReceiverDetails = await getEligibleUsers(
    event.payloadData.data.receiver.locationId
  );
  await asyncForEach(getReceiverDetails, async (user) => {
    let dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Shipment Alert`,
      content:
        user.preferredLanguage == "EN"
          ? templateReceiver
          : templateReceiverSpanish,
      type: "ALERT",
      eventType: "SHIPMENT",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
};

exports.shipmentReceive = async (event) => {
  let txnId = event?.payloadData?.data?.id || event?.transactionId;
  let templateSender = `"Shipment - ${txnId}" has been Delivered`;
  let templateSenderSpanish = `"Envío - ${txnId}" ha sido entregado`;
  let getReceiverDetails = await getEligibleUsers(
    event?.payloadData?.data?.supplier?.locationId
  );
  await asyncForEach(getReceiverDetails, async (user) => {
    let dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Shipment Alert`,
      content:
        user.preferredLanguage == "EN" ? templateSender : templateSenderSpanish,
      type: "ALERT",
      eventType: "SHIPMENT",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
};

exports.shipmentDelayed = async (event) => {
  let txnId = event?.payloadData?.data?.id || event?.transactionId;
  let updatedOrgName = await getOrgName(event?.actorOrgId);
  let templateSender = `"Shipment - ${txnId}" has been Delayed`;
  let templateReceiver = `"Shipment - ${txnId}" from Organization - ${updatedOrgName} has been Delayed`;
  let getSenderDetails = await getEligibleUsers(
    event?.payloadData?.data?.supplier?.locationId
  );
  await asyncForEach(getSenderDetails, async (user) => {
    let dataSender = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Shipment Alert`,
      content: templateSender,
      type: "ALERT",
      eventType: "SHIPMENT",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
  });
  let getReceiverDetails = await getEligibleUsers(
    event?.payloadData?.data?.receiver?.locationId
  );
  await asyncForEach(getReceiverDetails, async (user) => {
    let dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Shipment Alert`,
      content: templateReceiver,
      type: "ALERT",
      eventType: "SHIPMENT",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
};
