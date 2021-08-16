const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);
const RbacModel = require('../models/RbacModel');

client.on('connect', () => {
	console.log("Connected to Redis");
});
client.on('error', err => {
    console.log('Error ' + err);
});

exports.RbacCache = function(){
RbacModel.find({}).then(permissions => {
    if(permissions.length > 0) {
      permissions.forEach(role => {
        client.del(role.role, (err, res) => { if(err) console.log(err);
        console.log("DELETE",res, role.role);
       })
       if(role.permissions.length > 0){
        client.sadd(role.role, role.permissions , (err,data) => {
          if(err) {
            console.log(err);
          }
          console.log("Cache Loaded " + data + " --- " + role.role + "\n");
        }) 
       } 
  });
    }
    else{
      console.log("No permissions found");
    }
  }).catch(err => {
    console.log(err);
  }
  )
}