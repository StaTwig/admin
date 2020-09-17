export const TEST_SERVER_URL = 'http://test.vaccineledger.com:9001';
export const LOCAL_SERVER_URL_USER = 'http://localhost:3001';
export const LOCAL_SERVER_URL_SHIPMENT = 'http://localhost:3002';
export const LOCAL_SERVER_URL_INVENTORY = 'http://localhost:3007';
export const LOCAL_SERVER_URL_TRACKANDTRACE = 'http://localhost:3005';
export const LOCAL_SERVER_URL_PRODUCTS = 'http://localhost:3010';
export const PROD_SERVER_URL = 'http://api.vaccineledger.com:9001';
export const STABLE_SERVER_URL_USER = 'http://3.81.12.69:3001';
export const STABLE_SERVER_URL_SHIPMENT = 'http://3.81.12.69:3002';
export const STABLE_SERVER_URL_INVENTORY = 'http://3.81.12.69:3007';
export const STABLE_SERVER_URL_TRACKANDTRACE = 'http://3.81.12.69:3005';
export const STABLE_SERVER_URL_PRODUCTS = 'http://3.81.12.69:3010';
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
      getProducts: `${LOCAL_SERVER_URL_PRODUCTS}/productmanagement/api/products/getProductNames`,
      getManufacturers: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getManufacturers`,
      inventoriesUrl: `${LOCAL_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addMultipleInventories: `${LOCAL_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/addMultipleInventories`,
      createShipmentUrl: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/createShipment`,
      addInventoryUrl: `${LOCAL_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/addNewInventory`,
      shipmentsSearch: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      inventorySearch: `${LOCAL_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      createPurchaseOrderUrl: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/createPurchaseOrder`,
      fetchAllPurchaseOrdersUrl: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchPublisherPurchaseOrders`,
      fetchAllPurchaseOrderUrl: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      fetchPurchaseOrderStatisticsUrl: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/purchaseOrderStatistics`,
      trackShipment: `${LOCAL_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,
      trackTemperature:`${LOCAL_SERVER_URL_TRACKANDTRACE}/tracktracemanagement/api/track/fetchTemp`,
      addNewProduct:`${LOCAL_SERVER_URL_PRODUCTS}/productmanagement/api/products/addProductName`,
      addMultipleProducts:`${LOCAL_SERVER_URL_PRODUCTS}/productmanagement/api/products/addMultipleProducts`,
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
      getProducts: `${DEV_SERVER_URL}/productmanagement/api/products/getProductNames`,
      getManufacturers: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/getManufacturers`,
      createShipmentUrl: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/createShipment`,
      inventoriesUrl: `${DEV_SERVER_URL}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addMultipleInventories: `${DEV_SERVER_URL}/inventorymanagement/api/inventory/addMultipleInventories`,
      addInventoryUrl: `${DEV_SERVER_URL}/inventorymanagement/api/inventory/addNewInventory`,
      shipmentsSearch: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      inventorySearch: `${DEV_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      createPurchaseOrderUrl: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/createPurchaseOrder`,
      fetchAllPurchaseOrdersUrl: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/fetchPublisherPurchaseOrders`,
      fetchAllPurchaseOrderUrl: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      fetchPurchaseOrderStatisticsUrl: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/purchaseOrderStatistics`,
      trackShipment: `${DEV_SERVER_URL}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,
      trackTemperature:`${DEV_SERVER_URL}/tracktracemanagement/api/track/fetchTemp`,
      addNewProduct:`${DEV_SERVER_URL}/productmanagement/api/products/addProductName`,
      addMultipleProducts:`${DEV_SERVER_URL}/productmanagement/api/products/addMultipleProducts`,

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
      //getProducts: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getProducts`,
      getManufacturers: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/getManufacturers`,
      createShipmentUrl: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/createShipment`,
      shipmentsSearch: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      createPurchaseOrderUrl: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/createPurchaseOrder`,
      fetchAllPurchaseOrdersUrl: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchPublisherPurchaseOrders`,
      fetchAllPurchaseOrderUrl: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      fetchPurchaseOrderStatisticsUrl: `${STABLE_SERVER_URL_SHIPMENT}/shipmentmanagement/api/shipping/purchaseOrderStatistics`,
      inventorySearch: `${STABLE_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      inventoriesUrl: `${STABLE_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addMultipleInventories: `${STABLE_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/addMultipleInventories`,
      addInventoryUrl: `${STABLE_SERVER_URL_INVENTORY}/inventorymanagement/api/inventory/addNewInventory`,
      trackShipment: `${STABLE_SERVER_URL_INVENTORY}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,
      trackTemperature:`${STABLE_SERVER_URL_TRACKANDTRACE}/tracktracemanagement/api/track/fetchTemp`,
      addNewProduct:`${STABLE_SERVER_URL_PRODUCTS}/productmanagement/api/products/addProductName`,
      getProducts: `${STABLE_SERVER_URL_PRODUCTS}/productmanagement/api/products/getProductNames`,
      addMultipleProducts:`${STABLE_SERVER_URL_PRODUCTS}/productmanagement/api/products/addMultipleProducts`,
    
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
      //getProducts: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/getProducts`,
      getManufacturers: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/getManufacturers`,
      createShipmentUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/createShipment`,
      shipmentsSearch: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      createPurchaseOrderUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/createPurchaseOrder`,
      fetchAllPurchaseOrdersUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchPublisherPurchaseOrders`,
      fetchAllPurchaseOrderUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      fetchPurchaseOrderStatisticsUrl: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/purchaseOrderStatistics`,
      inventorySearch: `${TEST_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      inventoriesUrl: `${TEST_SERVER_URL}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addMultipleInventories: `${TEST_SERVER_URL}/inventorymanagement/api/inventory/addMultipleInventories`,
      addInventoryUrl: `${TEST_SERVER_URL}/inventorymanagement/api/inventory/addNewInventory`,
      trackShipment: `${TEST_SERVER_URL}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,
      trackTemperature:`${TEST_SERVER_URL}/tracktracemanagement/api/track/fetchTemp`,
      addNewProduct:`${TEST_SERVER_URL}/productmanagement/api/products/addProductName`,
      getProducts: `${TEST_SERVER_URL}/productmanagement/api/products/getProductNames`,
      addMultipleProducts:`${TEST_SERVER_URL}/productmanagement/api/products/addMultipleProducts`,
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
      getProducts: `${PROD_SERVER_URL}/productmanagement/api/products/getProductNames`,
      getManufacturers: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/getManufacturers`,
      createPurchaseOrderUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/createPurchaseOrder`,
      fetchAllPurchaseOrdersUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/fetchPublisherPurchaseOrders`,
      fetchAllPurchaseOrderUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      fetchPurchaseOrderStatisticsUrl: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/purchaseOrderStatistics`,
      inventorySearch: `${PROD_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      inventoriesUrl: `${PROD_SERVER_URL}/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addInventoryUrl: `${PROD_SERVER_URL}/inventorymanagement/api/inventory/addNewInventory`,
      addMultipleInventories: `${PROD_SERVER_URL}/inventorymanagement/api/inventory/addMultipleInventories`,
      trackShipment: `${PROD_SERVER_URL}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,
      trackTemperature:`${PROD_SERVER_URL}/tracktracemanagement/api/track/fetchTemp`,
      addNewProduct:`${PROD_SERVER_URL}/productmanagement/api/products/addProductName`,
      addMultipleProducts:`${PROD_SERVER_URL}/productmanagement/api/products/addMultipleProducts`,
    }
  };

  const environment = process.env.ENVIRONMENT || 'test'; // change prod to test, local,stable, dev for respective environments
  const conf = confs[environment];
  return conf;
}
