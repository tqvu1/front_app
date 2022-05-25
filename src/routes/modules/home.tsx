import React from 'react';
import { RouteObject } from 'react-router-dom';

import { PATH } from 'src/pages/home';
import Layout from 'src/components/layout';
import loadable from 'src/utils/loadable';

const DashboardRoute: RouteObject[] = [
  {
    path: PATH,
    element: <Layout />,
    children: [
      {
        index: true,
        element: loadable(() => import('src/pages/home')),
      },
    ],
  },
];

export default DashboardRoute;
