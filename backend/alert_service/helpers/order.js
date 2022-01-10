const OrganisationModel = require("../models/OrganisationModel");
const EmployeeModel = require("../models/EmployeeModel");
const { sendNotification } = require("./sender");
const { asyncForEach } = require("./utility");
const { checkPermissionAwait } = require("../middlewares/rbac_middleware");
const RecordModel = require("../models/RecordModel");

async function getOrgName(orgId) {
  const org = await OrganisationModel.findOne({ id: orgId });
  if (org) return org.name;
  return "";
}

async function getEligibleUsers(locationId, type) {
  let eligibleUsers = [];
  let users = [];
  if (type === "WAREHOUSE") {
    users = await EmployeeModel.find({
      warehouseId: { $in: [locationId] },
      accountStatus: "ACTIVE",
    });
  } else {
    users = await EmployeeModel.find({
      organisationId: locationId,
      accountStatus: "ACTIVE",
    });
  }
  await asyncForEach(users, async (user) => {
    const permission_request = {
      role: user.role,
      permissionRequired: [
        "createOrder",
        "importOrder",
        "orderAnalytics",
        "receiveOrder",
        "acceptRejectOrder",
      ],
    };
    const permission = await checkPermissionAwait(permission_request);
    if (permission) {
      eligibleUsers.push(user);
    }
  });
  return eligibleUsers;
}

async function getCreator(txnId) {
  const user = await RecordModel.aggregate([
    { $match: { id: txnId } },
    {
      $lookup: {
        from: "employees",
        localField: "createdBy",
        foreignField: "id",
        as: "creator",
      },
    },
  ]);
  if (user.length > 0) {
    return user[0].creator[0];
  }
  return null;
}

exports.orderCreated = async (event) => {
  const txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  const senderOrgName = await getOrgName(event?.secondaryOrgId);
  const templateReceiver = `Received a new "Order - ${txnId}" from ${senderOrgName} - ${event?.secondaryOrgId}`;
  const templateOthers = `"Order - ${txnId}" has been created by ${senderOrgName} - ${event?.secondaryOrgId}`;
  const eligibleUsers = await getEligibleUsers(
    event.actorOrgId,
    "ORGANISATION"
  );
  for (const user of eligibleUsers) {
    const dataSender = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Order Alert`,
      content: templateReceiver,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
  }
  if (event.caId && event.caId !== "null") {
    const caUsers = await getEligibleUsers(event.caId, "ORGANISATION");
    for (const user of caUsers) {
      const dataOthers = {
        user: user.id,
        email: user.emailId,
        mobile: user.phoneNumber,
        subject: `Order Alert`,
        content: templateOthers,
        type: "ALERT",
        eventType: "ORDER",
        transactionId: txnId,
      };
      await sendNotification(dataOthers);
    }
  }
};

exports.orderAccept = async (event) => {
  const txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  const templateSender = `Your "Order - ${txnId}" has been Accepted by ${event.actorOrgName} - ${event.actorOrgId}`;
  const creatorUser = await getCreator(txnId);
  if (creatorUser) {
    const dataSender = {
      user: creatorUser.id,
      email: creatorUser.emailId,
      mobile: creatorUser.phoneNumber,
      subject: `Order Alert`,
      content: templateSender,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
  }
  const eligibleUsers = await getEligibleUsers(
    event.secondaryOrgId,
    "ORGANISATION"
  );
  for (const user of eligibleUsers) {
    const dataSender = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Order Alert`,
      content: templateSender,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
  }
};

exports.orderReject = async (event) => {
  const txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  const templateSender = `Your "Order - ${txnId}" has been Rejected by ${event?.actorOrgName} - ${event?.actorOrgId}`;
  const creatorUser = await getCreator(txnId);
  if (creatorUser) {
    const dataSender = {
      user: creatorUser.id,
      email: creatorUser.emailId,
      mobile: creatorUser.phoneNumber,
      subject: `Order Alert`,
      content: templateSender,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
  }
  const eligibleUsers = await getEligibleUsers(
    event.secondaryOrgId,
    "ORGANISATION"
  );
  await asyncForEach(eligibleUsers, async (user) => {
    const dataSender = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Order Alert`,
      content: templateSender,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
  });
};

exports.orderPending = async (event) => {
  try {
    const txnId = event?.transactionId;
    const customerOrgName = await getOrgName(event?.secondaryOrgId);
    const templateCustomer = `Your "Order - ${txnId}" is still under Review`;
    const templateSupplier = `"Order - ${txnId}" from Organization - ${customerOrgName} / ${event?.secondaryOrgId} is Pending`;
    const creatorUser = await getCreator(txnId);
    const dataSender = {
      user: creatorUser.id,
      email: creatorUser.emailId,
      mobile: creatorUser.phoneNumber,
      subject: `Order Alert`,
      content: templateCustomer,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
    const supplierOrgUsers = await getEligibleUsers(
      event.actorOrgId,
      "ORGANISATION"
    );
    const customerOrgUsers = await getEligibleUsers(
      event?.secondaryOrgId,
      "ORGANISATION"
    );
    for (const user of supplierOrgUsers) {
      const dataSupplier = {
        user: user.id,
        email: user.emailId,
        mobile: user.phoneNumber,
        subject: `Order Alert`,
        content: templateSupplier,
        type: "ALERT",
        eventType: "ORDER",
        transactionId: txnId,
      };
      await sendNotification(dataSupplier);
    }
    for (const user of customerOrgUsers) {
      const dataReceiver = {
        user: user.id,
        email: user.emailId,
        mobile: user.phoneNumber,
        subject: `Order Alert`,
        content: templateCustomer,
        type: "ALERT",
        eventType: "ORDER",
        transactionId: txnId,
      };
      await sendNotification(dataReceiver);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.orderDefault = async (event) => {
  const txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  const actorOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  const secondaryOrgName =
    event?.secondaryOrgName || (await getOrgName(event?.secondaryOrgId));
  const templateActor = `"New updates on "Order - ${txnId}" of ${event.actorOrgId} ${actorOrgName}`;
  const templateSecondary = `"New updates on "Order - ${txnId}" of ${event.secondaryOrgId} ${secondaryOrgName}`;
  const creatorUser = await getCreator(txnId);
  if (creatorUser) {
    const dataSender = {
      user: creatorUser.id,
      email: creatorUser.emailId,
      mobile: creatorUser.phoneNumber,
      subject: `Order Alert`,
      content: templateActor,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataSender);
  } else {
    let eligibleUsers = [];
    if (event.actorWarehouseId) {
      eligibleUsers = await getEligibleUsers(
        event.actorWarehouseId,
        "WAREHOUSE"
      );
    } else {
      eligibleUsers = await getEligibleUsers(event.actorOrgId, "ORGANISATION");
    }
    for (const user of eligibleUsers) {
      const dataSender = {
        user: user.id,
        email: user.emailId,
        mobile: user.phoneNumber,
        subject: `Order Alert`,
        content: templateSecondary,
        type: "ALERT",
        eventType: "ORDER",
        transactionId: txnId,
      };
      await sendNotification(dataSender);
    }
  }
  const secondaryOrgUsers = await getEligibleUsers(
    event.secondaryOrgId,
    "ORGANISATION"
  );
  for (const user of secondaryOrgUsers) {
    const dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Order Alert`,
      content: templateActor,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  }
};
