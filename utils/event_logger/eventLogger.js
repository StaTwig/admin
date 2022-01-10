const validate = require("./helpers/validation.js");
const Event = require("./models/EventModal");
const config = require("./config.js");
const MONGODB_URL = process.env.MONGODB_URL || config.MONGODB_URL;
const mongoose = require("mongoose");
mongoose
  .connect(MONGODB_URL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      console.log("Event Logger Connected to DB");
    }
  })
  .catch((err) => {
    console.error("Event Logger starting Error:", err.message);
    process.exit(1);
  });

async function logEvent(data) {
  if (validate(data)) {
    return await Event.findOne(
      { eventID: data.eventID },
      async function (err, foundEvent) {
        if (err) console.log("Error is", err);
        if (foundEvent != null) {
          err = {
            message: "Event exists with same Event ID",
            code: 500,
          };
          console.log(err);
          return err;
        } else {
          const event = new Event({
            eventID: data.eventID,
            eventTime: data.eventTime,
            transactionId: data.transactionId ? data.transactionId : null,
            eventTypePrimary: data.eventType.primary,
            eventTypeDesc: data.eventType.description,
            actorId: data.actor.actorid,
            actorUserId: data.actor.actoruserid,
            caId: data.stackholders.ca.id,
            caName: data.stackholders.ca.name,
            caAddress: data.stackholders.ca.address,
            actorOrgId: data.stackholders.actororg.id,
            actorOrgName: data.stackholders.actororg.name,
            actorOrgAddress: data.stackholders.actororg.address,
            actorWarehouseId: data.actorWarehouseId,
            secondaryOrgId: data.stackholders.secondorg.id,
            secondaryOrgName: data.stackholders.secondorg.name,
            secondaryOrgAddress: data.stackholders.secondorg.address,
            payloadData: data.payload,
          });
          return event.save();
        }
      }
    ).clone();
  } else {
    const err = {
      message: "Data Invalid : Fields incorrect",
      code: 500,
    };
    return err;
  }
}

module.exports = logEvent;
