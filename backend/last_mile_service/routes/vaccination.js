const express = require("express");
const router = express.Router();
const VaccinationController = require("../controllers/VaccinationController");

router.post("/fetchBatchById", VaccinationController.fetchBatchById);
router.post("/vaccinateIndividual", VaccinationController.vaccinateIndividual);
router.post("/getAllVaccinationDetails", VaccinationController.getAllVaccinationDetails);
router.get("/getVaccinationDetailsByVial", VaccinationController.getVaccinationDetailsByVial);

module.exports = router;
