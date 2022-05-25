import React from 'react';
import { Layout } from 'antd';

import ResetPasswordContainer from 'src/containers/ResetPassword';
import useTitle from 'src/hooks/useTitle';
import { t } from 'src/libs/i18n';

const ResetPasswordPage: React.FC = () => {
  useTitle(t('forgot_password.page_title'));
  return (
    <Layout className="restrict_container">
      <ResetPasswordContainer />
    </Layout>
  );
};

export const PATH = '/reset_password' as const;
export default ResetPasswordPage;
