const OrganisationModel = require('../models/OrganisationModel');
const WarehouseModel = require('../models/WarehouseModel');

const auth = require('../middlewares/jwt');
const apiResponse = require('../helpers/apiResponse');

exports.getOrganisations = [
  async (req, res) => {
    try {
      const organisations = await OrganisationModel.find({});
      return apiResponse.successResponseWithData(
        res,
        'Organisations',
        organisations,
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.getWarehouses = [
  auth,
  async (req, res) => {
    try {
      const organisations = await WarehouseModel.find({organisationId: req.query.id});
      return apiResponse.successResponseWithData(
        res,
        'Warehouses',
        organisations,
      );
    } catch (err) {
      return apiResponse.ErrorResponse(
        res,
        `Organization of id ${req.query.id} not found`,
      );
    }
  },
];
