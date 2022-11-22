const RbacModel = require("../models/RbacModel");
const { body, validationResult } = require("express-validator");
const auth = require("../middlewares/jwt");
const { RbacCache } = require("../helpers/rbacCache");
const apiResponse = require("../helpers/apiResponse");

exports.getPermissions = [
	auth,
	async (req, res) => {
		try {
			const { role, orgId } = req.query;
			let query = {};
			if (role) {
				query.role = role;
			}
			if (orgId) {
				query.orgId = orgId;
			}
			const permissions = await RbacModel.find(query);
			return apiResponse.successResponseWithData(res, `Permissions - `, permissions);
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
      results.map((r) => {
        roles.push(r.role);
      });
      return apiResponse.successResponseWithData(res, "All Roles", roles);
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.updatePermissions = [
  auth,
  body("permissions")
    .isLength({ min: 1 })
    .withMessage("At least one permission must be specified."),
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
      const { role, permissions } = req.body;
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
        let rbac_object = await RbacModel.findOneAndUpdate(
          { role },
          { $set: permissions, permissions: permsArray },
          { new: true }
        );
        if (!rbac_object) {
          const rbac = new RbacModel({
            role,
            permissions: permsArray,
          });
          await rbac.save();
          rbac_object = await RbacModel.findOneAndUpdate(
            { role },
            { $set: permissions },
            { new: true }
          );
        }
        RbacCache();
        return apiResponse.successResponseWithData(res, "Success", rbac_object);
      }
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];

exports.rbacCache = [
  async (req, res) => {
    try {
      RbacCache();
      return apiResponse.successResponse(res, "Success Cache Updated");
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
exports.getRolesForTPL = [
	auth,
	async (req, res) => {
		try {
			var roles = [];
			const results = await RbacModel.find({ orgId: req.params.orgId }, { _id: 0, role: 1 });
			results.map((element) => {
				roles.push(element.role);
			});
			console.log("RESULTS LENGHT IS", results.length);
			if (results.length > 0) {
				return apiResponse.successResponseWithData(res, "All Roles", roles);
			} else {
				console.log(req.user);
				const searchObj = { role: "OrgAdmin", orgId: req.user.organisationId };
				console.log(getAllPermissions(utility.allPermissionsList));

				let rbac_object = await RbacModel.findOneAndUpdate(
					{ ...searchObj },
					{
						$set: utility.allPermissionsList,
						permissions: getAllPermissions(utility.allPermissionsList),
					},
					{ new: true, upsert: true },
				);
				roles.push("OrgAdmin");
				return apiResponse.successResponseWithData(res, "All Roles", roles);
			}
		} catch (err) {
			console.log(err);
			return apiResponse.ErrorResponse(res, err);
		}
	},
];
