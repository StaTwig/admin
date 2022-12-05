// const { USER_TYPES, REGULAR } = require('./config/constants');

module.exports = {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "Users",
    description: "User management Service API",
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
      url: "http://localhost:3001",
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
    "/usermanagement/api/auth/getAllUsers": {
      get: {
        tags: ["CRUD operations"],
        description: "Get users",
        operationId: "getUsers",
        parameters: [],
        responses: {
          200: {
            description: "Users were obtained",
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
                  message: "User is missing",
                  internal_code: "missing_parameters",
                },
              },
            },
          },
        },
      },
    },
    "/usermanagement/api/auth/register": {
      post: {
        tags: ["CRUD operations"],
        description: "Register users",
        operationId: "registerUser",
        parameters: [
          {
            name: "firstName",
            in: "query",
            schema: {
              $ref: "#/components/schemas/firstName",
            },
            required: true,
            description: "First Name of User",
          },
          {
            name: "lastName",
            in: "query",
            schema: {
              type: "string",
            },
            required: true,
            description: "Last Name of User",
          },
          {
            name: "password",
            in: "query",
            schema: {
              type: "password",
              description: "Password of User",
            },
            required: true,
          },
          {
            name: "email",
            in: "query",
            schema: {
              type: "string",
              description: "Email of User",
            },
            required: true,
          },
          {
            name: "name",
            in: "query",
            schema: {
              type: "string",
              description: "User Name",
            },
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
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
                  message: "User already exist",
                  internal_code: "invalid_parameters",
                },
              },
            },
          },
        },
      },
    },
    "/usermanagement/api/auth/login": {
      post: {
        tags: ["CRUD operations"],
        description: "Login users",
        operationId: "loginUser",
        parameters: [
          {
            name: "email",
            in: "query",
            schema: {
              type: "string",
              description: "Email of User",
            },
            required: true,
          },
          {
            name: "password",
            in: "query",
            schema: {
              type: "password",
              description: "Password of User",
            },
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Successfully Logged In",
          },
          400: {
            description: "Invalid parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "Invalid Credentials",
                  internal_code: "invalid_credentials",
                },
              },
            },
          },
        },
      },
    },
    "/usermanagement/api/auth/verify-otp": {
      post: {
        tags: ["CRUD operations"],
        description: "OTP Verification",
        operationId: "verifyOTP",
        parameters: [
          {
            name: "email",
            in: "query",
            schema: {
              type: "string",
              description: "Email of User",
            },
            required: true,
          },
          {
            name: "otp",
            in: "query",
            schema: {
              type: "string",
              description: "One Time Password",
            },
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Successfully Verified OTP",
          },
          400: {
            description: "Invalid parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "Incorrect OTP",
                  internal_code: "incorrect_otp",
                },
              },
            },
          },
        },
      },
    },
    "/usermanagement/api/auth/resend-verify-otp": {
      post: {
        tags: ["CRUD operations"],
        description: "Resend OTP",
        operationId: "resendOTP",
        parameters: [
          {
            name: "email",
            in: "query",
            schema: {
              type: "string",
              description: "Email of User",
            },
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Successfully Sent OTP",
          },
          400: {
            description: "Invalid parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
                example: {
                  message: "Email Not Registered",
                  internal_code: "email_not_regidtered",
                },
              },
            },
          },
        },
      },
    },
    "/usermanagement/api/auth/updateProfile": {
      post: {
        tags: ["CRUD operations"],
        description: "Update User Profile",
        operationId: "updateProfile",
        parameters: [
          {
            name: "name",
            in: "query",
            schema: {
              type: "string",
              description: "User Name",
            },
            required: true,
          },
          {
            name: "role",
            in: "query",
            schema: {
              type: "string",
              description: "Role of User",
            },
            required: true,
          },
          {
            name: "organization",
            in: "query",
            schema: {
              type: "string",
              description: "Organisation of User",
            },
            required: true,
          },
          {
            name: "affiliateOrganisation",
            in: "query",
            schema: {
              type: "string",
              description: "Affiliate Organisation of User",
            },
            required: true,
          },
          {
            name: "phone",
            in: "query",
            schema: {
              type: "string",
              description: "Phone Number of User",
            },
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
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
                  message: "User already exist",
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
      firstName: {
        type: "string",
        description: "First Name of User",
        example: "Mohit",
      },
      lastName: {
        type: "string",
        description: "Last Name of User",
        example: "Vashistha",
      },
      password: {
        type: "password",
        description: "Password of User",
        example: "123456",
      },
      email: {
        type: "string",
        description: "Email of User",
        example: "mohit@statwig.com",
      },
      name: {
        type: "string",
        description: "User Name",
        example: "mohit_statwig",
      },
      otp: {
        type: "string",
        description: "One Time Password",
        example: "8723",
      },
      role: {
        type: "string",
        description: "Role of User",
        example: "admin",
      },
      organization: {
        type: "string",
        description: "Organisation of User",
        example: "STATWIG",
      },
      affiliateOrganisation: {
        type: "string",
        description: "Affiliate Organisation of User",
        example: "ABC123",
      },
      phone: {
        type: "string",
        description: "Phone Number of User",
        example: "9003635098",
      },
      User: {
        type: "object",
        properties: {
          firstName: {
            $ref: "#/components/schemas/firstName",
          },
          lastName: {
            $ref: "#/components/schemas/lastName",
          },
          password: {
            $ref: "#/components/schemas/password",
          },
          email: {
            $ref: "#/components/schemas/email",
          },
          name: {
            $ref: "#/components/schemas/name",
          },
          otp: {
            $ref: "#/components/schemas/otp",
          },
          role: {
            $ref: "#/components/schemas/role",
          },
          organization: {
            $ref: "#/components/schemas/organization",
          },
          affiliateOrganisation: {
            $ref: "#/components/schemas/affiliateOrganisation",
          },
          phone: {
            $ref: "#/components/schemas/phone",
          },
        },
      },
      Users: {
        type: "object",
        properties: {
          users: {
            type: "array",
            items: {
              $ref: "#/components/schemas/User",
            },
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
