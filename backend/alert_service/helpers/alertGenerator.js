const Alert = require('../models/AlertModel')
const Event = require('../models/EventModal')
const User = require('../models/UserModel')
const { alertMobile, alertEmail, alertWebPush } = require('./alertSender')


async function connectDB() {
  var MONGODB_URL = process.env.MONGODB_URL;
  console.log(MONGODB_URL)
  var mongoose = require('mongoose')
  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      //don't show the log when it is test
      if (process.env.NODE_ENV !== 'test') {
        console.log('Connected to %s', MONGODB_URL)
        console.log('App is running ... \n')
        console.log('Press CTRL + C to stop the process. \n')
        var db = mongoose.connection
        return db
      }
    })
    .catch((err) => {
      console.error('App starting error:', err.message)
      process.exit(1)
    })
}

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
            let user = await User.find({id:row.user.user_id})
            console.log("****************WEB PUSH ID****************",user.web_push)
            alertWebPush(event,user.web_push)
        }        
        console.log("****************ROW ENDS HERE *****************************")
    }
}
catch(err){
    console.log(err)
}
}

exports.generateAlert = generateAlert;