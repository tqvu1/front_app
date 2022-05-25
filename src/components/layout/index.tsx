import React from 'react';
import { Layout } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

import AppMenu from 'src/components/layout/Menu';
import AppFooter from 'src/components/layout/Footer';
import TopNav from 'src/components/layout/TopNav';
import LocalStorage from 'src/utils/LocalStorage';
import { PATH } from 'src/pages/auth';

type Props = {
  hasHeader?: boolean;
  hasMenu?: boolean;
  headerClass?: string;
  requireAuth?: boolean;
};

const AppLayout: React.FC<Props> = ({
  hasHeader = true,
  hasMenu = true,
  headerClass = '',
  requireAuth = true,
}) => {
  if (requireAuth) {
    const accessToken = LocalStorage.accessToken;
    if (!accessToken) {
      return <Navigate to={PATH.SIGN_IN} replace />;
    }
  }
  return (
    <Layout>
      {hasHeader && <TopNav />}
      {hasMenu && <AppMenu />}
      <Layout className={'layout-container'}>
        <div className={'container-lg min-h-100' + headerClass}>
          <Outlet />
        </div>
      </Layout>
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
