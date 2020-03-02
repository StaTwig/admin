'use strict'

//Define all the routes in the server running on multichain cluster
module.exports = function routes(app) {

    //POST routes
    app.post('/publish', require('./data/publish').writeData);
    app.post('/publishBulkData', require('./data/publish').writeBulkData);

}


