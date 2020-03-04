'use strict'

//Define all the routes in the server running on multichain cluster
module.exports = function routes(app) {
    //GET routes
    app.get('/queryDataByKey', require('./data/query').fetchDataByKey);
    app.get('/queryDataByAddress', require('./data/query').fetchDataByAddr);
    app.get('/queryDataByPublishers',require('./data/query').fetchDataByPublishers); 
    app.get('/queryDataByTxHash',require('./data/query').fetchDataByTxHash);
    //app.get('/',(req,res)=>res.send('welcome'));
    app.get('/getTemperatureData', require('./models/temperature').getData);
    app.get('/getHumidityData', require('./models/humidity').getData);
    //app.post('/getMilestoneData', require('./data/query').fetchMilestoneData);


}


