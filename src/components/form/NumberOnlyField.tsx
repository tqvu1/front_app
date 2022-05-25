import React, { useEffect, useState } from 'react';
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

type Props<T> = {
  inputProps?: InputProps;
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
} & Omit<FormItemProps, 'children'>;

function NumberOnlyField<T extends Record<string, any>>(props: Props<T>) {
  const { inputProps, controller, errorCol = 24, label, ...rest } = props;
  const { fieldState, field } = useController<T>(controller);
  const { error } = fieldState;
  const [val, setVal] = useState<number>(0);

  useEffect(() => {
    if (field.value || field.value === 0) {
      setVal(field.value);
    }
  }, [field.value]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;

    if ((!isNaN(Number(value)) && reg.test(value)) || value === '') {
      field.onChange(value);
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
                onChange={onChangeInput}
                value={val || ''}
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
    </Form.Item>
  );
}

export default NumberOnlyField;
