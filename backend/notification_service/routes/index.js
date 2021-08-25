var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
	res.status(200).json({status:"OK", message:"Notification Service"});
});

module.exports = router;
