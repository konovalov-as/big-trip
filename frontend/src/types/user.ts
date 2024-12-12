interface IgReCaptchaToken {
  gReCaptchaToken: string,
}

interface IRegistrationInfo extends IgReCaptchaToken {
  email: string,
  password: string,
  confirmedPassword: string,
}

type TActivationInfo = string;

interface ILoginInfo extends IgReCaptchaToken {
  email: string,
  password: string,
}

interface IRecoveryPasswordInfo extends IgReCaptchaToken {
  email: string;
}

interface INewPasswordInfo extends IgReCaptchaToken {
  resetLink: string,
  password: string,
  confirmedPassword: string,
}

interface IUserInfo {
  email: string,
  id: string,
  isLocked: boolean,
  isActivated: boolean,
  roles: string[],
}

interface IUserAuthResponse {
  tokens: {
    accessToken: string,
    refreshToken: string,
  },
  userPayload: IUserInfo,
}

interface IUserActionsResponse {
  status: string;
  message: string;
}

interface ILogoutResponse {
  acknowledged: boolean,
  deletedCount: number,
}

interface IUser {
  id: string;
  email: string,
  username: string,
  passwordHash: string,
  isLocked: boolean,
  isActivated: boolean,
  activationLink: string,
  resetLink: string,
  roles: string[],
}

export {
  type IRegistrationInfo,
  type TActivationInfo,
  type ILoginInfo,
  type IRecoveryPasswordInfo,
  type INewPasswordInfo,
  type IUserInfo,
  type IUserAuthResponse,
  type IUserActionsResponse,
  type ILogoutResponse,
  type IUser,
};
