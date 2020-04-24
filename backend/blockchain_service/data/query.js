const init = require('../common/init');
var date = require('date-and-time');

const log4js = init.getLog();
const logger = log4js.getLogger('backend-logs');
const uilogger = log4js.getLogger('frontend-logs');

/* log4js.configure({
  appenders: { logs: { type: 'file', filename: 'logs/backend.log' } },
  categories: { default: { appenders: ['logs'], level: 'info' } }
}); */

exports.fetchDataByKey = function (req, res) {
    console.log('txId ', req.query);
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
		logger.info("Fetch data from",stream,"for the key null error:",err);
		res.json({error: err});
	}
	    else
	    {
		data.forEach(item => {
                item.data = Buffer.from(item.data, 'hex').toString('utf8')
        });
        logger.info("Fetch data from",stream,"for the key",key);
        res.json({items: data});
 	}
    });
}


exports.fetchDataByAddr = function (req, res) {
    console.log('txId ', req.query);
    const {address, count} = req.query;
    const multichain = init.getMultichain();

    multichain.listAddressTransactions({
        address: address,
        count: count
    }, (err, data) => {
	  res.setHeader('Access-Control-Allow-Origin', '*');
	 if(err)  {
		logger.info("Fetch data from",stream,"for the address null error:",err);
                res.json({error: err});
        }
           else
          {
            data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
        });
	logger.info("Fetch data from",stream,"for the address",address);
        res.json({items: data});
  	}
    });
}

exports.fetchDataByPublishers = function (req, res) {
    console.log('txId ', req.query);
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
                logger.info("Fetch data from",stream,"for the publisher address null error:",err);
                res.json({error: err});
        }
           else
          {
        data.forEach(item => {
            item.data = Buffer.from(item.data, 'hex').toString('utf8')
        });
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
        //data.forEach(item => {
        data1 = Buffer.from(data.data, 'hex').toString('utf8')
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
                logger.info("Fetch all keys from the stream",stream,"error:",err);
                res.json({error: err});
        }
           else
          {
              data.forEach(item=> {
                 key_array.push(item.key);
      });
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
                logger.info("Fetch all keys from the stream for the publisher",stream,"error:",err);
                res.json({error: err});
        }
           else
          {
              data.forEach(item=> {
                 key_array.push(item.key);
      });
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
                logger.info("Fetch all stream items of the stream",stream,"error:",err);
                res.json({error: err});
        }
           else
          {
              data.forEach(item=> {
                 items_array.push(item);
      });
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
                logger.info("Fetch all stream items of the stream",stream,"error:",err);
                res.json({error: err});
        }
           else
          {
               data = data.blocks;
	       logger.info("Fetching total blocks")
 	       res.json({block_size: data});
        }
    });
}

