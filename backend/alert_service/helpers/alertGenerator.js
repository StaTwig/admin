const Alert = require('../models/AlertModel')
const Event = require('../models/EventModal')
const User = require('../models/UserModel')
const Atoms = require('../models/AtomsModel')
const EmployeeModel = require('../models/EmployeeModel')
const WarehouseModel = require('../models/WarehouseModel')
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
            if(row.alertMode.mobile){
                alertMobile(event,row.user.mobile_number);
            }
            if(row.alertMode.email){
                console.log(row.user.emailId)
            alertEmail(event,row.user.emailId)
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
            if(row.alertMode.mobile){
                alertMobile(event,row.user.mobile_number);
            }
            if(row.alertMode.email){
            alertEmail(event,row.user.emailId)
            }      
        }
    }
    catch(err){
        console.log(err)
    }
}

async function generateAlert(event) {
    try{
        const txnId = event?.payloadData?.data?.id || event?.payloadData?.data?.order_id;
        if(event.eventTypeDesc=='SHIPMENT') await processShipmentEvents(event);
        else if(event.eventTypeDesc=='ORDER') await processOrderEvents(event);
        else if(event.eventTypeDesc=='SHIPMENT_TRACKING') await processShipmentEvents(event);
        for await(const user of EmployeeModel.find({ organisationId : event.actorOrgId })){
            alertPushNotification(event,user.id)
            if(event.eventTypeDesc=='SHIPMENT') pushNotification(event,user.id,'TRANSACTION',txnId) 
            else pushNotification(event,user.id,'ALERT',txnId)
        }
        let params = { 
            "alerts.event_type_primary": event.eventTypePrimary,
            "alerts.event_type_secondary": event.eventTypeDesc,
            "alerts.actorOrgId": event.actorOrgId
        }
        for await(const row of Alert.find({
            ...params
        })){
                if(row.alertMode.mobile){
                    alertMobile(event,row.user.mobile_number);
                }
                if(row.alertMode.email){
                alertEmail(event,row.user.emailId)
                }      
            }
    }
    catch(err){
        console.log(err)
    }
}


async function checkProductExpiry(){
    try{
        let params = {
            "attributeSet.expDate" : { $lt: new Date() }
        }
        for await(const product of Atoms.find({ 
            ...params
        })){
            productExpired(product.productId,product.quantity,product.inventoryIds)
        }
    }
    catch(err){
        console.log(err)
    }
}

async function productExpired(productId, quantity, owner){
    for(inventoryId of owner){
        for await(const inventory of WarehouseModel.find( 
            { warehouseInventory : inventoryId }
        )){
            productExpiryEvent(productId, quantity, inventory.id, inventory.organisationId)
        }
    }
}

async function productExpiryEvent(productId, quantity, warehouse, organisation){
    for await(const user of EmployeeModel.find( 
        { warehouseId : warehouse }
    )){
        eventData = {
            actorOrgId : organisation,
            eventTypePrimary : "EXPIRE",
            eventTypeDesc : "PRODUCT",
            quantity: quantity
        }
        pushNotification(eventData,user.id,"ALERT",productId)
        alertPushNotification(eventData,user.id)
        let alertData = Alert.findOne({ username : user.id })
        // alertEmail(eventData,"gmail@sanathswaroop.com")
        // alertMobile(eventData,"+919392848111")
        if(alertData?.alertMode?.mobile==true) alertMobile(eventData,user.phoneNumber)
        if(alertData?.alertMode?.email==true) alertEmail(eventData,user.emailId)
    }
}


exports.checkProductExpiry = checkProductExpiry;
exports.generateAlert = generateAlert;