const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.on('connect', () => {
	console.log("Connected to Redis");
});
client.on('error', err => {
    console.log('Error ' + err);
});

const checkPermissions = async (request, next) => {
    try {
    let result = false;
    const required_permission = request["permissionRequired"]
    const request_role = request["role"]
    request_role.forEach(role =>{
        client.sismember(role,required_permission, async (err, reply) => {
            if(reply === 1){
                result = true;
            }
        })
    })
    if(result === true){
        next({
            success: true,
            message: 'Permission Granted'
        });
    }
    else {
    next({
        success: false,
        message: 'Permission Denied'
    });
}
}
catch(err){
    console.log(err);
    next({
        success: false,
        message: 'Error'
    });
}
}

module.exports = {
    checkPermissions: checkPermissions
}
 