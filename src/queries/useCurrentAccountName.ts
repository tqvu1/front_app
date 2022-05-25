import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import common from 'src/repositories/common';

const apiKey = '/common/current-account-name';

const useName = () => {
  const { data } = useQuery<AxiosResponse<Response.NameLogin>, AxiosError<any>>(
    [apiKey],
    common.getName,
    {
      retry: 0,
      onError(err) {
        console.log(err.response);
      },
    },
  );
  return {
    name: data?.data.item.name,
  };
};

export default useName;
