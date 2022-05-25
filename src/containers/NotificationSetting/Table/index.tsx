import {
  Table as AntTable,
  Typography,
  Card,
  Button,
  Row,
  Col,
  Space,
} from 'antd';
import React, { useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import Modal from 'src/components/custom/Modal';
import ModalNotification from '../NotificationSettingModal/index';
import _ from 'lodash';

import useTable from './useTable';
import { t } from 'src/libs/i18n';
import useNotificationSetting from 'src/queries/useNotificationSetting';

const Table: React.FC = () => {
  const { tableProps, rowSelected, postFlgData } = useTable();
  const { updatePostFlg, deleteNotification } = useNotificationSetting();
  const [message, setMessage] = useState<string>('');

  const handleEditRegister = () => {
    setMessage('');
    switch (rowSelected.length) {
      case 0:
        console.log('redirect R2501) お知らせ登録ポップアップ');
        break;
      case 1:
        console.log('redirect Edit R2501) お知らせ登録ポップアップ');
        break;
      case 2:
        setMessage(t('message.E000026'));
        break;
    }
  };

  const handleUpdate = async () => {
    // handle update post flag data
    // just update selected row
    await updatePostFlg.mutate({
      rmOsirases: _.filter(postFlgData, (item) =>
        rowSelected.includes(Number(item.seqno)),
      ),
    });
  };

  const handleDelete = async () => {
    // handle delete notification
    // just delete selected row
    await deleteNotification.mutate({
      seqnos: rowSelected,
    });
  };

  return (
    <React.Fragment>
      <Row justify="center" className="error_container">
        {_.isEmpty(tableProps.dataSource) && (
          <Typography.Paragraph>{t('message.E000025')}</Typography.Paragraph>
        )}
        {message && <Typography.Paragraph>{message}</Typography.Paragraph>}
      </Row>
      <div className="table">
        <Card
          title={
            <Row>
              <Col xs={24} md={12} xl={12} className="table_title">
                <Typography.Title level={2}>
                  {t('notification_setting.table_title')}
                </Typography.Title>
              </Col>
              <Col xs={24} md={12} xl={12}>
                <Space className="d-flex justify-end table_button">
                  <Modal
                    modalProps={{
                      width: 840,
                    }}
                    title={t('notification_setting.modal_title')}
                    content={({ onClose }) => (
                      <ModalNotification onClose={onClose} />
                    )}
                  >
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={handleEditRegister}
                    >
                      {t('button.register_edit')}
                    </Button>
                  </Modal>
                  <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={handleUpdate}
                    loading={updatePostFlg.isLoading}
                    disabled={!rowSelected.length}
                  >
                    {t('button.reload')}
                  </Button>
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                    loading={deleteNotification.isLoading}
                    disabled={!rowSelected.length}
                  >
                    {t('button.delete')}
                  </Button>
                </Space>
              </Col>
            </Row>
          }
          className="custom_card"
        >
          <AntTable {...tableProps} />
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Table;
