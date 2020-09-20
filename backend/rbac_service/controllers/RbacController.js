const RbacModel = require('../models/RbacModel');
const { body, validationResult } = require('express-validator');
//helper file to prepare responses.
const checkToken = require('../middlewares/middleware').checkToken;
const auth = require('../middlewares/jwt');

const apiResponse = require('../helpers/apiResponse');

const init = require('../logging/init');
const logger = init.getLog();

exports.getPermissions = [
  auth,
  async (req, res) => {
    try {
      checkToken(req, res, async result => {
        if (result.success) {
          
          logger.log('info', '<<<<< RbacService < RbacController < getPermissions : token verifed successfully');
          const permissions = await RbacModel.find({});
          res.json({ data: permissions });
        } else {
          logger.log('warn', '<<<<< RbacService < RbacController < getPermissions : user is not authenticated')
          res.status(403).json(result);
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< RbacService < RbacController < getPermissions : error (catch block)')
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
        logger.log('error', '<<<<< RbacService < RbacController < addPermissions : Validation Error: rbac data must be specified')
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array(),
        );
      }
      checkToken(req, res, async result => {
        if (result.success) {
          logger.log('info', '<<<<< RbacService < RbacController < addPermissions : token verifed successfully');
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
          logger.log('warn', '<<<<< RbacService < RbacController < addPermissions : user is not authenticated')
          return apiResponse.ErrorResponse(res, 'User not authenticated');
        }
      });
    } catch (err) {
      logger.log('error', '<<<<< RbacService < RbacController < addPermissions : error (catch block)')
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
