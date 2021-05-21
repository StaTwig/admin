const RbacModel = require('../models/RbacModel');
const { body, validationResult } = require('express-validator');
//helper file to prepare responses.
const checkToken = require('../middlewares/middleware').checkToken;
const auth = require('../middlewares/jwt');

const apiResponse = require('../helpers/apiResponse');

exports.getPermissions = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          const permissions = await RbacModel.find({});
          res.json({ data: permissions });
        } else {
          res.status(403).json(result);
        }
      });
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
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      }
      checkToken(req, res, async result => {
        if (result.success) {
          const { role, permissions } = req.body;
          const rbac_object = await RbacModel.findOne({ role });
          if(rbac_object){
            await RbacModel.update({role}, {permissions});
          } else{
            const rbac = new RbacModel({
              role,
              permissions
            });
            await rbac.save();  
          }
          apiResponse.successResponseWithData(res, 'Success');
        } else {
          return apiResponse.ErrorResponse(res, 'User not authenticated');
        }
      });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
