import {NextFunction, Request, Response} from 'express';
import {ApiError} from '@exceptions/api-error';
import {userService} from '@services/user-service';
import {HttpMethod, HttpStatusCodes, ResponseStatus} from '@utils/const';
import {TgReCaptchaToken} from '@custom-types/user';
import {logger} from '@globals/logger';

interface IErrorMessages {
  gToken: string,
  human: string,
}

const errorMessages: IErrorMessages = {
  gToken: 'Invalid recaptcha site key',
  human: 'Google ReCaptcha Failure',
};

const gReCaptchaMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  try {
    if (request.method === HttpMethod.OPTIONS) {
      next();
    }

    const { gReCaptchaToken } : { gReCaptchaToken: TgReCaptchaToken } = request.body;

    if (!gReCaptchaToken) {
      return next(ApiError.BadRequest(errorMessages.gToken));
    }

    const isHuman: boolean = await userService.verifyReCaptcha(gReCaptchaToken);
    if (!isHuman) {
      return response.status(HttpStatusCodes.BAD_REQUEST).json({ status: ResponseStatus.clientError, message: errorMessages.human });
    }

    next();
  } catch (error) {
    logger.error(error, 'google recaptcha middleware');
    return next(ApiError.BadRequest(`${error}`));
  }
}

export {
  gReCaptchaMiddleware,
};
