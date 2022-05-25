import React from 'react';
import { Menu, Layout, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import LangSelect from 'src/components/layout/TopNav/LangSelect';
import useMenu from 'src/hooks/useMenu';
import { Logout } from 'src/components/icon';
import LocalStorage from 'src/utils/LocalStorage';
import { PATH } from 'src/pages/auth';
import history from 'src/libs/history';

const AppMenuMobile: React.FC = () => {
  const { menuItems, getSelectedKey } = useMenu('mobile');
  const { t } = useTranslation();

  const onLogout = () => {
    LocalStorage.removeInfo();
    history.push(PATH.SIGN_IN);
  };

  return (
    <Layout className={'menu_mobile'}>
      <div className={'top-menu'}>
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={getSelectedKey()}
          defaultOpenKeys={['categories']}
          mode="inline"
          items={menuItems}
        />
      </div>
      <div className="lang-select-mobile">
        <LangSelect />
        <Button
          type="primary"
          className="lang-select_logout"
          icon={<Logout className="mr-5" />}
          onClick={onLogout}
        >
          {t('header.logout')}
        </Button>
      </div>
    </Layout>
  );
};

export default AppMenuMobile;
