import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import mongoose, { MongooseError } from 'mongoose';
import multer from 'multer';
import { ApiError } from '@exceptions/api-error';
import { HttpStatusCodes, ResponseStatus } from '@utils/const';
import { logger } from '@globals/logger';
import * as console from "console";

const handleError = (error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    return response.status(error.statusCode).json({ status: ResponseStatus.clientError, message: error.message, errors: error.errors, });
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return response.status(HttpStatusCodes.BAD_REQUEST).json({ status: ResponseStatus.clientError, message: error.message, errors: error.errors, })
  }
  
  if (error instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    if (error.code === 'LIMIT_FILE_SIZE') {
      return response.status(HttpStatusCodes.BAD_REQUEST).json({
        status: ResponseStatus.clientError,
        message: "File is too large",
        error,
      });
    }

    if (error.code === 'LIMIT_FILE_COUNT') {
      return response.status(HttpStatusCodes.BAD_REQUEST).json({
        status: ResponseStatus.clientError,
        message: "File limit reached",
        error,
      });
    }

    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return response.status(HttpStatusCodes.BAD_REQUEST).json({
        status: ResponseStatus.clientError,
        message: "File must be an image",
        error
      });
    }

    return response.status(HttpStatusCodes.BAD_REQUEST).json({ status: ResponseStatus.clientError, message: 'upload-error-multer', errors: error});
  }

  
  if (error instanceof Error) {
    return response.status(HttpStatusCodes.BAD_REQUEST).json({ status: ResponseStatus.clientError, message: error.message, errors: error, })
  }

  logger.error(error, 'Internal Server Error, error middleware');
  console.log('111111 Internal Server Error, error middleware', error);
  return response.status(HttpStatusCodes.INTERNAL_SERVER).json({ status: ResponseStatus.serverError, message: 'Anyone call to admin!', errors: error });
}

export {
  handleError,
};
