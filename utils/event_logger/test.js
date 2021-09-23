const Event = require("./models/EventModal");
const config = require("./config.js");

async function connectDB() {
  var MONGODB_URL = process.env.MONGODB_URL || config.MONGODB_URL;
  var mongoose = require("mongoose");
  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      //don't show the log when it is test
      if (process.env.NODE_ENV !== "test") {
        console.log("connected to db");
        // console.log("Connected to %s", MONGODB_URL);
        // console.log("App is running ... \n");
        // console.log("Press CTRL + C to stop the process. \n");
      }
    })
    .catch((err) => {
      console.error("App starting error:", err.message);
      process.exit(1);
    });
  var db = mongoose.connection;
  return db;
}
let connection = connectDB();

Event.find().then(async (eventRecords) => {
  // console.log(eventRecords)
  // event
  let a = 0;
  let b = 0;
  eventRecords.forEach((element) => {
    if (element.payloadData.data.products[0].productId) {
      a++;
    } else {
      b++;
      Event.updateOne(
        { _id: element._id },
        {
          "payloadData.data.products.productId":
            payloadData.data.products.productID,
        },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated Docs : ", docs);
          }
        }
      );
    }
  });
  console.log(a, " ", b);
  connection.close();
});
