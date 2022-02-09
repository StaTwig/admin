const mongoose = require("mongoose");
const MONGODB_URL = process.env.MONGODB_URL;

function getConnection(url, callback) {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
    })
    .then(() => {
      //don't show the log when it is test
      if (process.env.NODE_ENV !== "test") {
        console.log("Connected to %s", MONGODB_URL);
        console.log("App is running ... \n");
        console.log("Press CTRL + C to stop the process. \n");
      }
    })
    .catch((err) => {
      console.error("App starting error:", err.message);
      process.exit(1);
    });
  var db = mongoose.connection;
  callback(null, db.collections.records, db);
}

module.exports = db = {
  insertOneRecord: function (modelname, data, callback) {
    getConnection(MONGODB_URL, async function (error, collection, db) {
      try {
        const newPO = await new modelname({
          ...data,
        });

        await newPO.save();
      } catch (error) {
        return "Error";
      }
    });
  },
  insertManyRecords: function (collection_name, data, callback) {
    getConnection(MONGODB_URL, function (error, collection, db) {
      db.collection(collection_name).insertMany(data, function (error, items) {
        if (error) {
          trace("insert error: " + error);
          if (callback) {
            callback(error);
          }
          return;
        }
        if (callback) {
          callback(null, "Success");
        }
      });
    });
  },
  updateRecord: function (modelname, filter, update, callback) {
    getConnection(MONGODB_URL, async function (error, collection, db) {
      try {
        const result = await modelname.updateOne(filter, update);
      } catch (error) {
        res.status(400).send("Error");
      }
    });
  },

  findOneRecord: async function (modelname, query, callback) {
    var res = modelname.findOne(query);
    return res;
  },

  findAllRecords: async function (modelname, skip, limit, callback) {
    skip = skip || 0;
    limit = limit || 0;
    var res = modelname
      .find()
      .sort({
        createdAt: -1,
      })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return res;
  },

  findRecordsAndSort: async function (modelname, query, skip, limit, callback) {
    skip = skip || 0;
    limit = limit || 0;
    var res = "";
    res = modelname
      .find(query)
      .sort({
        createdAt: -1,
      })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return res;
  },
};
