import React from 'react';
import { Layout } from 'antd';

import ForgotPasswordContainer from 'src/containers/ForgotPassword';
import useTitle from 'src/hooks/useTitle';
import { t } from 'src/libs/i18n';

const ForgotPasswordPage: React.FC = () => {
  useTitle(t('forgot_password.page_title'));
  return (
    <Layout className="restrict_container">
      <ForgotPasswordContainer />
    </Layout>
  );
};

export const PATH = '/forgot_password' as const;
export default ForgotPasswordPage;
