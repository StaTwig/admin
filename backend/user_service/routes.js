'use strict'

//Define all the routes in the server running on multichain cluster
module.exports = function routes(app) {
    //app.post('/registerUser', require('./users/register').registerUser);
    app.post('/signUpUser', require('./users/create').createUser); //signup
    app.post('/login', require('./users/login').login);
    app.post('/forgotPassword', require('./users/password').forgotPassword);
    app.post('/resetPassword', require('./users/password').resetPassword);
    app.post('/updateDetails',require('./users/updateDetails').updateDetails);	 
    app.get('/',require('./common/middleware').checkToken, require('./users/login').index);

}


