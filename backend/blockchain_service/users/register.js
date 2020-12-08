const init = require('../common/init');
const dotenv = require('dotenv').config();

const logz = init.getLogz();

var shell = require('shelljs');
const log4js = init.getLog();

const logger = log4js.getLogger('backend-logs');

exports.createUser = function (req, res) {
	logz.log('info', '<<<<< BlockchainService < Register < createUser : instantiating multichain');
    const multichain = init.getMultichain();
    multichain.getNewAddress({
    }, (err, data) => {
	logz.log('info', '<<<<< BlockchainService < Register < createUser : Created new address');
	logger.info("Created new address",data);
        res.json({items: data});
    })
}

exports.grantPermission = function (req, res) {
	logz.log('info', '<<<<< BlockchainService < Register < grantPrmission : instantiating multichain');
    const multichain = init.getMultichain();
	var address = req.body.address;
	var streams = process.env.STREAMS.split(",");
	
	for (var i = 0; i < streams.length; i++) {
	var stream = streams[i];
	
	multichain.grant({
        addresses: address,
        permissions: stream + ".write"
        }, (err, data) => {
    })
    multichain.grant({
        addresses: address,
        permissions: "send"
        }, (err, data) => {
    })

	logger.info("Granting permission for address",address,"to stream",stream);
	logz.log('info', '<<<<< BlockchainService < Register < grantPrmission : Granting permission for address to a stream');
	}
    res.json("All permissions granted for the address");
}

