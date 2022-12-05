// const { USER_TYPES, REGULAR } = require('./config/constants');

module.exports = {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "Shipping",
    description: "Shipping Service API",
    termsOfService: "http://api_url/terms/",
    contact: {
      name: "StaTwig",
      email: "dev@statwig.com",
      url: "https://statwig.com/",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  servers: [
    {
      url: "http://localhost:3002",
      description: "Local server",
    },
    {
      url: "http://test.vaccineledger.com:9001",
      description: "Testing server",
    },
    {
      url: "http://api.vaccineledger.com:9001",
      description: "Production server",
    },
  ],
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: [
    {
      name: "CRUD operations",
    },
  ],
  paths: {
    "/shipmentmanagement/api/shipping/getManufacturers": {
      get: {
        tags: ["CRUD operations"],
        description: "GET Manufacturers",
        operationId: "getManufacturers",
        parameters: [],
        responses: {
          200: {
            description: "Found the Manufacturer",
            content: {
              "application/json": {
                schema: {
                  $ref: "",
                },
              },
            },
          },
          400: {
            description: "Missing parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "Manufacturer is missing",
                  internal_code: "missing_parameters",
                },
              },
            },
          },
        },
      },
    },
    "/shipmentmanagement/api/shipping/fetchProductdetailsByShipmentID?shipmentId=SHP1345567":
      {
        get: {
          tags: ["CRUD operations"],
          description: "Fetch Product Details By Shipment ID",
          operationId: "fetchProductdetailsByShipmentID",
          parameters: [],
          responses: {
            200: {
              description:
                "Fetched Prodcut Details By Shipment ID successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "",
                  },
                },
              },
            },
            400: {
              description: "Missing parameters",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Error",
                  },
                  example: {
                    message: "Product Details are missing",
                    internal_code: "missing_parameters",
                  },
                },
              },
            },
          },
        },
      },
    "/shipmentmanagement/api/shipping/fetchPurchaseOrder?key=PO75163262": {
      get: {
        tags: ["CRUD operations"],
        description: "Fetch Purchase Order",
        operationId: "fetchPurchaseOrder",
        parameters: [],
        responses: {
          200: {
            description: "Fetched the Purchase Order Details",
            content: {
              "application/json": {
                schema: {
                  $ref: "",
                },
              },
            },
          },
          400: {
            description: "Missing parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "Could Not Found Purchase Order Details",
                  internal_code: "missing_parameters",
                },
              },
            },
          },
        },
      },
    },
    "/shipmentmanagement/api/shipping/fetchUserShipments?skip=0&limit=50": {
      get: {
        tags: ["CRUD operations"],
        description: "Fetch Shipments",
        operationId: "fetchShipments",
        parameters: [],
        responses: {
          200: {
            description: "Fetched the shipments",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Users",
                },
              },
            },
          },
          400: {
            description: "Missing parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "Shipment is missing",
                  internal_code: "missing_parameters",
                },
              },
            },
          },
        },
      },
    },
    "/shipmentmanagement/api/shipping/fetchShipments?key=SHP0909": {
      get: {
        tags: ["CRUD operations"],
        description: "Search Shipments",
        operationId: "searchShipments",
        parameters: [],
        responses: {
          200: {
            description: "Searched the shipments",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Users",
                },
              },
            },
          },
          400: {
            description: "Missing parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "Shipment is missing",
                  internal_code: "missing_parameters",
                },
              },
            },
          },
        },
      },
    },
    "/shipmentmanagement/api/shipping/createShipment": {
      post: {
        tags: ["CRUD operations"],
        description: "Create Shipment",
        operationId: "createShipment",
        parameters: [
          {
            name: "receiver",
            in: "query",
            schema: {
              $ref: "#/components/schemas/receiver",
            },
            required: true,
            description: "Blockchain Address of Receiver",
          },
          {
            name: "data",
            in: "query",
            schema: {
              type: "object",
              $ref: "#/components/schemas/Data",
            },
            required: true,
            description: "Shipment Data",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Shipment",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "New user was created",
          },
          400: {
            description: "Invalid parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "Shipment already exist",
                  internal_code: "invalid_parameters",
                },
              },
            },
          },
        },
      },
    },
    "/shipmentmanagement/api/shipping/createPurchaseOrder": {
      post: {
        tags: ["CRUD operations"],
        description: "Create Purchase Order",
        operationId: "createPurchaseOrder",
        parameters: [
          {
            name: "data",
            in: "query",
            schema: {
              type: "object",
              $ref: "#/components/schemas/PurchaseOrder",
            },
            required: true,
            description: "Purchase Order Data",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PurchaseOrder",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Created New Purchase Order",
          },
          400: {
            description: "Invalid parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "Purchase Order already exist",
                  internal_code: "invalid_parameters",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      receiver: {
        type: "string",
        description: "Blockchain Address of Receiver",
        example: "15gncMy8pbv8uxJ7V1oG3PwqM535ZFK8WmEAC5",
      },
      shipmentId: {
        type: "string",
        description: "Shipment ID",
        example: "SHP5919",
      },
      client: {
        type: "string",
        description: "Client Name",
        example: "Unicef India",
      },
      receiver: {
        type: "string",
        description: "Address of the Receiver",
        example: "15gncMy8pbv8uxJ7V1oG3PwqM535ZFK8WmEAC5",
      },
      supplier: {
        type: "string",
        description: "Name of Supplier",
        example: "Hemz",
      },
      supplierLocation: {
        type: "string",
        description: "Location of Supplier",
        example: "Hyderabad",
      },
      shipmentDate: {
        type: "string",
        description: "Date of Shipment",
        example: "04/22/2020",
      },
      deliverTo: {
        type: "string",
        description: "Shipment Delivered To",
        example: "Satheesh",
      },
      deliveryLocation: {
        type: "string",
        description: "Location for Delivery",
        example: "Dubai",
      },
      estimateDeliveryDate: {
        type: "string",
        description: "Estimated Date of Delivery",
        example: "04/30/2020",
      },
      status: {
        type: "string",
        description: "Shipment Status",
        example: "In Transit",
      },
      productName: {
        type: "string",
        description: "Name of Product",
        example: "MMR",
      },
      quantity: {
        type: "string",
        description: "Quantity of Product in Shipment",
        example: 1000,
      },
      manufacturerName: {
        type: "string",
        description: "Name of the Manufacturer of Product",
        example: "Manufacturer A",
      },
      storageCondition: {
        type: "string",
        description: "Conditions Required for Storage",
        example: "Good",
      },
      manufacturingDate: {
        type: "string",
        description: "Date of Manufacturing of Product",
        example: "04/22/2020",
      },
      expiryDate: {
        type: "string",
        description: "Expiry Date of the Product",
        example: "04/22/2022",
      },
      batchNumber: {
        type: "string",
        description: "Batch Number  of the Product",
        example: "BB1234",
      },
      serialNumber: {
        type: "string",
        description: "Serial Number of the Product",
        example: "SL1234",
      },
      orderID: {
        type: "string",
        description: "Purchase Order ID",
        example: "PO22224",
      },
      Product_Name: {
        type: "string",
        description: "Product Name in Purchase Order",
        example: "Polio",
      },
      Quantity: {
        type: "integer",
        description: "Quantity in Purchase Order",
        example: 269,
      },
      Shipment_Date: {
        type: "string",
        description: "Shipment Date of Purchase Order",
        example: "1/6/2020",
      },
      Client: {
        type: "string",
        description: "Client in Purchase Order",
        example: "UNICEF India",
      },
      Deliver_To: {
        type: "string",
        description: "Purchase Order is Delivering To",
        example: "Andrew",
      },
      Delivery_Date: {
        type: "string",
        description: "Delivery Date of Purchase Order",
        example: "1/21/2020",
      },
      DeliveryLocation: {
        type: "string",
        description: "Delivery Location of Purchase Order",
        example: "Patna",
      },
      Status: {
        type: "string",
        description: "Status of Purchase Order",
        example: "GREEN",
      },
      Data: {
        type: "object",
        properties: {
          receiver: {
            $ref: "#/components/schemas/shipmentId",
          },
          data: {
            $ref: "#/components/schemas/client",
          },
          password: {
            $ref: "#/components/schemas/receiver",
          },
          email: {
            $ref: "#/components/schemas/supplier",
          },
          name: {
            $ref: "#/components/schemas/supplierLocation",
          },
          otp: {
            $ref: "#/components/schemas/shipmentDate",
          },
          role: {
            $ref: "#/components/schemas/deliverTo",
          },
          organization: {
            $ref: "#/components/schemas/deliveryLocation",
          },
          affiliateOrganisation: {
            $ref: "#/components/schemas/estimateDeliveryDate",
          },
          phone: {
            $ref: "#/components/schemas/status",
          },
          products: {
            $ref: "#/components/schemas/Products",
          },
        },
      },
      PurchaseOrder: {
        type: "object",
        properties: {
          orderID: {
            $ref: "#/components/schemas/orderID",
          },
          Product_Name: {
            $ref: "#/components/schemas/Product_Name",
          },
          Quantity: {
            $ref: "#/components/schemas/Quantity",
          },
          Shipment_Date: {
            $ref: "#/components/schemas/Shipment_Date",
          },
          Client: {
            $ref: "#/components/schemas/Client",
          },
          Deliver_To: {
            $ref: "#/components/schemas/Deliver_To",
          },
          Delivery_Date: {
            $ref: "#/components/schemas/Delivery_Date",
          },
          DeliveryLocation: {
            $ref: "#/components/schemas/DeliveryLocation",
          },
          Status: {
            $ref: "#/components/schemas/Status",
          },
        },
      },
      Product: {
        type: "object",
        properties: {
          receiver: {
            $ref: "#/components/schemas/productName",
          },
          data: {
            $ref: "#/components/schemas/quantity",
          },
          password: {
            $ref: "#/components/schemas/manufacturerName",
          },
          email: {
            $ref: "#/components/schemas/storageCondition",
          },
          name: {
            $ref: "#/components/schemas/manufacturingDate",
          },
          otp: {
            $ref: "#/components/schemas/expiryDate",
          },
          role: {
            $ref: "#/components/schemas/batchNumber",
          },
          organization: {
            $ref: "#/components/schemas/serialNumber",
          },
        },
      },
      Shipment: {
        type: "object",
        properties: {
          receiver: {
            $ref: "#/components/schemas/receiver",
          },
          data: {
            $ref: "#/components/schemas/Data",
          },
        },
      },
      Products: {
        type: "object",
        properties: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Product",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          internal_code: {
            type: "string",
          },
        },
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};
