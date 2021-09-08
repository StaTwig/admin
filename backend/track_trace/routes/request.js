const express = require("express");
const RequestController = require("../controllers/RequestController");

const router = express.Router();

router.get("/getRequests", RequestController.getRequests);
router.get("/getRequestById", RequestController.getRequestById);
router.post("/createRequest", RequestController.createRequest);
router.post("/updateRequest", RequestController.updateRequest);

module.exports = router;
