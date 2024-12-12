interface IUserDto {
  email: string,
  password: string,
  confirmedPassword: string,
  username?: string,
}

interface IUserPayload {
  id: string,
  email: string,
  isActivated: boolean,
  username?: string,
  iat?: number,
  exp?: number,
}

interface IUser {
  // id: string;
  email: string,
  username: string,
  passwordHash: string,
  isLocked: boolean,
  isActivated: boolean,
  activationLink: string,
  resetLink: string,
  roles: string[],
}

type TgReCaptchaToken = string;

interface IVerifyReCaptchaResponse {
  success: boolean,
  challenge_ts: string,
  hostname: string,
  score: number,
  action: string,
  'error-codes': string[],
}

export {
  IUserDto,
  IUserPayload,
  IUser,
  TgReCaptchaToken,
  IVerifyReCaptchaResponse,
};

// const userDto: IUserDto = {
//   email: '',
//   password: '',
//   confirmedPassword: '',
// }