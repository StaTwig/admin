require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const cron = require("node-cron");
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const apiResponse = require("./helpers/apiResponse");
const alerts = require("./helpers/alertCronJobs");
const events = require("./models/EventModal");
const { alertListener } = require("./helpers/listener");
const MONGODB_URL = process.env.MONGODB_URL;

const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to %s", MONGODB_URL);
      console.log("Alert Service is running ... \n");
    }
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });

const eventEmitter = events.watch();
eventEmitter.on("change", (change) => {
  if (change.operationType === "insert") {
    const event = change.fullDocument;
    alertListener(event);
  } else if (change.operationType === "delete") {
    console.log(
      "******************************** EVENT DELETED ********************************",
      change.documentKey._id
    );
  }
});

const CALCULATE_EXPIRED_CRON_TIME = `00 9 * * 1-5`;

cron.schedule(CALCULATE_EXPIRED_CRON_TIME, () => {
  console.log("RUNNING CRON JOBS ==> ", new Date());
  alerts.ordersPending();
  alerts.checkProductExpiry();
  alerts.checkProductNearExpiry();
});

var app = express();

//don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//To allow cross-origin requests
app.use(cors());
app.use(helmet());

//Route Prefixes
app.use("/", indexRouter);
app.use("/alertmanagement/api/", apiRouter);

app.use((err, req, res) => {
  if (err.name == "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

// throw 404 if URL not found
app.all("*", function (req, res) {
  return apiResponse.notFoundResponse(res, "API not found");
});

module.exports = app;
