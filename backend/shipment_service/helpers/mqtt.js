const mqtt = require("mqtt");
const {
  saveSensorData,
  updateSensorData,
  getCurrentShipment,
} = require("./sensorDataCollector");
const options = {
  host: "statwig.vacustech.in",
  port: 8883,
  username: "vacus",
  password: "vacus123",
};
exports.MqttConnection = (io) => {
  try {
    const client = mqtt.connect("mqtts://statwig.vacustech.in:8883", options);
    client.on("connect", () => {
      console.log("Connected to MQTT!");
      client.subscribe("/test/vacus/sensor");
      client.subscribe("/test/vacus/systemHealth");
    });
    client.on("error", (error) => {
      console.log("Error:", error);
    });

    client.on("message", async (topic, messageArray) => {
      messageArray = JSON.parse(messageArray.toString());
      for (const message of messageArray) {
        console.log(message);
        let sensorData;
        if (topic == "/test/vacus/sensor") {
          message.shipmentId =
            (await getCurrentShipment(message.vehicleID).id) || null;
          sensorData = await saveSensorData(message);
        } else {
          sensorData = await updateSensorData(message);
        }
        io.to(message.shipmentId).emit("sensorData", sensorData);
        console.log(sensorData);
      }
    });
  } catch (e) {
    console.log(e);
  }
};
