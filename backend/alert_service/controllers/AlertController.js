//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");

exports.getShipmentReceived = [

        (req, res) => {
                try {
                        res.json("Shipment Received")
                } catch (err) {
                        return apiResponse.ErrorResponse(res, err);
                }
        }];
