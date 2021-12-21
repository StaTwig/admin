const mqtt = require("mqtt");
const fs = require("fs");

const options = {
  host: "statwig.vacustech.in",
  port: 8883,
  username: "vacus",
  password: "vacus123",
};

const client = mqtt.connect("mqtts://statwig.vacustech.in:8883", options);
client.on("connect", () => {
  console.log("Connected!");
  client.subscribe("/test/vacus/sensor");
  client.subscribe("/test/vacus/systemHealth");
});
client.on("error", (error) => {
  console.log("Error:", error);
});

client.on("message", function (topic, message, packet) {
  console.log(new Date().toLocaleString());
  console.log(
    "Received Message:= ",
    message.toString(),
    "\nOn topic:= " + topic
  );
});
