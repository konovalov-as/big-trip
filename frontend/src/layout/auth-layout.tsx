import {Outlet} from 'react-router-dom';

function AuthLayout(): JSX.Element {
  return (
      <Outlet></Outlet>
  );
}

export {
  AuthLayout,
};
