import { IUser } from '@custom-types/user';
import { Document, Types } from 'mongoose';

class UserDto {
  id: string;
  email: string;
  isActivated: boolean;
  username: string;
  roles: string[];

  constructor(model: Document<unknown, {}, IUser> & IUser & {_id: Types.ObjectId;}){
    this.id = model._id.toString();
    this.email = model.email;
    this.isActivated = model.isActivated;
    this.username = model.username;
    this.roles = model.roles;
  }
}

export {
  UserDto,
}