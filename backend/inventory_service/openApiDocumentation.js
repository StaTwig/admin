// const { USER_TYPES, REGULAR } = require('./config/constants');

module.exports = {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "Inventory",
    description: "Inventory Service API",
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
      url: "http://localhost:3007",
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
    "/inventorymanagement/api/inventory/getAllInventoryDetails?skip=0&limit=15":
      {
        get: {
          tags: ["CRUD operations"],
          description: "GET All Inventory Details",
          operationId: "getAllInventoryDetails",
          parameters: [],
          responses: {
            200: {
              description: "Found the All Inventory Details Successfully",
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
                    message: "Inventory Details are missing",
                    internal_code: "missing_parameters",
                  },
                },
              },
            },
          },
        },
      },
    "/inventorymanagement/api/inventory/getInventoryDetailsForProduct?key=5678":
      {
        get: {
          tags: ["CRUD operations"],
          description: "Get Inventory Details For Product",
          operationId: "getInventoryDetailsForProduct",
          parameters: [],
          responses: {
            200: {
              description:
                "Found the Inventory Details for Product Successfully",
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
                    message: "Inventory Details for Product are missing",
                    internal_code: "missing_parameters",
                  },
                },
              },
            },
          },
        },
      },
    "/inventorymanagement/api/inventory/addNewInventory": {
      post: {
        tags: ["CRUD operations"],
        description: "Add New Inventory",
        operationId: "addNewInventory",
        parameters: [
          {
            name: "data",
            in: "query",
            schema: {
              type: "object",
              $ref: "#/components/schemas/Data",
            },
            required: true,
            description: "New Inventory Data",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Inventory",
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
                  message: "Inventory already exist",
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
      key: {
        type: "string",
        description: "key to Inventory",
        example: "05272020_inv",
      },
      address: {
        type: "string",
        description: "Blockchain Address",
        example: "1QdSmp5sCLzcgZ9yFhhZGdVNicjpmowtxM1y5w",
      },
      batchNumber: {
        type: "string",
        description: "Batch Number  of the Inventory",
        example: "31516",
      },
      serialNumber: {
        type: "string",
        description: "Serial Number of the Inventory",
        example: "123",
      },
      storageConditionmin: {
        type: "integer",
        description: "Minimum Temperature for Storage",
        example: -1,
      },
      storageConditionmax: {
        type: "integer",
        description: "Maximum Temperature for Storage",
        example: 1,
      },
      productName: {
        type: "string",
        description: "Product Name in Inventory",
        example: "Polio",
      },
      manufacturerName: {
        type: "string",
        description: "Name of the Manufacturer",
        example: "Bharat Biotech Limited",
      },
      quantity: {
        type: "integer",
        description: "Quantity in Inventory",
        example: 269,
      },
      manufacturingDate: {
        type: "string",
        description: "Date of Manufacturing of Inventory",
        example: "04/22/2020",
      },
      DateAdded: {
        type: "string",
        description: "Date when Inventory is added",
        example: "1/6/2020",
      },
      expiryDate: {
        type: "string",
        description: "Expiry Date of the Inventory",
        example: "04/22/2022",
      },
      Inventory: {
        type: "object",
        properties: {
          key: {
            $ref: "#/components/schemas/key",
          },
          address: {
            $ref: "#/components/schemas/address",
          },
          data: {
            $ref: "#/components/schemas/Data",
          },
        },
      },
      Data: {
        type: "object",
        properties: {
          batchNumber: {
            $ref: "#/components/schemas/batchNumber",
          },
          serialNumber: {
            $ref: "#/components/schemas/serialNumber",
          },
          storageConditionmin: {
            $ref: "#/components/schemas/storageConditionmin",
          },
          storageConditionmax: {
            $ref: "#/components/schemas/storageConditionmax",
          },
          productName: {
            $ref: "#/components/schemas/productName",
          },
          manufacturerName: {
            $ref: "#/components/schemas/manufacturerName",
          },
          quantity: {
            $ref: "#/components/schemas/quantity",
          },
          manufacturingDate: {
            $ref: "#/components/schemas/manufacturingDate",
          },
          DateAdded: {
            $ref: "#/components/schemas/DateAdded",
          },
          expiryDate: {
            $ref: "#/components/schemas/expiryDate",
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
