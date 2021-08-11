var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var apiResponse = require("./helpers/apiResponse");
var cors = require("cors");
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);
const RbacModel = require('./models/RbacModel');

// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  //don't show the log when it is test
  if(process.env.NODE_ENV !== "test") {
    console.log("Connected to %s", MONGODB_URL);
    console.log("App is running ... \n");
    console.log("Press CTRL + C to stop the process. \n");
  }
})
  .catch(err => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });
var db = mongoose.connection;

client.on('connect', () => {
	console.log("Connected to Redis");
});
client.on('error', err => {
    console.log('Error ' + err);
});

RbacModel.find({}).then(permissions => {
  if(permissions.length > 0) {
    permissions.forEach(role => {
      client.sadd(role.role, role.permissions , (err,data) => {
    if(err) {
      console.log(err);
    }
    console.log(role)
    console.log(data);
  })  
});
  }
  else{
    console.log("No permissions found");
  }
}).catch(err => {
  console.log(err);
}
)

var app = express();

//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use("/rbacmanagement/api/", apiRouter);

// app.get("/", (req, res) => {
// 	return res.json("test")
// })
// throw 404 if URL not found
app.all("*", function(req, res) {
  return apiResponse.notFoundResponse(res, "API not found");
});

app.use((err, req, res) => {
  if(err.name == "UnauthorizedError"){
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

module.exports = app;
