import React from 'react';
import {
  Col,
  Form,
  FormItemProps,
  TimePickerProps,
  Row,
  Typography,
  TimePicker,
} from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { Info } from 'src/components/icon';
import dayjs from 'dayjs';
import { HOUR_MIN } from 'src/constants/app';

type Props<T> = {
  timePickerProps?: TimePickerProps;
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
  parserFormat?: string;
} & Omit<FormItemProps, 'children'>;

function TimePickerField<T extends Record<string, any>>(props: Props<T>) {
  const {
    timePickerProps,
    controller,
    errorCol = 12,
    parserFormat = HOUR_MIN,
    ...rest
  } = props;
  const { fieldState, field } = useController<T>(controller);
  const { isTouched, error } = fieldState;

  return (
    <Form.Item
      colon={false}
      labelAlign="left"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      validateStatus={isTouched && error ? 'error' : ''}
      {...rest}
    >
      <Row gutter={4}>
        <Col span={errorCol}>
          <TimePicker
            {...timePickerProps}
            {...field}
            value={dayjs(field.value, parserFormat)}
            style={{ width: '100%' }}
            onChange={(d) =>
              field.onChange(
                dayjs(d, timePickerProps?.format as string).format(
                  parserFormat,
                ),
              )
            }
          />
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

export default TimePickerField;
