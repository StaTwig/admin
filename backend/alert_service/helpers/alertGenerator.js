const Alert = require('../models/AlertModel')
const Event = require('../models/EventModal')
const User = require('../models/UserModel')
const { alertMobile, alertEmail, alertPushNotification, pushNotification } = require('./alertSender')


async function processShipmentEvents(event){
    try{
        const shipmentId = event?.payloadData?.data?.id;
        let params = { 
            "alerts.event_type_primary": event.eventTypePrimary,
            "alerts.event_type_secondary": event.eventTypeDesc,
            "alerts.transactionId" : shipmentId      
        }
        for await(const row of Alert.find({
            ...params
        })){
            pushNotification(event,row.user.user_id)
            if(row.alertMode.mobile){
                alertMobile(event,row.user.mobile_number);
            }
            if(row.alertMode.email){
            alertEmail(event,row.user.emailId)
            }
            if(row.alertMode.web_push){
                alertPushNotification(event,row.user.user_id)
            }        
        }
    }
    catch(err){
        console.log(err)
    }
}

async function processOrderEvents(event){
    try{
        const orderId = event?.payloadData?.data?.order_id;
        let params = { 
            "alerts.event_type_primary": event.eventTypePrimary,
            "alerts.event_type_secondary": event.eventTypeDesc,
            "alerts.transactionId" : orderId    
        }
        for await(const row of Alert.find({
            ...params
        })){
            pushNotification(event,row.user.user_id)
            if(row.alertMode.mobile){
                alertMobile(event,row.user.mobile_number);
            }
            if(row.alertMode.email){
            alertEmail(event,row.user.emailId)
            }
            if(row.alertMode.web_push){
                alertPushNotification(event,row.user.user_id)
            }        
        }
    }
    catch(err){
        console.log(err)
    }
}

async function generateAlert(event) {
    try{
    if(event.eventTypeDesc=='SHIPMENT') await processShipmentEvents(event);
    else if(event.eventTypeDesc=='ORDER') await processOrderEvents(event);
    let params = { 
        "alerts.event_type_primary": event.eventTypePrimary,
        "alerts.event_type_secondary": event.eventTypeDesc,
        "alerts.actorOrgId": event.actorOrgId
    }
	for await(const row of Alert.find({
        ...params
    })){
        pushNotification(event,row.user.user_id)
        if(row.alertMode.mobile){
            alertMobile(event,row.user.mobile_number);
        }
        if(row.alertMode.email){
           alertEmail(event,row.user.emailId)
        }
        if(row.alertMode.web_push){
            alertPushNotification(event,row.user.user_id)
        }        
    }
}
catch(err){
        console.log(err)
    }
}

exports.generateAlert = generateAlert;