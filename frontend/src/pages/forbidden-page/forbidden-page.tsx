import {Helmet} from 'react-helmet-async';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../utils';

function ForbiddenPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Big Trip - Forbidden Page</title>
        <meta name="description" content='Beginner friendly page for learning React Helmet.' />
      </Helmet>
      <main className="page-main">
        <div className="container">
          <section className="page-main__section">
            <h1 className="title-h1">Forbidden</h1>
            <p className="page-main__msg"></p>
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
  ForbiddenPage,
};
