import React from 'react';
import { Menu, Layout } from 'antd';

import useMenu from 'src/hooks/useMenu';

const AppMenu: React.FC = () => {
  const { menuItems, getSelectedKey } = useMenu('main');

  return (
    <Layout className={'main-menu'}>
      <div className={'container-lg menu-container'}>
        <div className={'header-menu'}>
          <Menu
            mode="horizontal"
            items={menuItems}
            defaultSelectedKeys={getSelectedKey()}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AppMenu;
