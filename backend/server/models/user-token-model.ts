import { IRefreshToken } from '@custom-types/user-token';
import { Schema, model } from 'mongoose';

const TokenSchema = new Schema<IRefreshToken>({
   user: {
    type: Schema.Types.ObjectId, ref: 'User',
   },
   refreshToken: {
    type: String,
    required: true,
   },  
});

const TokenModel = model('Token', TokenSchema);

export {
  TokenModel,
}
