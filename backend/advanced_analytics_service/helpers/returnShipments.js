const { db } = require('../models/AnalyticsModel')
const Analytics = require('../models/AnalyticsModel')
const Shipments = require('../models/ShipmentModel')
const Warehouses = require('../models/WarehouseModel')

var today = new Date()
var lastWeek = new Date()
lastWeek.setDate(today.getDate() - 7)
var lastMonth = new Date()
lastMonth.setDate(today.getDate() - 30)
var lastYear = new Date()
lastYear.setDate(today.getDate() - 365)

async function connectDB() {
  var MONGODB_URL = process.env.MONGODB_URL;
  console.log(MONGODB_URL)
  var mongoose = require('mongoose')
  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      //don't show the log when it is test
      if (process.env.NODE_ENV !== 'test') {
        console.log('Connected to %s', MONGODB_URL)
        console.log('App is running ... \n')
        console.log('Press CTRL + C to stop the process. \n')
        var db = mongoose.connection
        return db
      }
    })
    .catch((err) => {
      console.error('App starting error:', err.message)
      process.exit(1)
    })
}

async function calculateReturns(params) {
  try {
    var quantity = 0
    // let connect = await connectDB()
    for await (const Shipment of Shipments.find(
      params
    )) {
      for (let product in Shipment.products) {
        if (Shipment['products'][product].productID == params['products.productID']) {
          quantity += Shipment['products'][product].productQuantity
        }
      }
    }
    // db.close();
    return quantity;
  } catch (err) {
    throw err
  }
}


exports.calculateReturns = calculateReturns
