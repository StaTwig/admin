const init = require('../common/init.js');
const jwt = require('jsonwebtoken');
    //let  config = require('./config.js');
    let config = require('../common/config.js');
    let middleware = require('../common/middleware.js');

const multichain = init.getMultichain();

function hex_to_ascii(str) {
    var hex = str.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

exports.login1 = async function (req, res) {
	userstream= "userstream"
	key = "inventory-001"
	var new_address = new Promise(function (resolve, reject) {
multichain.listStreamKeyItems({stream: userstream, key: key, verbose: false}, (err, tx) => {
            resolve(tx)
})
})
	 await new_address.then(function (value) {
        actor_address = hex_to_ascii(value[0].data);
		 console.log(key,actor_address)
        let username = req.body.username;
    let password = req.body.password;
		 console.log(username,password)
        if (username === key && password === actor_address) {
        let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      }
	 })
}


exports.login = async function (req, res) {
    userstream="userstream"
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    //let mockedUsername = 'admin';
    //let mockedPassword = 'password';
    //console.log(mockedUsername,mockedPassword)
    
    var fetch_pass = new Promise(function (resolve, reject) {
    multichain.listStreamKeyItems({stream: userstream, key: username, verbose: false}, (err, tx) => {
            resolve(tx)
   })
})
    await fetch_pass.then(function (value) {
    password_act = hex_to_ascii(value[0].data);
    if (username && password) {
      if (username === username && password === password_act) {
        let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    }
     else {
     res.status(400).json({
     success: false,
     message: 'Authentication failed! Please check the request'
    });
    }
    })
}


exports.index = async function (req, res) {
        res.json({
      success: true,
      message: 'Index page'
    });
}
