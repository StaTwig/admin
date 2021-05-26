const mailer = require('./mailer');
const { constants } = require('./constants');
const axios = require('axios');

function eventToData(event,type){
    switch(type){
    case "email" :
        return eventToHtml(event);
    case "mobile" :
        return eventToPlainText(event);     
    case "web_push" :
        return eventToPlainText(event); 
    }
}

function eventToPlainText(event){
    return `New alert from ${event.actorOrgId}, Event "${event.eventTypePrimary}" applied on ${event.eventTypeDesc}`
}

function eventToHtml(event){
    return `<html><p>New alert from ${event.actorOrgId}, Event "${event.eventTypePrimary}" applied on ${event.eventTypeDesc}</p></html>`
}

function alertMobile(event,mobile){    
    try{
    const content = eventToData(event,"mobile")
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

function alertEmail(event,email){
    try{
    const content = eventToData(event,"email")
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

function alertWebPush(){

}

exports.alertMobile = alertMobile;
exports.alertEmail = alertEmail;
exports.alertWebPush = alertWebPush;