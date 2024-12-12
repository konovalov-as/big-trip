import {AppRoute, AuthorizationStatus} from '../utils';

type TProtectedRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute | string;
  children: JSX.Element;
  roles: string[];
};

export {
  type TProtectedRouteProps,
};
