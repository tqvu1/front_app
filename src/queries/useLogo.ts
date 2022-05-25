import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import common from 'src/repositories/common';

const apiKey = '/common/logo';

const useLogo = () => {
  const { data, ...rest } = useQuery<
    AxiosResponse<Response.Logo>,
    AxiosError<any>
  >([apiKey], common.getLogo, {
    retry: 0,
    onError(err) {
      console.log(err.response);
    },
  });
  return {
    data: data?.data?.item,
    ...rest,
  };
};

export default useLogo;
