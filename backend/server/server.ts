import { config } from 'dotenv';
config();

import 'module-alias/register';
import express, {Express, NextFunction, request, Request, response, Response,} from 'express';

import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';

import routes from '@routes/index';
import { connectToDb } from '@globals/mongoose';
import { logger, loggerHttp } from '@globals/logger';

import {NODE_ENV, PORT, ACCESS_SECRET_KEY, RECAPTCHA_SECRET_KEY} from '@config/app';
import { CLIENT_HOST } from '@config/client';

import { handleError } from '@middleware/error-middleware';
import { authMiddleware } from '@middleware/auth-middleware';

import swaggerDocs from '@utils/swagger';
import { API_PREFIX, AppRoute, Environment, ExitCode, HttpStatusCodes, PARENT_PATH_FILES, ResponseStatus } from '@utils/const';

// add custom basic-authorization header
declare module 'http' {
  interface IncomingHttpHeaders {
      'basic-authorization'?: string;
  }
}

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// allow cors
app.use(cors({
  origin: [CLIENT_HOST ? CLIENT_HOST : '', 'http://api:9000'],
  credentials: true,
}));

// add logger
loggerHttp(app);

// swagger is development mode
if (NODE_ENV && NODE_ENV === Environment.development) {
  swaggerDocs(app);
}

// serve static
app.use(AppRoute.static, express.static(path.resolve(__dirname, '..', ...PARENT_PATH_FILES)));
app.use(AppRoute.static, express.static(path.resolve(__dirname, '..', ...['uploads', 'multer'])));

// fileUpload
// app.use(fileUpload({createParentPath: true, }));

// register all routes
app.use(API_PREFIX, authMiddleware, routes);

// Global error handler
app.use(handleError);

// Wrong path handler
app.use((request: Request, response: Response) => {
  const error = new Error(`Path ${request.originalUrl} does not exist for ${request.method} method`);
  
  return response.status(HttpStatusCodes.NOT_FOUND).json({
    status: ResponseStatus.commonError,
    message: error.message,
  });
});

// start server
const server = app.listen(PORT, () => {
  logger.info(`🚀 API server alive and kicking on port ${PORT}`);
  console.log(`🚀 API server alive and kicking on port ${PORT}`);
});

// Catch All Uncaught Exceptions
process.on("uncaughtException", (error: Error) => {
  logger.fatal(error, 'Uncaught Exception');
  logger.info('Closing server now...', error.message);
  console.log('Uncaught Exception', error);
  process.exit(ExitCode.error);
});

process.on("unhandledRejection", (error: Error) => {
  logger.fatal(error, 'Uncaught Exception');
  logger.info('Closing server now...', error.message);
  console.log('Uncaught Exception', error);

  server.close(() => {
    process.exit(ExitCode.error);
  });
});

const asyncConnectToDb = async () => {
  await connectToDb();
};

asyncConnectToDb();
