import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { InternalPICModal } from 'src/components/common';

import { Modal } from 'src/components/custom';

const InternalPIC: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-30 mt-30 content_home">
      <Modal
        modalProps={{ width: 840 }}
        title={t('internal_pic.title')}
        content={({ onClose }) => <InternalPICModal onClose={onClose} />}
      >
        <Button>open modal</Button>
      </Modal>
    </div>
  );
};

export default InternalPIC;
