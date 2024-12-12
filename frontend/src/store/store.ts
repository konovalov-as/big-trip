import {AxiosInstance} from 'axios';
import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import {rootReducer } from '../store';

const api: AxiosInstance = createAPI();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export {
  api as apiWithoutStore,
  store,
};
