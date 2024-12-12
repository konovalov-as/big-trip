import {Helmet} from 'react-helmet-async';
import {useEffect} from 'react';
import {useAppDispatch,} from '../../hooks';
import {
  getAsyncOffers,
  getAsyncPoints,
  getAsyncDestinations,
  getAsyncOffersTypes,
} from '../../store';
import {Header, MainBlock} from '../../components';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAsyncPoints());
    dispatch(getAsyncDestinations());
    dispatch(getAsyncOffers());
    dispatch(getAsyncOffersTypes());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Big Trip - Main Page</title>
        <meta name="description" content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <Header />
      <MainBlock />
    </>
  );
}

export {
  MainPage,
};
