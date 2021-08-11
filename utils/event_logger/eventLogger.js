//import logEvent from './eventLogger'
const validate = require("./helpers/validation.js");
const Event = require("./models/EventModal");
const config = require("./config.js");

async function connectDB() {
    var MONGODB_URL = process.env.MONGODB_URL || config.MONGODB_URL;
    var mongoose = require("mongoose");
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        //don't show the log when it is test
        if (process.env.NODE_ENV !== "test") {
            console.log("connected to db")
            // console.log("Connected to %s", MONGODB_URL);
            // console.log("App is running ... \n");
            // console.log("Press CTRL + C to stop the process. \n");
        }
    })
        .catch(err => {
            console.error("App starting error:", err.message);
            process.exit(1);
        });
    var db = mongoose.connection;
    return db;
}



async function logEvent(data) {
    if (validate(data)==true) {
        let connection = await connectDB();
        return await Event.findOne({ eventID: data.eventID }, function (err, foundEvent) {
            if (err) console.log("Error is", err)
            if (foundEvent != null) {
                err = {
                    message: "Event exists with same Event ID",
                    code: 500,
                }
                console.log(connection.close());
                console.log(err)
                return err
            } else {
                console.log("Creating event")
                var event = new Event({
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
                })
                return event.save(async function (err) {
                    if (err) {      
                        console.log(err)                  
                        console.log(connection.close());
                        return err;
                    }
                    else {
                        console.log("data stored succesfully");
                        console.log(connection.close());
                        return true
                    }
                });
            }
        });
    }
    else {
        err = {
            message: "Data Invalid : Fields incorrect",
            code: 500,
        }
        return err;
    }
}

module.exports = logEvent;