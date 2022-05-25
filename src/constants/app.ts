import { AxiosRequestConfig } from 'axios';

export const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

export const DATE_FORMAT = 'YYYY/MM/DD';
export const DATE_TIME_HOUR_SECOND = 'YYYY/MM/DD HH:mm:ss';
export const DATE_TIME_HOUR_MIN = 'YYYY/MM/DD HH:mm';
export const HOUR_MIN = 'HH:mm';
export const MONTH_YEAR = 'MM/YYYY';
export const YEAR_MONTH = 'YYYYMM';

const apiVersion = 'v1';
const apiService = 'admin';

export const config: AxiosRequestConfig = {
  baseURL:
    `${process.env.REACT_APP_BASE_API_URL}/${apiVersion}/${apiService}` ||
    'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
};

export const STORAGE_KEY = {
  ACCESS_TOKEN: 'ec_site_admin_access_token',
  REFRESH_TOKEN: 'ec_site_admin_refresh_token',
  AUTH_ME_INFO: 'ec_admin_site_me_info',
  LANG: 'ec_admin_site_lang',
  SITE_INFO: 'ec_admin_site_info',
};

export const PER = {
  DEFAULT: 10,
  USER: 10,
};

export const fileTypes = ['image/png', 'image/jpeg'];
export const fileSize = 10; //Mb

export enum APP_ACTIONS {
  CHANGE_LANG = 'change_lang',
  UPDATE_MOUNTED = 'update_mounted',
  UPDATE_IS_FETCHING = 'update_is_fetching',
}

export const STATUS_CODE = {
  EMAIL_NOT_EXIST: 'EC-1604',
  PASSWORD_INVALID: 'EC-1111',
  FORGOT_PASS_EMAIL_NOT_EXIST: 'EC-1604',
  FORGOT_PASS_SEND_OTP_TIMEOUT: 'EC-1301',
  FORGOT_PASS_SEND_DUPLICATE_DATA: 'EC-1302',
  FORGOT_PASS_SEND_WRONG_LANG: 'EC-1117',
  RESET_PASS_EMAIL_NOT_EXIST: 'EC-0401',
  RESET_PASS_WRONG_OTP: 'EC-1109',
  RESET_PASS_OTP_EXPIRED: 'EC-1110',
  USER_LOCKED: 'EC-423',
};

export const REGEX = {
  REGEX_NUMBER: /(.*\d.*)/,
  REGEX_UPPER_CASE: /(.*[A-Z].*)/,
  REGEX_LOWER_CASE: /(.*[a-z].*)/,
  REGEX_SPECIAL_CHARACTER: /(.*\W.*)/,
  REGEX_PASSWORD_MATCHES: /^[a-zA-Z0-9!@#$%^&*()_=;'?{}~<>|[\]\\-`.+,/\\"]*$/,
  REGEX_EMAIL_MATCHES: /^[a-zA-Z0-9!@#$&()\\-`.+,/\\"]*$/,
};

export const FRONTSITE_PATH =
  'http://glb-netservice-dev.hakudo.co.jp.s3-website-ap-southeast-1.amazonaws.com/sign_in';
