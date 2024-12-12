import {useRef} from 'react';
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import {Route, Routes, useLocation} from 'react-router-dom';
import {AuthLayout, SystemLayout} from '../../layout';
import {
  ActivationPage,
  FailedToLoad,
  FavoritePage,
  ForbiddenPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  OfferPage,
  RecoveryPasswordPage,
  SetNewPasswordPage,
  SignupPage,
  SystemPage,
} from '../../pages';
import {
  CitiesList,
  DestinationsList,
  FilesList,
  OffersList,
  OffersTypesList,
  ProtectedRoute,
  ProtectedRouteRoles,
  SystemRoot,
  UsersList,
} from '../../components';
import {AppRoute, AuthorizationStatus, Roles} from '../../utils';

function App(): JSX.Element {
    const location = useLocation();
    const pageRef = useRef(null);

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.key}
        timeout={100}
        classNames="page"
        nodeRef={pageRef}
      >
        <div className="page__inner" ref={pageRef}>
          <Routes location={location}>
            <Route index element={<MainPage />} />
            <Route path={`${AppRoute.Offer}/:offerId`} element={<OfferPage />} />

            <Route
              path={AppRoute.Favorites}
              element={
                <ProtectedRoute
                  restrictedFor={AuthorizationStatus.NoAuth}
                  redirectTo={`${AppRoute.Auth}/${AppRoute.Login}`}
                  roles={[]}
                >
                  <FavoritePage />
                </ProtectedRoute>
              }
            />

            <Route path={AppRoute.Auth} element={<AuthLayout />} >
              <Route path={AppRoute.Signup} element={<SignupPage />} />
              <Route
                path={AppRoute.Login}
                element={
                  <ProtectedRoute
                    restrictedFor={AuthorizationStatus.Auth}
                    redirectTo={AppRoute.Main}
                    roles={[]}
                  >
                    <LoginPage />
                  </ProtectedRoute>
                }
              />
              <Route path={`${AppRoute.Activation}/:link`} element={<ActivationPage />} />
              <Route path={AppRoute.RecoveryPassword} element={<RecoveryPasswordPage />} />
              <Route path={`${AppRoute.RecoveryPassword}/:link`} element={<SetNewPasswordPage />} />
            </Route>

            <Route path={AppRoute.System} element={
              <ProtectedRouteRoles
                restrictedFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Forbidden}
                roles={[Roles.admin]}
              >
                <SystemLayout children={<SystemPage />} />
              </ProtectedRouteRoles>
            }>
              <Route path={AppRoute.System} element={<SystemRoot />} />
              <Route path={AppRoute.Types} element={<OffersTypesList />} />
              <Route path={AppRoute.Offers} element={<OffersList />} />
              <Route path={AppRoute.Cities} element={<CitiesList />} />
              <Route path={AppRoute.Destinations} element={<DestinationsList />} />
              <Route path={AppRoute.Users} element={<UsersList /> } />
              <Route path={AppRoute.Files} element={<FilesList /> } />
            </Route>

            <Route path={AppRoute.Forbidden} element={<ForbiddenPage />} />
            <Route path={AppRoute.NetworkError} element={<FailedToLoad />} />
            <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

export {
  App,
};
