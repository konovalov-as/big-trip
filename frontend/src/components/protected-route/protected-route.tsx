import {Navigate } from 'react-router-dom';
import {useAppSelector } from '../../hooks';
import {selectAuthStatus} from '../../store';
import {TProtectedRouteProps} from '../../types';

function ProtectedRoute(props: TProtectedRouteProps): JSX.Element {
  const { restrictedFor, redirectTo, children } = props;
  const authStatus = useAppSelector(selectAuthStatus);
  return authStatus === restrictedFor ? <Navigate to={redirectTo} /> : children;
}

export {
  ProtectedRoute,
};
