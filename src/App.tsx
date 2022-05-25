import React from 'react';
import { ConfigProvider } from 'antd';
import { useRoutes } from 'react-router-dom';

import ja_JP from 'antd/es/locale/ja_JP';
import AppProvider from 'src/store';
import routeConfig from 'src/routes';

import 'src/styles/index.less';

function App() {
  const routes = useRoutes(routeConfig);
  return (
    <ConfigProvider locale={ja_JP}>
      <AppProvider>{routes}</AppProvider>
    </ConfigProvider>
  );
}

export default App;
