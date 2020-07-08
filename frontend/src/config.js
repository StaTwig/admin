export const TEST_SERVER_URL = 'http://test.vaccineledger.com:9001';
export const LOCAL_SERVER_URL_USER = 'http://localhost:3001';
export const LOCAL_SERVER_URL_SHIPMENT = 'http://localhost:3002';
export const LOCAL_SERVER_URL_INVENTORY = 'http://localhost:3007';
export const PROD_SERVER_URL = 'http://api.vaccineledger.com:9001';
export const STABLE_SERVER_URL_USER = 'http://52.90.57.31:3001';
export const STABLE_SERVER_URL_SHIPMENT = 'http://52.90.57.31:3002';
export const STABLE_SERVER_URL_INVENTORY = 'http://52.90.57.31:3007';
export const DEV_SERVER_URL = 'http://127.0.0.1:9001';

export function config() {

  const confs = {
    local: {
      loginUrl: `${LOCAL_SERVER_URL_USER}/usermanagement/api/auth/login`,
      registerUrl: `${LOCAL_SERVER_URL_USER}/usermanagement/api/auth/register`,
      verifyOtpUrl: `${LOCAL_SERVER_URL_USER}/usermanagement/api/auth/verify-otp`,
      userInfoUrl: `${LOCAL_SERVER_URL_USER}/usermanagement/api/auth/userInfo`,
      getAllUsersUrl: `${LOCAL_SERVER_URL_USER}/usermanagement/api/auth/getAllUsers`,
      updateProfileUrl: `${LOCAL_SERVER_URL_USER}/usermanagement/api/auth/updateProfile`,
      upload: `${LOCAL_SERVER_URL_USER}/usermanagement/api/auth/upload`,
      shipmentsUrl: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchUserShipments`,
      getProducts: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getProducts`,
      getManufacturers: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getManufacturers`,
      inventoriesUrl: `${LOCAL_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      createShipmentUrl: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/createShipment`,
      addInventoryUrl: `${LOCAL_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/addNewInventory`,
      shipmentsSearch: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      inventorySearch: `${LOCAL_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      createPurchaseOrderUrl: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/createPurchaseOrder`,
      fetchAllPurchaseOrdersUrl: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchPublisherPurchaseOrders`,
      fetchAllPurchaseOrderUrl: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      fetchPurchaseOrderStatisticsUrl: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/purchaseOrderStatistics`,
      trackShipment: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,
    },
    dev: {
      loginUrl: `${DEV_SERVER_URL}/usermanagement/api/auth/login`,
      registerUrl: `${DEV_SERVER_URL}/usermanagement/api/auth/register`,
      verifyOtpUrl: `${DEV_SERVER_URL}/usermanagement/api/auth/verify-otp`,
      userInfoUrl: `${DEV_SERVER_URL}/usermanagement/api/auth/userInfo`,
      getAllUsersUrl: `${DEV_SERVER_URL}/usermanagement/api/auth/getAllUsers`,
      updateProfileUrl: `${DEV_SERVER_URL}/usermanagement/api/auth/updateProfile`,
      upload: `${DEV_SERVER_URL}/usermanagement/api/auth/upload`,
      shipmentsUrl: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/fetchUserShipments`,
      getProducts: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getProducts`,
      getManufacturers: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getManufacturers`,
      createShipmentUrl: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/createShipment`,
      inventoriesUrl: `${DEV_SERVER_URL}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addInventoryUrl: `${DEV_SERVER_URL}/inventorymanagement/api/inventory/addNewInventory`,
      shipmentsSearch: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      inventorySearch: `${DEV_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      createPurchaseOrderUrl: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/createPurchaseOrder`,
      fetchAllPurchaseOrdersUrl: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/fetchPublisherPurchaseOrders`,
      fetchAllPurchaseOrderUrl: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      fetchPurchaseOrderStatisticsUrl: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/purchaseOrderStatistics`,
      trackShipment: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,
    },
    stable: {
      loginUrl: `${STABLE_SERVER_URL_USER}/usermanagement/api/auth/login`,
      registerUrl: `${STABLE_SERVER_URL_USER}/usermanagement/api/auth/register`,
      verifyOtpUrl: `${STABLE_SERVER_URL_USER}/usermanagement/api/auth/verify-otp`,
      userInfoUrl: `${STABLE_SERVER_URL_USER}/usermanagement/api/auth/userInfo`,
      getAllUsersUrl: `${STABLE_SERVER_URL_USER}/usermanagement/api/auth/getAllUsers`,
      updateProfileUrl: `${STABLE_SERVER_URL_USER}/usermanagement/api/auth/updateProfile`,
      upload: `${STABLE_SERVER_URL_USER}/usermanagement/api/auth/upload`,
      shipmentsUrl: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchUserShipments`,
      getProducts: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getProducts`,
      getManufacturers: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getManufacturers`,
      createShipmentUrl: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/createShipment`,
      shipmentsSearch: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      createPurchaseOrderUrl: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/createPurchaseOrder`,
      fetchAllPurchaseOrdersUrl: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchPublisherPurchaseOrders`,
      fetchAllPurchaseOrderUrl: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      fetchPurchaseOrderStatisticsUrl: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/purchaseOrderStatistics`,
      inventorySearch: `${STABLE_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      inventoriesUrl: `${STABLE_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addInventoryUrl: `${STABLE_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/addNewInventory`,
      trackShipment: `${STABLE_SERVER_URL_INVENTORY}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,
    },
    test: {
      loginUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/login`,
      registerUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/register`,
      verifyOtpUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/verify-otp`,
      userInfoUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/userInfo`,
      getAllUsersUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/getAllUsers`,
      updateProfileUrl: `${TEST_SERVER_URL}/usermanagement/api/auth/updateProfile`,
      upload: `${TEST_SERVER_URL}/usermanagement/api/auth/upload`,
      shipmentsUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchUserShipments`,
      getProducts: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getProducts`,
      getManufacturers: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getManufacturers`,
      createShipmentUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/createShipment`,
      shipmentsSearch: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      createPurchaseOrderUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/createPurchaseOrder`,
      fetchAllPurchaseOrdersUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchPublisherPurchaseOrders`,
      fetchAllPurchaseOrderUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      fetchPurchaseOrderStatisticsUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/purchaseOrderStatistics`,
      inventorySearch: `${TEST_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      inventoriesUrl: `${TEST_SERVER_URL}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addInventoryUrl: `${TEST_SERVER_URL}/inventorymanagement/api/inventory/addNewInventory`,
      trackShipment: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,

    },
    prod: {
      loginUrl: `${PROD_SERVER_URL}/usermanagement/api/auth/login`,
      registerUrl: `${PROD_SERVER_URL}/usermanagement/api/auth/register`,
      verifyOtpUrl: `${PROD_SERVER_URL}/usermanagement/api/auth/verify-otp`,
      userInfoUrl: `${PROD_SERVER_URL}/usermanagement/api/auth/userInfo`,
      getAllUsersUrl: `${PROD_SERVER_URL}/api/auth/getAllUsers`,
      updateProfileUrl: `${PROD_SERVER_URL}/usermanagement/api/auth/updateProfile`,
      upload: `${PROD_SERVER_URL}/usermanagement/api/auth/upload`,
      shipmentsUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/fetchUserShipments`,
      createShipmentUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/createShipment`,
      shipmentsSearch: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      getProducts: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getProducts`,
      getManufacturers: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getManufacturers`,
      createPurchaseOrderUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/createPurchaseOrder`,
      fetchAllPurchaseOrdersUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/fetchPublisherPurchaseOrders`,
      fetchAllPurchaseOrderUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      fetchPurchaseOrderStatisticsUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/purchaseOrderStatistics`,
      inventorySearch: `${PROD_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      inventoriesUrl: `${PROD_SERVER_URL}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addInventoryUrl: `${PROD_SERVER_URL}/inventorymanagement/api/inventory/addNewInventory`,
      trackShipment: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,
    }
  };

  const environment = process.env.ENVIRONMENT || 'stable'; // change prod to test, local,stable, dev for respective environments
  const conf = confs[environment];
  return conf;
}
