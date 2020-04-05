const init = require('../common/init');
var shell = require('shelljs')

exports.createUser = function (req, res) {
    const multichain = init.getMultichain();
    multichain.getNewAddress({
    }, (err, data) => {
        res.json({items: data});
    })
}

exports.grantPermission = function (req, res) {
    const multichain = init.getMultichain();
	var stream = req.body.stream;
 	var address = req.body.address;
        shell.exec("multichain-cli chain1 grant " + address + " " + stream + ".write")
        shell.exec("multichain-cli chain1 grant " + address + " send");
        res.json("success");
}
