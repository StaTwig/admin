const Analytics = require('../models/AnalyticsModel')
const Excel = require('../models/ExcelModel')
const { calculateReturns } = require('./returnShipments')

var today = new Date()
var lastWeek = new Date()
lastWeek.setDate(today.getDate() - 7)
var lastMonth = new Date()
lastMonth.setDate(today.getDate() - 30)
var lastYear = new Date()
lastYear.setDate(today.getDate() - 365)

async function connectDB() {
  var MONGODB_URL =
    'mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/abinbev'
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

async function aggregateData(timeFrame){
    switch (timeFrame) {
        case 'week':
          timeFrame = lastWeek.toISOString()
          break
        case 'month':
          timeFrame = lastMonth.toISOString()
          break
        case 'year':
          timeFrame = lastYear.toISOString()
          break
        default:
          timeFrame = lastMonth.toISOString()
          break
      }
      
    for await (const row of Excel.find({
         uploadDate: {
           $lte: today.toISOString(),
           $gte: timeFrame,
         },
   })) {
    let params = {
        'receiver.locationId' : row.warehouseId,
        'products.productID' : row.productId,
          shippingDate: {
            $lte: today.toISOString(),
            $gte: timeFrame,
          },
    }
    const returns = await caclulateReturns(params)
    let AnalyticsData = new Analytics({
        productId: row.productId,
	productName: row.productName + " " + row.productSubName,
	sales: row.actualSales,
	target: row.targetSales,
    returns: await calculateReturns(params),
	warehouseId: row.warehouseId
    })
    AnalyticsData.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
            return 1;
        }
    })
   }
}

exports.aggregateData = aggregateData;
