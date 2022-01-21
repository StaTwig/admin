const mongoose = require("mongoose");

const RbacSchema = new mongoose.Schema(
  {
    permissions: { type: Array, required: true },
    role: { type: String, required: true, unique: true },
    overview: {
      overview: { type: Boolean, default: false },
    },
    search: {
      searchByOrderId: { type: Boolean, default: false },
      searchByShipmentId: { type: Boolean, default: false },
      searchByProductCategory: { type: Boolean, default: false },
      searchByTransitNo: { type: Boolean, default: false },
      searchByProductName: { type: Boolean, default: false },
      searchByProductId: { type: Boolean, default: false },
    },
    inventory: {
      viewInventory: { type: Boolean, default: false },
      addInventory: { type: Boolean, default: false },
      importInventory: { type: Boolean, default: false },
      inventoryAnalytics: { type: Boolean, default: false },
      viewProductList: { type: Boolean, default: false },
      viewProductInfo: { type: Boolean, default: false },
      addNewProduct: { type: Boolean, default: false },
      inventoryFilters: { type: Boolean, default: false },
      inventoryExportReport: { type: Boolean, default: false },
    },
    shipment: {
      createShipment: { type: Boolean, default: false },
      shipmentAnalytics: { type: Boolean, default: false },
      updateShipment: { type: Boolean, default: false },
      receiveShipment: { type: Boolean, default: false },
      receiveShipmentScan: { type: Boolean, default: false },
      inboundShipments: { type: Boolean, default: false },
      outboundShipments: { type: Boolean, default: false },
      viewShipment: { type: Boolean, default: false },
      shipmentFilters: { type: Boolean, default: false },
      shipmentExportReport: { type: Boolean, default: false },
    },
    order: {
      createOrder: { type: Boolean, default: false },
      importOrder: { type: Boolean, default: false },
      orderAnalytics: { type: Boolean, default: false },
      receiveOrder: { type: Boolean, default: false },
      acceptRejectOrder: { type: Boolean, default: false },
      viewInboundOrders: { type: Boolean, default: false },
      viewOutboundOrders: { type: Boolean, default: false },
      orderFilters: { type: Boolean, default: false },
      orderExportReport: { type: Boolean, default: false },
      viewPO: { type: Boolean, default: false },
    },
    network: {
      network: { type: Boolean, default: false },
    },
    track: {
      trackAndTrace: { type: Boolean, default: false },
    },
    admin: {
      getUserRequest: { type: Boolean, default: false },
      acceptUser: { type: Boolean, default: false },
      addUser: { type: Boolean, default: false },
      removeUser: { type: Boolean, default: false },
      deactivateUser: { type: Boolean, default: false },
      addRole: { type: Boolean, default: false },
      deleteRole: { type: Boolean, default: false },
      affliateUser: { type: Boolean, default: false },
      unaffliateUser: { type: Boolean, default: false },
      viewAffliation: { type: Boolean, default: false },
      acceptAffiliation: { type: Boolean, default: false },
      removeAffiliation: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("permissions", RbacSchema);
