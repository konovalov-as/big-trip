import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {selectAuthStatus} from '../../store';
import {IUserInfo, TProtectedRouteProps,} from '../../types';
import {AppRoute, AuthorizationStatus} from '../../utils';
import {getUserInfo} from '../../services/token.ts';

const allowedIsRouteKeyName: string = 'big-trip-allowed-route';

const getIsAllowedRoute = (): boolean => {
  const keyValue: string | null = localStorage.getItem(allowedIsRouteKeyName);
  return (String(keyValue).toLowerCase() === 'true');
};

const saveIsAllowedRoute = (keyValue: string): void => {
  localStorage.setItem(allowedIsRouteKeyName, keyValue);
};

const dropIsAllowedRoute = (): void => {
  localStorage.removeItem(allowedIsRouteKeyName);
};

function ProtectedRouteRoles(props: TProtectedRouteProps): JSX.Element {
  const {
    restrictedFor,
    redirectTo,
    children,
    roles: allowedRoles
  } = props;

  const authStatus: AuthorizationStatus = useAppSelector(selectAuthStatus);
  // const userInfo: IUserInfo = useAppSelector(selectUser);
  const userInfo: IUserInfo = getUserInfo();
  const isAllowedRoute: boolean = getIsAllowedRoute();

  if (userInfo) {
    saveIsAllowedRoute(String(userInfo.roles.some( (availableRole: string) => allowedRoles.includes(availableRole)) ));

    if (authStatus === restrictedFor) {
      return <Navigate to={`${AppRoute.Auth}/${AppRoute.Login}`} />
    }

    return isAllowedRoute ?  children : <Navigate to={redirectTo} />;
  }
  return <Navigate to={redirectTo} />
}


export {
  ProtectedRouteRoles,
  dropIsAllowedRoute,
};
