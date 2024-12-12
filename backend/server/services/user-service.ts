import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {HOST, RECAPTCHA_SECRET_KEY} from '@config/app';
import {AppRoute, saltOrRounds} from '@utils/const';
import { CLIENT_HOST } from '@config/client';
import { ApiError } from '@exceptions/api-error';
import {
  IUser,
  IUserPayload,
  IVerifyReCaptchaResponse, TgReCaptchaToken,
} from '@custom-types/user';
import { IPairTokens } from '@custom-types/user-token';
import { mailService } from '@services/mail-service';
import { tokenService } from '@services/token-service';
import { UserDto } from '@dtos/user-dto';
import { UserModel } from '@models/user-model';
import { TokenModel } from '@models/user-token-model';
import {createAPI} from '@services/grecaptcha-api-service';
import {logger} from '@globals/logger';
import {AxiosInstance} from 'axios';
import * as console from "node:console";

class UserService {
  async registration(email: string, password: string, username: string) {
    const candidate: IUser | null = await UserModel.findOne({email});
    if (candidate) {
      throw ApiError.BadRequest(`User with this email ${email} already exists`);
    }

    const passwordHash: string = await bcrypt.hash(password, saltOrRounds);
    const activationLink: string = uuidv4();
    const roles: string[] = ['user'] ;
    const user = await UserModel.create({email, passwordHash, activationLink, username, roles});

    const absoluteActivationLink: string = `${CLIENT_HOST}${AppRoute.auth}${AppRoute.activation}/${activationLink}`;
    const mailSubject: string = `Activation an account on ${HOST}`;
    const mailHtml: string = `
      <div>
        <h1>For activation click on the link</h1>
        <a href="${absoluteActivationLink}">${absoluteActivationLink}</a>
      </div>
    `
    await mailService.sendActivationMail(email, mailSubject, mailHtml);
    
    // const userPayload: IUserPayload = {
      //   email,
      //   id: user._id.toString(),
      //   isActivated: user.isActivated,
      //   username: user.username,
      // }
      
    const userPayload: IUserPayload = new UserDto(user);
    const tokens: IPairTokens = tokenService.generateToken({...userPayload});
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      tokens,
      userPayload,
    }
  }
  async activation(activationLink: string) {
    const user = await UserModel.findOne({activationLink});
    if (!user) {
      throw ApiError.BadRequest('Activation link is not valid');
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email: string, password: string) {
    const user = await UserModel.findOne({email});
    if (!user) {
      throw ApiError.BadRequest('Email or password are wrong')
    }
    const isPasswordEquals: boolean = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordEquals) {
      throw ApiError.BadRequest('Email or password are wrong');
    }
    if (!user.isActivated || user.isLocked) {
      throw ApiError.BadRequest('Your account is not activated or locked')
    }

    // const userPayload: IUserPayload = {
    //   email,
    //   id: user.id,
    //   isActivated: user.isActivated,
    //   username: user.username,
    // }
    const userPayload: IUserPayload = new UserDto(user);
    const tokens: IPairTokens = tokenService.generateToken({...userPayload});
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      tokens,
      userPayload,
    }
  }
  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    
    const userData: any = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    
    if (!user || !user.isActivated) {
      throw ApiError.UnauthorizedError();
    }

    const userPayload: IUserPayload = new UserDto(user);
    const tokens: IPairTokens = tokenService.generateToken({...userPayload});
    await tokenService.saveToken(user.id, tokens.refreshToken);
    
    return {
      tokens,
      userPayload,
    }
  }
  async recoveryPassword(email: string) {
    const candidate = await UserModel.findOne({email});
    if (!candidate) {
      throw ApiError.BadRequest('Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.');
    }
    
    const resetLink: string = uuidv4();
    candidate.resetLink = resetLink;
    await candidate.save();

    const absoluteResetLink: string = `${CLIENT_HOST}${AppRoute.recoveryPassword}/${resetLink}`;
    const mailSubject: string = `Reset password an account on ${HOST}`;
    const mailHtml: string = `
      <div>
        <h1>For reset password click on the link</h1>
        <a href="${absoluteResetLink}">${absoluteResetLink}</a>
      </div>
    `
    await mailService.sendActivationMail(email, mailSubject, mailHtml);
  }
  async setNewPassword(resetLink: string, password: string) {
    const candidate = await UserModel.findOne({resetLink});

    if (!candidate) {
      throw ApiError.BadRequest(`This reset link is not valid. Please try on more time`);
    }

    if (!candidate.isActivated) {
      throw ApiError.BadRequest('Your account is not activated')
    }

    const passwordHash: string = await bcrypt.hash(password, saltOrRounds);
    candidate.passwordHash = passwordHash;
    await candidate.save();

    const token = await TokenModel.findOne({user: candidate.id});

    if (token) {
      await this.logout(token.refreshToken);
    }
  }

  async verifyReCaptcha(gReCaptchaToken: TgReCaptchaToken): Promise<boolean> {
    const api: AxiosInstance = createAPI();

    const { data } = await api.post<IVerifyReCaptchaResponse>('', `secret=${RECAPTCHA_SECRET_KEY}&response=${gReCaptchaToken}`);

    if (!data.success) {
      logger.error(data['error-codes'].join('. '))
      throw ApiError.InternalServerError('Invalid secret key');
    }

    if (data.success && data.score > 0.5) {
      return true;
    }
    return false;
  }

  async getAllUsers(): Promise<IUser[]> {
    return UserModel.find();
  }

  async getOneUser(id: string): Promise<IUser> {
    const oneUser: IUser | null = await UserModel.findById(id);
    if (!oneUser) {
      throw ApiError.BadRequest('User is not found');
    }
    return oneUser;
  }

  async lockOneUser(id: string): Promise<IUser> {
    const oneUser: IUser = await this.getOneUser(id);
    const updatedUser: IUser = {
      isLocked: !oneUser.isLocked,
      isActivated: oneUser.isActivated,
      email: oneUser.email,
      username: oneUser.username,
      passwordHash: oneUser.passwordHash,
      roles: oneUser.roles,
      activationLink: oneUser.activationLink,
      resetLink: oneUser.resetLink,
    }
    await UserModel.findByIdAndUpdate(id, updatedUser);
    return await this.getOneUser(id);
  }
}

const userService: UserService = new UserService();

export {
  userService,
}