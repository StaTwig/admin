const mongoose = require("mongoose");
const SensorSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    sensorId: {
      type: String,
      required: true,
    },
    timepstamp: {
      type: Number,
    },
    coordinates: {
      X: Number,
      Y: Number,
    },
    battery: Number,
    temperature: Number,
    humidity: Number,
    gateway: String,
    powerType: Number,
    acceleration: {
      X: Number,
      Y: Number,
      Z: Number,
    },
    vehicleID: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sensor", SensorSchema);
