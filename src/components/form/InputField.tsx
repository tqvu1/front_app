import React from 'react';
import {
  Col,
  Form,
  FormItemProps,
  Input,
  InputProps,
  Row,
  Typography,
} from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { Info } from 'src/components/icon';
import { mbStrWidth } from 'src/utils/helper';

type Props<T> = {
  inputProps?: InputProps;
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
} & Omit<FormItemProps, 'children'>;

function InputField<T extends Record<string, any>>(props: Props<T>) {
  const { inputProps, controller, errorCol = 24, label, ...rest } = props;
  const { fieldState, field } = useController<T>(controller);
  const { error } = fieldState;

  const onChange = (v) => {
    if (inputProps?.maxLength) {
      if (mbStrWidth(v.target.value) <= inputProps?.maxLength) {
        field.onChange(v);
      }
    } else {
      field.onChange(v);
    }
  };

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
              <Input
                {...inputProps}
                {...field}
                style={{ width: '100%' }}
                onChange={onChange}
              />
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
