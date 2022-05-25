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
import { Arrow, Info } from 'src/components/icon';
import { DatePicker } from 'src/components/custom';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'src/constants/app';

type Props<T> = {
  datePickerPropsFrom?: DatePickerProps;
  datePickerPropsTo?: DatePickerProps;
  controllerFrom: UseControllerProps<T>;
  controllerTo: UseControllerProps<T>;
  errorCol?: 12 | 24;
} & Omit<FormItemProps, 'children'>;

function DateRangePickerField<T extends Record<string, any>>(props: Props<T>) {
  const {
    datePickerPropsFrom,
    datePickerPropsTo,
    controllerFrom,
    controllerTo,
    errorCol = 24,
    label,
    ...rest
  } = props;
  const { fieldState: fieldStateFrom, field: fieldFrom } =
    useController<T>(controllerFrom);
  const { fieldState: fieldStateTo, field: fieldTo } =
    useController<T>(controllerTo);
  const { isTouched: isTouchedFrom, error: errorFrom } = fieldStateFrom;
  const { isTouched: isTouchedTo, error: errorTo } = fieldStateTo;

  return (
    <Form.Item
      colon={false}
      label={label}
      labelAlign="left"
      labelCol={label ? { span: 24 } : undefined}
      wrapperCol={label ? { span: 24 } : undefined}
      validateStatus={
        (isTouchedFrom || isTouchedTo) && (errorFrom || errorTo) ? 'error' : ''
      }
      {...rest}
    >
      <Row gutter={4}>
        <Col span={errorCol}>
          <Row gutter={8} justify="space-between">
            <Col span={11}>
              <DatePicker
                style={{ width: '100%' }}
                {...datePickerPropsFrom}
                {...fieldFrom}
                format={datePickerPropsFrom?.format || DATE_FORMAT}
                onChange={(e, dateString) => {
                  fieldFrom.onChange(dateString);
                }}
                value={fieldFrom.value ? dayjs(fieldFrom.value) : undefined}
              />
            </Col>
            <Col span={2} style={{ margin: 'auto', textAlign: 'center' }}>
              <Arrow />
            </Col>
            <Col span={11}>
              <DatePicker
                style={{ width: '100%' }}
                {...datePickerPropsTo}
                {...fieldTo}
                format={datePickerPropsTo?.format || DATE_FORMAT}
                onChange={(e, dateString) => {
                  fieldTo.onChange(dateString);
                }}
                value={fieldTo.value ? dayjs(fieldTo.value) : undefined}
              />
            </Col>
          </Row>
        </Col>
        <Col span={errorCol}>
          {(errorFrom || errorTo) && (
            <Typography.Text
              className="ant-form-item-explain ant-form-item-explain-error"
              type="danger"
              ellipsis={{ tooltip: true }}
            >
              <Info />
              {errorFrom && errorFrom.message}
              {errorTo && errorTo.message}
            </Typography.Text>
          )}
        </Col>
      </Row>
    </Form.Item>
  );
}

export default DateRangePickerField;
