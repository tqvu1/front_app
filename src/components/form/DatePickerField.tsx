import React from 'react';
import {
  Col,
  Form,
  FormItemProps,
  DatePickerProps,
  Row,
  Typography,
} from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { Info } from 'src/components/icon';
import { DatePicker } from 'src/components/custom';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'src/constants/app';

type Props<T> = {
  datePickerProps?: DatePickerProps;
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
} & Omit<FormItemProps, 'children'>;

function DatePickerField<T extends Record<string, any>>(props: Props<T>) {
  const { datePickerProps, controller, errorCol = 24, label, ...rest } = props;
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
          <Row gutter={8}>
            <Col span={24}>
              <DatePicker
                style={{ width: '100%' }}
                {...datePickerProps}
                {...field}
                format={datePickerProps?.format || DATE_FORMAT}
                onChange={(e, dateString) => {
                  field.onChange(dateString);
                }}
                value={field.value ? dayjs(field.value) : undefined}
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

export default DatePickerField;
