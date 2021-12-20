const auth = require("../middlewares/jwt");
const apiResponse = require("../helpers/apiResponse");
const {
  checkPermissions,
  checkPermissionAwait,
} = require("../middlewares/rbac_middleware");
const RequestModel = require("../models/RequestModel");
const ShipmentModel = require("../models/ShipmentModel");
const EmployeeModel = require("../models/EmployeeModel");
const axios = require("axios");
const { asyncForEach } = require("../helpers/utility");
const URL =
  process.env.NOTIFICATION ||
  "https://test.vaccineledger.com/notificationmanagement/api/notification/pushNotification";

exports.getRequests = [
  auth,
  async (req, res) => {
    try {
      const { organisationId } = req.user;
      const requests = await RequestModel.find({
        "to.organisationId": organisationId,
      });
      return apiResponse.successResponseWithData(
        res,
        `All Requests for Organisation Id : ${organisationId}`,
        requests
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getRequestById = [
  auth,
  async (req, res) => {
    try {
      let { id } = req.query;
      const request = await RequestModel.aggregate([
        { $match: { id: id } },
        {
          $lookup: {
            from: "organisations",
            localField: "from.organisationId",
            foreignField: "id",
            as: "fromOrg",
          },
        },
        {
          $lookup: {
            from: "warehouses",
            localField: "from.warehouseId",
            foreignField: "id",
            as: "fromWarehouse",
          },
        },
      ]);
      let data = request[0];
      if (!data) {
        return apiResponse.notFoundResponse(res, "Request not found");
      }
      data.from.organisationName = request[0].fromOrg[0].name;
      if (request[0].fromWarehouse[0].postalAddress == null) {
        data.from.deliveryLocation =
          request[0].fromWarehouse[0].title +
          ", " +
          request[0].fromWarehouse[0].warehouseAddress.firstLine +
          " " +
          request[0].fromWarehouse[0].warehouseAddress.city +
          " " +
          request[0].fromWarehouse[0].warehouseAddress.state +
          " " +
          request[0].fromWarehouse[0].warehouseAddress.zipCode;
      } else {
        data.from.deliveryLocation = request[0].fromWarehouse[0].postalAddress;
      }
      data = (({ fromOrg, fromWarehouse, ...o }) => o)(data);
      const shipment = await ShipmentModel.aggregate([
        {
          $match: {
            "label.labelId": data.label.labelId,
          },
        },
        {
          $lookup: {
            from: "organisations",
            localField: "receiver.id",
            foreignField: "id",
            as: "receiverOrg",
          },
        },
        {
          $lookup: {
            from: "warehouses",
            localField: "receiver.locationId",
            foreignField: "id",
            as: "receiverWarehouse",
          },
        },
      ]);
      data.shipment = {};
      data.shipment.organisationName = shipment[0].receiverOrg[0].name;
      if (shipment[0].receiverWarehouse[0].postalAddress == null) {
        data.shipment.deliveryLocation =
          shipment[0].receiverWarehouse[0].title +
          ", " +
          shipment[0].receiverWarehouse[0].warehouseAddress.firstLine +
          " " +
          shipment[0].receiverWarehouse[0].warehouseAddress.city +
          " " +
          shipment[0].receiverWarehouse[0].warehouseAddress.state +
          " " +
          shipment[0].receiverWarehouse[0].warehouseAddress.zipCode;
      } else {
        data.shipment.deliveryLocation =
          shipment[0].receiverWarehouse[0].title +
          " " +
          shipment[0].receiverWarehouse[0].postalAddress;
      }
      return apiResponse.successResponseWithData(res, "Request", data);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.updateRequest = [
  auth,
  async (req, res) => {
    try {
      let shipment = true;
      const { id, status } = req.query;
      const oldRequest = await RequestModel.findOne({ id: id });
      if (oldRequest.status === "ACCEPTED") {
        return apiResponse.ErrorResponse(res, "Request already accepted");
      }
      if (!oldRequest.to.employees.includes(req.user.id)) {
        return apiResponse.ErrorResponse(
          res,
          "Not Eligible to Update a Request"
        );
      } else {
        const request = await RequestModel.findOneAndUpdate(
          { id: id },
          { $set: { status: status } },
          { new: true }
        );
        if (
        (status === "ACCEPTED") && (request.type === "LOCATION_MISMATCH" || request.type === "ORGANISATION_MISMATCH")){
          shipment = await ShipmentModel.findOneAndUpdate(
            { "label.labelId": request.label.labelId },
            {
              $push: { acceptedRequests: request.id },
              $set: {
                "receiver.id": request.from.organisationId,
                "receiver.locationId": request.from.warehouseId,
                "receiver.name": request.from.name,
              },
            }
          );
        }
        const notification = await axios.post(URL, {
          content: `Request #${request.id} for ${request.type} on ${request.label.labelId} has been ${request.status}`,
          mobile: request.from.phoneNumber,
          email: request.from.emailId,
          user: request.from.id,
          type: "ALERT",
          eventType: "REQUEST",
          transactionId: request.id,
          subject: `Request ${request.status}`,
        });
        if (shipment && notification.data.status) {
          return apiResponse.successResponseWithData(
            res,
            "Request Updated",
            request
          );
        } else {
          return apiResponse.ErrorResponse(res, "Request not updated");
        }
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.createRequest = [
  async (req, res) => {
    try {
      let { labelId, type } = req.body;
      const {
        organisationId,
        warehouseId,
        role,
        id,
        firstName,
        emailId,
        walletAddress,
        phoneNumber,
      } = req.user;
      let from = {
        name: firstName,
        id,
        organisationId,
        warehouseId,
        emailId,
        phoneNumber,
        walletAddress,
        role,
      };
      let contacts = new Map();
      let contactList = [];
      let to = {};
      let shipment = {};
      const send = async (shipmentId) => {
        try {
          const request = new RequestModel({
            from,
            to,
            "label.labelId": labelId,
            shipmentId,
            type,
          });
          let result = await request.save();
          contacts.forEach(async (element) => {
            try {
              const resp = await axios.post(URL, {
                content: `Request #${result.id} made by ${result.from.name} for ${result.type} from ${result.from.warehouseId} on Shipment #${result.shipmentId} Label ${result.label.labelId}`,
                mobile: element.phoneNumber,
                email: element.emailId,
                user: element.id,
                type: "ALERT",
                eventType: "REQUEST",
                transactionId: result.id,
                subject: `New Request from ${result.from.name}`,
              });
              console.log(resp.data);
            } catch (err) {
              console.log(err);
            }
          });
          return apiResponse.successResponse(res, "Request Created");
        } catch (err) {
          console.log(err);
          return apiResponse.ErrorResponse(res, err.message);
        }
      };

      const toEmployees = async (Employees, shipmentId) => {
        await asyncForEach(Employees, async (employee) => {
          const permission_request = {
            role: employee.role,
            permissionRequired: ["viewShipment"],
          };
          const permission = await checkPermissionAwait(permission_request);
          if (permission) {
            contacts.set(employee.id, employee);
            contactList.push(employee.id);
          }
        });
        to = {
          employees: contactList,
          warehouseId: shipment[0].supplier.locationId,
          organisationId: shipment[0].supplier.id,
        };
        send(shipmentId);
      };

      if (type === "LOCATION_MISMATCH" || type === "UNSUFFICIENT_ROLE") {
        shipment = await ShipmentModel.aggregate([
          { $match: { "label.labelId": labelId } },
          {
            $lookup: {
              from: "employees",
              let: { warehouse_Id: "$receiver.locationId" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["ACTIVE", "$accountStatus"] },
                        { $in: ["$$warehouse_Id", "$warehouseId"] },
                      ],
                    },
                  },
                },
              ],
              as: "receiverEmployees",
            },
          },
        ]);
        toEmployees(shipment[0].receiverEmployees, shipment[0].id);
      }
      if (type === "ORGANISATION_MISMATCH") {
        shipment = await ShipmentModel.aggregate([
          { $match: { "label.labelId": labelId } },
          {
            $lookup: {
              from: "employees",
              let: { warehouse_Id: "$supplier.locationId" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["ACTIVE", "$accountStatus"] },
                        { $in: ["$$warehouse_Id", "$warehouseId"] },
                      ],
                    },
                  },
                },
              ],
              as: "supplierEmployees",
            },
          },
        ]);
        toEmployees(shipment[0].supplierEmployees, shipment[0].id);
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.validateRequest = async (req, res) => {
  try {
    const { labelId } = req.query;
    let requestTypes = [];
    const shipmentCheck = await ShipmentModel.findOne({
      "label.labelId": labelId,
    });
    if (shipmentCheck != null) {
      const receiver = await ShipmentModel.findOne({
        "label.labelId": labelId,
      }).select("receiver");
      if (receiver.receiver.id == organisationId) {
        if (receiver.receiver.locationId !== warehouseId) {
          requestTypes.push("LOCATION_MISMATCH");
        }
      } else {
        requestTypes.push("ORGANISATION_MISMATCH");
      }
      const permission_request = {
        role: role,
        permissionRequired: ["viewShipment"],
      };
      checkPermissions(permission_request, async (permissionResult) => {
        if (!permissionResult.success) {
          requestType.push("UNSUFFICIENT_ROLE");
        }
      });
    }
    if (requestTypes.length > 0) {
      return apiResponse.successResponseWithData(
        res,
        "Scan Invalid with Errors",
        requestTypes
      );
    } else {
      return apiResponse.successResponse(res, "Scan Valid");
    }
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, err.message);
  }
};
