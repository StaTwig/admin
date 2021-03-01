const express = require("express");
const { pendingRequests, sentRequests, affliatedOrgs, acceptAffliate,rejectAffliate,unAffliate,Affliate,allAffliatedOrgs } = require("../controllers/AffliationController");

const router = express.Router();

router.get("/", function(req, res) {
res.json({ status: "OK" });
});

router.get("/fetchPendingRequests", pendingRequests) // /fetchPendingRequests
router.get("/fetchSentRequests", sentRequests) // /fetchSentRequests
router.get("/fetchAffiliates", affliatedOrgs) // /fetchAffiliates
router.get("/fetchAllAffiliates", allAffliatedOrgs) // /fetchAffiliates
router.get("/acceptAffliate", acceptAffliate) // /fetchWarehouses?orgId=123
router.get("/rejectAffliate", rejectAffliate) // /fetchWarehouses?orgId=123
router.get("/unAffiliate", unAffliate) // /fetchWarehouses?orgId=123
router.post("/addAffliate" , Affliate) // /addAffliate

module.exports = router;
