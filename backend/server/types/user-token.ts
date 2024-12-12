import { Schema } from 'mongoose';

interface IPairTokens {
  accessToken: string,
  refreshToken: string,
}

interface IRefreshToken {
  user: Schema.Types.ObjectId,
  refreshToken: string,
}

export {
  IPairTokens,
  IRefreshToken,
};
