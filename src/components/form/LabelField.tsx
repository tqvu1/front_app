import React from 'react';
import { Form, FormItemProps } from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';

type Props<T> = {
  controller: UseControllerProps<T>;
} & Omit<FormItemProps, 'children'>;

function LabelField<T extends Record<string, any>>(props: Props<T>) {
  const { controller, label, ...rest } = props;
  const { field } = useController<T>(controller);

  return (
    <Form.Item
      colon={false}
      label={label}
      labelAlign="left"
      labelCol={label ? { span: 24 } : undefined}
      wrapperCol={label ? { span: 24 } : undefined}
      {...rest}
    >
      <span className="ant-form-text">{field.value}</span>
    </Form.Item>
  );
}

export default LabelField;
