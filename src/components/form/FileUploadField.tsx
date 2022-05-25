import React from 'react';
import { Button, Col, Form, FormItemProps, Row, Typography } from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { Info } from 'src/components/icon';
import { UploadProps } from 'antd/es/upload';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type Props<T> = {
  uploadFileProps?: UploadProps;
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
  maxCount?: number;
} & Omit<FormItemProps, 'children'>;

function FileUploadField<T extends Record<string, any>>(props: Props<T>) {
  const {
    uploadFileProps,
    controller,
    errorCol = 24,
    maxCount,
    label,
    ...rest
  } = props;
  const { fieldState, field } = useController<T>(controller);
  const { error } = fieldState;

  return (
    <Form.Item
      colon={false}
      label={label}
      labelAlign="left"
      labelCol={label ? { span: 24 } : undefined}
      wrapperCol={label ? { span: 24 } : undefined}
      validateStatus={error ? 'error' : ''}
      {...rest}
    >
      <Row gutter={4}>
        <Col span={errorCol}>
          <Row gutter={16}>
            <Col span={24} className="file_name">
              <Upload
                maxCount={maxCount ?? 1}
                beforeUpload={(file) => {
                  return false;
                }}
                {...uploadFileProps}
                onChange={field.onChange}
                name={field.name}
                ref={field.ref}
              >
                <Button
                  type="primary"
                  className="w-full upload_file"
                  icon={<UploadOutlined />}
                />
              </Upload>
            </Col>
          </Row>
        </Col>
        <Col span={errorCol}>
          {error && (
            <Typography.Text
              className="ant-form-item-explain ant-form-item-explain-error"
              type="danger"
              ellipsis={{ tooltip: true }}
              style={{ lineHeight: errorCol === 24 ? '16px' : '42px' }}
            >
              {error && <Info />}
              {error.message}
            </Typography.Text>
          )}
        </Col>
      </Row>
    </Form.Item>
  );
}

export default FileUploadField;
