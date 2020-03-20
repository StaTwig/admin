var express = require("express");
const TransactionController = require("../controllers/TransactionController");

var router = express.Router();

router.get("/getTotalTransactions", TransactionController.getTotalTxns);

module.exports = router;
