const redis = require("redis");
const RbacModel = require('../models/RbacModel');
const client = redis.createClient(process.env.REDIS_URL);
client.on('connect', () => {
	console.log("Connected to Redis");
});
client.on('error', err => {
    console.log('Error ' + err);
});

const checkPermissions = async (request, next) => {
    const required_permission = request["permissionRequired"]
    const request_role = request["role"]
    client.sismember(request_role,required_permission, async (err, reply) => {
        if(reply === 1){
            next({
                success: true,
                message: 'Permission Granted'
            });
        }
        else{
        const rbacObject = await RbacModel.findOne({role: request.role})
        if (rbacObject && rbacObject.permissions.indexOf(required_permission) > -1) {
        next({
            success: true,
            message: 'Permission Granted'
        });
    } else {
        next({
            success: false,
            message: 'Permission Denied'
        });
    }
    }
})
}

module.exports = {
    checkPermissions: checkPermissions
}
 
