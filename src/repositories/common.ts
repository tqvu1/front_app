import axios from 'src/libs/axios';
import { QueryFunctionContext } from 'react-query';

const getLogo = (args: QueryFunctionContext<any>) => {
  const [url, params] = args.queryKey;

  return axios({
    method: 'get',
    url,
    params,
  });
};

const getName = (args: QueryFunctionContext<any>) => {
  const [url, params] = args.queryKey;

  return axios({
    method: 'get',
    url,
    params,
  });
};

const getLanguage = (args: QueryFunctionContext<any>) => {
  const [url, params] = args.queryKey;

  return axios({
    method: 'get',
    url,
    params,
  });
};

export default { getLogo, getName, getLanguage };
