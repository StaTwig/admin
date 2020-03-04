const dotenv = require('dotenv').config();
var log4js = require('log4js');

exports.getMultichain = function () {
    let multichain = require("multichain-node")({
        port: process.env.PORT,
        host: process.env.HOST,
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
        version: process.env.MC_VERSION
    });
    return multichain;
};

exports.getLog = function () {
   let log = log4js.configure({ // configure to use all types in different files.
      appenders: {
        "backend-logs" : { type: "file",
            filename: "logs/backend.log", // specify the path where u want logs folder error.log
            category: 'info',
            maxLogSize: 20480,
            backups: 10
        },
        "frontend-logs": {   type: "file",
            filename: "logs/frontend.log", // specify the path where u want logs folder info.log
            category: 'info',
            maxLogSize: 20480,
            backups: 10
        }},
        "categories": {
		"backend-logs" :{"appenders": ["backend-logs"] ,"level": "info"},
		"frontend-logs" :{"appenders": ["frontend-logs"] ,"level": "info"},
		default :{"appenders": ["backend-logs"] ,"level": "info"}
	//{[ "frontend-logs" ],"level": "info" }
        //"appenders": {["frontend-logs"], "level": "info" }
        }
   }); 
	return log;
};

