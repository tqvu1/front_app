import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import language from 'src/repositories/common';

const apiKey = '/common/language/list';

const useLanguage = () => {
  const { data, ...rest } = useQuery<
    AxiosResponse<Response.ListLanguage>,
    AxiosError<any>
  >([apiKey], language.getLanguage, {
    retry: 0,
    onError(err) {
      console.log(err.response);
    },
  });
  return {
    data: data?.data?.items,
    ...rest,
  };
};

export default useLanguage;
