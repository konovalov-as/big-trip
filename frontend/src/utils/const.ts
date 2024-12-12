import {IUserInfo} from '../types';

const DAY_FORMAT: string = 'MMM DD';
const MACHINE_DAY_FORMAT: string = 'YYYY-MM-DD';
const DAY_MONTH_FORMAT: string = 'D MMM';
const TIME_FORMAT: string = 'HH:mm';
const MACHINE_TIME_FORMAT: string = 'YYYY-MM-DDTHH:mm';
const TIME_DAY_FORMAT: string = 'DD/MM/YY HH:mm';
const REG_EXP_EMAIL: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
const MAX_POINTS: number = 3;

const defaultUserInfo: IUserInfo = {
  id: '',
  isLocked: false,
  isActivated: false,
  email: '',
  roles: [],
};

enum PointsCount {
  One = 1,
  Two = 2,
  Three = 3,
}

enum AppRoute {
  Main = '/',
  Favorites = '/favorites',
  Offer = '/offer',
  Auth = '/auth',
  Signup = 'signup',
  Activation = 'activation',
  Login = 'login',
  RecoveryPassword = 'recovery-password',
  Forbidden = '/forbidden',
  NetworkError = '/network-error',
  System = '/system',
  Types = 'types',
  Offers = 'offers',
  Cities = 'cities',
  Destinations= 'destinations',
  Users = 'users',
  Files = 'files',
  NotFound = '*',
}

enum APIRoute {
  Points = '/points',
  Cities = '/cities',
  Destinations = '/destinations',
  OfferTypes = '/offer-types',
  Offers = '/offers',
  UploadFiles= '/upload-multer',
  Registration = '/registration',
  Activation = '/activation',
  Login = '/login',
  Refresh = '/refresh',
  Logout = '/logout',
  RecoveryPassword = '/recovery-password',
  SetNewPassword = '/set-new-password',
  VerifyCaptcha = '/verify-captcha',
  Users = '/users',
  LockUser = 'lock-user',
  Offer = '/offers/{offerId}',
  Nearby = '/offers/{offerId}/nearby',
  Favorite = '/favorite',
  FavoriteStatus = '/favorite/{offerId}/{status}',
  Review = '/comments/{offerId}',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum NameSpace {
  Points = 'POINTS',
  Destinations = 'DESTINATIONS',
  Offers = 'OFFERS',
  Offer = 'OFFER',
  Favorite = 'FAVORITE',
  User = 'USER',
  Data = 'DATA',
  App = 'APP',
  UploadFiles = 'UPLOAD_FILES',
}

const SortingTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

enum FilterTypes {
  Everything = 'EVERYTHING',
  Future = 'FUTURE',
  Present = 'PRESENT',
  Past = 'PAST',
  Favorite = 'FAVORITE',
}

const EventMessage = {
  everything: 'Click New Event to create your first point',
  favorite: 'There are no favorite events now',
  future: 'There are no future events now',
  present: 'There are no present events now',
  past: 'There are no past events now',
};

const ClientErrorCode = {
  duplicateKey: 11000,
};

const Roles = {
  admin: 'admin',
  user: 'user',
  manager: 'manager',
}

const KEY_FOR_DELETE_PICTURE_DESCRIPTION: string = 'DELETE_PICTURE_DESCRIPTION';

export {
  DAY_FORMAT,
  MACHINE_DAY_FORMAT,
  DAY_MONTH_FORMAT,
  TIME_FORMAT,
  MACHINE_TIME_FORMAT,
  TIME_DAY_FORMAT,
  REG_EXP_EMAIL,
  MAX_POINTS,
  defaultUserInfo,
  PointsCount,
  AppRoute,
  APIRoute,
  AuthorizationStatus,
  NameSpace,
  SortingTypes,
  FilterTypes,
  EventMessage,
  ClientErrorCode,
  Roles,
  KEY_FOR_DELETE_PICTURE_DESCRIPTION,
};
