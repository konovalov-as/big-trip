import {toast} from 'react-toastify';
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  CancelTokenSource,
  AxiosError,
} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {browserHistory} from '../browser-history';
import {getToken} from './token.ts';
import {AppRoute, ClientErrorCode} from '../utils';
import {API_URL} from '../config/app.ts';

const SERVER_ERROR: number = 500;
const ERR_NETWORK: string = 'ERR_NETWORK';
const ECONNABORTED: string = 'ECONNABORTED';

const REQUEST_TIMEOUT: number = 5000;
const AUTHORIZATION: string = 'Basic qwerty123';

const handleErrors = (error: AxiosError): Promise<never> => {
  const { response, code, message, request } = error;

  if (response) {
    const { status, data } = response;

    switch (status) {
      case StatusCodes.UNAUTHORIZED:
        console.warn('Unauthorized access! Login or create a new account');
        break;

      case StatusCodes.NOT_FOUND:
        browserHistory.push(AppRoute.NotFound);
        break;

      case StatusCodes.CONFLICT:
        toast.warn('Conflict. This item may already exist', {
          position: toast.POSITION.TOP_CENTER
        });
        break;

      case StatusCodes.BAD_REQUEST:
        if (data && typeof data === 'object') {
          if ('errors' in data && data.errors && typeof data.errors === 'object' && 'code' in data.errors) {
            const errorCode: number = (data.errors as { code: number }).code;

            if (errorCode === ClientErrorCode.duplicateKey) {
              toast.warn('This object already exists', {position: toast.POSITION.TOP_CENTER});
            }
          } else if ('message' in data) {
            toast.warn((data as { message: string }).message, {position: toast.POSITION.TOP_CENTER});
          }
        } else {
          toast.error('Bad request. Please check your input.', {position: toast.POSITION.TOP_CENTER});
        }
        break;

      default:
        if (status >= SERVER_ERROR) {
          toast.error('Server error. Please try again later.', {
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          toast.error(`Error: ${message}`, {position: toast.POSITION.TOP_CENTER});
        }
        break;
    }
  } else if (code === ERR_NETWORK) {
    browserHistory.push(AppRoute.NetworkError);
  } else if (code === ECONNABORTED) {
    toast.warn('Request timed out. Please try again:', {
      position: toast.POSITION.TOP_CENTER
    });
  } else if (request) {
    toast.warn('Network error. Please check your connection.', {
      position: toast.POSITION.TOP_CENTER,
    });
  } else {
    toast.error(`Unexpected error: ${message}`, {
      position: toast.POSITION.TOP_CENTER,
    });
  }

  return Promise.reject(error);
}
const createAPI = (): AxiosInstance => {
  const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Basic-Authorization': AUTHORIZATION,
      Authorization: AUTHORIZATION,
    },
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const source: CancelTokenSource = axios.CancelToken.source();
      config.cancelToken = source.token;

      const token: string = getToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => handleErrors(error),
  );

  return api;
};

export {
  createAPI,
};
