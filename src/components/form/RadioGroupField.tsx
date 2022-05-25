import React from 'react';
import {
  Col,
  Form,
  FormItemProps,
  Radio,
  RadioGroupProps,
  Row,
  Typography,
} from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { Info } from 'src/components/icon';

type Props<T> = {
  radioGroupProps?: RadioGroupProps;
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
} & Omit<FormItemProps, 'children'>;

function RadioGroupField<T extends Record<string, any>>(props: Props<T>) {
  const { radioGroupProps, controller, errorCol = 24, label, ...rest } = props;
  const { fieldState, field } = useController<T>(controller);
  const { isTouched, error } = fieldState;

  return (
    <Form.Item
      colon={false}
      label={label}
      labelAlign="left"
      labelCol={label ? { span: 24 } : undefined}
      wrapperCol={label ? { span: 24 } : undefined}
      validateStatus={isTouched && error ? 'error' : ''}
      {...rest}
    >
      <Row gutter={4}>
        <Col span={errorCol}>
          <Radio.Group
            {...radioGroupProps}
            {...field}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={errorCol}>
          {error && (
            <Typography.Text
              className="ant-form-item-explain ant-form-item-explain-error"
              type="danger"
              ellipsis={{ tooltip: true }}
              style={{ lineHeight: errorCol === 24 ? '16px' : '42px' }}
            >
              <Info />
              {error.message}
            </Typography.Text>
          )}
        </Col>
      </Row>
    </Form.Item>
  );
}

export default RadioGroupField;
