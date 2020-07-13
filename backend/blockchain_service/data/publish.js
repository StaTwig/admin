const init = require('../common/init.js');
var shell = require('shelljs')

var date = require('date-and-time');

var curr_date = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')

const logz = init.getLogz();

const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');
const uilogger = log4js.getLogger('frontend-logs');

function hex_to_ascii(str) {
    var hex = str.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

//To publish data to Multichain
exports.writeData = async function (req, res) {
        const data = Buffer.from(JSON.stringify(req.body.data), 'utf8').toString('hex');
        logz.log('info', '<<<<< BlockchainService < Publish < writeData : instantiating multichain');
        const multichain = init.getMultichain();
	    var key = req.body.key
        var address = req.body.address
        var dataStream = req.body.stream
        logz.log('info', '<<<<< BlockchainService < Publish < writeData : Publishing data to stream ');
	    uilogger.info("Publishing data to stream",dataStream,"key",key,"address",address,"data",data);
	    multichain.publishFrom({from:address, stream:dataStream, key:key , data:data }, (err, tx) => {
            logz.log('info', '<<<<< BlockchainService < Publish < writeData : Published data to stream with txnId');
            res.json({transactionId: tx});
      })
    }

exports.recordLog = function (req, res) {
    let message = req.body;
    logz.log('info', '<<<<< BlockchainService < Publish < recordLog : recording logs for front end events');
    uilogger.info("Recording logs for front end events",message,curr_date);
    res.send("success")
}


