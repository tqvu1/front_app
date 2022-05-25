import React from 'react';
import { Form, FormItemProps, Input } from 'antd';
import { useController, UseControllerProps } from 'react-hook-form';
import { SearchProps } from 'antd/lib/input/Search';

type Props<T> = {
  controller: UseControllerProps<T>;
  searchProps?: SearchProps;
} & Omit<FormItemProps, 'children'>;

function SearchField<T extends Record<string, any>>(props: Props<T>) {
  const { controller, searchProps, ...rest } = props;
  const { field } = useController<T>(controller);

  return (
    <Form.Item
      colon={false}
      labelAlign="left"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      {...rest}
    >
      <Input.Search {...searchProps} {...field} />
    </Form.Item>
  );
}

export default SearchField;
