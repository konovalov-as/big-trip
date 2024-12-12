import jwt from 'jsonwebtoken';
import { logger } from '@globals/logger';
import { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } from '@config/app';
import { ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN } from '@utils/const';
import { IUserPayload } from '@custom-types/user';
import { TokenModel } from '@models/user-token-model';
import * as console from "console";


class TokenService {
  generateToken(payload: IUserPayload) {
    if (!ACCESS_SECRET_KEY) {
      throw new Error('No a secret access key');
    }

    if (!REFRESH_SECRET_KEY) {
      throw new Error('No a secret refresh key');
    }

    const accessToken: string = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: `${ACCESS_EXPIRES_IN}` });
    const refreshToken: string = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: `${REFRESH_EXPIRES_IN}` });

    return {
      accessToken,
      refreshToken,
    }
  }
  validateAccessToken(token: string) {
    try {
      if (!ACCESS_SECRET_KEY) {
        throw new Error('No a secret access key');
      }
  
      const userData = jwt.verify(token, ACCESS_SECRET_KEY);
      return userData;
    } catch (error) {
      logger.error(error, 'Error of validate access token');
      return null;
    }
  }
  validateRefreshToken(token: string) {
    try {
      if (!REFRESH_SECRET_KEY) {
        throw new Error('No a secret refresh key');
      }
      
      const userData = jwt.verify(token, REFRESH_SECRET_KEY);
      return userData;
    } catch (error) {
      logger.error(error, 'Error of validate refresh token');
      return null;
    }
  }
  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await TokenModel.findOne({user: userId});
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({user: userId, refreshToken});
    return token;
  }
  async removeToken(refreshToken: string) {
    const tokenData = await TokenModel.deleteOne({refreshToken});
    return tokenData;
  }
  async findToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({refreshToken})
    return tokenData;
  }
}

const tokenService = new TokenService();

export {
  tokenService,
}