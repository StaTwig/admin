const express = require("express");
const LastMileController = require("../controllers/LastMileController");
const router = express.Router();

router.get(
  "/GetEOLInfoBySerialNumber",
  LastMileController.getEOLInfoBySerialNumber
);
router.get("/GetEOLInfoByProductId", LastMileController.GetEOLInfoByProductId);
router.get(
  "/GetEOLInfoByIdentityId",
  LastMileController.GetEOLInfoByIdentityId
);
router.get(
  "/GetEOLInfoByPlaceAdministered",
  LastMileController.GetEOLInfoByPlaceAdministered
);
router.get(
  "/GetEOLListByDateWindow",
  LastMileController.GetEOLListByDateWindow
);
router.post("/AddNewEOL", LastMileController.AddNewEOL);
router.post("/UpdateExistingEOLByID", LastMileController.UpdateExistingEOLByID);
router.get("/GetEOLInfo", LastMileController.getEOLInfo);
router.get(
  "/getProductsByWarehouse",
  LastMileController.getProductsByWarehouse
);

module.exports = router;
