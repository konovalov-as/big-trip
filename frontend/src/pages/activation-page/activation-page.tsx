import React from 'react';
import { Helmet } from 'react-helmet-async';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {activation} from '../../store';

function ActivationPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {link} = useParams();
  const handleActivateUser = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (link) {
      dispatch(activation(link));
    }
  }

  return (
    <>
      <Helmet>
        <title>Big Trip - Activation Page</title>
        <meta name="description" content="Registration Big Trip - Modern service for real travelers" />
      </Helmet>
      <main className="page-auth">
        <div className="page-auth__wrapper">
          <div className="page-auth__activation">
            <h1 className="title-h1">Activation account</h1>
            <button
              className="auth-form__btn"
              type="button"
              onClick={handleActivateUser}
            >Activate</button>
          </div>
        </div>
      </main>
    </>
  );
}

export {
  ActivationPage,
};
