// const { USER_TYPES, REGULAR } = require('./config/constants');

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Track And Trace',
    description: 'Track And Trace Service API',
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
      url: 'http://localhost:3005/',
      description: 'Local server'
    },
    {
      url: 'https://test.vaccineledger.com:3005/',
      description: 'Testing server'
    },
    {
      url: 'https://vaccineledger.com:3005/',
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
    '/tracktracemanagement/api/track/track?trackingNumber=SHP2278': {
      get: {
        tags: ['CRUD operations'],
        description: 'Track using Tracking Number',
        operationId: 'track',
        parameters: [],
        responses: {
          '200': {
            description: 'Got the tracking Details Successfully',
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
                  message: 'Tracking Number is missing',
                  internal_code: 'missing_parameters'
                }
              }
            }
          }
        }
      }
    }, 
    '/tracktracemanagement/api/track/fetchTemp': {
      get: {
        tags: ['CRUD operations'],
        description: 'Fetch Random Temperature Data Points',
        operationId: 'fetchTemp',
        parameters: [],
        responses: {
          '200': {
            description: 'Fetched Random Temperature Data Points Successfully',
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
                  message: 'Could not Fetch Temperature Data',
                  internal_code: 'missing_parameters'
                }
              }
            }
          }
        }
      }
    }
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