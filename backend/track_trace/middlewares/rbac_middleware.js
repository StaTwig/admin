const UserModel = require('../models/UserModel');
const RbacModel = require('../models/RbacModel');
// const { request, response } = require('express');

let checkPermissions = (request, response, next) => {
    var result = request["result"]
    var required_permission = request["permissionRequired"]
    var user_email = result.email;
    // Fetch the user by id 
    var user = await UserModel.findOne({email: user_email})
    var user_role = user.role;
    //fetch permissions using role
    var rbacObject = await RbacModel.findOne({role: user_role})
    var permissions = rbacObject.permissions
    if (permissions.indexOf(required_permission) > -1) {
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
 