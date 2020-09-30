'use strict'

//Define all the routes in the server running on multichain cluster
module.exports = function routes(app) {
    
   //Query services	
     //GET routes
    app.get('/blockchainmanagement/queryDataByKey', require('./data/query').fetchDataByKey);
    app.get('/blockchainmanagement/queryDataByAddress', require('./data/query').fetchDataByAddr);
    app.get('/blockchainmanagement/queryDataByPublishers',require('./data/query').fetchDataByPublishers);
    app.get('/blockchainmanagement/queryDataByTxHash',require('./data/query').fetchDataByTxHash);
    app.get('/blockchainmanagement/queryAllStreamKeys',require('./data/query').fetchStreamKeys);
    app.get('/blockchainmanagement/queryAllStreamItems',require('./data/query').fetchStreamItems);
    app.get('/blockchainmanagement/queryTotalBlocks',require('./data/query').fetchTotalBlocks);
    app.get('/blockchainmanagement/queryAllPublisherKeys',require('./data/query').fetchPublisherKeys);
    app.get('/blockchainmanagement/createUserAddress', require('./users/register').createUser);
    app.get('/blockchainmanagement/queryDataByRawTxHash',require('./data/query').fetchDataByRawTxHash);

    //Publish services
    //POST routes
    app.post('/blockchainmanagement/publish', require('./data/publish').writeData);
    app.post('/blockchainmanagement/publishExcelData', require('./data/publish').writeExcelData);
    app.post('/blockchainmanagement/grantPermission', require('./users/register').grantPermission);
}


