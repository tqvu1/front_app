import React from 'react';
import {
  Col,
  Form,
  FormItemProps,
  Row,
  Typography,
  AutoComplete,
  AutoCompleteProps,
} from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { Info } from 'src/components/icon';

type Props<T> = {
  autoCompleteProps?: AutoCompleteProps;
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
  hasErrorTick?: boolean;
} & Omit<FormItemProps, 'children'>;

function AutoSuggestField<T extends Record<string, any>>(props: Props<T>) {
  const {
    autoCompleteProps,
    controller,
    errorCol = 24,
    label,
    hasErrorTick,
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
              <AutoComplete
                {...autoCompleteProps}
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
              {hasErrorTick && <Info />}
              {error.message}
            </Typography.Text>
          )}
        </Col>
      </Row>
    </Form.Item>
  );
}

export default AutoSuggestField;
