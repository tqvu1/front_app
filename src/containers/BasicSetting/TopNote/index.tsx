import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const TopNote: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography.Paragraph className="mt-20 note">
        {t('basic_setting.note_1')}
      </Typography.Paragraph>
      <Typography.Paragraph className="mb-20 note">
        {t('basic_setting.note_2')}
      </Typography.Paragraph>
    </div>
  );
};

export default TopNote;
