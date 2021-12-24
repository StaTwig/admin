const mongoose = require("mongoose");
const SensorSchema = new mongoose.Schema(
  {
    sensorId: {
      type: String,
      required: true,
    },
    shipmentId: String,
    timestamp: {
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
    vehicleId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sensordatalog", SensorSchema);
