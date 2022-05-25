import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';

import history from 'src/libs/history';
import auth from 'src/repositories/auth';
import { PATH as HOME_PATH } from 'src/pages/home';

export const apiKey = '/re-password/new-password' as const;

const useResetPass = () => {
  return useMutation<
    AxiosResponse<Response.ResetPass>,
    AxiosError,
    Payload.ResetPass
  >({
    mutationKey: [apiKey],
    mutationFn: (args) => auth.resetPass(apiKey, args),
    retry: 0,
    async onSuccess(res) {
      history.push(HOME_PATH);
    },
    onError(err) {
      const error = _.get(err, 'response.data');
      notification.error({ message: error.message || 'Error' });
      return error;
    },
  });
};

export default useResetPass;
