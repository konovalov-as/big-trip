import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils';

function OfferPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Big Trip - Offer Page</title>
        <meta name="description" content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <main className="page-main">
        <div className="container">
          <section className="page-main__section">
            <h2 className="title-h1">Offer Page</h2>
            <p className="page-main__msg">Offer Page Description</p>
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
  OfferPage,
};
