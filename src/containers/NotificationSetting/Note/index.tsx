import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Note: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="note">
      <Typography.Paragraph>
        {t('notification_setting.note_1')}
      </Typography.Paragraph>
      <Typography.Paragraph className="mt-10">
        {t('notification_setting.note_2')}
      </Typography.Paragraph>
    </div>
  );
};

export default Note;
