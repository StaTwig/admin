const init = require('../common/init');
var date = require('date-and-time');

/* log4js.configure({
  appenders: { logs: { type: 'file', filename: 'logs/backend.log' } },
  categories: { default: { appenders: ['logs'], level: 'info' } }
}); */

const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');
const uilogger = log4js.getLogger('frontend-logs');

exports.fetchDataByKey = function (req, res) {
    console.log('txId ', req.query);
    const {stream, key} = req.query;
    const multichain = init.getMultichain();

    multichain.listStreamKeyItems({
        stream,
        key,
        verbose: true
    }, (err, data) => {
        //res.setHeader('Access-Control-Allow-Origin', '*');
        data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
        });
	logger.info("Fetch data from",stream,"for the key",key);
        res.json({items: data});
    });
}

exports.fetchDataByAddr = function (req, res) {
    console.log('txId ', req.query);
    const {address, count} = req.query;
    const multichain = init.getMultichain();

    multichain.listAddressTransactions({
        address: address,
        count: count
    }, (err, data) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
        });
	logger.info("Fetch data from",stream,"for the address",address);
        res.json({items: data});
    });
}

exports.fetchDataByPublishers = function (req, res) {
    console.log('txId ', req.query);
    const {stream, address} = req.query;
    const multichain = init.getMultichain();

    multichain.listStreamPublisherItems({
	stream,
        address,
        verbose: true,
	start : 0,
	count : 9999999
    }, (err, data) => {
        //res.setHeader('Access-Control-Allow-Origin', '*');
        data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
        });
        logger.info("Fetch data from",stream,"and publisher address",address);
        res.json({items: data});
    });
}

exports.fetchDataByTxHash = function (req, res) {
    const {stream, txid} = req.query;
    const multichain = init.getMultichain();

    multichain.getStreamItem({
        stream,
        txid,
        verbose: true
    }, (err, data) => {
        //res.setHeader('Access-Control-Allow-Origin', '*');
        //data.forEach(item => {
        data1 = Buffer.from(data.data, 'hex').toString('utf8')
        logger.info("Fetch data from",stream,"for the txid",txid);
        res.json({items: data1});
    });
}


