const RbacModel = require('../models/RbacModel');

const checkPermissions = async (request, next) => {
    const required_permission = request["permissionRequired"]
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
};

module.exports = {
    checkPermissions: checkPermissions
}
 
