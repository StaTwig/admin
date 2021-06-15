const warehouse = require("./WarehouseModel.js");
// const config = require("./config.js");

async function connectDB() {
    var MONGODB_URL = 'mongodb://StaTwig:StaTwig2020@db.vaccineledger.com:27017/development' ;
    // console.log(MONGODB_URL)
    var mongoose = require("mongoose");
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        //don't show the log when it is test
        if (process.env.NODE_ENV !== "test") {
            console.log("connected to db")
            // console.log("Connected to %s", MONGODB_URL);
            // console.log("App is running ... \n");
            // console.log("Press CTRL + C to stop the process. \n");
        }
    })
        .catch(err => {
            console.error("App starting error:", err.message);
            process.exit(1);
        });
    var db = mongoose.connection;
    return db;
}
let connection =  connectDB();


warehouse.find().then(async (warehouseRecords) => {
        // console.log(warehouseRecords)
        // warehouse
        let a = 0;
        let b = 0;
        warehouseRecords.forEach(element => {
            a++;
            warehouse.updateOne({_id:element._id}, 
                {'warehouseAddress.region' :'Asia'}, function (err, docs) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated Docs : ", docs);
                }
            });
    
        });
        console.log(a," ",b)
        connection.close()
});