import React from 'react';

import { PATH } from 'src/pages/internalPIC';
import loadable from 'src/utils/loadable';
import { IRouter } from 'src/interfaces/route';
import { t } from 'src/libs/i18n';
import Layout from 'src/components/layout';

const InternalPICRoute: IRouter[] = [
  {
    element: <Layout />,
    children: [
      {
        index: true,
        path: PATH,
        element: loadable(() => import('src/pages/internalPIC')),
        title: t('internal_pic.title'),
      },
    ],
  },
];

export default InternalPICRoute;
