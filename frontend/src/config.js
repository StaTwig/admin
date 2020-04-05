export const TEST_SERVER_URL = 'http://13.52.184.142:9001';
export const LOCAL_SERVER_URL = 'http://localhost:3001';

export function config() {

  const confs = {
    local: {
      loginUrl: `${LOCAL_SERVER_URL}/api/auth/login`,
      registerUrl: `${LOCAL_SERVER_URL}/api/auth/register`,
      verifyOtpUrl: `${LOCAL_SERVER_URL}/api/auth/login/verify-otp`,
      shipmentsUrl: `${LOCAL_SERVER_URL}/api/shipping/fetchShipments?key=02042020_ship`,
      inventoriesUrl: `${LOCAL_SERVER_URL}/inventory/getAllInventoryDetails?address=1QdSmp5sCLzcgZ9yFhhZGdVNicjpmowtxM1y5w`,
    },
    test: {
      loginUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/login`,
      registerUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/register`,
      verifyOtpUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/login/verify-otp`,
      shipmentsUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchShipments?key=02042020_ship`,
      inventoriesUrl: `${TEST_SERVER_URL}/inventorymanagement/inventory/getAllInventoryDetails?address=1QdSmp5sCLzcgZ9yFhhZGdVNicjpmowtxM1y5w`,

    }
  };

  const conf = confs['test'];
 // conf = confs['local'];
 // conf = confs['preprod'];

  return conf;
}