// const { USER_TYPES, REGULAR } = require('./config/constants');

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'LastMile',
    description: 'Last Mile Service API',
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
      url: 'http://localhost:3002',
      description: 'Local server'
    },
    {
      url: 'http://test.vaccineledger.com:9001',
      description: 'Testing server'
    },
    {
      url: 'http://api.vaccineledger.com:9001',
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
    
  },
  components: {
      schemas: {
        
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    }
  };
