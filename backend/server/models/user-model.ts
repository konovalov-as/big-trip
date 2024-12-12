import { IUser, IUserDto } from '@custom-types/user';
import { Schema, model } from 'mongoose';
import { transformResponsePlugin } from './transform-response';

const UserSchema = new Schema<IUser>({
  // id: {
  //   type: String,
  // },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    trim: true,
    minLength: [2, 'Too few a username'],
    maxLength: [50, 'Too large a username'],
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  activationLink: {
    type: String,
    unique: true,
    required: true,
  },
  resetLink: {
    type: String,
    default: '',
    // unique: true,
  },
  roles: {
    type: [String],
    required: true,
    // default: ['user'],
  },
})
UserSchema.plugin(transformResponsePlugin);

const UserModel = model('User', UserSchema);

export {
  UserModel,
}
