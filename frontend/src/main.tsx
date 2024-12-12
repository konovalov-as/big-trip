import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import {ToastContainer} from 'react-toastify';
import {HelmetProvider} from 'react-helmet-async';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';
import {store, checkAuth} from './store';
import {App, HistoryRouter} from './components';
import {browserHistory} from './browser-history.ts';
import {gRECAPTCHA_SITE_KEY} from './config/app.ts';
import 'react-toastify/dist/ReactToastify.css';
import './sass/style.scss';

store.dispatch(checkAuth());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <GoogleReCaptchaProvider
    reCaptchaKey={gRECAPTCHA_SITE_KEY}
    scriptProps={{
      async: false,
      defer: false,
      appendTo: "head",
      nonce: undefined,
    }}
  >
    <React.StrictMode>
      <HelmetProvider>
        <Provider store={store}>
          <HistoryRouter history={browserHistory}>
            <ToastContainer />
            <App />
          </HistoryRouter>
        </Provider>
      </HelmetProvider>
    </React.StrictMode>
  </GoogleReCaptchaProvider>
);
