const RbacModel = require("../models/RbacModel");
const { body, validationResult } = require("express-validator");
const auth = require("../middlewares/jwt");
const apiResponse = require("../helpers/apiResponse");
const { default: axios } = require("axios");
const dotenv = require("dotenv").config();

exports.getPermissions = [
  auth,
  async (req, res) => {
    try {
      const { role } = req.query;
      if (role) {
        const permissions = await RbacModel.find({ role }) ;
        return apiResponse.successResponseWithData(
          res,
          `Permissions of ${role}`,
          permissions
        );
      } else {
        const permissions = req.params.orgId ? await RbacModel.find({ orgId : req.params.orgId }) : await RbacModel.find({})
        return apiResponse.successResponseWithData(
          res,
          "All Permissions",
          permissions
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.getRoles = [
  auth,
  async (req, res) => {
    try {
      var roles = [];
      const results = await RbacModel.find({}, { _id: 0, role: 1 });
      results.map((element) => {
        roles.push(element.role);
      });
      return apiResponse.successResponseWithData(res, "All Roles", roles);
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getRolesForTPL = [
  auth,
  async (req, res) => {
    try {
      var roles = [];
      const results = await RbacModel.find({ orgId : req.params.orgId }, { _id: 0, role: 1});
      results.map((element) => {
        roles.push(element.role);
      });
      return apiResponse.successResponseWithData(res, "All Roles", roles);
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updatePermissions = [
  auth,
  body("permissions")
    .isLength({ min: 1 })
    .withMessage("Permission Structure must be specified."),
  body("role")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Role must be specified."),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      }
      const { role, permissions, orgId } = req.body;
      if (role == "powerUser") {
        return apiResponse.unauthorizedResponse(
          res,
          "You cannot update permissions of powerUser role."
        );
      } else {
        var permsArray = [];
        for (var i in permissions) {
          for (const [key, value] of Object.entries(permissions[i])) {
            if (value == true) {
              permsArray.push(key);
            }
            if (value == false) {
              permsArray = permsArray.filter((elem) => elem !== key);
            }
          }
        }
        const searchObj = orgId ? { role : role , orgId : orgId } : { ...role };
        let rbac_object = await RbacModel.findOneAndUpdate(
          { ...searchObj },
          { $set: permissions, permissions: permsArray },
          { new: true, upsert: true }
        );
        const result = await axios.get(
          process.env.LEDGER + "/rbacmanagement/api/rbacCache"
        );
        if (result.data == undefined) {
          return apiResponse.errorResponse(res, result.data);
        }
        return apiResponse.successResponseWithData(res, "Success", rbac_object);
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
