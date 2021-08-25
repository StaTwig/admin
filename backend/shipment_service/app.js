const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./openApiDocumentation');

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const apiResponse = require("./helpers/apiResponse");

const app = express();

// DB connection
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL, { useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex:true, useFindAndModify:false}).then(() => {
  //don't show the log when it is test
  if(process.env.NODE_ENV !== "test") {
    console.log("Connected to %s", MONGODB_URL);
    console.log("Shipment Service is running ... \n");
  }
})
  .catch(err => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });

//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use("/shipmentmanagement/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

module.exports = app;
