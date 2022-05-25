import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { ItemType } from 'antd/lib/menu/hooks/useItems';

const useMenu = (type: string) => {
  const { t } = useTranslation();
  const location = useLocation();

  const getSelectedKey = () => {
    const key = location.pathname.split('/')[1];
    return [`/${key}`];
  };

  const menuItems: ItemType[] = [
    {
      key: '/',
      label: <Link to={'/'}>{t('menu_home.quotation_order_history')}</Link>,
    },
    {
      key: '/basic_setting',
      label: <Link to={'/basic_setting'}>{t('menu_home.basic_setting')}</Link>,
    },
    {
      key: '/notification_setting',
      label: (
        <Link to={'/notification_setting'}>
          {t('menu_home.notification_setting')}
        </Link>
      ),
    },
    {
      key: '/customer_setting',
      label: (
        <Link to={'/customer_setting'}>{t('menu_home.customer_setting')}</Link>
      ),
    },
    {
      key: '/tax_exchange_setting',
      label: (
        <Link to={'/tax_exchange_setting'}>
          {t('menu_home.tax_exchange_setting')}
        </Link>
      ),
    },
    {
      key: '/master_registration',
      label: (
        <Link to={'/master_registration'}>
          {t('menu_home.master_registration')}
        </Link>
      ),
    },
    {
      key: '/pdf_registration',
      label: (
        <Link to={'/pdf_registration'}>{t('menu_home.pdf_registration')}</Link>
      ),
    },
    {
      key: '/plugin_registration',
      label: (
        <Link to={'/plugin_registration'}>
          {t('menu_home.plugin_registration')}
        </Link>
      ),
    },
  ];
  return {
    menuItems,
    getSelectedKey,
  };
};

export default useMenu;
