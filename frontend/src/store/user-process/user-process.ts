import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, IUserInfo} from '../../types';
import {NameSpace, AuthorizationStatus} from '../../utils';
import {getAsyncAllUsers} from "./api-actions.tsx";

type TUserProcess = {
  isAuth: boolean;
  isLoading: boolean;
  isRegistrationSuccess: boolean;
  isNotFound: boolean;
  isFailedToLoad: boolean;
  user: IUserInfo;
  authorizationStatus: AuthorizationStatus;
  users: IUser[];
  isUsersLoading: boolean;
};

const initialState: TUserProcess = {
  isAuth: false,
  isLoading: false,
  isRegistrationSuccess: false,
  isNotFound: false,
  isFailedToLoad: false,
  user: {
    email: '',
    roles: [],
    id: '',
    isLocked: false,
    isActivated: false,
  },
  authorizationStatus: AuthorizationStatus.Unknown,
  isUsersLoading: false,
  users: [],
};

const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setRegistrationSuccess: (state, action) => {
      state.isRegistrationSuccess = action.payload;
    },
    setIsNotFound: (state, action) => {
      state.isNotFound = action.payload;
    },
    setIsFailedToLoad: (state, action) => {
      state.isFailedToLoad = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserInfo>): void => {
      state.user = action.payload;
    },
    updateUsers: (state: TUserProcess, action: PayloadAction<IUser>): void => {
      const index: number = state.users.findIndex((oneUser: IUser): boolean => oneUser.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers(builder): void {
    builder
      .addCase(getAsyncAllUsers.pending, (state): void => {
        state.isUsersLoading = true;
      })
      .addCase(getAsyncAllUsers.rejected, (state): void => {
        state.isUsersLoading = false;
      })
      .addCase(getAsyncAllUsers.fulfilled, (state, action: PayloadAction<IUser[]>): void => {
        state.isUsersLoading = false;
        state.users = action.payload;
      })
  }});

const {
  setIsAuth,
  setRegistrationSuccess,
  setIsNotFound,
  setIsFailedToLoad ,
  setUser,
  updateUsers,
  requireAuthorization,
} = userProcess.actions;

export {
  setIsAuth,
  setRegistrationSuccess,
  setIsNotFound,
  setIsFailedToLoad,
  setUser,
  updateUsers,
  requireAuthorization,
  userProcess,
  type TUserProcess,
};
