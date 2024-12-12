import {toast} from 'react-toastify';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {browserHistory} from '../../browser-history.ts';
import {
  requireAuthorization,
  setIsAuth,
  setRegistrationSuccess,
  setUser,
  updateUsers
} from '../../store';
import {
  TThunkApiConfig,
  ILoginInfo,
  ILogoutResponse,
  INewPasswordInfo,
  IRecoveryPasswordInfo,
  IRegistrationInfo,
  IUserActionsResponse,
  IUserAuthResponse,
  TActivationInfo,
  IUser,
} from '../../types';
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  defaultUserInfo,
  NameSpace,
} from '../../utils';
import {dropToken, dropUserInfo, saveToken, saveUserInfo} from '../../services/token.ts';
import {dropIsAllowedRoute} from '../../components';

const registration = createAsyncThunk<IUserAuthResponse, IRegistrationInfo, TThunkApiConfig>(
  `${NameSpace.User}/registration`,
  async (registrationInfo: IRegistrationInfo, { extra: api, dispatch}) => {
    try {
      const { data } = await api.post<IUserAuthResponse>(APIRoute.Registration, registrationInfo);
      dispatch(setRegistrationSuccess(true));
      return data;
    } catch (error) {
      dispatch(setRegistrationSuccess(false));
      throw error;
    }
  },
);

const activation = createAsyncThunk<IUserActionsResponse, TActivationInfo, TThunkApiConfig>(
  `${NameSpace.User}/activation`,
  async (activationLink: TActivationInfo, { extra: api }) => {
    const { data } = await api.get<IUserActionsResponse>(`${APIRoute.Activation}/${activationLink}`);
    browserHistory.push(AppRoute.Main)
    return data;
  },
);

const login = createAsyncThunk<IUserAuthResponse, ILoginInfo, TThunkApiConfig>(
  `${NameSpace.User}/login`,
  async (loginInfo: ILoginInfo, { extra: api, dispatch }) => {
    const { data } = await api.post<IUserAuthResponse>(APIRoute.Login, loginInfo);
    saveToken(data.tokens.accessToken);
    saveUserInfo(data.userPayload);
    dispatch(setIsAuth(true));
    dispatch(setUser(data.userPayload))
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    browserHistory.push(AppRoute.Main);
    return data;
  },
);

const logout = createAsyncThunk<ILogoutResponse, undefined, TThunkApiConfig>(
  `${NameSpace.User}/logout`,
  async (_arg, { extra: api, dispatch }) => {
    const { data } = await api.post<ILogoutResponse>(APIRoute.Logout);
    if (data.acknowledged && data.deletedCount > 0) {
      dropToken();
      dropUserInfo();
      dispatch(setIsAuth(false));
      dispatch(setUser(defaultUserInfo));
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));

      dropIsAllowedRoute();
      browserHistory.push(AppRoute.Main);
    } else {
      console.log('Error of logout')
    }
    return data;
  },
);

const recoveryPassword = createAsyncThunk<IUserActionsResponse, IRecoveryPasswordInfo, TThunkApiConfig>(
  `${NameSpace.User}/recoveryPassword`,
  async (recoveryPasswordInfo: IRecoveryPasswordInfo, { extra: api, dispatch}) => {
    try {
      const { data } = await api.post<IUserActionsResponse>(APIRoute.RecoveryPassword, recoveryPasswordInfo);
      dispatch(setRegistrationSuccess(true));
      return data;
    } catch (error) {
      dispatch(setRegistrationSuccess(false));
      throw error;
    }
  },
);

const setNewPassword = createAsyncThunk<IUserActionsResponse, INewPasswordInfo, TThunkApiConfig>(
  `${NameSpace.User}/setNewPassword`,
  async (newPassword: INewPasswordInfo, { extra: api})=> {
    const { data } = await api.post<IUserActionsResponse>(APIRoute.SetNewPassword, newPassword);
    toast.success(data.message, {position: toast.POSITION.TOP_CENTER});
    browserHistory.push(AppRoute.Main);
    return data;
  },
);

const checkAuth = createAsyncThunk<IUserAuthResponse, undefined, TThunkApiConfig>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra: api, dispatch}) => {
    try {
      const { data} = await api.get<IUserAuthResponse>(APIRoute.Refresh, { withCredentials: true });
      saveToken(data.tokens.accessToken);
      dispatch(setIsAuth(true));
      dispatch(setUser(data.userPayload));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      return data;
    } catch (error) {
      dispatch(setIsAuth(false));
      dispatch(setUser(defaultUserInfo));
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      throw error;
    }
  },
);

const getAsyncAllUsers = createAsyncThunk<IUser[], undefined, TThunkApiConfig>(
  `${NameSpace.User}/fetchAllUsers`,
  async (_arg, {extra: api}): Promise<IUser[]> => {
    const { data } = await api.get<IUser[]>(APIRoute.Users);
    return data;
  },
);

const lockAsyncOneUser = createAsyncThunk<IUser, string, TThunkApiConfig>(
  `${NameSpace.User}/lockUser`,
  async (userId: string, {extra: api, dispatch}): Promise<IUser> => {
    const { data } = await api.put<IUser>(`${APIRoute.LockUser}/${userId}`);
    dispatch(updateUsers(data));
    dispatch(setUser({
      id: data.id,
      email: data.email,
      isLocked: data.isLocked,
      isActivated: data.isActivated,
      roles: data.roles,
    }));
    toast.success(`The user was been successfully ${data.isLocked ? 'locked' : 'unlocked'} `, {position: toast.POSITION.TOP_CENTER});
    return data;
  },
);

export {
  registration,
  activation,
  login,
  logout,
  recoveryPassword,
  setNewPassword,
  checkAuth,
  getAsyncAllUsers,
  lockAsyncOneUser,
};
