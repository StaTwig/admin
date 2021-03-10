const express = require("express");
const {
  pendingRequests,
  sentRequests,
  affiliateOrg,
  acceptAffiliate,
  rejectAffiliate,
  unAffiliate,
  affiliate,
  allAffiliateOrgs,
  unAffiliateOrg,
  getAllOrg,
} = require("../controllers/AffliationController");

const router = express.Router();

router.get("/", function (req, res) {
  res.json({ status: "OK" });
});

router.get("/fetchPendingRequests", pendingRequests); // /fetchPendingRequests
router.get("/fetchSentRequests", sentRequests); // /fetchSentRequests
router.get("/fetchAffiliates", affiliateOrg); // /fetchAffiliates
router.get("/fetchAllAffiliates", allAffiliateOrgs); // /fetchAffiliates
router.get("/acceptAffiliate", acceptAffiliate); // /fetchWarehouses?orgId=123
router.get("/rejectAffiliate", rejectAffiliate); // /fetchWarehouses?orgId=123
router.get("/unAffiliate", unAffiliate); // /fetchWarehouses?id=123
router.post("/unAffiliateOrg", unAffiliateOrg); // /fetchWarehouses?orgId=123
router.get("/getAllOrg", getAllOrg); // /getAllOrg
router.post("/addAffiliate", affiliate); // /addAffliate

module.exports = router;
