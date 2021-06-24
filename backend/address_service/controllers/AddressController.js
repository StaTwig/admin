const apiResponse = require("../utils/apiResponse");
const Organisation = require("../models/organisationModel");
const Warehouse = require("../models/warehouseModel");
const Inventory = require("../models/inventoryModel");
const CounterModel = require("../models/CounterModel");
const EmployeeModel = require("../models/EmployeeModel");
const ConfigurationModel = require("../models/ConfigurationModel");
const auth = require("../middlewares/jwt");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 10);
const XLSX = require("xlsx");
const fs = require("fs");
const moveFile = require("move-file");
const fetch = require("node-fetch");

exports.addressOfOrg = [
  auth,
  async (req, res) => {
    try {
      await Organisation.find({ id: req.user.organisationId })
        .then((org) => {
          return apiResponse.successResponseWithData(
            res,
            "Organisations Addresses",
            org
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addressesOfOrgWarehouses = [
  auth,
  async (req, res) => {
    try {
      await Warehouse.find({ organisationId: req.user.organisationId })
        .then((warehouses) => {
          return apiResponse.successResponseWithData(
            res,
            "Warehouses Addresses",
            warehouses
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

function getConditionForLocationApprovals(type, id) {
  let matchConditions = { status: "NOTVERIFIED" };
  if (type != "CENTRAL_AUTHORITY") matchConditions.organisationId = id;
  return matchConditions;
}

exports.getLocationApprovals = [
  auth,
  async (req, res) => {
    try {
      const orgType = req.user.organisationType;
      await Warehouse.aggregate([
        {
          $match: getConditionForLocationApprovals(
            orgType,
            req.user.organisationId
          ),
        },
        {
          $lookup: {
            from: "employees",
            let: {
              wid: "$id",
            },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ["$$wid", "$warehouseId"] },
                },
              },
            ],
            as: "employee",
          },
        },
        { $unwind: "$employee" },
      ])
        .then((warehouses) => {
          return apiResponse.successResponseWithData(
            res,
            "Warehouses details",
            warehouses
          );
        })
        .catch((err) => {
          console.log(err);
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      console.log(err);

      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updateAddressOrg = [
  auth,
  async (req, res) => {
    try {
      await Organisation.findOneAndUpdate(
        { id: req.user.organisationId },
        req.body.address,
        { new: true }
      )
        .then((org) => {
          return apiResponse.successResponseWithData(
            res,
            "Organisation Address Updated",
            org
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.updateWarehouseAddress = [
  auth,
  async (req, res) => {
    try {
      await Warehouse.findOneAndUpdate(
        { id: req.query.warehouseId },
        req.body.WarehouseAddress,
        { new: true }
      )
        .then((warehouse) => {
          return apiResponse.successResponseWithData(
            res,
            "Warehouse Address Updated",
            warehouse
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.AddWarehouse = [
  auth,
  async (req, res) => {
    try {
      const incrementCounterInv = await CounterModel.update(
        {
          "counters.name": "inventoryId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const invCounter = await CounterModel.findOne(
        { "counters.name": "inventoryId" },
        { "counters.name.$": 1 }
      );
      const inventoryId =
        invCounter.counters[0].format + invCounter.counters[0].value;
      //const inventoryId = "inv-" + nanoid();
      const inventoryResult = new Inventory({ id: inventoryId });
      await inventoryResult.save();
      const {
        organisationId,
        postalAddress,
        title,
        region,
        country,
        location,
        supervisors,
        employees,
        warehouseAddress,
      } = req.body;
      const incrementCounterWarehouse = await CounterModel.update(
        {
          "counters.name": "warehouseId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const warehouseCounter = await CounterModel.findOne(
        { "counters.name": "warehouseId" },
        { "counters.name.$": 1 }
      );
      const warehouseId =
        warehouseCounter.counters[0].format +
        warehouseCounter.counters[0].value;
      //const warehouseId = "war-" + nanoid();
      const warehouse = new Warehouse({
        id: warehouseId,
        title,
        organisationId,
        postalAddress,
        region,
        country,
        location,
        supervisors,
        employees,
        warehouseAddress,
        status: "ACTIVE",
        warehouseInventory: inventoryResult.id,
      });
      await warehouse.save();
      return apiResponse.successResponseWithData(
        res,
        "Warehouse added success",
        warehouse
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.AddOffice = [
  auth,
  async (req, res) => {
    try {
      const {
        organisationId,
        title,
        postalAddress,
        region,
        country,
        location,
        supervisors,
        employees,
      } = req.body;
      const officeId = "office-" + nanoid();
      const office = new Warehouse({
        id: officeId,
        title,
        organisationId,
        postalAddress,
        region,
        country,
        location,
        supervisors,
        employees,
      });
      await office.save();
      return apiResponse.successResponseWithData(
        res,
        "Office added success",
        office
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.addAddressesFromExcel = [
  auth,
  async (req, res) => {
    try {
      const dir = `uploads`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      await moveFile(req.file.path, `${dir}/${req.file.originalname}`);
      const workbook = XLSX.readFile(`${dir}/${req.file.originalname}`);
      const sheet_name_list = workbook.SheetNames;
      const data = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]],
        { dateNF: "dd/mm/yyyy;@", cellDates: true, raw: false }
      );

      const incrementCounterInv = await CounterModel.update(
        {
          "counters.name": "inventoryId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const invCounter = await CounterModel.findOne(
        { "counters.name": "inventoryId" },
        { "counters.name.$": 1 }
      );

      const incrementCounterWarehouse = await CounterModel.update(
        {
          "counters.name": "warehouseId",
        },
        {
          $inc: {
            "counters.$.value": 1,
          },
        }
      );

      const warehouseCounter = await CounterModel.findOne(
        { "counters.name": "warehouseId" },
        { "counters.name.$": 1 }
      );

      for (const [index, address] of data.entries()) {
        let inventoryResult = new Inventory({
          id:
            invCounter.counters[0].format +
            (parseInt(invCounter.counters[0].value) + parseInt(index)),
        });
        await inventoryResult.save();
        let warehouseId =
          warehouseCounter.counters[0].format +
          (parseInt(warehouseCounter.counters[0].value) + parseInt(index));

        fetch(
          "https://nominatim.openstreetmap.org/search/" +
            address.city +
            "?format=json&addressdetails=1&limit=1"
        )
          .then((res) => res.json())
          .then(async (res) => {
            const reqData = {
              id: warehouseId,
              warehouseInventory: inventoryResult.id,
              title: address.title,
              organisationId: req.user.organisationId,
              warehouseAddress: {
                firstLine: address.line,
                secondLine: "",
                city: address.city,
                state: address.state,
                country: address.country,
                landmark: "",
                zipCode: address.pincode,
              },
              country: {
                countryId: "001",
                countryName: address.country,
              },
              region: {
                regionId: "reg123",
                regionName: "Earth Prime",
              },
              location: {
                longitude: res?.length ? res[0].lon : "12.12323453534",
                latitude: res?.length ? res[0].lat : "13.123435345435",
                geohash: "1231nejf923453",
              },
              supervisors: [],
              employeess: [],
            };
            let warehouse = new Warehouse(reqData);
            await warehouse.save();
            if (address?.user) {
              await EmployeeModel.updateOne(
                {
                  $or: [
                    { emailId: address.user },
                    { phoneNumber: address.user },
                  ],
                },
                { $push: { warehouseId: warehouseId } }
              );
            }
          });
      }
      await CounterModel.update(
        {
          "counters.name": "warehouseId",
        },
        {
          $inc: {
            "counters.$.value": data.length,
          },
        }
      );
      await CounterModel.update(
        {
          "counters.name": "inventoryId",
        },
        {
          $inc: {
            "counters.$.value": data.length,
          },
        }
      );
      return apiResponse.successResponseWithData(res, "Success", data);
    } catch (e) {
      return apiResponse.ErrorResponse(res, e);
    }
  },
];

exports.modifyLocation = [
  auth,
  async (req, res) => {
    try {
      const { id, eid, type } = req.body;

      await Warehouse.updateOne(
        { id: id },
        { status: type === 1 ? "ACTIVE" : "REJECTED" }
      )
        .then(async (warehouse) => {
          await ConfigurationModel.findOne({ id: "CONF000" })
            .select("active_locations")
            .then(async (conf) => {
              if (conf?.active_locations === 1 && type == 1) {
                await EmployeeModel.updateOne(
                  {
                    id: eid,
                  },
                  {
                    $set: {
                      warehouseId: [id],
                    },
                  }
                );
              }
              // if (type == 2) {
              //   await EmployeeModel.updateOne(
              //     {
              //       id: eid,
              //     },
              //     {
              //       $push: {
              //         warehouseId: id,
              //       },
              //     }
              //   );
              // } else {
              //   await EmployeeModel.updateOne(
              //     {
              //       id: eid,
              //     },
              //     {
              //       $pull: {
              //         warehouseId: id,
              //       },
              //     }
              //   );
              // }
            });

          return apiResponse.successResponseWithData(
            res,
            "Location " + (type == 1 ? "approved" : "rejected"),
            []
          );
        })
        .catch((err) => {
          return apiResponse.ErrorResponse(res, err);
        });
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
