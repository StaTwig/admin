const Analytics = require("../models/AnalyticsModel");
const OrganisationModel = require("../models/OrganisationModel");
const ProductModel = require("../models/ProductModel");
const ShipmentsModel = require("../models/ShipmentModel");
const WarehouseModel = require("../models/WarehouseModel");
const { calculateReturns } = require("./returnShipments");
const moment = require("moment");

var today = new Date();
var lastWeek = new Date();
lastWeek.setDate(today.getDate() - 7);
var lastMonth = new Date();
lastMonth.setDate(today.getDate() - 30);
var lastYear = new Date();
lastYear.setDate(today.getDate() - 365);

async function connectDB() {
  var MONGODB_URL =
    "mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev";
  console.log(MONGODB_URL);
  var mongoose = require("mongoose");
  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      //don't show the log when it is test
      if (process.env.NODE_ENV !== "test") {
        console.log("Connected to %s", MONGODB_URL);
        console.log("App is running ... \n");
        console.log("Press CTRL + C to stop the process. \n");
        var db = mongoose.connection;
        return db;
      }
    })
    .catch((err) => {
      console.error("App starting error:", err.message);
      process.exit(1);
    });
}

async function aggregateData(timeFrame) {
  switch (timeFrame) {
    case "week":
      timeFrame = lastWeek.toISOString();
      break;
    case "month":
      // timeFrame = lastMonth.toISOString()
      timeFrame = moment().subtract(1, "months");
      break;
    case "year":
      timeFrame = lastYear.toISOString();
      break;
    default:
      // timeFrame = lastMonth.toISOString()
      timeFrame = moment().subtract(1, "months");
      break;
  }
  const analytics = await Analytics.aggregate([
    // {
    // 	"$addFields": {
    // 		"uploadDate": {
    // 			"$dateFromString": {
    // 				"dateString": "$uploadDate"
    // 			}
    // 		}
    // 	}
    // },
    {
      $match: {
        uploadDate: {
          $lte: today,
          $gte: new Date(timeFrame),
        },
      },
    },
  ]);

  const b_arr = [];

  // const warehouses = await WarehouseModel.find({ organisationId: 'ORG10018' });

  // for (const w of warehouses) {
  //   let wh = w.toObject();
  //   await WarehouseModel.updateOne({ _id: wh._id },
  //       { $set: { "warehouseAddress.city": wh.warehouseAddress.firstLine } });
  // }

  const brewery = await OrganisationModel.find(
    { type: "BREWERY", status: "ACTIVE" },
    "id"
  );
  for (let b of brewery) b_arr.push(b.id);

  for (const row of analytics) {
    const Products = await ProductModel.find({
      externalId: row.productId,
      manufacturer: row.brand,
    });
    for (const prod of Products) {
      let params = {
        "receiver.id": { $in: b_arr },
        // 'receiver.locationId': row.warehouseId,
        "products.productID": prod.id,
        createdAt: {
          $lte: today,
          $gte: new Date(timeFrame),
        },
      };
      const _returns = await calculateReturns(params);
      await Analytics.updateOne(
        { _id: row._id },
        { $set: { returns: _returns } }
      );
    }
  }
}

exports.aggregateData = aggregateData;
