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

/*exports.writeData1 = function (req, res) {
    if (process.env.MC_VERSION == 1.0) {
        var response = writeDatav1(req, res)
    } else {
        var response = writeDatav2(req, res)
    }
    console.log("Response" + response)
    res.json(response);
}*/

//To publish data to Multichain 1
var txnHash = ""
//async function writeDatav1(req, res) {
exports.writeData = async function (req, res) {
     const data = Buffer.from(JSON.stringify(req.body.data), 'utf8').toString('hex');
    //const data = new Buffer(req.body.data).toString("hex")
    //const data = new Buffer(JSON.stringify(req.body.data)).toString("hex");
    const multichain = init.getMultichain();
    console.log("data",data)
        var key = req.body.data.actor + "-" + req.body.data.userID
	var key_1 = req.body.key
        var user_stream = "userstream"
        var new_address = new Promise(function (resolve, reject) {
        multichain.listStreamKeyItems({stream: user_stream, key: key, verbose: false}, (err, tx) => {
            resolve(tx)
        })
    })

    await new_address.then(function (value) {
        actor_address = hex_to_ascii(value[0].data);
        var dataStream = req.body.stream
        //shell.exec("multichain-cli chain1 grant " + actor_address + " " + dataStream + ".write")
        //shell.exec("multichain-cli chain1 grant " + actor_address + " send");
        //const tx = shell.exec("multichain-cli chain1 publishfrom " + actor_address + " " + dataStream + " " + key + " " + data);
        //txnHash = tx;
        //})
        //res.json({transactionId: txnHash});
	    console.log(actor_address,dataStream,key_1,data)
	 multichain.publishFrom({from:actor_address, stream:dataStream, key:key_1 , data:data }, (err, tx) => {
         uilogger.info("Publishing data to",dataStream,"by actor",key,"publisher address",actor_address,data);   
         res.json({transactionId: tx});
        })
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


