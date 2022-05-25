import axios from 'src/libs/axios';
import { QueryFunctionContext } from 'react-query';

const getNotificationSetting = (args: QueryFunctionContext<any>) => {
  const [url, params] = args.queryKey;

  return axios({
    method: 'get',
    url,
    params,
  });
};

const updatePostFlg = (url: string, data: Payload.UpdatePostFlg) => {
  return axios({
    method: 'put',
    url,
    data,
  });
};

const deleteNotificationSetting = (
  url: string,
  data: Payload.DeleteNotificationSetting,
) => {
  return axios({
    method: 'delete',
    url,
    data,
  });
};

export default {
  getNotificationSetting,
  updatePostFlg,
  deleteNotificationSetting,
};
