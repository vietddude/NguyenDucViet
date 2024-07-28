import config from '../config/config';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: '99Tech Transaction API documentation',
    version: '1.0',
    description: 'API documentation for 99Tech Problem 5 Transaction API',
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef;
