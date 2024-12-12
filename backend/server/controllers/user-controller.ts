import { Request, Response, NextFunction } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { ApiError } from '@exceptions/api-error';
import { userService } from '@services/user-service';
import { CLIENT_HOST } from '@config/client';
import { REFRESH_EXPIRES_IN, REFRESH_TOKEN_NAME, ResponseStatus, validationMessage} from '@utils/const';
import {IUser} from "@custom-types/user";
import * as console from "node:console";

class UserController {
  async registration(request: Request, response: Response, next: NextFunction) {
    try {
      const errors: Result<ValidationError> = validationResult(request);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest(validationMessage, errors.array()));
      }

      const { email, password, username } : { email: string, password: string, username: string } = request.body;
      const userData = await userService.registration(email, password, username);
      response.cookie(REFRESH_TOKEN_NAME, userData.tokens.refreshToken, { maxAge: REFRESH_EXPIRES_IN, httpOnly: true})
      return response.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async activate(request: Request, response: Response, next: NextFunction) {
    try {
      const activationLink: string = request.params.link;
      await userService.activation(activationLink);
      if (!CLIENT_HOST) {
        return next(ApiError.InternalServerError('Not Found Client Host'));
      }
      return response.json({status: ResponseStatus.success, message: 'Activation is successful'});
    } catch (error) {
      next(error);
    }
  }
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const errors: Result<ValidationError> = validationResult(request);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest(validationMessage, errors.array()));
      }

      const email: string = request.body.email;
      const password: string = request.body.password;
      const userData = await userService.login(email, password);
      response.cookie(REFRESH_TOKEN_NAME, userData.tokens.refreshToken, { maxAge: REFRESH_EXPIRES_IN, httpOnly: true})
      return response.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(request: Request, response: Response, next: NextFunction) {
    try {
      const refreshToken: string = request.cookies.refreshToken;
      const token = await userService.logout(refreshToken);
      response.clearCookie(REFRESH_TOKEN_NAME);
      return response.json(token);
    } catch (error) {
      next(error);
    }
  }
  async refresh(request: Request, response: Response, next: NextFunction) {
    try {
      const refreshToken: string = request.cookies.refreshToken;
      const userData = await userService.refresh(refreshToken);
      response.cookie(REFRESH_TOKEN_NAME, userData.tokens.refreshToken, { maxAge: REFRESH_EXPIRES_IN, httpOnly: true});
      return response.json(userData);
    } catch (error) {
      response.clearCookie(REFRESH_TOKEN_NAME);
      next(error);
    }
  }
  async recoveryPassword(request: Request, response: Response, next: NextFunction) {
    try {
      const errors: Result<ValidationError> = validationResult(request);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest(validationMessage, errors.array()));
      }
      const email: string = request.body.email;
      await userService.recoveryPassword(email);
      return response.json({ status: ResponseStatus.success, message: 'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.' })
    } catch (error) {
      next(error);
    }
  }
  async setNewPassword(request: Request, response: Response, next: NextFunction) {
    try {
      const errors: Result<ValidationError> = validationResult(request);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest(validationMessage, errors.array()));
      }
      
      const resetLink: string = request.body.resetLink;
      const password: string = request.body.password;
  
      await userService.setNewPassword(resetLink, password);
  
      response.clearCookie(REFRESH_TOKEN_NAME);
      return response.json({ status: ResponseStatus.success, message: 'You have just successfully changed your password'});
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(_request: Request, response: Response, next: NextFunction) {
    try {
      const allUsers: IUser[] = await userService.getAllUsers();
      return response.json(allUsers);
    } catch (error) {
      next(error);
    }
  }

  async lockOneUser(request: Request, response: Response, next: NextFunction) {
    try {
      const id: string = request.params.id;
      const changedOneUser: IUser = await userService.lockOneUser(id);
      response.json(changedOneUser);
    } catch (errorr) {
      next(errorr);
    }
  }

}

const userController = new UserController();

export {
  userController,
};
