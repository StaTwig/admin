const UserModel = require('../models/UserModel');
const RbacModel = require('../models/RbacModel');
// const { request, response } = require('express');

const checkPermissions = async (request, next) => {
    const result = request["result"]
    // console.log(result)
    const required_permission = request["permissionRequired"]
    const user_email = result.data.email;
    console.log(user_email)

    // Fetch the user by id 
    const user = await UserModel.findOne({email: user_email})
    // console.log(user)
    const user_role = user.role;
    //fetch permissions using role
    console.log(user_role)
    const rbacObject = await RbacModel.findOne({role: user_role})
    // const permissions = rbacObject.permissions
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
 
