import {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {
  getAsyncAllUsers,
  getAsyncCities,
  getAsyncDestinations,
  getAsyncFilesList,
  getAsyncOffers,
  getAsyncOffersTypes,
} from '../../store';
import {TAppDispatch} from '../../types';

function SystemPage(): JSX.Element {
  const dispatch: TAppDispatch = useAppDispatch();

  useEffect((): void => {
    dispatch(getAsyncCities());
    dispatch(getAsyncDestinations());
    dispatch(getAsyncOffers());
    dispatch(getAsyncOffersTypes());
    dispatch(getAsyncAllUsers());
    dispatch(getAsyncFilesList());
  }, [dispatch]);

  return (
    <>
      <Outlet></Outlet>
    </>
  );
}

export {
  SystemPage,
};
