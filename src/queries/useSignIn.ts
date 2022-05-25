import { useMutation, useQueryClient } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';

import history from 'src/libs/history';
import auth from 'src/repositories/auth';
import LocalStorage from 'src/utils/LocalStorage';
import { PATH as HOME_PATH } from 'src/pages/home';
import { useTranslation } from 'react-i18next';
import { STATUS_CODE } from 'src/constants/app';
import { UseFormSetError } from 'react-hook-form/dist/types/form';
import { FormValue } from 'src/containers/SignIn/useForm';

export const apiKey = '/auth' as const;

type UserSignIn = {
  setError: UseFormSetError<FormValue>;
};

const useSignIn = ({ setError }: UserSignIn) => {
  const { t } = useTranslation();
  const client = useQueryClient();

  return useMutation<
    AxiosResponse<Response.SignInData>,
    AxiosError,
    Payload.Credentials
  >({
    mutationKey: [apiKey],
    mutationFn: (args) => auth.login(apiKey, args),
    retry: 0,
    async onSuccess(res) {
      const token = res.data.accessToken;
      const meRes = await client.fetchQuery<AxiosResponse<Response.Me>>(
        ['/common/current-account-name', token],
        auth.me,
      );

      LocalStorage.saveAuthInfo(meRes.data.item);
      LocalStorage.setToken(token);

      history.push(HOME_PATH);
    },
    onError(err) {
      const errorCode = _.get(err, 'response.data.code');
      switch (errorCode) {
        case STATUS_CODE.EMAIL_NOT_EXIST:
          return setError('email', {
            type: 'custom',
            message: t('validation.email_exist', { name: t('label.email') }),
          });
        case STATUS_CODE.PASSWORD_INVALID:
          return setError('password', {
            type: 'custom',
            message: t('validation.password', { name: t('label.password') }),
          });
      }
      const error = _.get(err, 'response.data.errors[0]');
      notification.error({ message: error.message || 'Error' });
    },
  });
};

export default useSignIn;
