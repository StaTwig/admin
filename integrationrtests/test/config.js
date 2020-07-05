
  const config = {
        
    test: {
      SERVER_URL: `http://test.vaccineledger.com:9001`,
      loginUrl: `/usermanagement/api/auth/login`,
      registerUrl: `/usermanagement/api/auth/register`,
      verifyOtpUrl: `/usermanagement/api/auth/verify-otp`,
      shipmentsUrl: `/shipmentmanagement/api/shipping/shipmentStatistics`,
      createShipmentUrl: `/shipmentmanagement/api/shipping/createShipment`,
      inventoriesUrl: `/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addInventoryUrl: `/inventorymanagement/api/inventory/addNewInventory`,
      userInfoUrl: `/usermanagement/api/auth/userInfo`,
      updateProfileUrl: `/usermanagement/api/auth/updateProfile`,
      upload: `/usermanagement/api/auth/upload`,
      shipmentsSearch: `/shipmentmanagement/api/shipping/fetchShipments`,
      inventorySearch: `/inventorymanagement/api/inventory/getInventoryDetailsForProduct`
    },
    prod: {
      SERVER_URL: `http://api.vaccineledger.com:9001`,
      loginUrl: `/usermanagement/api/auth/login`,
      registerUrl: `/usermanagement/api/auth/register`,
      verifyOtpUrl: `/usermanagement/api/auth/verify-otp`,
      shipmentsUrl: `/shipmentmanagement/api/shipping/shipmentStatistics`,
      createShipmentUrl: `/shipmentmanagement/api/shipping/createShipment`,
      inventoriesUrl: `/inventorymanagement/api/inventory/getAllInventoryDetails`,
      addInventoryUrl: `/inventorymanagement/api/inventory/addNewInventory`,
      userInfoUrl: `/usermanagement/api/auth/userInfo`,
      updateProfileUrl: `/usermanagement/api/auth/updateProfile`,
      upload: `/usermanagement/api/auth/upload`,
      shipmentsSearch: `/shipmentmanagement/api/shipping/fetchShipments?key=`,
      inventorySearch: `/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=`
    }
  };

module.exports = config;
