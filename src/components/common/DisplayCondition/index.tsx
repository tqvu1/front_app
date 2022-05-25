import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { DisplayCondition } from 'src/enums/notification';

type Props = {
  display: DisplayCondition | undefined;
};

const DisplayConditionText: React.FC<Props> = ({ display }) => {
  const { t } = useTranslation();
  let text: ReactNode;

  switch (display) {
    case DisplayCondition.FRONT_SITE:
      text = <div>{t('notification_setting.front_site')}</div>;
      break;
    case DisplayCondition.LOGIN_PAGE:
      text = <div>{t('notification_setting.login_page')}</div>;
      break;
    case DisplayCondition.BOTH:
      text = (
        <React.Fragment>
          <div>{t('notification_setting.login_page')}</div>
          <div>{t('notification_setting.front_site')}</div>
        </React.Fragment>
      );
      break;
    default:
      text = '';
  }

  return <span>{text}</span>;
};

export default DisplayConditionText;
