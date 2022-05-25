import React from 'react';
import { Checkbox, Col, Form, FormItemProps, Row, Typography } from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { Info } from 'src/components/icon';
import { CheckboxGroupProps } from 'antd/es/checkbox';

type Props<T> = {
  checkboxGroupProps?: CheckboxGroupProps;
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
  helper?: React.ReactNode;
} & Omit<FormItemProps, 'children'>;

function CheckboxGroupField<T extends Record<string, any>>(props: Props<T>) {
  const {
    checkboxGroupProps,
    controller,
    errorCol = 24,
    label,
    helper,
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
          <Row gutter={8}>
            <Col span={24}>
              <Checkbox.Group
                {...checkboxGroupProps}
                {...field}
                style={{ width: '100%' }}
              />
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
              <Info />
              {error.message}
            </Typography.Text>
          )}
        </Col>
      </Row>
      <span className="text-secondary">{helper}</span>
    </Form.Item>
  );
}

export default CheckboxGroupField;
