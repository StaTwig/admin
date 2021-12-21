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

async function employeeOrg(userId) {
  const org = await EmployeeModel.aggregate([
    { $match: { userId: userId } },
    {
      $lookup: {
        from: "organisations",
        localField: "organisationId",
        foreignField: "id",
        as: "org",
      },
    },
  ]);
  if (org.length > 0) {
    return org[0].org[0];
  }
  return "";
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
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let sendorOrg = await employeeOrg(event?.actorId);
  let senderEmployeeName = (await getUserDetails(event?.actorId).name) || "";
  let templateReceiver = `Received a new "Order - ${txnId}" from ${senderEmployeeName} from ${sendorOrg.name}-${sendorOrg.id}`;
  let templateOthers = `"Order - ${txnId}" has been created by ${senderEmployeeName} from ${sendorOrg.name}-${sendorOrg.id}`;
  const eligibleUsers = await getEligibleUsers(
    event.actorOrgId,
    "ORGANISATION"
  );
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
  if (event.caId && event.caId !== "null") {
    const caUsers = await getEligibleUsers(event.caId, "ORGANISATION");
    caUsers.forEach(async (user) => {
      let dataOthers = {
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
    });
  }
};

exports.orderAccept = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let acceptedOrg = await employeeOrgName(event?.actorId);
  let acceptedEmployeeName = (await getUserDetails(event?.actorId).name) || "";
  let templateSender = `Your "Order - ${txnId}" has been Accepted by ${acceptedEmployeeName} from ${acceptedOrg.name}-${acceptedOrg.id}`;
  const creatorUser = await getCreator(txnId);
  if (creatorUser) {
    let dataSender = {
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
  } else {
    const eligibleUsers = await getEligibleUsers(
      event.actorOrgId,
      "ORGANISATION"
    );
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
};

exports.orderReject = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let rejectedOrg = await employeeOrgName(event?.actorId);
  let rejectedEmployeeName = (await getUserDetails(event?.actorId).name) || "";
  let templateSender = `Your "Order - ${txnId}" has been Accepted by ${rejectedEmployeeName} from ${rejectedOrg.name}-${rejectedOrg.id}`;
  const creatorUser = await getCreator(txnId);
  if (creatorUser) {
    let dataSender = {
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
  } else {
    const eligibleUsers = await getEligibleUsers(
      event.actorOrgId,
      "ORGANISATION"
    );
    await asyncForEach(eligibleUsers, async (user) => {
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
};

exports.orderPending = async (event) => {
  try {
    let txnId = event?.transactionId;
    let createdOrgName = await getOrgName(event?.actorOrgId);
    let templateSender = `Your "Order - ${txnId}" is still under Review`;
    let templateReceiver = `"Order - ${txnId}" from Organisation - ${createdOrgName} is Pending`;
    if (event?.actorId && event?.actorUserid) {
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
      if (event?.actorWarehouseId) {
        eligibleUsers = await getEligibleUsers(
          event?.actorWarehouseId,
          "WAREHOUSE"
        );
      } else {
        eligibleUsers = await getEligibleUsers(
          event?.actorOrgId,
          "ORGANISATION"
        );
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
      event?.secondaryOrgId,
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
  } catch (error) {
    console.log(error);
  }
};

exports.orderDefault = async (event) => {
  let txnId = event?.payloadData?.data?.order_id || event?.transactionId;
  let updatedOrgName = event?.actorOrgName
    ? event.actorOrgName
    : await getOrgName(event?.actorOrgId);
  let template = `"New updates on "Order - ${txnId}" from ${event.actorOrgId} ${updatedOrgName}`;
  if (event?.actorId && event?.actorUserid) {
    let dataSender = {
      user: user.id,
      email: user.emailId,
      mobile: user.phoneNumber,
      subject: `Order Alert`,
      content: template,
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
        content: template,
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
      content: template,
      type: "ALERT",
      eventType: "ORDER",
      transactionId: txnId,
    };
    await sendNotification(dataReceiver);
  });
};
