export const TEST_SERVER_URL = 'http://test.vaccineledger.com:9001';
export const PROD_SERVER_URL = 'http://api.vaccineledger.com:9001';
export const ABINBEVPROD_SERVER_URL = 'http://abinbev.statledger.io:9001';
export const ABINBEVTEST_SERVER_URL = 'http://test.abinbev.statledger.io:9001';
export const DEMO_SERVER_URL = 'http://vaccineledger.com:9001';
export const LOCAL_SERVER_URL_USER = 'http://localhost:3001';
export const LOCAL_SERVER_URL_SHIPPINGORDER ='http://localhost:3013';
export const LOCAL_SERVER_URL_SHIPMENT = 'http://localhost:3002';
export const LOCAL_SERVER_URL_INVENTORY = 'http://localhost:3007';
export const LOCAL_SERVER_URL_PO = 'http://localhost:3012';
export const LOCAL_SERVER_URL_TRACKANDTRACE = 'http://localhost:3005';
export const LOCAL_SERVER_URL_NOTIFICATION = 'http://localhost:3006';
export const LOCAL_SERVER_URL_ANALYTICS = 'http://localhost:3015';
export const LOCAL_SERVER_URL_PRODUCTS = 'http://localhost:3010';
export const STABLE_SERVER_URL_USER = 'http://54.164.66.73:3001';
export const STABLE_SERVER_URL_SHIPMENT = 'http://54.164.66.73:3002';
export const STABLE_SERVER_URL_PO = 'http://54.164.66.73:3012';
export const STABLE_SERVER_URL_INVENTORY = 'http://54.164.66.73:3007';
export const STABLE_SERVER_URL_TRACKANDTRACE = 'http://54.164.66.73:3005';
export const STABLE_SERVER_URL_NOTIFICATION = 'http://54.164.66.73:3006';
export const STABLE_SERVER_URL_PRODUCTS = 'http://54.164.66.73:3010';
export const DEV_SERVER_URL = 'http://127.0.0.1:9001';
export const FOODLEDGER_PROD_SERVER_URL = 'http://foodledger.statledger.io:9001';
export const FOODLEDGER_TEST_SERVER_URL = 'http://test.foodledger.statledger.io:9001';

/*Shipping order URL needs to be updated for stable server*/ 

