import React, { useState } from 'react';
import { Button, Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { MenuOutlined } from '@ant-design/icons';

import LangSelect from 'src/components/layout/TopNav/LangSelect';
import logo from 'src/assets/logo.png';
import history from 'src/libs/history';
import { Logout } from 'src/components/icon';
import useLogo from 'src/queries/useLogo';
import useName from 'src/queries/useCurrentAccountName';
import { PATH } from 'src/pages/auth';
import LocalStorage from 'src/utils/LocalStorage';
import AppMenuMobile from 'src/components/layout/MenuMobile';

const TopNav: React.FC = () => {
  const { t } = useTranslation();
  const [toggleMenu, setToggleMenuMobile] = useState(false);
  const { data } = useLogo();
  const { name } = useName();

  const handleLogoClick = () => {
    history.push('/');
  };

  const onLogout = () => {
    LocalStorage.removeInfo();
    history.push(PATH.SIGN_IN);
  };

  return (
    <Layout className={'top-nav'}>
      <Layout className={'container-lg'}>
        <Layout.Header>
          <div>
            <img
              src={data?.ecsiteLogoDir || logo}
              alt="logo"
              className="object-contain logo-header"
              onClick={handleLogoClick}
            />
            <Button type="link" className="ml-5 text-black">
              {data?.netSbsName || t('header.home')}
            </Button>
          </div>
          <div className="lang-select-topnav">
            {name && (
              <>
                <Typography.Text className="mr-12">{name}</Typography.Text>
                <Button
                  type="primary"
                  className="mr-20 lang-select_logout"
                  icon={<Logout className="mr-5" />}
                  onClick={onLogout}
                >
                  {t('header.logout')}
                </Button>
              </>
            )}
            <div className="mobile_responsive">
              <LangSelect />
            </div>
          </div>
          {/** toggle search and menu mobile*/}
          <div className="toggle-mobile">
            <Button
              type="primary"
              size="small"
              className="w-full toggle-mobile-button"
              onClick={() => {
                setToggleMenuMobile(!toggleMenu);
              }}
            >
              <MenuOutlined />
            </Button>
          </div>
          {toggleMenu && <AppMenuMobile />}
        </Layout.Header>
      </Layout>
    </Layout>
  );
};

export default TopNav;
