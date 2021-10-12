const apiResponse = require("../utils/apiResponse");
const Organisation = require("../models/organisationModel");
const Warehouse = require("../models/warehouseModel");
const Inventory = require("../models/inventoryModel");
const CounterModel = require("../models/CounterModel");
const EmployeeModel = require("../models/EmployeeModel");
const WarehouseModel = require("../models/warehouseModel");
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
      await Warehouse.find({$and: [{organisationId: req.user.organisationId},{status:"ACTIVE"}]})
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
  let matchConditions = { };
  // let matchConditions = { status: "NOTVERIFIED" };
  // let matchConditions = {
  //   $or: [{ status: "NOTVERIFIED" }, { status: "PENDING" }],
  // };
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
                  $expr: { $in: ["$$wid", "$pendingWarehouseId"] },
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
        { "counters.$": 1 }
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
        { "counters.$": 1 }
      );
      const warehouseId =
        warehouseCounter.counters[0].format +
        warehouseCounter.counters[0].value;
      //const warehouseId = "war-" + nanoid();
      let employee = [];
    if(employees != undefined && employees.length > 0){
      employee = employees
    }
    else{
      employee.push(req.user.id);
    }
    employee.forEach(async(emp) => {
    const employeewarehouse = await EmployeeModel.findOneAndUpdate({
     id: emp,
   },{
     $push: {warehouseId: warehouseId}
   },{
     new: true
   });
  });
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
        employees: req.body.employees || [req.user.id]
      });
      await warehouse.save();
      return apiResponse.successResponseWithData(
        res,
        "Warehouse added success",
        warehouse
      );
    } catch (err) {
      console.log(err)
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
        { "counters.$": 1 }
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
        { "counters.$": 1 }
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
          const user = await EmployeeModel.findOne({
            $or: [
              { emailId: address.user },
              { phoneNumber: address.user },
            ]
          })
          console.log("USERS IS ",user);
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
              employees: [user.id],
            };
            let warehouse = new Warehouse(reqData);
            const warehouseRes = await warehouse.save();
            console.log(warehouseRes);
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
                    $pull: {
                      pendingWarehouseId: id
                    }
                  }
                );
              }
              else if (type == 1) {
                await EmployeeModel.updateOne(
                  {
                    id: eid,
                  },
                  {
                    $push: {
                      warehouseId: id
                    },
                    $pull: {
                      pendingWarehouseId: id
                    }
                  }
                );
              } else {
                await EmployeeModel.updateOne(
                  {
                    id: eid,
                  },
                  {
                    $pull: {
                      pendingWarehouseId: id,
                    },
                  }
                );
              }
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

exports.getCountries = [
  auth,
  async (req, res) => {
    try {
      const countries = await WarehouseModel.aggregate([{ $match :{'warehouseAddress.region' : req.query.region}},
      {
         $group:
           {
             _id: "$warehouseAddress.country",
           }
       }
  ]);
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        countries
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
exports.getStatesByCountry = [
  auth,
  async (req, res) => {
    try {
      const allStates = await WarehouseModel.aggregate([{ $match :{'warehouseAddress.country': req.query.country}},
      {
         $group:
           {
             _id: "$warehouseAddress.state",
           }
       }
  ]);
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        allStates
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
exports.getCitiesByState = [
  auth,
  async (req, res) => {
    try {
      const allCities = await WarehouseModel.aggregate([{ $match :{'warehouseAddress.state': req.query.state}},
      {
         $group:
           {
             _id: "$warehouseAddress.city",
           }
       }
  ]);
      return apiResponse.successResponseWithData(
        res,
        "Operation success",
        allCities
      );
    } catch (err) {
      return apiResponse.ErrorResponse(res, err.message);
    }
  },
];
