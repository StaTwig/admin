const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID;
const axios = require('axios');
const client = require('twilio')(accountSid, authToken);
const Notification = require('../models/NotificationsModel')
const Organisation = require('../models/OrganisationModel')
var uuid = require('uuid');

async function eventToData(event,type){
    switch(event.eventTypeDesc){
        case "SHIPMENT" :
            return shipmentMessage(event,event?.payloadData?.data?.id)
        case "ORDER" : 
            return await orderMessage(event,event?.transactionId,event.actorOrgId)
        case "SHIPMENT_TRACKING" :
            return shipmentMessage(event,event?.payloadData?.data?.id)
        case "INVENTORY" :
            return inventoryMessage(event,event?.transactionId)
        default : 
            return eventToPlainText(event)
    }
    // switch(type){
    // case "email" :
    //     return eventToHtml(event);
    // case "mobile" :
    //     return eventToPlainText(event);     
    // case "push" :
    //     return eventToPlainText(event); 
    // }
}

async function eventToPlainText(event){
    return `New alert from ${event.actorOrgId}, Event "${event.eventTypePrimary}" applied on ${event.eventTypeDesc}`
}

async function eventToHtml(event){
    return `<html><p>New alert from ${event.actorOrgId}, Event "${event.eventTypePrimary}" applied on ${event.eventTypeDesc}</p></html>`
}

async function shipmentMessage(event,txnId){
    if(event.eventTypePrimary=="CREATE") return `"Shipment - ${txnId}" has been Created`
    else if(event.eventTypePrimary=="UPDATE") return `"Shipment - ${txnId}" has been Updated`
    else if(event.eventTypePrimary=="RECEIVE") return `"Shipment - ${txnId}" has been Delivered`
    else return `"Shipment - ${txnId}" has been Updated`
}

async function inventoryMessage(event,txnId){
    if(event.eventTypePrimary=="ADD") return `"Inventory - ${txnId}" has been Created`
    else if(event.eventTypePrimary=="EXPIRED") return `"Inventory - ${txnId}" has expired`
    else if(event.eventTypePrimary=="NEAR_EXPIRY") return `"Inventory - ${txnId}" is nearing Expiry`
    else return `"Inventory - ${txnId}" has been Updated`
}


async function orderMessage(event,txnId,actorOrgId){
    let organization = await Organisation.findOne({id : actorOrgId })
    if(event.eventTypePrimary=="RECEIVE") return `Received a new Order "Order - ${txnId}"  from ${actorOrgId} (${organization?.name})`
    else if(event.eventTypePrimary=="ACCEPT") return `Your "Order ID: ${txnId}" has been Accepted by ${actorOrgId} (${organization?.name})`
    else if(event.eventTypePrimary=="REJECT") return `Your "Order ID: ${txnId}" has been Rejected by ${actorOrgId} (${organization?.name})`
    else if(event.eventTypePrimary=="CREATE") return `"Order ID: ${txnId}" has been Created by ${actorOrgId} (${organization?.name})`
    else return `"New updates on "Order - ${txnId}"  from ${actorOrgId}`
}

async function pushNotification(event,userId,type, transactionId){
    try{
        const content = await eventToData(event,"mobile")
        var notification = new Notification({ id: uuid.v4() ,title: "VaccineLedger alert", message: content, user: userId, eventType: event.eventTypeDesc, transactionId: event.transactionId});
        console.log(notification);
        if(type == 'ALERT') notification.type = 'ALERT';
        else notification.type = 'TRANSACTION'
        notification.transactionId = transactionId;
        notification.save(async function(err, doc) {
            if (err) return console.error(err);
            console.log("Document inserted succussfully!",doc);
          });
    }catch(err){
        console.log(err)
    }
}

async function alertMobile(event,mobile){    
    try{
    const content = await eventToData(event,"mobile")
    axios.post(process.env.MESSAGING_SERVICE_URL, {
        "subject": "Testing otp",
        "phone": mobile,
        "otp": "0007",
        "message": content,
        "source": "https://theledger.com"
    })
        .then((response) => {
          if (response.status === 200) {              
            console.log("******************************** SMS SUCCESSFUL ****************")
              return true;
          }
        })
    }
    catch(err){
        console.log(err)
    }
}

async function alertEmail(event,email){
    try{
    const content = await eventToData(event,"mobile")
    console.log("Mailed succesfully to",email)
    axios.post(process.env.MESSAGING_SERVICE_URL, {
        "subject": `New Alert`,
        "email" : email,
        "otp": "0007",
        "message": content,
        "source": "https://theledger.com"
    })
        .then((response) => {
          if (response.status === 200) {
              console.log("**********Mailed Succesfully**********")
              return true;
          }
        })
}catch(err){
    console.log(err)
}
}

async function alertPushNotification(event,userIdentity){
    const content = await eventToData(event,"push")
    console.log(userIdentity)
    client.notify.services(serviceId)
    .notifications
    .create({
        fcm:{"notification" : {      "body" : content,      "title": "New Notification"  }},
        apn:{"notification" : {      "body" : content,      "title": "New Notification"  }},
        identity: userIdentity
    })
    .then(notification => console.log(notification));
}

exports.alertMobile = alertMobile;
exports.alertEmail = alertEmail;
exports.alertPushNotification = alertPushNotification;
exports.pushNotification = pushNotification;
