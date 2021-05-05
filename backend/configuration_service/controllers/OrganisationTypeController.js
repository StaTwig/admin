const OrganisationModel = require('../models/OrganisationModel');
const apiResponse = require("../utils/apiResponse")
const auth = require("../middlewares/jwt");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 10);
const checkToken = require("../middlewares/middleware").checkToken;

exports.getOrganizationsByType = [
  auth,
    async (req, res) => {
      try {
        const filters = req.query;
        let matchCondition = {};
        if (filters.orgType === 'BREWERY' || filters.orgType === 'S1' || filters.orgType === 'S2') {
          matchCondition.type = filters.orgType;
        } else if (filters.orgType === 'ALL_VENDORS') {
          matchCondition.$or = [{ type: 'S1' }, { type: 'S2' }];
        }
        const organisations = await OrganisationModel.aggregate([
          {
            $match: matchCondition
          }
        ]);
        return apiResponse.successResponseWithData(
          res,
          "Operation success",
          organisations
        );
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];

 
  // exports.updateOrganizationsByType = [
  //   auth,
  //   async (req, res) => {
  //     try {
  //       await OrganisationModel.findOneAndUpdate(
  //         { id: req.user.type},
  //         req.body.type,
  //         { new: true }
  //       )
  //         .then((type) => {
  //           return apiResponse.successResponseWithData(
  //             res,
  //             "Organisation Type Updated",
  //             type
  //           );
  //         })
  //         .catch((err) => {
  //           return apiResponse.ErrorResponse(res, err);
  //         });
  //     } catch (err) {
  //       return apiResponse.ErrorResponse(res, err);
  //     }
  //   },
  // ];

                     
  // exports.updateOrganizationsByType = [
  //   auth,
  //   async (req, res) => {
  //     try {
  //       const filters = req.query;
  //       let matchCondition = {};
  //       //SUPPLIER/CUSTOMER/CUSTOMER_SUPPLIER
  //       if (filters.orgType === 'BREWERY' || filters.orgType === 'S1' || filters.orgType === 'S2') {
  //         matchCondition.type = filters.orgType;
  //       } else if (filters.orgType === 'ALL_VENDORS') {
  //         matchCondition.$or = [{ type: 'S1' }, { type: 'S2' }];
  //       }
  
  //       const organisations = await OrganisationModel.aggregate([
  //         {
  //           $set: matchCondition
  //         }
  //       ]);
  //       return apiResponse.successResponseWithData(
  //         res,
  //         "Operation updated success",
  //         organisations
  //       );
  //     } catch (err) {
  //       return apiResponse.ErrorResponse(res, err);
  //     }
  //   },
  // ];

