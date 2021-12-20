require("dotenv").config();
let config = {
  MONGODB_URL: process.env.MONGODB_URL,
};

module.exports = config;
