import React from 'react';
import {
  Col,
  Form,
  FormItemProps,
  InputNumber,
  InputNumberProps,
  Row,
  Typography,
} from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { Info } from 'src/components/icon';

type Props<T> = {
  inputNumberProps?: InputNumberProps;
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
  helper?: React.ReactNode;
} & Omit<FormItemProps, 'children'>;

function InputNumberField<T extends Record<string, any>>(props: Props<T>) {
  const {
    inputNumberProps,
    controller,
    errorCol = 24,
    label,
    helper,
    ...rest
  } = props;
  const { fieldState, field } = useController<T>(controller);
  const { error } = fieldState;

  const onChange = (v: number | string) => {
    if (v === null) {
      field.onChange(field.value || controller.defaultValue);
      return;
    }
    field.onChange(v);
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
          <Row gutter={8} align="middle">
            <Col>
              <InputNumber
                {...inputNumberProps}
                {...field}
                style={props.style}
                onChange={onChange}
              />
            </Col>
            <Col flex="auto">
              {helper && <span className="text-secondary">{helper}</span>}
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
    </Form.Item>
  );
}

export default InputNumberField;
