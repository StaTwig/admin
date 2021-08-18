const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fs = require('fs');
const mongoose = require("mongoose");

require("dotenv").config();
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const apiResponse = require("./helpers/apiResponse");
const dir = `images`;
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
const app = express();

// DB connection
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, autoIndex: true , useUnifiedTopology: true, useCreateIndex: true}).then(() => {
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
//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use("/pomanagement/api/", apiRouter);

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
