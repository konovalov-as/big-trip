import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../utils';

function FavoritePage(): JSX.Element {

  return (
    <>
      <Helmet>
        <title>Big Trip - Favorite Page</title>
        <meta name="description" content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <main className="page-main">
        <div className="container">
          <section className="page-main__section">
            <h1 className="title-h1">Favorite Page</h1>
            <p className="page-main__msg">Favorite Page Content</p>
            <Link
              to={AppRoute.Main}
              className="btn btn--big btn--blue page-main__btn"
            >
              Go home page
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}

export {
  FavoritePage,
};
