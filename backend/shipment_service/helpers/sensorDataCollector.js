const SensorModel = require("../models/SensorModel");

exports.saveSensorData = async (sensorData) => {
  const sensor = new SensorModel({
    sensorId: sensorData.id,
    vehicleId: sensorData.vehicleID,
    timepstamp: sensorData.timepstamp,
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
    { new: true, upsert: true }
  );
  return sensor;
};
