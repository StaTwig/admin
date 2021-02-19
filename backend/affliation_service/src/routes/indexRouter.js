const express = require("express");
const { pendingRequests, sentRequests, affliatedOrgs} = require("../controllers/AffliationController");

const router = express.Router();

router.get("/", function(req, res) {
res.json({ status: "OK" });
});

router.get("api/affliation_service/fetchPendingRequests", pendingRequests) // /fetchPendingRequests
router.get("api/affliation_service/fetchSentRequests", sentRequests) // /fetchSentRequests
router.get("api/affliation_service/fetchAffiliates", affliatedOrgs) // /fetchAffiliates
// router.get("api/affliation_service/acceptRequest", accept) // /fetchWarehouses?orgId=123
// router.get("api/affliation_service/rejectRequest", reject) // /fetchWarehouses?orgId=123
// router.get("api/affliation_service/unAffiliate", unaffliate) // /fetchWarehouses?orgId=123

module.exports = router;
