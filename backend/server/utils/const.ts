const ALLOW_FILE_EXTENSION: string[] = ['.png', '.jpg', '.jpeg', '.svg'];
const FILE_SIZE_LIMIT_MB: number = 5; // 5 MB
const FILE_SIZE_COEFFICIENT: number = 1024 // MB;
const PARENT_PATH_FILES: string[] = ['uploads', 'images'];
const API_PREFIX: string = `/api`;
const MIN_LENGTH_PASSWORD: number = 6;
const MAX_LENGTH_PASSWORD: number = 20;
const ACCESS_EXPIRES_IN: number = 15 * 60 * 1000; // minutes * seconds * ms
const REFRESH_EXPIRES_IN: number = 30 * 24 * 60 * 60 * 1000; // days * hours * minutes * seconds * ms
const REFRESH_TOKEN_NAME: string = 'refreshToken';
const validationMessage: string = 'Validation errors';
const saltOrRounds: number = 10;

const googleAPIUrl: string = 'https://www.google.com/recaptcha/api/siteverify';

const Environment = {
  development: 'development',
  production: 'production',
}

const AppRoute = {
  points: '/points',
  offers: '/offers',
  offerTypes: '/offer-types',
  cities: '/cities',
  destination: '/destinations',
  uploadFiles: '/upload-files',
  uploadMulter: '/upload-multer',
  user: '/user',
  registration: '/registration',
  login: '/login',
  logout: '/logout',
  auth: '/auth',
  activation: '/activation',
  refresh: '/refresh',
  checkAuth: '/check-auth',
  recoveryPassword: '/recovery-password',
  setNewPassword: '/set-new-password',
  users: '/users',
  lockUser: '/lock-user',
  swagger: '/swagger',
  swaggerJson: '/swagger-json',
  healthCheck: '/health-check',
  static: '/static',
};

const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONTENT_TOO_LARGE: 413,
  UNPROCESSABLE_CONTENT: 422,
  INTERNAL_SERVER: 500
 }

const HttpMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
  OPTIONS: `OPTIONS`,
};

const ResponseStatus = {
  commonError: 'Common error',
  clientError: 'Client error',
  serverError: 'Server error',
  success: 'Success',
};

const ResponseMessage = {
  destination: 'Destination is not found',
};

const ExitCode = {
  error: 1,
  success: 0,
};

export {
  ALLOW_FILE_EXTENSION,
  FILE_SIZE_LIMIT_MB,
  FILE_SIZE_COEFFICIENT,
  PARENT_PATH_FILES,
  API_PREFIX,
  MIN_LENGTH_PASSWORD,
  MAX_LENGTH_PASSWORD,
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
  REFRESH_TOKEN_NAME,
  validationMessage,
  saltOrRounds,
  googleAPIUrl,
  Environment,
  AppRoute,
  HttpStatusCodes,
  HttpMethod,
  ResponseStatus,
  ExitCode,
};
