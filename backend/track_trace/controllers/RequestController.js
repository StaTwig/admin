const auth = require("../middlewares/jwt");
const apiResponse = require("../helpers/apiResponse");
const { ScanShipment } = require("../helpers/scan");
const { checkPermissions } = require("../middlewares/rbac_middleware");
const RequestModel = require("../models/RequestModel");
const ShipmentModel = require("../models/ShipmentModel");
const EmployeeModel = require("../models/EmployeeModel");
const axios = require("axios");
const URL = process.env.NOTIFICATION;

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
      const { id } = req.query;
      const request = await RequestModel.findOne({ id: id });
      return apiResponse.successResponseWithData(res, "Request", request);
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
      const { id, status } = req.query;
      const request = await RequestModel.findOneAndUpdate(
        { id: id },
        { $set: { status: status } },
        { new: true }
      );
      return apiResponse.successResponseWithData(
        res,
        "Request Updated",
        request
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.createRequest = [
  auth,
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
      console.log("ID", id);
      // let requestTypes = [];
      // if (type !== undefined) {
      //   const shipmentCheck = await ShipmentModel.findOne({
      //     "label.labelId": labelId,
      //   });
      //   if (shipmentCheck != null) {
      //     const receiver = await ShipmentModel.findOne({
      //       "label.labelId": labelId,
      //     }).select("receiver");
      //     if (receiver.receiver.id == organisationId) {
      //       if (receiver.receiver.locationId !== warehouseId) {
      //         requestTypes.push("LOCATION_MISMATCH");
      //       }
      //     } else {
      //       requestTypes.push("ORGANISATION_MISMATCH");
      //     }
      const permission_request = {
        role: role,
        permissionRequired: ["viewShipment"],
      };
      //     checkPermissions(permission_request, async (permissionResult) => {
      //       if (!permissionResult.success) {
      //         requestType.push("UNSUFFICIENT_ROLE");
      //       }
      //     });
      //   }
      //   type = requestTypes;
      // }
      // type.forEach(async (element) => {
      let element = type;
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
      let contactList = new Set();
      let contacts = [];
      let to = {};
      const shipment = await ScanShipment(labelId);
      if (element === "LOCATION_MISMATCH") {
        const { supervisors, employees } = shipment[0].receiver.warehouse;
        if (supervisors.length > 0) {
          supervisors.forEach((supervisor) => {
            contactList.add(supervisor);
          });
        }
        if (employees.length > 0) {
          employees.forEach((contact) => {
            contactList.add(contact);
          });
        }
        contactList.forEach((contact) => {
          console.log(contact);
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              contacts.push(contact);
            }
          });
        });
        to = {
          employees: contacts,
          warehouseId: shipment[0].receiver.locationId,
          organisationId: shipment[0].receiver.id,
        };
      }
      if (element === "ORGANISATION_MISMATCH") {
        let { supervisors, employees } = shipment[0].supplier.warehouse;
        if (supervisors.length > 0) {
          supervisors.forEach((supervisor) => {
            contactList.add(supervisor);
          });
        }
        if (employees.length > 0) {
          employees.forEach((contact) => {
            contactList.add(contact);
          });
        }
        contactList.forEach((contact) => {
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              contacts.push(contact);
            }
          });
        });
        to = {
          employees: contacts,
          warehouseId: shipment[0].supplier.locationId,
          organisationId: shipment[0].supplier.id,
        };
      }
      if (element === "UNSUFFICIENT_ROLE") {
        const { supervisors, employees } = shipment[0].org;
        if (supervisors.length > 0) {
          supervisors.forEach((supervisor) => {
            contactList.add(supervisor);
          });
        }
        if (employees.length > 0) {
          employees.forEach((contact) => {
            contactList.add(contact);
          });
        }
        contactList.forEach((contact) => {
          console.log(contact);
          checkPermissions(permission_request, async (permissionResult) => {
            if (permissionResult.success) {
              contacts.push(contact);
            }
          });
        });
        to = {
          employees: contacts,
          warehouseId: shipment[0].receiver.locationId,
          organisationId: shipment[0].receiver.id,
        };
      }
      const request = new RequestModel({
        from,
        to,
        "label.labelId": labelId,
        type: element,
      });
      let result = await request.save();
      to.employees.forEach(async (element) => {
        const employee = await EmployeeModel.findOne({ id: element });
        await axios.post(URL, {
          content: `Request ${result.id} made by ${result.from.name} for ${result.type} from ${result.from.warehouseId} on ${result.label.labelId}`,
          mobile: employee.phoneNumber,
          emailId: employee.emailId,
        });
      });
      // });
      return apiResponse.successResponse(res, "Request Created");
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
