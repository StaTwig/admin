# Event Service 

This Service will return the events from DB and can be queried by Actor, ActorOrdId, EventID and more.

## Endpoints

##### getAllEvents 
`GET <IP:PORT>/eventmanagement/api/event/getAllEvents`
##### getEventByActorId 
` GET <IP:PORT>/eventmanagement/api/event/getEventByActorId/:actorId/:eventTypePrimary/:eventTypeDesc`
##### getEventByCaId
`GET <IP:PORT>/eventmanagement/api/event/getEventByCaId/:caId/:eventTypePrimary/:eventTypeDesc`
##### getEventByEventId
`GET <IP:PORT>/eventmanagement/api/event/getEventByEventId/:eventID/:eventTypePrimary/:eventTypeDesc`
##### getEventBySecondaryOrgId
`GET <IP:PORT>/eventmanagement/api/event/getEventBySecondaryOrgId/:secondaryOrgId/:eventTypePrimary/:eventTypeDesc`
###### getEventByActorOrgId
`GET <IP:PORT>/eventmanagement/api/event/getEventByActorOrgId/:actorOrgId/:eventTypePrimary/:eventTypeDesc`
##### deleteEventById
`DELETE <IP:PORT>/eventmanagement/api/event/deleteEventById/:eventId`

## Note

The 'eventTypePrimary' and 'eventTypeDesc' are optional params and can be passed for filtering

## Schema returned by Events Service
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
