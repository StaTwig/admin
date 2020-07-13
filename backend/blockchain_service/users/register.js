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
	logz.log('info', '<<<<< BlockchainService < Register < createUser : Created new address', data);
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
	shell.exec("multichain-cli chain1 grant " + address + " " + stream + ".write")
	logger.info("Granting permission for address",address,"to stream",stream);
	logz.log('info', '<<<<< BlockchainService < Register < grantPrmission : Granting permission for address', address, "to stream", stream);
	}

	shell.exec("multichain-cli chain1 grant " + address + " send");
        res.json("success");
}

