import React from 'react';

import { PATH } from 'src/pages/notification';
import Layout from 'src/components/layout';
import loadable from 'src/utils/loadable';
import { IRouter } from 'src/interfaces/route';
import { t } from 'src/libs/i18n';

const NotificationRoute: IRouter[] = [
  {
    element: <Layout requireAuth={false} />,
    children: [
      {
        path: PATH.NOTIFICATION_SETTING,
        element: loadable(
          () => import('src/pages/notification/NotificationSetting'),
        ),
        title: t('notification_setting.page_title'),
      },
    ],
  },
];

export default NotificationRoute;
