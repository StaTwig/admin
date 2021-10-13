const OrganisationModel = require("../models/OrganisationModel");
const EmployeeModel = require("../models/EmployeeModel");
const { sendNotification } = require("./sender");
const { checkPermissionAwait } = require("../middlewares/rbac_middleware");

async function getOrgName(orgId) {
  if (orgId) {
    const org = await OrganisationModel.findOne({ id: orgId });
    return org.name;
  } else {
    return "";
  }
}

async function getUserDetails(userId) {
  const user = await EmployeeModel.findOne({ id: userId });
  return user;
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
  users.forEach(async (user) => {
    const permission_request = {
      role: user.role,
      permissionRequired: [
        "createOrder",
        "importOrder",
        "orderAnalytics",
        "receiveOrde",
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

exports.orderCreated = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let updatedOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let updatedSecondaryOrgName = event?.secondaryOrgName
    ? event.secondaryOrgName
    : await getOrgName(event?.secondaryOrgId);
  let templateSender = `"Order - ${txnId}" has been sent`;
  let templateReceiver = `Received a new Order "Order - ${txnId}" from ${event?.secondaryOrgId} ${updatedSecondaryOrgName}`;
  let templateOthers = `"Order - ${txnId}" has been created by ${event?.actorOrgId} ${updatedOrgName}"`;
  if (event.actorId && event.actorUserid) {
    const mobile = await getUserDetails(actorId).phoneNumber;
    let dataSender = {
      user: actorId,
      email: actorUserid,
      mobile: mobile,
      subject: `Order Alert`,
      content: templateSender,
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
    eligibleUsers.forEach(async (user) => {
      let dataSender = {
        user: user.id,
        email: user.emailId,
        mobile: user.phoneNumber,
        subject: `Ordger Alert`,
        content: templateSender,
        type: "ALERT",
        eventType: "ORDER",
        transactionId: txnId,
      };
      await sendNotification(dataSender);
    });
  }
  const secondaryOrgUsers = await getEligibleUsers(
    event.secondaryOrgId,
    "ORGANISATION"
  );
  secondaryOrgUsers.forEach(async (user) => {
    let dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Ordger Alert`,
      content: templateReceiver,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
  if (event.caId) {
    const caUsers = await getEligibleUsers(event.caId, "ORGANISATION");
    caUsers.forEach(async (user) => {
      let dataReceiver = {
        user: user.id,
        email: user.emailId,
        mobile: user.phoneNumber,
        subject: `Ordger Alert`,
        content: templateOthers,
        type: "ALERT",
        eventType: "ORDER",
        transactionId: txnId,
      };
      await sendNotification(dataReceiver);
    });
  }
};
exports.orderAccept = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let updatedOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let templateSender = `Your "Order - ${txnId}" has been Accepted by ${event?.actorOrgId} ${updatedOrgName}`;
  let templateReceiver = `Accepted "Order - ${txnId}"`;
  if (event.actorId && event.actorUserid) {
    const mobile = await getUserDetails(actorId).phoneNumber;
    let dataSender = {
      user: actorId,
      email: actorUserid,
      mobile: mobile,
      subject: `Order Alert`,
      content: templateReceiver,
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
    eligibleUsers.forEach(async (user) => {
      let dataSender = {
        user: user.id,
        email: user.emailId,
        mobile: user.phoneNumber,
        subject: `Ordger Alert`,
        content: templateReceiver,
        type: "ALERT",
        eventType: "ORDER",
        transactionId: txnId,
      };
      await sendNotification(dataSender);
    });
  }
  const secondaryOrgUsers = await getEligibleUsers(
    event.secondaryOrgId,
    "ORGANISATION"
  );
  secondaryOrgUsers.forEach(async (user) => {
    let dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Ordger Alert`,
      content: templateSender,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
};

exports.orderReject = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let updatedOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let templateSender = `Your "Order - ${txnId}" has been Rejected by ${event?.actorOrgId} ${updatedOrgName}`;
  let templateReceiver = `Rejected "Order - ${txnId}"`;
  if (event.actorId && event.actorUserid) {
    let dataSender = {
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
    eligibleUsers.forEach(async (user) => {
      let dataSender = {
        user: user.id,
        email: user.emailId,
        mobile: user.phoneNumber,
        subject: `Ordger Alert`,
        content: templateSender,
        type: "ALERT",
        eventType: "ORDER",
        transactionId: txnId,
      };
      await sendNotification(dataSender);
    });
  }
  const secondaryOrgUsers = await getEligibleUsers(
    event.secondaryOrgId,
    "ORGANISATION"
  );
  secondaryOrgUsers.forEach(async (user) => {
    let dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Ordger Alert`,
      content: templateReceiver,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
};

exports.orderPending = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let createdOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let templateSender = `Your "Order - ${txnId}" is still under Review`;
  let templateReceiver = `"Order - ${txnId}" from Organisation - ${createdOrgName} is Pending`;
  if (event.actorId && event.actorUserid) {
    let dataSender = {
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
    eligibleUsers.forEach(async (user) => {
      let dataSender = {
        user: user.id,
        email: user.emailId,
        mobile: user.phoneNumber,
        subject: `Ordger Alert`,
        content: templateSender,
        type: "ALERT",
        eventType: "ORDER",
        transactionId: txnId,
      };
      await sendNotification(dataSender);
    });
  }
  const secondaryOrgUsers = await getEligibleUsers(
    event.secondaryOrgId,
    "ORGANISATION"
  );
  secondaryOrgUsers.forEach(async (user) => {
    let dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Ordger Alert`,
      content: templateReceiver,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
};

exports.orderDefault = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let updatedOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let template = `"New updates on "Order - ${txnId}"  from ${actorOrgId} ${updatedOrgName}`;
  if (event.actorId && event.actorUserid) {
    let dataSender = {
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
    eligibleUsers.forEach(async (user) => {
      let dataSender = {
        user: user.id,
        email: user.emailId,
        mobile: user.phoneNumber,
        subject: `Ordger Alert`,
        content: templateSender,
        type: "ALERT",
        eventType: "ORDER",
        transactionId: txnId,
      };
      await sendNotification(dataSender);
    });
  }
  const secondaryOrgUsers = await getEligibleUsers(
    event.secondaryOrgId,
    "ORGANISATION"
  );
  secondaryOrgUsers.forEach(async (user) => {
    let dataReceiver = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Ordger Alert`,
      content: templateReceiver,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
};
