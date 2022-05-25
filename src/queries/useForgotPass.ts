import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { UseFormSetError } from 'react-hook-form';

import auth from 'src/repositories/auth';
import { FormValue } from 'src/containers/ForgotPassword/useForm';
import { useTranslation } from 'react-i18next';
import { STATUS_CODE } from 'src/constants/app';

export const apiKey = '/re-password/otp-sending' as const;

type UseForgotPass = {
  setError?: UseFormSetError<FormValue>;
  onSuccess?: (data) => void;
};

const useForgotPass = ({ setError, onSuccess }: UseForgotPass) => {
  const { t } = useTranslation();

  return useMutation<
    AxiosResponse<Response.ForgotPass>,
    AxiosError,
    Payload.ForgotPass
  >({
    mutationKey: [apiKey],
    mutationFn: (args) => auth.forgotPass(apiKey, args),
    retry: 0,
    async onSuccess(res) {
      onSuccess && onSuccess(res.data);
    },
    onError(err) {
      const errorCode = _.get(err, 'response.data.code');
      switch (errorCode) {
        case STATUS_CODE.FORGOT_PASS_EMAIL_NOT_EXIST:
          return (
            setError &&
            setError('email', {
              type: 'custom',
              message: t('validation.email_exist', { name: t('label.email') }),
            })
          );
        case STATUS_CODE.FORGOT_PASS_SEND_OTP_TIMEOUT:
          return (
            setError &&
            setError('email', {
              type: 'custom',
              message: t('validation.resend_timeout'),
            })
          );
        case STATUS_CODE.FORGOT_PASS_SEND_DUPLICATE_DATA:
          return (
            setError &&
            setError('email', {
              type: 'custom',
              message: t('validation.email_duplicate', { name: 'email' }),
            })
          );
        case STATUS_CODE.FORGOT_PASS_SEND_WRONG_LANG:
          return (
            setError &&
            setError('email', {
              type: 'custom',
              message: t('validation.wrong_language_key'),
            })
          );
      }
      const error = _.get(err, 'response.data');
      notification.error({ message: error.message || 'Error' });
    },
  });
};

export default useForgotPass;
