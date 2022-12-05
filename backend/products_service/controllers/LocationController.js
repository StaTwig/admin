const RegionsModel = require("../models/RegionsModel");
const CountriesModel = require("../models/CountryModel");
const StatesModel = require("../models/StateModel");
const CitiesModel = require("../models/CityModel");
const apiResponse = require("../helpers/apiResponse");

const prepareAggregateQueryForLocation = (
  matchValue,
  filterValue,
  returnValue
) => {
  return [
    {
      $match: {
        [matchValue]:
          matchValue === "region" ? filterValue : parseInt(filterValue),
      },
    },
    {
      $group: {
        _id: null,
        [returnValue]: {
          $push: {
            name: "$name",
            id: "$id",
            spanishName: "$translations.es",
          },
        },
      },
    },
  ];
};

const getLocationByQuery = async (filter) => {
  if (filter.region === "all") {
    const data = await RegionsModel.aggregate([
      {
        $group: {
          _id: null,
          regions: {
            $addToSet: "$name",
          },
        },
      },
    ]);
    return data[0].regions;
  }

  //sends the required cities for the state
  if (filter.state_id) {
    const data = await CitiesModel.aggregate(
      prepareAggregateQueryForLocation("state_id", filter.state_id, "cities")
    );
    return data.length > 0 ? data[0].cities : [];
  }

  //sends the required states for a country
  if (filter.country_id) {
    const data = await StatesModel.aggregate(
      prepareAggregateQueryForLocation(
        "country_id",
        filter.country_id,
        "states"
      )
    );
    return data.length > 0 ? data[0].states : [];
  }

  //sends the required countries for a specific region
  if (filter.region !== "all") {
    const data = await CountriesModel.aggregate(
      prepareAggregateQueryForLocation("region", filter.region, "countries")
    );
    return data.length > 0 ? data[0].countries : [];
  }
};

/**
 * Api to get the location list based on region, country, state, city
 */
exports.getLocations = [
  async (req, res) => {
    try {
      const filters = req.query;
      const locations = await getLocationByQuery(filters);
      return apiResponse.successResponseWithData(
        res,
        "Get Locations Successfully",
        locations
      );
    } catch (err) {
      console.log(err);
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
