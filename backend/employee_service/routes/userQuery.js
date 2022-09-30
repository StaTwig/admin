const express = require("express");
const UserQueryController = require("../controllers/UserQueryController");

const router = express.Router();

router.post("/newUserQuery", UserQueryController.newUserQuery);
router.get("/getUserQueries", UserQueryController.getUserQueries);

module.exports = router;