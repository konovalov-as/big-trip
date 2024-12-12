import type { AlternativeValidationError, ValidationError } from 'express-validator';
import { HttpStatusCodes } from '@utils/const';
import { logger } from '@globals/logger';
import * as console from "console";

class ApiError extends Error {
  statusCode: number;
  errors: (ValidationError | AlternativeValidationError)[];

  constructor(statusCode: number, message: string, errors: (ValidationError | AlternativeValidationError)[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static BadRequest(message: string, errors: (ValidationError | AlternativeValidationError)[] = []) {
    return new ApiError(HttpStatusCodes.BAD_REQUEST, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(HttpStatusCodes.UNAUTHORIZED, 'Header Authorization is not found');
  }

  static Forbidden() {
    return new ApiError(HttpStatusCodes.FORBIDDEN, 'Access is denied')
  }

  static NotFound(message: string, errors: (ValidationError | AlternativeValidationError)[] = []) {
    return new ApiError(HttpStatusCodes.NOT_FOUND, message, errors);
  }

  static InternalServerError(message: string, errors: (ValidationError | AlternativeValidationError)[] = []) {
    console.log(message, 'Internal Server Error, ApiError exception')
    logger.error(message, 'Internal Server Error, ApiError exception');
    return new ApiError(HttpStatusCodes.INTERNAL_SERVER, message, errors);
  }
}

export {
  ApiError,
};
