export const TEST_SERVER_URL = 'http://test.vaccineledger.com:9001';
export const LOCAL_SERVER_URL_USER = 'http://localhost:3001';
export const LOCAL_SERVER_URL_SHIPMENT = 'http://localhost:3002';
export const LOCAL_SERVER_URL_INVENTORY = 'http://localhost:3007';
export const PROD_SERVER_URL = 'http://api.vaccineledger.com:9001';
export function config() {

  const confs = {
    local: {
      loginUrl: `${LOCAL_SERVER_URL_USER}/api/auth/login`,
      registerUrl: `${LOCAL_SERVER_URL_USER}/api/auth/register`,
      verifyOtpUrl: `${LOCAL_SERVER_URL_USER}/api/auth/verify-otp`,
      userInfoUrl: `${LOCAL_SERVER_URL_USER}/api/auth/userInfo`,
      updateProfileUrl: `${LOCAL_SERVER_URL_USER}/api/auth/updateProfile`,
      upload: `${LOCAL_SERVER_URL_USER}/api/auth/upload`,
      shipmentsUrl: `${LOCAL_SERVER_URL_SHIPMENT}/api/shipping/shipmentStatistics`,
      inventoriesUrl: `${LOCAL_SERVER_URL_INVENTORY}/api/inventory/getAllInventoryDetails`,
      createShipmentUrl: `${LOCAL_SERVER_URL_SHIPMENT}/api/shipping/createShipment`,
      addInventoryUrl: `${LOCAL_SERVER_URL_INVENTORY}/api/inventory/addNewInventory`,
      shipmentsSearch: `${LOCAL_SERVER_URL_SHIPMENT}/api/shipping/fetchShipments?key=`,
      inventorySearch: `${LOCAL_SERVER_URL_INVENTORY}/api/inventory/getInventoryDetailsForProduct?key=`
    },
    test: {
      loginUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/login`,
      registerUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/register`,
      verifyOtpUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/verify-otp`,
      shipmentsUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/shipmentStatistics`,
      createShipmentUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/createShipment`,
      inventoriesUrl: `${TEST_SERVER_URL}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addInventoryUrl: `${TEST_SERVER_URL}/inventorymanagement/api/inventory/addNewInventory`,
      userInfoUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/userInfo`,
      updateProfileUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/updateProfile`,
      upload: `${TEST_SERVER_URL}/usermanagement/api/auth/upload`,
      shipmentsSearch: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      inventorySearch: `${TEST_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`
    },
    prod: {
      loginUrl: `${PROD_SERVER_URL}/usermanagement/api/auth/login`,
      registerUrl: `${PROD_SERVER_URL}/usermanagement/api/auth/register`,
      verifyOtpUrl: `${PROD_SERVER_URL}/usermanagement/api/auth/verify-otp`,
      shipmentsUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/shipmentStatistics`,
      createShipmentUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/createShipment`,
      inventoriesUrl: `${PROD_SERVER_URL}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addInventoryUrl: `${PROD_SERVER_URL}/inventorymanagement/api/inventory/addNewInventory`,
      userInfoUrl: `${PROD_SERVER_URL}/usermanagement/api/auth/userInfo`,
      updateProfileUrl: `${PROD_SERVER_URL}/usermanagement/api/auth/updateProfile`,
      upload: `${PROD_SERVER_URL}/usermanagement/api/auth/upload`,
      shipmentsSearch: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      inventorySearch: `${PROD_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`
    }
  };

  const conf = confs['prod'];
  // conf = confs['local'];
  // conf = confs['preprod'];

  return conf;
}
