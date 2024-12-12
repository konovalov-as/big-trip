import {IUserInfo, TToken} from '../types';
const AUTH_TOKEN_KEY_NAME: string = 'big-trip-token';
const USER_INFO_KEY_NAME: string = 'big-trip-user-info';

const getToken = (): TToken => {
  const token: string | null = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

const saveToken = (token: TToken): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

const getUserInfo = (): IUserInfo => {
  const emptyUserInfo: IUserInfo = {
    email: '',
    roles: [],
    id: '',
    isActivated: false,
    isLocked: false,
  };
  const userInfo: IUserInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY_NAME) || JSON.stringify(emptyUserInfo));
  // // return userInfo ?? '';
  // console.log(localStorage.getItem(USER_INFO_KEY_NAME))
  return userInfo;
};

const saveUserInfo = (userInfo: IUserInfo): void => {
  localStorage.setItem(USER_INFO_KEY_NAME, JSON.stringify(userInfo));
};

const dropUserInfo = (): void => {
  localStorage.removeItem(USER_INFO_KEY_NAME);
};

export {
  getToken,
  saveToken,
  dropToken,
  getUserInfo,
  saveUserInfo,
  dropUserInfo,
};
