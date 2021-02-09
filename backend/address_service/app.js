/**
 * Declaring
 */
const express = require("express")
const apiResponse = require("./utils/apiResponse");
const cors = require("cors");

/**
 * Intialization
 */
const app = express()

/**
 * Middlewares
 */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}})
module.exports = app;