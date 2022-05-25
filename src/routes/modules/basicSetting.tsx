import React from 'react';

import { PATH } from 'src/pages/basicSetting';
import Layout from 'src/components/layout';
import loadable from 'src/utils/loadable';
import { IRouter } from 'src/interfaces/route';
import { t } from 'src/libs/i18n';

const BasicSettingRoute: IRouter[] = [
  {
    element: <Layout />,
    children: [
      {
        path: PATH.BASIC_SETTING,
        element: loadable(() => import('src/pages/basicSetting/BasicSetting')),
        title: t('menu_home.basic_setting'),
      },
    ],
  },
];

export default BasicSettingRoute;
