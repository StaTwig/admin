const Alert = require('../models/AlertModel')
const Event = require('../models/EventModal')
const User = require('../models/UserModel')
const { alertMobile, alertEmail, alertPushNotification, pushNotification } = require('./alertSender')



async function generateAlert(event) {
    try{
        //console.log("*****************EVENT*************",event)
    let params = { 
        "alerts.event_type_primary": event.eventTypePrimary,
        "alerts.event_type_secondary": event.eventTypeDesc,
        "alerts.actorOrgId": event.actorOrgId
    }
    console.log("*************PARAMS FOR QUERY*************",params)
	for await(const row of Alert.find({
        ...params
    })){
        pushNotification(event,row.user.user_id)
        console.log("*****************ROW STARTS HERE**********************",row)
        console.log("**************** ALERTS MODE *****************", row.alertMode)
        if(row.alertMode.mobile){
            console.log("********************MOBILE NUMBER*********************",row.user.mobile_number)
            alertMobile(event,row.user.mobile_number);
        }
        if(row.alertMode.email){
            console.log("********************EMAIL ID****************",row.user.emailId)
           alertEmail(event,row.user.emailId)
        }
        if(row.alertMode.web_push){
            console.log("****************WEB PUSH ID****************",row.user.user_id)
            alertPushNotification(event,row.user.user_id)
        }        
        console.log("****************ROW ENDS HERE *****************************")
    }
}
catch(err){
        console.log(err)
    }
}

exports.generateAlert = generateAlert;