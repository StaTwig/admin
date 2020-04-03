const init = require('../common/init');

exports.createUser = function (req, res) {
    const multichain = init.getMultichain();
    var user_stream = "test_stream"
    multichain.getNewAddress({
    }, (err, data) => {
        res.json({items: data});
    });
}
