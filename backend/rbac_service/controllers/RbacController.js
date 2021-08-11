const RbacModel = require('../models/RbacModel');
const { body, validationResult } = require('express-validator');
const checkToken = require('../middlewares/middleware').checkToken;
const auth = require('../middlewares/jwt');

const apiResponse = require('../helpers/apiResponse');

exports.getPermissions = [
  auth,
  async (req, res) => {
    try {
          const permissions = await RbacModel.find({});
          return apiResponse.successResponseWithData(res, "All Permissions", permissions);
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addPermissions = [
  auth,
  body('permissions')
    .isLength({ min: 1 })
    .withMessage('At least one permission must be specified.'),
  body('role')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Role must be specified.'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Display sanitized values/errors messages.
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      }
        const { role, permissions } = req.body;
        const rbac_object = await RbacModel.findOne({ role });
          if(rbac_object){
            await RbacModel.updateOne({role}, {permissions});
          } else{
            const rbac = new RbacModel({
              role,
              permissions
            });
            await rbac.save();  
          }
          apiResponse.successResponse(res, 'Success');
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
