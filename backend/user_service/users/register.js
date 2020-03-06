const init = require('../common/init');

exports.registerUser = function (req, res) {

    const multichain = init.getMultichain();
    const {actor, userID} = req.query;
    var key = actor + "-" + userID
    var user_stream = "userstream"

    var new_address = new Promise(function (resolve, reject) {
        multichain.getNewAddress({stream: user_stream}, (err, tx) => {
            resolve(tx)
        })
    })
	console.log("key",key)

    new_address.then(function (value) {
        var address = value;
        //Save the details of actor and respective address in the stream_user (Key:Actor and Data:Address)
        multichain.publish({
            stream: user_stream,
            key: key,
            data: new Buffer(address).toString("hex")
        }, (err, tx) => {
            res.json({transactionId: tx});
        }) 
    })
}


