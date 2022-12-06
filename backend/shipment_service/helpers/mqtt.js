const ENV_SOURCE = process.env.SOURCE;
const mqtt = require("mqtt");
const {
  saveSensorData,
  updateSensorData,
  getCurrentShipment,
} = require("./sensorDataCollector");
const { asyncForEach } = require("./utility");
const options = {
  host: "statwig.vacustech.in",
  port: 8883,
  username: "vacus",
  password: "vacus123",
};
exports.MqttConnection = () => {
  try {
    if (ENV_SOURCE === "test.vaccineledger.com") {
      const client = mqtt.connect("mqtts://statwig.vacustech.in:8883", options);
      client.on("connect", () => {
        console.log("Connected to MQTT!");
        client.subscribe("/test/vacus/sensor");
        client.subscribe("/test/vacus/systemHealth");
      });
      client.on("error", (error) => {
        console.log("Error:", error);
      });

      client.on("message", async (topic, messageArr) => {
        try {
          let messageArray = JSON.parse(messageArr.toString());
          if (!Array.isArray(messageArray)) {
            messageArray = [messageArray];
          }
          if (topic == "/test/vacus/sensor") {
            for (const message of messageArray) {
              const result = await getCurrentShipment(message.vehicleID);
              message.shipmentId = result?.id || null;
              await saveSensorData(message);
            }
          } else {
            await asyncForEach(messageArray, async (message) => {
              await updateSensorData(message);
            });
          }
        } catch (error) {
          console.log("MQTT ERROR", error);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};
