export const TEST_SERVER_URL = 'http://13.52.184.142:9001';
export const LOCAL_SERVER_URL_USER = 'http://localhost:3001';
export const LOCAL_SERVER_URL_SHIPMENT = 'http://localhost:3002';
export const LOCAL_SERVER_URL_INVENTORY = 'http://localhost:3007';

export function config() {

  const confs = {
    local: {
      loginUrl: `${LOCAL_SERVER_URL_USER}/api/auth/login`,
      registerUrl: `${LOCAL_SERVER_URL_USER}/api/auth/register`,
      verifyOtpUrl: `${LOCAL_SERVER_URL_USER}/api/auth/verify-otp`,
      shipmentsUrl: `${LOCAL_SERVER_URL_SHIPMENT}/api/shipping/shipmentStatistics`,
      inventoriesUrl: `${LOCAL_SERVER_URL_INVENTORY}/api/inventory/getAllInventoryDetails`,
      createShipmentUrl: `${LOCAL_SERVER_URL_SHIPMENT}/api/shipping/createShipment`,
      addInventoryUrl: `${LOCAL_SERVER_URL_INVENTORY}/api/inventory/addNewInventory`,
    },
    test: {
      loginUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/login`,
      registerUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/register`,
      verifyOtpUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/login/verify-otp`,
      shipmentsUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/shipmentStatistics`,
      createShipmentUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/createShipment`,
      inventoriesUrl: `${TEST_SERVER_URL}/inventorymanagement/inventory/getAllInventoryDetails`,
      addInventoryUrl: `${TEST_SERVER_URL}/inventorymanagement/api/inventory/addNewInventory`,

    }
  };

  const conf = confs['test'];
  // conf = confs['local'];
  // conf = confs['preprod'];

  return conf;
}
