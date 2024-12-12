import axios, {AxiosError, AxiosInstance} from 'axios';
import {googleAPIUrl} from '@utils/const';
import {logger} from "@globals/logger";

const REQUEST_TIMEOUT: number = 5000;
const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: googleAPIUrl,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  api.interceptors.request.use(
    (request) => request,
    (error: AxiosError) => {
      logger.error(error, 'error of request to google recaptcha api')
      throw error;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      logger.error(error, 'error of response to google recaptcha api')
      throw error;
    }
  );

  return api;
};

export { createAPI };