import React from 'react';
import { Col, Row } from 'antd';
import { t } from 'src/libs/i18n';
import { EditorField, FileUploadField, InputField } from 'src/components/form';
import { FormValue } from '../useForm';
import { Control } from 'react-hook-form/dist/types/form';

type Props = {
  control: Control<FormValue, any>;
  index: number;
};

const LanguageItem: React.FC<Props> = (props) => {
  const { control, index } = props;

  return (
    <>
      <Row className="mt-20" gutter={[0, 6]}>
        <Col xs={24} sm={24} lg={24} className="group-input input-textarea">
          <InputField<FormValue>
            label={t('notification_setting.required')}
            controller={{
              control,
              name: `notifications.${index}.title`,
            }}
            labelCol={{ xs: 24, md: 3 }}
            wrapperCol={{ xs: 24, md: 21 }}
            required
          />
        </Col>
      </Row>
      <Row className="mt-20" gutter={[0, 6]}>
        <Col xs={24} sm={24} lg={24} className="group-input">
          <EditorField<FormValue>
            className="pl-20"
            controller={{
              control,
              name: `notifications.${index}.text`,
            }}
            label={t('notification_setting.text')}
          />
        </Col>
      </Row>
      <Row>
        <Col xl={4} md={4} className="mt-20 mb-25">
          <span className="mt-10 title">
            {t('notification_setting.attachment')}
          </span>
        </Col>
        <Col xs={20} md={20} xl={20}>
          <FileUploadField<FormValue>
            className="mb-0 upload-file"
            controller={{
              control,
              name: `notifications.${index}.upload_file`,
            }}
          />
        </Col>
      </Row>
    </>
  );
};
export default LanguageItem;
