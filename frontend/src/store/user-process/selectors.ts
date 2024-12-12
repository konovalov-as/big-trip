import {IUser, IUserInfo, TState} from '../../types';
import {NameSpace, AuthorizationStatus} from '../../utils';

const selectIsAuth = (state: Pick<TState, NameSpace.User>): boolean => state[NameSpace.User].isAuth;
const selectAuthStatus = (state: Pick<TState, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
// const selectIsAuthStatus = (state: Pick<TState, NameSpace.User>): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.NoAuth;

const selectIsNotFound = (state: Pick<TState, NameSpace.User>): boolean => state[NameSpace.User].isNotFound;

const selectIsFailedToLoad = (state: Pick<TState, NameSpace.User>): boolean => state[NameSpace.User].isFailedToLoad;

const selectIsRegistrationSuccess = (state: Pick<TState, NameSpace.User>): boolean => state[NameSpace.User].isRegistrationSuccess;

const selectUser = (state: Pick<TState, NameSpace.User>): IUserInfo => state[NameSpace.User].user;
const selectUsers = (state: Pick<TState, NameSpace.User>): IUser[] => state[NameSpace.User].users;
const selectIsUsersLoading = (state: Pick<TState, NameSpace.User>) => state[NameSpace.User].isUsersLoading;

export {
  selectIsAuth,
  selectAuthStatus,
  selectIsRegistrationSuccess,
  selectIsNotFound,
  selectIsFailedToLoad,
  selectUser,
  selectUsers,
  selectIsUsersLoading,
};
