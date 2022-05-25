import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { UseFormSetError } from 'react-hook-form';

import auth from 'src/repositories/auth';
import { useTranslation } from 'react-i18next';
import { STATUS_CODE } from 'src/constants/app';
import { FormValue } from 'src/containers/ResetPassword/ComfirmOTP/useForm';

export const apiKey = '/re-password/token-verification' as const;

type UseVerifyOTP = {
  setError?: UseFormSetError<FormValue>;
  onSuccess?: (data) => void;
};

const useVerifyOTP = ({ setError, onSuccess }: UseVerifyOTP) => {
  const { t } = useTranslation();

  return useMutation<
    AxiosResponse<Payload.VerifyOTP>,
    AxiosError,
    Payload.VerifyOTP
  >({
    mutationKey: [apiKey],
    mutationFn: (args) => auth.verifyOTP(apiKey, args),
    retry: 0,
    async onSuccess(res) {
      console.log('onSuccess', res);
      onSuccess && onSuccess(res.data);
    },
    onError(err) {
      const error = _.get(err, 'response.data');
      console.log(error);
      switch (error.code) {
        case STATUS_CODE.RESET_PASS_EMAIL_NOT_EXIST:
          return (
            setError &&
            setError('email', {
              type: 'custom',
              message: t('validation.email_exist', { name: t('label.email') }),
            })
          );
        case STATUS_CODE.RESET_PASS_WRONG_OTP:
          return (
            setError &&
            setError('otp', {
              type: 'custom',
              message: t('validation.wrong_otp'),
            })
          );
        case STATUS_CODE.RESET_PASS_OTP_EXPIRED:
          return (
            setError &&
            setError('otp', {
              type: 'custom',
              message: t('validation.otp_expired'),
            })
          );
      }
      notification.error({ message: error.message || 'Error' });
      return error;
    },
  });
};

export default useVerifyOTP;
