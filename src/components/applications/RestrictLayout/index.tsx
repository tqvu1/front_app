import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Layout, Typography } from 'antd';

import LocalStorage from 'src/utils/LocalStorage';
import LangSelect from 'src/components/layout/TopNav/LangSelect';
import AppFooter from 'src/components/layout/Footer';
import useLogo from 'src/queries/useLogo';
import { FRONTSITE_PATH } from 'src/constants/app';

type Props = {
  requireNotAuth?: boolean;
  title?: string;
};

const RestrictLayout: React.FC<Props> = ({
  requireNotAuth = true,
  title = '',
}) => {
  const { data } = useLogo();

  return LocalStorage.accessToken && requireNotAuth ? (
    <Navigate to={'/'} replace />
  ) : (
    <Layout className="min-h-100vh">
      <div className="header_restrict">
        <Layout.Header className="container-lg header_restrict_container">
          <span className="header_restrict_site_name">
            <Typography.Link href={FRONTSITE_PATH}>
              {data?.netSbsName}
            </Typography.Link>
          </span>
          <div className="header_restrict_title">
            <span className="login_title">{title}</span>
          </div>
          <div className="header_restrict_language">
            <LangSelect />
          </div>
        </Layout.Header>
      </div>
      <Outlet />
      <AppFooter backgroundColor={false} />
    </Layout>
  );
};

export default RestrictLayout;
