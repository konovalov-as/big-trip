import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {Header} from '../../components';
import {useAppDispatch} from '../../hooks';
import {setIsFailedToLoad} from '../../store';

function FailedToLoad(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsFailedToLoad(true));

    return () => {
      dispatch(setIsFailedToLoad(false));
    };
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Big Trip - Main Page</title>
        <meta name="description" content='Beginner friendly page for learning React Helmet.' />
      </Helmet>

      <Header />

      <main className="page-main">
        <div className="container">
          <div className="page-decor">
            <section className="trip-events">
              <h2 className="visually-hidden">Trip events</h2>

              <p className="trip-events__msg">Failed to load latest route information</p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export {
  FailedToLoad,
};
