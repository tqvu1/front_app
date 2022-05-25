import axios from 'src/libs/axios';
import { QueryFunctionContext } from 'react-query';

const getInternalPIC = (args: QueryFunctionContext<any>) => {
  const [url, params] = args.queryKey;

  return axios({
    method: 'get',
    url,
    data: params,
  });
};

export default { getInternalPIC };
