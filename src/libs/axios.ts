import axiosBase, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

import { config, HTTP_CODE, STATUS_CODE } from 'src/constants/app';
import LocalStorage from 'src/utils/LocalStorage';
import history from 'src/libs/history';
import authorization from 'src/utils/authorization';
import { PATH } from 'src/pages/auth';
import authLocked from 'src/utils/authLocked';

const axios = <T = any>(requestConfig: AxiosRequestConfig<T>) => {
  const instance: AxiosInstance = axiosBase.create(config);

  instance.interceptors.request.use(
    (config) => {
      const accessToken = LocalStorage.accessToken;

      if (accessToken) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        config.headers = Object.assign(config.headers, headers);
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const httpCode = error.response && error.response.status;
      const statusCode = error.response && error.response?.data?.code;

      switch (httpCode) {
        case HTTP_CODE.UNAUTHORIZED:
          if (
            history.location.pathname === PATH.SIGN_IN ||
            history.location.pathname === PATH.FORGOT_PASSWORD ||
            history.location.pathname === PATH.RESET_PASSWORD
          ) {
            break;
          }
          if (statusCode === STATUS_CODE.USER_LOCKED) {
            return authLocked();
          }
          authorization();
          break;
        case HTTP_CODE.FORBIDDEN:
          // history.push(PATH.FORBIDDEN);
          break;
        case HTTP_CODE.NOT_FOUND:
          // history.push(PATH.NOT_FOUND);
          break;
        case HTTP_CODE.INTERNAL_SERVER_ERROR:
          // history.push(PATH.INTERNAL_SERVER);
          break;
        default:
          break;
      }

      return Promise.reject(error);
    },
  );

  return instance(requestConfig);
};

export default axios;
