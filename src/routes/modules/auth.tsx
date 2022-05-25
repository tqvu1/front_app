import React from 'react';

import { PATH } from 'src/pages/auth';
import RestrictLayout from 'src/components/applications/RestrictLayout';
import loadable from 'src/utils/loadable';
import { t } from 'src/libs/i18n';
import { IRouter } from 'src/interfaces/route';

const AuthRoute: IRouter[] = [
  {
    element: <RestrictLayout title={t('sign_in.page_name')} />,
    children: [
      {
        path: PATH.SIGN_IN,
        element: loadable(() => import('src/pages/auth/SignIn')),
        title: t('sign_in.page_title'),
      },
    ],
  },
  {
    element: (
      <RestrictLayout
        title={t('forgot_password.page_title')}
        requireNotAuth={false}
      />
    ),
    children: [
      {
        path: PATH.FORGOT_PASSWORD,
        element: loadable(() => import('src/pages/auth/ForgotPassword')),
        title: t('forgot_password.page_title'),
      },
    ],
  },
  {
    element: (
      <RestrictLayout
        title={t('reset_password.page_title')}
        requireNotAuth={false}
      />
    ),
    children: [
      {
        path: PATH.RESET_PASSWORD,
        element: loadable(() => import('src/pages/auth/ResetPassword')),
        title: t('reset_password.page_title'),
      },
    ],
  },
];

export default AuthRoute;
