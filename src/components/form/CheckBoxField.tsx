import React from 'react';
import { Checkbox, CheckboxProps, Form, FormItemProps } from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';

type Props<T> = {
  checkboxProps?: CheckboxProps;
  controller: UseControllerProps<T>;
} & Omit<FormItemProps, 'children'>;

function CheckBoxField<T extends Record<string, any>>(props: Props<T>) {
  const { checkboxProps, controller, label, ...rest } = props;
  const { fieldState, field } = useController<T>(controller);
  const { isTouched, error } = fieldState;

  return (
    <Form.Item
      colon={false}
      labelAlign="left"
      validateStatus={isTouched && error ? 'error' : ''}
      {...rest}
      className="custom_checkbox"
    >
      <Checkbox {...checkboxProps} {...field} style={{ width: '100%' }}>
        {label}
      </Checkbox>
    </Form.Item>
  );
}

export default CheckBoxField;
