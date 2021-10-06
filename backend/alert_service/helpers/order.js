const OrganisationModel = require("../models/OrganisationModel");

async function getOrgName(orgId) {
  if (orgId) {
    const org = await OrganisationModel.findById(orgId);
    return org.name;
  } else {
    return "";
  }
}

exports.orderReceive = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let updatedOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let templateSender = `"Order - ${txnId}" has been sent`;
  let templateReceiver = `Received a new Order "Order - ${txnId}" from ${event?.actorOrgId} ${updatedOrgName}`;
  let templateOthers = `"Order - ${txnId}" has been created by ${event?.actorOrgId} ${updatedOrgName}"`;
};

exports.orderAccept = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let updatedOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let templateSender = `Your "Order - ${txnId}" has been Accepted by ${event?.actorOrgId} ${updatedOrgName}`;
  let templateReceiver = `Accepted "Order - ${txnId}"`;
};

exports.orderReject = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let updatedOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let templateSender = `Your "Order - ${txnId}" has been Rejected by ${event?.actorOrgId} ${updatedOrgName}`;
  let templateReceiver = `Rejected "Order - ${txnId}"`;
};

exports.orderPending = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let createdOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let templateSender = `Your "Order - ${txnId}" is still under Review`;
  let templateReceiver = `"Order - ${txnId}" from Organisation - ${createdOrgName} is Pending`;
};

exports.orderDefault = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let updatedOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let template = `"New updates on "Order - ${txnId}"  from ${actorOrgId} ${updatedOrgName}`;
};
