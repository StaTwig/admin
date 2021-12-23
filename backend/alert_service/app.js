const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cron = require("node-cron");
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const apiResponse = require("./helpers/apiResponse");
const alerts = require("./helpers/alertGenerator");
const events = require("./models/EventModal");
const { alertListener } = require("./helpers/listener");
require("dotenv").config();
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
const db = mongoose.connection;

const eventEmitter = events.watch();
eventEmitter.on("change", (change) => {
  if (change.operationType === "insert") {
    const event = change.fullDocument;
    // alerts.generateAlert(event);
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
  alerts.checkProductExpiry();
  alerts.checkProductNearExpiry();
});

var app = express();
//Swagger API
const expressSwagger = require("express-swagger-generator")(app);

let options = {
  swaggerDefinition: {
    info: {
      description:
        "Alert Service handles the Creation and Generation of Alerts in TheLedger",
      title: "StaTwig TheLedger | Alert Service",
      version: "1.0.0",
      contact: {
        name: "StaTwig",
        email: "dev@statwig.com",
      },
    },
    host: "localhost:3004/",
    basePath: "alertmanagement/api/alert/",
    consumes: ["application/json"],
    produces: ["application/json"],
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local server",
      },
      {
        url: "http://test.vaccineledger.com:9001",
        description: "Testing server",
      },
      {
        url: "http://api.vaccineledger.com:9001",
        description: "Production server",
      },
    ],
    schemes: ["http", "https"],
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Bearer",
        description: "JWT Token",
      },
    },
  },
  basedir: __dirname, //app absolute path
  files: ["./routes/**/*.js"], //Path to the API handle folder
};
expressSwagger(options);
//don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//To allow cross-origin requests
app.use(cors());

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
