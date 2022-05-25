import { Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const BottomNote: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography.Paragraph className="mt-10 note">
        {t('basic_setting.note_3')}
      </Typography.Paragraph>
      <Typography.Paragraph className="note">
        {t('basic_setting.note_4')}
      </Typography.Paragraph>
      <Typography.Paragraph className="note">
        {t('basic_setting.note_5')}
      </Typography.Paragraph>
    </div>
  );
};

export default BottomNote;
