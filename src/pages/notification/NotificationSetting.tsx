import React from 'react';

import Container from 'src/containers/NotificationSetting';
import { t } from 'src/libs/i18n';
import useTitle from 'src/hooks/useTitle';

const Page: React.FC = () => {
  useTitle(t('notification_setting.page_title'));
  return <Container />;
};

export const PATH = '/notification_setting' as const;
export default Page;
