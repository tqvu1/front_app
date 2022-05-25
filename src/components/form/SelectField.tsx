import React from 'react';
import {
  Col,
  Form,
  FormItemProps,
  SelectProps,
  Row,
  Select,
  Typography,
} from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { Info } from 'src/components/icon';

type Props<T> = {
  selectProps?: SelectProps<any>;
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
} & Omit<FormItemProps, 'children'>;

function InputField<T extends Record<string, any>>(props: Props<T>) {
  const { selectProps, controller, errorCol = 24, label, ...rest } = props;
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
          <Row gutter={8}>
            <Col span={24}>
              <Select {...selectProps} {...field} style={{ width: '100%' }} />
            </Col>
          </Row>
        </Col>
        {error && (
          <Col span={errorCol}>
            <Typography.Text
              className="ant-form-item-explain ant-form-item-explain-error"
              type="danger"
              ellipsis={{ tooltip: true }}
              style={{ lineHeight: errorCol === 24 ? '16px' : '42px' }}
            >
              <Info />
              {error.message}
            </Typography.Text>
          </Col>
        )}
      </Row>
    </Form.Item>
  );
}

export default InputField;
