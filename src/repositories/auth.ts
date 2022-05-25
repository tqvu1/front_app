import axios from 'src/libs/axios';
import { QueryFunctionContext } from 'react-query';

const signUp = (url, data: Payload.SignUp) => {
  return axios({
    method: 'post',
    url,
    data,
  });
};

const login = (url, data: Payload.Credentials) => {
  return axios({
    method: 'post',
    url,
    data: {
      username: data.email,
      password: data.password,
    },
  });
};

const me = (args: QueryFunctionContext<any>) => {
  const [url, token] = args.queryKey;

  return axios({
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const logout = (url) => {
  return axios({
    method: 'post',
    url,
  });
};

const forgotPass = (url, data: Payload.ForgotPass) => {
  return axios({
    method: 'post',
    url,
    data,
  });
};

const verifyOTP = (url, data: Payload.VerifyOTP) => {
  return axios({
    method: 'post',
    url,
    data,
  });
};

const resetPass = (url, data: Payload.ResetPass) => {
  return axios({
    method: 'post',
    url,
    data,
  });
};

export default {
  signUp,
  login,
  me,
  logout,
  forgotPass,
  verifyOTP,
  resetPass,
};
