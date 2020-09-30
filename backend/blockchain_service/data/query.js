const init = require('../common/init');
var date = require('date-and-time');

const logz = init.getLogz();

const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');
// const uilogger = log4js.getLogger('frontend-logs');

exports.fetchDataByKey = function (req, res) {
    const {stream, key} = req.query;
    const multichain = init.getMultichain();

    multichain.listStreamKeyItems({
        stream,
        key,
        verbose: true,
        count : 1,
        start: -1,
    }, (err, data) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(err)  {
        logz.log('error', '<<<<< BlockchainService < Query < fetchDataByKey : error while fetching ');
		logger.info("Fetch data from",stream,"for the key null error:",err);
		res.json({error: err});
	}
    else
	    {
		data.forEach(item => {
                item.data = Buffer.from(item.data, 'hex').toString('utf8')
        });
        logz.log('info', '<<<<< BlockchainService < Query < fetchDataByKey : Fetch data from stream for a key ');
        logger.info("Fetch data from ", stream, " for the key ", key);
        res.json({items: data});
 	}
    });
}


exports.fetchDataByAddr = function (req, res) {
    const {address, count} = req.query;
    const multichain = init.getMultichain();

    multichain.listAddressTransactions({
        address: address,
        count: count
    }, (err, data) => {
	  res.setHeader('Access-Control-Allow-Origin', '*');
	 if(err)  {
        logz.log('error', '<<<<< BlockchainService < Query < fetchDataByAddr : error while fetching ');
		logger.info("Fetch data from",stream,"for the address null error:",err);
                res.json({error: err});
        }
           else
          {
            data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
        });
        logz.log('info', '<<<<< BlockchainService < Query < fetchDataByAddr : Fetch data from stream for a address ');
	    logger.info("Fetch data from",stream,"for the address",address);
        res.json({items: data});
  	}
    });
}

exports.fetchDataByPublishers = function (req, res) {
    const {stream, address} = req.query;
    const multichain = init.getMultichain();

    multichain.listStreamPublisherItems({
	    stream,
        address,
        verbose: true,
	    start : 0,
	    count : 9999999
    }, (err, data) => {
	  res.setHeader('Access-Control-Allow-Origin', '*');
	    if(err)  {
            logz.log('error', '<<<<< BlockchainService < Query < fetchDataByPublishers : error while fetching ');
            logger.info("Fetch data from",stream,"for the publisher address null error:",err);
            res.json({error: err});
        }
        else
        {
            data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
            });
            logz.log('info', '<<<<< BlockchainService < Query < fetchDataByAddr : fetch data from stream and publisher address ');
            logger.info("Fetch data from",stream,"and publisher address",address);
            res.json({items: data});
 	    }
    });
}

exports.fetchDataByTxHash = function (req, res) {
    const {stream, txid} = req.query;
    const multichain = init.getMultichain();

    multichain.getStreamItem({
        stream,
        txid,
        verbose: true
    }, (err, data) => {
       res.setHeader('Access-Control-Allow-Origin', '*');
        data1 = Buffer.from(data.data, 'hex').toString('utf8');
        logz.log('info', '<<<<< BlockchainService < Query < fetchDataByTxHash : fetch data from stream for a txid ');
        logger.info("Fetch data from",stream,"for the txid",txid);
        res.json({items: data1});
    });
}

exports.fetchStreamKeys = function (req, res) {
    const {stream} = req.query;
    const multichain = init.getMultichain();
    var key_array = new Array();
    multichain.listStreamKeys({
        stream,
        verbose: true,
        start : 0,
        count : 9999999
    }, (err, data) => {
	    res.setHeader('Access-Control-Allow-Origin', '*');
	      if(err)  {
            logz.log('error', '<<<<< BlockchainService < Query < fetchStreamKeys : error in fetching ');
            logger.info("Fetch all keys from the stream",stream,"error:",err);
            res.json({error: err});
        }
           else
          {
              data.forEach(item=> {
                 key_array.push(item.key);
      });
      logz.log('info', '<<<<< BlockchainService < Query < fetchStreamKeys : fetch all keys from stream ');
	   logger.info("Fetch all keys from stream",stream);
           res.json({items: key_array});	
 	}
    });
}

exports.fetchPublisherKeys = function (req, res) {
    const {stream, address} = req.query;
    const multichain = init.getMultichain();
    var key_array = new Array();
    multichain.listStreamPublisherItems({
        stream,
        address,
        verbose: true,
        start : 0,
        count : 9999999
    }, (err, data) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
              if(err)  {
                logz.log('error', '<<<<< BlockchainService < Query < fetchPublisherKeys : error in fetching '); 
                logger.info("Fetch all keys from the stream for the publisher",stream,"error:",err);
                res.json({error: err});
        }
           else
          {
              data.forEach(item=> {
                 key_array.push(item.key);
      });
      logz.log('info', '<<<<< BlockchainService < Query < fetchPublisherKeys : fetch all keys from stream stream for publisher');
           logger.info("Fetch all keys from stream",stream,"for publisher",address);
           res.json({items: key_array});
        }
    });
}

exports.fetchStreamItems = function (req, res) {
    const {stream} = req.query;
    const multichain = init.getMultichain();
    var items_array = new Array();
    multichain.listStreamItems({
            stream
    }, (err, data) => {
	    res.setHeader('Access-Control-Allow-Origin', '*');
	    if(err)  {
            logz.log('error', '<<<<< BlockchainService < Query < fetchStreamItems : error in fetching ');
                logger.info("Fetch all stream items of the stream",stream,"error:",err);
                res.json({error: err});
        }
           else
          {
              data.forEach(item=> {
                 items_array.push(item);
      });
      logz.log('info', '<<<<< BlockchainService < Query < fetchStreamItems : fetch all stream items from stream ');
	   logger.info("Fetch all stream items from stream",stream);
           res.json({items: items_array});
	}
    });
}

exports.fetchTotalBlocks = function (req, res) {
    const multichain = init.getMultichain();

   multichain.getInfo({
    }, (err, data) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            if(err)  {
                logz.log('error', '<<<<< BlockchainService < Query < fetchTotalBlocks : error in fetching ');
                logger.info("Fetch all stream items of the stream",stream,"error:",err);
                res.json({error: err});
        }
           else
          {
               data = data.blocks;
               logz.log('info', '<<<<< BlockchainService < Query < fetchTotalBlocks : fetching total blocks');
    	       logger.info("Fetching total blocks")
 	           res.json({block_size: data});
        }
    });
}

function hex_to_ascii(str) {
    var hex = str.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

exports.fetchDataByRawTxHash = function (req, res) {
    const {txid} = req.query;
    const multichain = init.getMultichain();

    multichain.getRawTransaction({
        txid,
        verbose: true
    }, (err, data) => {
       res.setHeader('Access-Control-Allow-Origin', '*');
        dataString = hex_to_ascii(data.data)
        logz.log('info', '<<<<< BlockchainService < Query < fetchDataByRawTxHash : fetch data from stream for a raw txid ');
        logger.info("Fetch data for the txid",txid);
        res.json({items: dataString});
    });
}
