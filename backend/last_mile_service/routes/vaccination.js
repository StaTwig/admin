const express = require("express");
const router = express.Router();
const VaccinationController = require("../controllers/VaccinationController");

router.post("/fetchBatchById", VaccinationController.fetchBatchById);
router.post("/vaccinateIndividual", VaccinationController.vaccinateIndividual);
router.post("/vaccinateMultiple", VaccinationController.vaccinateMultiple);
router.post("/getAllVaccinationDetails", VaccinationController.getAllVaccinationDetails);
router.get("/getVaccinationDetailsByVial", VaccinationController.getVaccinationDetailsByVial);
router.get("/getAnalytics", VaccinationController.getAnalytics);

module.exports = router;