export function config() {
  const confs = {
    foodledgerprod: {
      loginUrl: `${FOODLEDGER_PROD_SERVER_URL}/usermanagement/api/auth/login`,
      sendOtpUrl: `${FOODLEDGER_PROD_SERVER_URL}/usermanagement/api/auth/sendOtp`,
      registerUrl: `${FOODLEDGER_PROD_SERVER_URL}/usermanagement/api/auth/register`,
      checkUserUrl: `${FOODLEDGER_PROD_SERVER_URL}/usermanagement/api/auth/check`,
      verifyOtpUrl: `${FOODLEDGER_PROD_SERVER_URL}/usermanagement/api/auth/verifyOtp`,
      userInfoUrl: `${FOODLEDGER_PROD_SERVER_URL}/usermanagement/api/auth/userInfo`,
      getAllUsersUrl: `${FOODLEDGER_PROD_SERVER_URL}/usermanagement/api/auth/getAllUsers`,
      updateProfileUrl: `${FOODLEDGER_PROD_SERVER_URL}/usermanagement/api/auth/updateProfile`,
      upload: `${FOODLEDGER_PROD_SERVER_URL}/usermanagement/api/auth/upload`,
      getAnalyticsUrl:`${FOODLEDGER_PROD_SERVER_URL}/analyticsmanagement/api/analytics/getAnalytics`,
      getOverviewAnalyticsUrl:`${FOODLEDGER_PROD_SERVER_URL}/analyticsmanagement/api/analytics/getOverviewAnalytics`,
      getInventoryAnalyticsUrl:`${FOODLEDGER_PROD_SERVER_URL}/analyticsmanagement/api/analytics/getInventoryAnalytics`,
      getShipmentAnalyticsUrl:`${FOODLEDGER_PROD_SERVER_URL}/analyticsmanagement/api/analytics/getShipmentAnalytics`,
      shipmentsUrl: `${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipment/fetchShipments`,
      viewShipmentUrl: `${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipment/viewShipment?shipmentId=`,
      getManufacturers: `${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipping/getManufacturers`,
      createShippingOrderUrl:`${FOODLEDGER_PROD_SERVER_URL}/shippingordermanagement/api/shipping/createShippingOrder`,
      getShippingOrdersUrl:`${FOODLEDGER_PROD_SERVER_URL}/shippingordermanagement/api/shipping/getShippingOrders`,
      getShippingOrderIdsUrl:`${FOODLEDGER_PROD_SERVER_URL}/shippingordermanagement/api/shipping/getShippingOrderIds`,
      viewShippingOrderUrl:`${FOODLEDGER_PROD_SERVER_URL}/shippingordermanagement/api/shipping/viewShippingOrder?soId=`,
      createShipmentUrl: `${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipment/createShipment`,
      shipmentsSearch: `${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      createPurchaseOrderUrl: `${FOODLEDGER_PROD_SERVER_URL}/pomanagement/api/po/createPurchaseOrder`,
      addPOsFromExcelUrl: `${FOODLEDGER_PROD_SERVER_URL}/pomanagement/api/po/addPOsFromExcel`,
      changePOStatus: `${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipping/changePOStatus`,
      fetchAllPurchaseOrderUrl: `${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      getPOsUrl: `${FOODLEDGER_PROD_SERVER_URL}/pomanagement/api/po/purchaseOrderStatistics`,
      inventoriesUrl: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getInventory`,
      inventorySearch: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      getSerialNumbersByBatchNumber: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsByBatchNumber?skip=0&limit=100&batchNumber=`,
      getInventoryDetailsUrl: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetails`,
      getInventoryByBatchNumber:`${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getBatchDetailsByBatchNumber?skip=0&limit=100&batchNumber=`,
      addProductsToInventory: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/addProductsToInventory`,
      addInventoriesFromExcel: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/addInventoriesFromExcel`,
      addInventoryUrl: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/addNewInventory`,
      productListUrl: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getProductListCounts`,
      getProductDetailsByWarehouseIdUrl: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getProductDetailsByWarehouseId?warehouseId=`,
      getRegionsUrl: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getRegions`,
      getCountryByRegionUrl: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getCountryDetailsByRegion?region=`,
      getWareHousesByCountryUrl: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getWarehouseDetailsByCountry?country=`,
      getWarehouseDetailsByCountryUrl: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getWarehouseDetailsByCountry?name=`,
      getWareHousesByRegionUrl: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getWarehouseDetailsByRegion?region=`,
      getInventoryProductsUrl: `${FOODLEDGER_PROD_SERVER_URL}/inventorymanagement/api/inventory/getInventoryProductsByPlatform`,
      trackShipment: `${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,
      poDetailsByShipmentId:`${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipping/fetchPOdetailsByShipmentID?shipmentId=`,
      productDetailsByShipmentId:`${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipping/fetchProductdetailsByShipmentID?shipmentId=`,
      trackTemperature: `${FOODLEDGER_PROD_SERVER_URL}/tracktracemanagement/api/track/fetchTemp`,
      trackProduct: `${FOODLEDGER_PROD_SERVER_URL}/tracktracemanagement/api/track/track?trackingNumber=`,
      getOrganisations:`${FOODLEDGER_PROD_SERVER_URL}/productmanagement/api/organisation/getOrganisations`,
      getWarehouseByOrgId:`${FOODLEDGER_PROD_SERVER_URL}/productmanagement/api/organisation/warehouses?id=`,
      addNewProduct: `${FOODLEDGER_PROD_SERVER_URL}/productmanagement/api/products/addProductName`,
      getProducts: `${FOODLEDGER_PROD_SERVER_URL}/productmanagement/api/products/getProducts`,
      getProductsByInventoryUrl: `${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipment/getProductsByInventory?invId=`,
      generateCodes: `${FOODLEDGER_PROD_SERVER_URL}/productmanagement/api/products/generateCodes`,
      addMultipleProducts: `${FOODLEDGER_PROD_SERVER_URL}/productmanagement/api/products/addMultipleProducts`,
      getNotificationsUrl: `${FOODLEDGER_PROD_SERVER_URL}/notificationmanagement/api/notification/getNotifications`,
      deleteNotificationUrl: `${FOODLEDGER_PROD_SERVER_URL}/notificationmanagement/api/notification/deleteNotification`,
      updateTrackingStatusUrl:`${FOODLEDGER_PROD_SERVER_URL}/shipmentmanagement/api/shipment/updateTrackingStatus`,
      getAllAnalytics: `${FOODLEDGER_PROD_SERVER_URL}/advancedanalytics/api/analytics/getAllStats`,
    },
    foodledgertest: {
      loginUrl: `${FOODLEDGER_TEST_SERVER_URL}/usermanagement/api/auth/login`,
      sendOtpUrl: `${FOODLEDGER_TEST_SERVER_URL}/usermanagement/api/auth/sendOtp`,
      registerUrl: `${FOODLEDGER_TEST_SERVER_URL}/usermanagement/api/auth/register`,
      checkUserUrl: `${FOODLEDGER_TEST_SERVER_URL}/usermanagement/api/auth/check`,
      verifyOtpUrl: `${FOODLEDGER_TEST_SERVER_URL}/usermanagement/api/auth/verifyOtp`,
      userInfoUrl: `${FOODLEDGER_TEST_SERVER_URL}/usermanagement/api/auth/userInfo`,
      getAllUsersUrl: `${FOODLEDGER_TEST_SERVER_URL}/usermanagement/api/auth/getAllUsers`,
      updateProfileUrl: `${FOODLEDGER_TEST_SERVER_URL}/usermanagement/api/auth/updateProfile`,
      upload: `${FOODLEDGER_TEST_SERVER_URL}/usermanagement/api/auth/upload`,
      getAnalyticsUrl:`${FOODLEDGER_TEST_SERVER_URL}/analyticsmanagement/api/analytics/getAnalytics`,
      getOverviewAnalyticsUrl:`${FOODLEDGER_TEST_SERVER_URL}/analyticsmanagement/api/analytics/getOverviewAnalytics`,
      getInventoryAnalyticsUrl:`${FOODLEDGER_TEST_SERVER_URL}/analyticsmanagement/api/analytics/getInventoryAnalytics`,
      getShipmentAnalyticsUrl:`${FOODLEDGER_TEST_SERVER_URL}/analyticsmanagement/api/analytics/getShipmentAnalytics`,
      shipmentsUrl: `${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipment/fetchShipments`,
      viewShipmentUrl: `${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipment/viewShipment?shipmentId=`,
      getManufacturers: `${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipping/getManufacturers`,
      createShippingOrderUrl:`${FOODLEDGER_TEST_SERVER_URL}/shippingordermanagement/api/shipping/createShippingOrder`,
      getShippingOrdersUrl:`${FOODLEDGER_TEST_SERVER_URL}/shippingordermanagement/api/shipping/getShippingOrders`,
      getShippingOrderIdsUrl:`${FOODLEDGER_TEST_SERVER_URL}/shippingordermanagement/api/shipping/getShippingOrderIds`,
      viewShippingOrderUrl:`${FOODLEDGER_TEST_SERVER_URL}/shippingordermanagement/api/shipping/viewShippingOrder?soId=`,
      createShipmentUrl: `${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipment/createShipment`,
      shipmentsSearch: `${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchShipments?key=`,
      createPurchaseOrderUrl: `${FOODLEDGER_TEST_SERVER_URL}/pomanagement/api/po/createPurchaseOrder`,
      addPOsFromExcelUrl: `${FOODLEDGER_TEST_SERVER_URL}/pomanagement/api/po/addPOsFromExcel`,
      changePOStatus: `${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipping/changePOStatus`,
      fetchAllPurchaseOrderUrl: `${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchpurchaseOrder?key=`,
      getPOsUrl: `${FOODLEDGER_TEST_SERVER_URL}/pomanagement/api/po/purchaseOrderStatistics`,
      inventoriesUrl: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getInventory`,
      inventorySearch: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`,
      getSerialNumbersByBatchNumber: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetailsByBatchNumber?skip=0&limit=100&batchNumber=`,
      getInventoryDetailsUrl: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getInventoryDetails`,
      getInventoryByBatchNumber:`${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getBatchDetailsByBatchNumber?skip=0&limit=100&batchNumber=`,
      addProductsToInventory: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/addProductsToInventory`,
      addInventoriesFromExcel: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/addInventoriesFromExcel`,
      addInventoryUrl: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/addNewInventory`,
      productListUrl: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getProductListCounts`,
      getProductDetailsByWarehouseIdUrl: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getProductDetailsByWarehouseId?warehouseId=`,
      getRegionsUrl: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getRegions`,
      getCountryByRegionUrl: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getCountryDetailsByRegion?region=`,
      getWareHousesByCountryUrl: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getWarehouseDetailsByCountry?country=`,
      getWarehouseDetailsByCountryUrl: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getWarehouseDetailsByCountry?name=`,
      getWareHousesByRegionUrl: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getWarehouseDetailsByRegion?region=`,
      getInventoryProductsUrl: `${FOODLEDGER_TEST_SERVER_URL}/inventorymanagement/api/inventory/getInventoryProductsByPlatform`,
      trackShipment: `${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipping/trackShipment?shipmentId=`,
      poDetailsByShipmentId:`${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchPOdetailsByShipmentID?shipmentId=`,
      productDetailsByShipmentId:`${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipping/fetchProductdetailsByShipmentID?shipmentId=`,
      trackTemperature: `${FOODLEDGER_TEST_SERVER_URL}/tracktracemanagement/api/track/fetchTemp`,
      trackProduct: `${FOODLEDGER_TEST_SERVER_URL}/tracktracemanagement/api/track/track?trackingNumber=`,
      getOrganisations:`${FOODLEDGER_TEST_SERVER_URL}/productmanagement/api/organisation/getOrganisations`,
      getWarehouseByOrgId:`${FOODLEDGER_TEST_SERVER_URL}/productmanagement/api/organisation/warehouses?id=`,
      addNewProduct: `${FOODLEDGER_TEST_SERVER_URL}/productmanagement/api/products/addProductName`,
      getProducts: `${FOODLEDGER_TEST_SERVER_URL}/productmanagement/api/products/getProducts`,
      getProductsByInventoryUrl: `${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipment/getProductsByInventory?invId=`,
      generateCodes: `${FOODLEDGER_TEST_SERVER_URL}/productmanagement/api/products/generateCodes`,
      addMultipleProducts: `${FOODLEDGER_TEST_SERVER_URL}/productmanagement/api/products/addMultipleProducts`,
      getNotificationsUrl: `${FOODLEDGER_TEST_SERVER_URL}/notificationmanagement/api/notification/getNotifications`,
      deleteNotificationUrl: `${FOODLEDGER_TEST_SERVER_URL}/notificationmanagement/api/notification/deleteNotification`,
      updateTrackingStatusUrl:`${FOODLEDGER_TEST_SERVER_URL}/shipmentmanagement/api/shipment/updateTrackingStatus`,
      getAllAnalytics: `${FOODLEDGER_TEST_SERVER_URL}/advancedanalytics/api/analytics/getAllStats`,
    },
  };
  // change prod to test, local,stable, dev for respective environments
  const environment = process.env.ENVIRONMENT || 'foodledgertest'; 
  const conf = confs[environment];
  return conf;
}
