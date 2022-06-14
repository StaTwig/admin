exports.randomNumber = function (length) {
	var text = "";
	var possible = "123456789";
	for (var i = 0; i < length; i++) {
		var sup = Math.floor(Math.random() * possible.length);
		text += i > 0 && sup == i ? "0" : possible.charAt(sup);
	}
	return Number(text);
};


exports.asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

exports.allPermissionsList = async () => {
	return {
		"permissions": {
		  "overview": {
			"overview": true
		  },
		  "search": {
			"searchByOrderId": true,
			"searchByProductCategory": true,
			"searchByProductId": true,
			"searchByProductName": true,
			"searchByShipmentId": true,
			"searchByTransitNo": true
		  },
		  "inventory": {
			"addInventory": true,
			"importInventory": true,
			"inventoryAnalytics": true,
			"viewProductList": true,
			"addNewProduct": true,
			"inventoryFilters": true,
			"inventoryExportReport": true,
			"viewInventory": true,
			"viewProductInfo": true
		  },
		  "order": {
			"createOrder": true,
			"importOrder": true,
			"orderAnalytics": true,
			"receiveOrder": true,
			"acceptRejectOrder": true,
			"viewInboundOrders": true,
			"viewOutboundOrders": true,
			"orderFilters": true,
			"orderExportReport": true,
			"viewPO": true
		  },
		  "shipment": {
			"createShipment": true,
			"shipmentAnalytics": true,
			"updateShipment": true,
			"receiveShipment": true,
			"receiveShipmentScan": true,
			"inboundShipments": true,
			"outboundShipments": true,
			"viewShipment": true,
			"shipmentFilters": true,
			"shipmentExportReport": true,
			"shipmentReference": true,
			"shipmentTemperture": true,
			"shipmentTripscore": true,
			"shipmentMap": true
		  },
		  "network": {
			"network": true
		  },
		  "track": {
			"trackAndTrace": true
		  }
		},
		"role": "OrgAdmin",
		"orgId": "ORG100240"
	  }
}