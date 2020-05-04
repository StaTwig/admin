//During the automated test the env variable, We will set it to "test"
process.env.NODE_ENV = "test";
process.env.MONGODB_URL = "mongodb://127.0.0.1:27017/rest-api-nodejs-mongodb-test";
const request = require('supertest');
const express = require('express');
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);

//Export this to use in multiple files
module.exports = {
	chai: chai,
	should: should
};
