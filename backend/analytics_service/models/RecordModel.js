const mongoose = require("mongoose");
const RecordSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    externalId: {
      type: String,
    },
    creationDate: {
      type: String,
      required: true,
      default: "2020-12-31T18:30:00.000Z",
    },
    createdBy: {
      type: String,
      required: true,
      default: "user_id",
    },
    supplier: {
      type: Object,
      required: true,
      default: {
        supplierOrganization: "organization_id",
        supplierIncharge: "user_id",
      },
    },
    customer: {
      type: Object,
      required: true,
      default: {
        organization: "organization_id",
        incharge: "user_id",
        shippingAddress: {
          shippingAddressId: "warehouseId",
          shipmentReceiverId: "userId",
        },
      },
    },
    products: {
      type: Array,
      required: false,
      default: [
        {
          productId: "product_id 1",
          quantity: 12345,
          quantityDelivered: 345,
        },
      ],
    },
    poStatus: { type: String, required: false, default: "CREATED" },
    lastUpdatedBy: { type: String, required: false, default: "USER_ID" },
    lastUpdatedOn: {
      type: String,
      required: false,
      default: "2020-12-31T18:30:00.000Z",
    },
    shippingOrders: {
      type: Array,
      required: false,
      default: [
        {
          orderId: "SO1234567890",
          createdBy: "user_id",
          assignedTo: ["warehouse_id 1", "warehouse_id 2"],
          updatedOn: "2020-01-01T18:30:00.000Z",
          updatedBy: "user_id",
          status: "CREATED_INQUEUE_PROCESSED",
        },
      ],
    },
    shipments: {
      type: Array,
      required: false,
      default: [
        {
          id: "SH1234567890",
          label: {
            id: "uuid1234567899",
            type: "QR_2DBAR",
          },
          externalShipmentId: "HYDROS123456ORP",
          supplier: {
            id: "user_id",
            locationId: "warehouse_id",
          },
          receiver: {
            id: "user_id",
            locationId: "warehouse_id",
          },
          shippingDate: "2021-01-01T18:30:00.000Z",
          expectedDeliveryDate: "2021-01-03T18:30:00.000Z",
          actualDeliveryDate: "2021-01-04T18:30:00.000Z",
          shipmentStatus: "PROCESSING_CREATED_SHIPPED_RECEIVED_LOST_DAMAGED",
          transactionIds: ["tx_id 1", "tx_id 2", "tx_id 3"],
          products: [
            {
              id: "product_id 1",
              quantity: 345,
            },
          ],
        },
      ],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Record", RecordSchema);
