// const { USER_TYPES, REGULAR } = require('./config/constants');

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Product',
    description: 'Product Service API',
    termsOfService: 'http://api_url/terms/',
    contact: {
      name: 'StaTwig',
      email: 'dev@statwig.com',
      url: 'https://statwig.com/'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:3010/',
      description: 'Local server'
    },
    {
      url: 'https://test.vaccineledger.com:3010/',
      description: 'Testing server'
    },
    {
      url: 'https://vaccineledger.com:3010/',
      description: 'Production server'
    }
  ],
  security: [
    {
      BearerAuth: []
    }
  ],
  tags: [
    {
      name: 'CRUD operations'
    }
  ],
  paths: {
    '/productmanagement/api/products/getProducts': {
      get: {
        tags: ['CRUD operations'],
        description: 'GET Products',
        operationId: 'getProducts',
        parameters: [],
        responses: {
          '200': {
            description: 'Found the Products Successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: ''
                }
              }
            }
          },
          '400': {
            description: 'Missing parameters',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  message: 'Product Names are missing',
                  internal_code: 'missing_parameters'
                }
              }
            }
          }
        }
      }
    }, 
  },
  components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            },
            internal_code: {
              type: 'string'
            }
          }
        }
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    }
  };