import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';
import { API_PREFIX, AppRoute } from './const';
import { HOST } from '@config/app';
import {CLIENT_HOST} from "@config/client";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Description API for Big-trip project',
      version,
      description: 'This is a REST API application made with Express. It provides data for Big-trip project.',
      contact: {
        name: 'Big-trip',
        url: 'https://github.com/konovalov-as',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        BasicAuthorization: {
          type: 'apiKey',
          name: 'Basic-Authorization',
          in: 'header',
          description: 'The token for authentication. For example: Basic qwerty1234',
        }
      },
    },
    security: [
      {
        // bearerAuth: [],
        BasicAuthorization: [],
      },
    ],
    servers: [
      {
        url: `${CLIENT_HOST}${API_PREFIX}`,
        description: 'Development server',
      },
    ],
  },
  apis: [ './server/routes/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
  // Swagger page
  app.use(AppRoute.swagger, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get(AppRoute.swaggerJson, (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;