const OrganisationModel = require("../models/OrganisationModel");

async function getOrgName(orgId) {
  if (orgId) {
    const org = await OrganisationModel.findById(orgId);
    return org.name;
  } else {
    return "";
  }
}

exports.shipmentCreate = async (event) => {
  let txnId = event?.payloadData?.data?.id;
  let createdOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let templateSender = `"Shipment - ${txnId}" has been Created`;
  let templateReceiver = `"Shipment - ${txnId}" from Organisation - ${createdOrgName} has been Created`;
};

exports.shipmentUpdate = async (event) => {
  let txnId = event?.payloadData?.data?.id;
  let updatedOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let templateSender = `"Shipment - ${txnId}" has been Updated`;
  let templateReceiver = `"Shipment - ${txnId}" from Organisation - ${updatedOrgName} has been Updated`;
};

exports.shipmentReceive = async (event) => {
  let txnId = event?.payloadData?.data?.id;
  let templateSender = `"Shipment - ${txnId}" has been Delivered`;
};

exports.shipmentDelayed = async (event) => {
  let txnId = event?.payloadData?.data?.id;
  let updatedOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let templateSender = `"Shipment - ${txnId}" has been Delayed`;
  let templateReceiver = `"Shipment - ${txnId}" from Organisation - ${updatedOrgName} has been Delayed`;
};
