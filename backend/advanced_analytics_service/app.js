var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var apiResponse = require("./helpers/apiResponse");
var { aggregateData } = require("./helpers/dataAggregator");
var cors = require("cors");
var cron = require("node-cron");

// const CALCULATE_RETURNS_CRON_TIME = `*/15 * * * *`;

// cron.schedule(CALCULATE_RETURNS_CRON_TIME, () => {
// 	console.log('running calculateReturns job');
// 	aggregateData("month");
// });

// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
var mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //don't show the log when it is test
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to %s", MONGODB_URL);
      console.log("Advanced Analytics Service is running ... \n");
    }
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });
var db = mongoose.connection;

var app = express();

//don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use("/advancedanalytics/api", apiRouter);

// throw 404 if URL not found
app.all("*", function (req, res) {
  return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
  if (err.name == "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});
// setTimeout(function () {
// 	console.log("Exiting ...")
// 	return process.exit(1);
// }, 45000);
module.exports = app;
