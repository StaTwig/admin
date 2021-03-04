export const TEST_SERVER_URL = "http://admin.vaccineledger.com";
export const PROD_SERVER_URL = "http://api.vaccineledger.com:9001";
export const DEMO_SERVER_URL = "http://vaccineledger.com:9001";
export const LOCAL_SERVER_URL_USER = "http://localhost:3001";
export const LOCAL_SERVER_URL_ADDRESS = "http://localhost:3001";
export const LOCAL_SERVER_URL_AFFILIATION = "http://localhost:3002";
export const LOCAL_SERVER_URL_EMPLOYEE = "http://localhost:3003";
export const LOCAL_SERVER_URL_RBAC = "http://localhost:3004";
export const STABLE_SERVER_URL_USER = "http://65.0.135.24:3001";
export const DEV_SERVER_URL = "http://127.0.0.1:9001";

export function config() {
  const confs = {
    local: {
      sendOtpUrl: `${LOCAL_SERVER_URL_EMPLOYEE}/api/employee_service/auth/sendOtp`,
      verifyOtpUrl: `${LOCAL_SERVER_URL_EMPLOYEE}/api/employee_service/auth/verifyOtp`,
      getApprovalsUrl: `${LOCAL_SERVER_URL_EMPLOYEE}/api/employee_service/getApprovals`,
      getPermissionsUrl: `${LOCAL_SERVER_URL_RBAC}/api/rbac_service/getPermissions`,
      getWareHousesUrl: `${LOCAL_SERVER_URL_ADDRESS}/api/address_service/fetchWarehouses`,
      verifyOrgUserUrl: `${LOCAL_SERVER_URL_EMPLOYEE}/api/employee_service/acceptApproval`,
      rejectOrgUserUrl: `${LOCAL_SERVER_URL_EMPLOYEE}/api/employee_service/rejectApproval`,
      activateOrgUserUrl: `${LOCAL_SERVER_URL_EMPLOYEE}/api/employee_service/activateUser`,
      deactivateOrgUserUrl: `${LOCAL_SERVER_URL_EMPLOYEE}/api/employee_service/deactivateUser`,
      getOrgUsersUrl: `${LOCAL_SERVER_URL_EMPLOYEE}/api/employee_service/auth/getOrgUsers`,
      addOrgUserUrl: `${TEST_SERVER_URL}/api/employee_service/addUser`,
      recentRequestsSentUrl: `${LOCAL_SERVER_URL_AFFILIATION}/api/affliation_service/fetchSentRequests`,
      userInfoUrl: `${LOCAL_SERVER_URL_EMPLOYEE}/api/employee_service/auth/userInfo`,
      pendingAffiliatedReqUrl: `${LOCAL_SERVER_URL_AFFILIATION}/api/affliation_service/fetchPendingRequests`,
      affiliatedOrgUrl: `${LOCAL_SERVER_URL_AFFILIATION}/api/affliation_service/fetchAffiliates`,
      unaffiliateUserUrl: `${LOCAL_SERVER_URL_AFFILIATION}/api/affliation_service/unAffiliate`,
      unaffiliateOrgUrl: `${LOCAL_SERVER_URL_AFFILIATION}/api/affliation_service/unAffiliateOrg`,
      acceptAffiliateUrl: `${LOCAL_SERVER_URL_AFFILIATION}/api/affliation_service/acceptAffiliate`,
      rejectAffiliateUrl: `${LOCAL_SERVER_URL_AFFILIATION}/api/affliation_service/rejectAffiliate`,
      addOrgAddressrUrl: `${LOCAL_SERVER_URL_ADDRESS}/api/address_service/addWarehouse`,
      updateOrgAddressrUrl: `${LOCAL_SERVER_URL_ADDRESS}//api/address_service/updateWarehouse`,
    },
    dev: {
      sendOtpUrl: `${DEV_SERVER_URL}/api/employee_service/auth/sendOtp`,
      verifyOtpUrl: `${DEV_SERVER_URL}/api/employee_service/auth/verifyOtp`,
      getApprovalsUrl: `${DEV_SERVER_URL}/api/employee_service/getApprovals`,
      getPermissionsUrl: `${DEV_SERVER_URL}/api/rbac_service/getPermissions`,
      getWareHousesUrl: `${DEV_SERVER_URL}/api/address_service/fetchWarehouses`,
      verifyOrgUserUrl: `${DEV_SERVER_URL}/api/employee_service/acceptApproval`,
      rejectOrgUserUrl: `${DEV_SERVER_URL}/api/employee_service/rejectApproval`,
      activateOrgUserUrl: `${DEV_SERVER_URL}/api/employee_service/activateUser`,
      deactivateOrgUserUrl: `${DEV_SERVER_URL}/api/employee_service/deactivateUser`,
      getOrgUsersUrl: `${DEV_SERVER_URL}/api/employee_service/auth/getOrgUsers`,
      addOrgUserUrl: `${DEV_SERVER_URL}/api/employee_service/addUser`,
      recentRequestsSentUrl: `${DEV_SERVER_URL}/api/affliation_service/fetchSentRequests`,
      userInfoUrl: `${DEV_SERVER_URL}/api/employee_service/auth/userInfo`,
      pendingAffiliatedReqUrl: `${DEV_SERVER_URL}/api/affliation_service/fetchPendingRequests`,
      affiliatedOrgUrl: `${DEV_SERVER_URL}/api/affliation_service/fetchAffiliates`,
      unaffiliateUserUrl: `${DEV_SERVER_URL}/api/affliation_service/unAffiliate`,
      unaffiliateOrgUrl: `${DEV_SERVER_URL}/api/affliation_service/unAffiliateOrg`,
      acceptAffiliateUrl: `${DEV_SERVER_URL}/api/affliation_service/acceptAffiliate`,
      rejectAffiliateUrl: `${DEV_SERVER_URL}/api/affliation_service/rejectAffiliate`,
      addOrgAddressrUrl: `${DEV_SERVER_URL}/api/address_service/addWarehouse`,
      updateOrgAddressrUrl: `${DEV_SERVER_URL}/api/address_service/updateWarehouse`,
    },
    stable: {
      sendOtpUrl: `${STABLE_SERVER_URL_USER}/api/employee_service/auth/sendOtp`,
      verifyOtpUrl: `${STABLE_SERVER_URL_USER}/api/employee_service/auth/verifyOtp`,
      getApprovalsUrl: `${STABLE_SERVER_URL_USER}/api/employee_service/getApprovals`,
      getPermissionsUrl: `${STABLE_SERVER_URL_USER}/api/rbac_service/getPermissions`,
      getWareHousesUrl: `${STABLE_SERVER_URL_USER}/api/address_service/fetchWarehouses`,
      verifyOrgUserUrl: `${STABLE_SERVER_URL_USER}/api/employee_service/acceptApproval`,
      rejectOrgUserUrl: `${STABLE_SERVER_URL_USER}/api/employee_service/rejectApproval`,
      activateOrgUserUrl: `${STABLE_SERVER_URL_USER}/api/employee_service/activateUser`,
      deactivateOrgUserUrl: `${STABLE_SERVER_URL_USER}/api/employee_service/deactivateUser`,
      getOrgUsersUrl: `${STABLE_SERVER_URL_USER}/api/employee_service/auth/getOrgUsers`,
      addOrgUserUrl: `${STABLE_SERVER_URL_USER}/api/employee_service/addUser`,
      recentRequestsSentUrl: `${STABLE_SERVER_URL_USER}/api/affliation_service/fetchSentRequests`,
      userInfoUrl: `${STABLE_SERVER_URL_USER}/api/employee_service/auth/userInfo`,
      pendingAffiliatedReqUrl: `${STABLE_SERVER_URL_USER}/api/affliation_service/fetchPendingRequests`,
      affiliatedOrgUrl: `${STABLE_SERVER_URL_USER}/api/affliation_service/fetchAffiliates`,
      unaffiliateUserUrl: `${STABLE_SERVER_URL_USER}/api/affliation_service/unAffiliate`,
      unaffiliateOrgUrl: `${STABLE_SERVER_URL_USER}/api/affliation_service/unAffiliateOrg`,
      acceptAffiliateUrl: `${STABLE_SERVER_URL_USER}/api/affliation_service/acceptAffiliate`,
      rejectAffiliateUrl: `${STABLE_SERVER_URL_USER}/api/affliation_service/rejectAffiliate`,
      addOrgAddressrUrl: `${STABLE_SERVER_URL_USER}/api/address_service/addWarehouse`,
      updateOrgAddressrUrl: `${STABLE_SERVER_URL_USER}/api/address_service/updateWarehouse`,
    },
    test: {
      sendOtpUrl: `${TEST_SERVER_URL}/api/employee_service/auth/sendOtp`,
      verifyOtpUrl: `${TEST_SERVER_URL}/api/employee_service/auth/verifyOtp`,
      getApprovalsUrl: `${TEST_SERVER_URL}/api/employee_service/getApprovals`,
      getPermissionsUrl: `${TEST_SERVER_URL}/api/rbac_service/getPermissions`,
      getWareHousesUrl: `${TEST_SERVER_URL}/api/address_service/fetchWarehouses`,
      verifyOrgUserUrl: `${TEST_SERVER_URL}/api/employee_service/acceptApproval`,
      rejectOrgUserUrl: `${TEST_SERVER_URL}/api/employee_service/rejectApproval`,
      activateOrgUserUrl: `${TEST_SERVER_URL}/api/employee_service/activateUser`,
      deactivateOrgUserUrl: `${TEST_SERVER_URL}/api/employee_service/deactivateUser`,
      getOrgUsersUrl: `${TEST_SERVER_URL}/api/employee_service/auth/getOrgUsers`,
      addOrgUserUrl: `${TEST_SERVER_URL}/api/employee_service/addUser`,
      recentRequestsSentUrl: `${TEST_SERVER_URL}/api/affliation_service/fetchSentRequests`,
      userInfoUrl: `${TEST_SERVER_URL}/api/employee_service/auth/userInfo`,
      pendingAffiliatedReqUrl: `${TEST_SERVER_URL}/api/affliation_service/fetchPendingRequests`,
      affiliatedOrgUrl: `${TEST_SERVER_URL}/api/affliation_service/fetchAffiliates`,
      unaffiliateUserUrl: `${TEST_SERVER_URL}/api/affliation_service/unAffiliate`,
      unaffiliateOrgUrl: `${TEST_SERVER_URL}/api/affliation_service/unAffiliateOrg`,
      acceptAffiliateUrl: `${TEST_SERVER_URL}/api/affliation_service/acceptAffiliate`,
      rejectAffiliateUrl: `${TEST_SERVER_URL}/api/affliation_service/rejectAffiliate`,
      addOrgAddressrUrl: `${TEST_SERVER_URL}/api/address_service/addWarehouse`,
      updateOrgAddressrUrl: `${TEST_SERVER_URL}/api/address_service/updateWarehouse`,
    },
    demo: {
      sendOtpUrl: `${DEMO_SERVER_URL}/api/employee_service/auth/sendOtp`,
      verifyOtpUrl: `${DEMO_SERVER_URL}/api/employee_service/auth/verifyOtp`,
      getApprovalsUrl: `${DEMO_SERVER_URL}/api/employee_service/getApprovals`,
      getPermissionsUrl: `${DEMO_SERVER_URL}/api/rbac_service/getPermissions`,
      getWareHousesUrl: `${DEMO_SERVER_URL}/api/address_service/fetchWarehouses`,
      verifyOrgUserUrl: `${DEMO_SERVER_URL}/api/employee_service/acceptApproval`,
      rejectOrgUserUrl: `${DEMO_SERVER_URL}/api/employee_service/rejectApproval`,
      activateOrgUserUrl: `${DEMO_SERVER_URL}/api/employee_service/activateUser`,
      deactivateOrgUserUrl: `${DEMO_SERVER_URL}/api/employee_service/deactivateUser`,
      getOrgUsersUrl: `${DEMO_SERVER_URL}/api/employee_service/auth/getOrgUsers`,
      addOrgUserUrl: `${DEMO_SERVER_URL}/api/employee_service/addUser`,
      recentRequestsSentUrl: `${DEMO_SERVER_URL}/api/affliation_service/fetchSentRequests`,
      userInfoUrl: `${DEMO_SERVER_URL}/api/employee_service/auth/userInfo`,
      pendingAffiliatedReqUrl: `${DEMO_SERVER_URL}/api/affliation_service/fetchPendingRequests`,
      affiliatedOrgUrl: `${DEMO_SERVER_URL}/api/affliation_service/fetchAffiliates`,
      unaffiliateUserUrl: `${DEMO_SERVER_URL}/api/affliation_service/unAffiliate`,
      unaffiliateOrgUrl: `${DEMO_SERVER_URL}/api/affliation_service/unAffiliateOrg`,
      acceptAffiliateUrl: `${DEMO_SERVER_URL}/api/affliation_service/acceptAffiliate`,
      rejectAffiliateUrl: `${DEMO_SERVER_URL}/api/affliation_service/rejectAffiliate`,
      addOrgAddressrUrl: `${DEMO_SERVER_URL}/api/address_service/addWarehouse`,
      updateOrgAddressrUrl: `${DEMO_SERVER_URL}/api/address_service/updateWarehouse`,
    },
    prod: {
      sendOtpUrl: `${PROD_SERVER_URL}/api/employee_service/auth/sendOtp`,
      verifyOtpUrl: `${PROD_SERVER_URL}/api/employee_service/auth/verifyOtp`,
      getApprovalsUrl: `${PROD_SERVER_URL}/api/employee_service/getApprovals`,
      getPermissionsUrl: `${PROD_SERVER_URL}/api/rbac_service/getPermissions`,
      getWareHousesUrl: `${PROD_SERVER_URL}/api/address_service/fetchWarehouses`,
      verifyOrgUserUrl: `${PROD_SERVER_URL}/api/employee_service/acceptApproval`,
      rejectOrgUserUrl: `${PROD_SERVER_URL}/api/employee_service/rejectApproval`,
      activateOrgUserUrl: `${PROD_SERVER_URL}/api/employee_service/activateUser`,
      deactivateOrgUserUrl: `${PROD_SERVER_URL}/api/employee_service/deactivateUser`,
      getOrgUsersUrl: `${PROD_SERVER_URL}/api/employee_service/auth/getOrgUsers`,
      addOrgUserUrl: `${PROD_SERVER_URL}/api/employee_service/addUser`,
      recentRequestsSentUrl: `${PROD_SERVER_URL}/api/affliation_service/fetchSentRequests`,
      userInfoUrl: `${PROD_SERVER_URL}/api/employee_service/auth/userInfo`,
      pendingAffiliatedReqUrl: `${PROD_SERVER_URL}/api/affliation_service/fetchPendingRequests`,
      affiliatedOrgUrl: `${PROD_SERVER_URL}/api/affliation_service/fetchAffiliates`,
      unaffiliateUserUrl: `${PROD_SERVER_URL}/api/affliation_service/unAffiliate`,
      unaffiliateOrgUrl: `${PROD_SERVER_URL}/api/affliation_service/unAffiliateOrg`,
      acceptAffiliateUrl: `${PROD_SERVER_URL}/api/affliation_service/acceptAffiliate`,
      rejectAffiliateUrl: `${PROD_SERVER_URL}/api/affliation_service/rejectAffiliate`,
      addOrgAddressrUrl: `${PROD_SERVER_URL}/api/address_service/addWarehouse`,
      updateOrgAddressrUrl: `${PROD_SERVER_URL}/api/address_service/updateWarehouse`,
    },
  };

  const environment = process.env.ENVIRONMENT || "test"; // change prod to test, local,stable, dev for respective environments
  const conf = confs[environment];

  return conf;
}
