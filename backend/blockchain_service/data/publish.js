const init = require('../common/init.js');
var shell = require('shelljs')

//var log4js = require('log4js');
var date = require('date-and-time');

var curr_date = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')

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

//To publish data to Multichain 1
//async function writeDatav1(req, res) {
exports.writeData = async function (req, res) {
        const data = Buffer.from(JSON.stringify(req.body.data), 'utf8').toString('hex');
        const multichain = init.getMultichain();
	var key = req.body.key
        var address = req.body.address
        var dataStream = req.body.stream
	 
	 multichain.publishFrom({from:address, stream:dataStream, key:key , data:data }, (err, tx) => {
         res.json({transactionId: tx});
      })
    }

//To publish data to Multichain 2
function writeDatav2(req, res) {
    const json = '{"json":';
    const data = json + JSON.stringify(req.body.data) + "}"
    const key = req.body.key;

    if (req.body.address == null) {
        const command = "multichain-cli chain1 publish stream1 " + "'" + key + "' " + "'" + data + "'";
        const result = shell.exec(command, function (code, stdout, stderr) {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            console.log('Response: ' + result.stdout);
            //res.json({transactionId: stdout});
            return stdout;
        })
    } else {
        const command = "multichain-cli chain1 publish stream1 " + "'" + key + "' " + "'" + data + "'";
        const result = shell.exec(command, function (code, stdout, stderr) {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            console.log('Response: ' + result.stdout);
            //res.json({transactionId: stdout});
            return stdout;
        })
    }
}

// To publish bulk data to Multichain
exports.writeBulkData = function (req, res) {
    const json = '{"json":';
    const quot = '"';

    const data = json + JSON.stringify(req.body.data) + "}"
    const key = "[" + quot + req.body.key + quot + "," + quot + req.body.data.location + quot + "]";
    const multichain = init.getMultichain();

    if (req.body.address == null) {
        const command = "multichain-cli chain1 publishmulti stream1 " + "'" + key + "' " + "'" + data + "'"
        const result = shell.exec(command, function (code, stdout, stderr) {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            res.json({transactionId: stdout});
        })
    } else {
        const command = "multichain-cli chain1 publishmultifrom stream1 " + "'" + key + "' " + "'" + data + "'"
        const result = shell.exec(command, function (code, stdout, stderr) {
            console.log('Exit code:', code);
            console.log('Program output:', stdout);
            console.log('Program stderr:', stderr);
            res.json({transactionId: stdout});
        })
    }
}


exports.recordLog = function (req, res) {
    console.log(req.body)
    let message = req.body;
    uilogger.info("Recording logs for front end events",message,curr_date);
    res.send("success")
}


