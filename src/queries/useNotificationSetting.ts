import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import notificationSystem from 'antd/lib/notification';
import _ from 'lodash';

import notification from 'src/repositories/notification';
import useQueryUrl from 'src/hooks/useQueryUrl';
import { PER } from 'src/constants/app';
import { I18n } from 'src/libs/i18n';

const apiPath = '/notifications';
const apiPostFlg = '/notifications/posted-flg';

// type UseNotificationSetting = {
//   setRowKeysSelected?: Dispatch<SetStateAction<React.Key[]>>;
// };

const useNotificationSetting = () => {
  const queryClient = useQueryClient();

  const query = useQueryUrl<SearchParams.NotificationSetting>();
  const params = {
    postedFrom: query.publish_date_from?.concat('00:00:00'),
    postedTo: query.publish_date_to?.concat('00:00:00'),
    title: query.title,
    hyoujiBasho1: query.display_condition,
    hyoujiBasho2: query.display_condition,
    postedFlg: query.display_order,
    page: query.page || 1,
    offset: query.limit || PER.DEFAULT,
  };

  const queryNotificationSetting = useQuery<
    AxiosResponse<Response.NotificationSetting>,
    AxiosError<Response.Error>
  >({
    queryKey: [apiPath, params],
    queryFn: notification.getNotificationSetting,
    onSuccess: () => {
      // setRowKeysSelected?.([]);
    },
  });

  console.log('queryNotificationSetting', queryNotificationSetting);

  const initPostFlg: Payload.PostFlgData[] =
    queryNotificationSetting?.data?.data?.items?.map((item) => {
      return {
        seqno: String(item.seqno),
        postedFlg: item.postedFlg,
      };
    }) || [];

  const updatePostFlg = useMutation<
    AxiosResponse<any>,
    AxiosError<Response.Error>,
    Payload.UpdatePostFlg
  >({
    mutationKey: [apiPostFlg],
    mutationFn: (args) => {
      return notification.updatePostFlg(apiPostFlg, args);
    },
    onSuccess: () => {
      queryClient.removeQueries([apiPath]);
      // setRowKeysSelected?.([]);
    },
    onError: (error) => {
      const errorCode = _.get(error, 'response.data.code');
      notificationSystem.error({
        message: I18n.t(`message.${errorCode}`) || 'Error',
      });
    },
  });

  const deleteNotification = useMutation<
    AxiosResponse<any>,
    AxiosError<Response.Error>,
    Payload.DeleteNotificationSetting
  >({
    mutationKey: [apiPath],
    mutationFn: (args) => {
      return notification.deleteNotificationSetting(apiPath, args);
    },
    onSuccess: () => {
      queryClient.removeQueries([apiPath]);
      // setRowKeysSelected?.([]);
    },
    onError: (error) => {
      const errorCode = _.get(error, 'response.data.code');
      notificationSystem.error({
        message: I18n.t(`message.${errorCode}`) || 'Error',
      });
    },
  });

  return {
    queryNotificationSetting,
    initPostFlg,
    updatePostFlg,
    deleteNotification,
  };
};

export default useNotificationSetting;
