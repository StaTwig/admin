const SensorModel = require("../models/SensorModel");
const ShipmentModel = require("../models/ShipmentModel");

exports.getCurrentShipment = async (vehicleId) => {
  const shipment = await ShipmentModel.find({
    vehicleId: vehicleId,
    status: "CREATED",
  });
  return shipment.pop();
};

exports.saveSensorData = async (sensorData) => {
  const sensor = new SensorModel({
    sensorId: sensorData.id,
    vehicleId: sensorData.vehicleID,
    shipmentId: sensorData.shipmentId,
    timestamp: sensorData.timestamp,
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
  const sensorsData = await SensorModel.find({ shipmentId: shipmentId })
    .sort({ _id: -1 })
    .limit(10);
  return sensorsData;
};
