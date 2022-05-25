import React from 'react';

import Container from 'src/containers/BasicSetting';
import useTitle from 'src/hooks/useTitle';
import { t } from 'src/libs/i18n';

const Page: React.FC = () => {
  useTitle(t('menu_home.basic_setting'));
  return <Container />;
};

export const PATH = '/basic_setting' as const;
export default Page;
