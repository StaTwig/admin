# Event Logger (Helper Utility)

This is a utility helper which can be imported into any method and called with the event data in the schema defined below and the helper will validate the data to ensure it is in the right format and then will store it in the Events collection of the MongoDB.

## Steps to use

1. Update the Mongo URL in the Config FILE | config.js or set "MONGODB_URL" as an env variable
   `let config = {`
   ` MONGODB_URL : "mongodb+srv://place_mongo_url_here"`
   `}`

**--------------------------------------------------------------------------------**
`export MONGODB_URL = mongodb://place_mongo_url_here` 2) Import the helper file
`const logEvent = require('../utils/event_logger/eventLogger.js');` 3) Call the logEvent method
`result = await logEvent(data)`

## Schema to Events

    {
      "title": "Root",
      "type": "object",
      "properties": {
        "eventID": {
          "type": "string"
        },
        "eventTime": {
          "type": "string"
        },
        "eventType": {
          "type": "object",
          "properties": {
            "primary": {
              "type": "string"
            },
            "description": {
              "type": "string"
            }
          },
          "required": [
            "primary",
            "description"
          ]
        },
        "actor": {
          "type": "object",
          "properties": {
            "actorid": {
              "type": "string"
            },
            "actoruserid": {
              "type": "string"
            }
          },
          "required": [
            "actorid",
            "actoruserid"
          ]
        },
        "stackholders": {
          "type": "object",
          "properties": {
            "ca": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "address": {
                  "type": "string"
                }
              },
              "required": [
                "id",
                "name",
                "address"
              ]
            },
            "actororg": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "address": {
                  "type": "string"
                }
              },
              "required": [
                "id",
                "name",
                "address"
              ]
            },
            "secondorg": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "address": {
                  "type": "string"
                }
              },
              "required": [
                "id",
                "name",
                "address"
              ]
            }
          },
          "required": [
            "ca",
            "actororg",
            "secondorg"
          ]
        },
        "payload": {
          "type": "object",
          "properties": {
            "data": {
              "type": "object",
              "properties": {},
              "required": []
            }
          },
          "required": [
            "data"
          ]
        }
      },
      "required": [
        "eventID",
        "eventTime",
        "eventType",
        "actor",
        "stackholders",
        "payload"
      ]
    }
