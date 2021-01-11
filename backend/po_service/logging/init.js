const dotenv = require('dotenv').config();
const winston = require('winston');
const LogzioWinstonTransport = require('winston-logzio');

exports.getLog = function () {
    const logzioWinstonTransport = new LogzioWinstonTransport({
        level: process.env.LOGZ_LEVEL,
        name: process.env.LOGZ_NAME,
        token: process.env.LOGZ_TOKEN,
        host: process.env.LOGZ_HOST,
      });
      
      
      var logger = winston.createLogger({
          format: winston.format.simple(),
          transports: [logzioWinstonTransport],
      }); 
    return logger;
}
