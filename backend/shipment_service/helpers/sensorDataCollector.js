const axios = require("axios");
const SensorModel = require("../models/SensorModel");
const ShipmentModel = require("../models/ShipmentModel");

const INTEL_AUTH_URL =
  process.env.INTEL_AUTH_URL ||
  "https://external-api-dev-0-7.smnp.adsdcsp.com/api/v0/login";
const INTEL_TRIPDETAILS_URL =
  process.env.INTEL_TRIP_DETAILS ||
  "https://external-api-dev-0-7.smnp.adsdcsp.com/api/v0/tripDetails";

exports.getCurrentShipment = async (vehicleId) => {
  const shipment = await ShipmentModel.findOne({
    vehicleId: vehicleId,
    status: "CREATED",
  })
    .sort({ _id: -1 })
    .limit(1);
  return shipment;
};

exports.saveSensorData = async (sensorData) => {
  if (sensorData?.temp >= 128) {
    sensorData.temp = sensorData.temp - 140;
  }
  const sensor = new SensorModel({
    sensorId: sensorData.id,
    vehicleId: sensorData.vehicleID,
    shipmentId: sensorData.shipmentId,
    timestamp: new Date(sensorData.timestamp),
    coordinates: {
      X: sensorData.X,
      Y: sensorData.Y,
    },
    temperature: sensorData.temp,
    gateway: sensorData.gateway,
    humidity: sensorData.Hum,
    battery: sensorData.bt,
  });
  await sensor.save();
  return sensor;
};

exports.updateSensorData = async (sensorData) => {
  const sensor = await SensorModel.findOneAndUpdate(
    { sensorId: sensorData.id },
    {
      $set: {
        timepstamp: sensorData.timepstamp,
        powerType: sensorData.powerType,
        battery: sensorData.bt,
        acceleration: {
          X: sensorData.Ax,
          Y: sensorData.Ay,
          Z: sensorData.Az,
        },
      },
    },
    { new: true, upsert: true, sort: { _id: -1 } }
  );
  return sensor;
};

exports.lastTenSensorData = async (shipmentId) => {
  const lastTenSensorData = await SensorModel.aggregate([
    {
      $match: { shipmentId: shipmentId },
    },
    {
      $sort: { _id: -1 },
    },
    {
      $limit: 80,
    },
    {
      $sort: { _id: 1 },
    },
    {
      $group: {
        _id: "$sensorId",
        data: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0,
        data: 1,
        name: "$_id",
      },
    },
  ]);
  return lastTenSensorData;
};

exports.getMetaData = async (shipmentId) => {
  const sensorsData = await SensorModel.find({ shipmentId: shipmentId })
    .sort({
      _id: -1,
    })
    .limit(100);
  const avg =
    (
      sensorsData.reduce((acc, cur) => {
        return acc + cur.temperature;
      }, 0) / sensorsData.length
    ).toFixed(2) || 0;
  const min = Math.min(
    ...sensorsData.map((sensor) => sensor.temperature)
  ).toFixed(2);
  const max = Math.max(
    ...sensorsData.map((sensor) => sensor.temperature)
  ).toFixed(2);
  return { min, max, avg };
};

exports.tripDetailsCall = async (plateId, start, end) => {
  try {
    const authToken = await axios.post(
      INTEL_AUTH_URL,
      {
        userName: process.env.INTEL_USERNAME,
        password: process.env.INTEL_PASSWORD,
      },
      {
        headers: {
          "x-api-key": process.env.INTEL_API_KEY,
        },
      }
    );
    const tripDetails = await axios.post(
      INTEL_TRIPDETAILS_URL,
      {
        plateNo: plateId,
        startTime: start,
        endTime: end,
      },
      {
        headers: {
          "x-api-key": process.env.INTEL_API_KEY,
          Authorization: authToken.data.token,
        },
      }
    );
    return tripDetails.data.trips;
  } catch (err) {
    console.log(err.response);
    return false;
  }
};

exports.saveTripDetails = async (shipmentId, plateId, start, end) => {
  const tripDetails = await this.tripDetailsCall(plateId, start, end);
  if (tripDetails) {
    const currentShipment = await ShipmentModel.findOne({
      id: shipmentId,
    });
    console.log("Current Shipment ", tripDetails);
    if (JSON.stringify(tripDetails) !== JSON.stringify(currentShipment.trips)) {
      const result = await ShipmentModel.updateOne(
        { id: shipmentId },
        {
          $set: {
            trips: tripDetails,
          },
        }
      );
      console.log("DATA UPDATED", result);
    }
  }
};
