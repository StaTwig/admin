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
      try {
        messageArray = JSON.parse(messageArray.toString());
        for (const message of messageArray) {
          let sensorData;
          if (topic == "/test/vacus/sensor") {
            const result = await getCurrentShipment(message.vehicleID);
            message.shipmentId = result.id || null;
            sensorData = await saveSensorData(message);
            io.to(sensorData.shipmentId).emit("sensorData", sensorData);
          } else {
            sensorData = await updateSensorData(message);
          }
        }
      } catch (error) {
        console.log("SOCKET-IO MQTT ERROR", error);
      }
    });
  } catch (e) {
    console.log(e);
  }
};
