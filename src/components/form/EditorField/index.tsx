import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-classic-plus';
import 'ckeditor5-classic-plus/build/translations/ja';
import { useController, UseControllerProps } from 'react-hook-form';
import { FormItemProps } from 'antd/lib/form';
import { Col, Form, Row, Typography } from 'antd';

import UploadAdapter from './UploadAdapter';
import { Info } from 'src/components/icon';
import { useAppContext } from 'src/store';

type Props<T> = {
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
} & Omit<FormItemProps, 'children'>;

function EditorField<T extends Record<string, any>>(props: Props<T>) {
  const { controller, errorCol = 24, label, ...rest } = props;
  const { fieldState, field } = useController<T>(controller);
  const { error } = fieldState;
  const [state] = useAppContext();

  function MyUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = function (
      loader,
    ) {
      return new UploadAdapter(loader);
    };
  }

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
              <CKEditor
                editor={ClassicEditor}
                config={{
                  language: state.lang || 'ja',
                  extraPlugins: [MyUploadAdapterPlugin],
                  toolbar: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    'fontColor',
                    'fontBackgroundColor',
                  ],
                }}
                data={controller.defaultValue}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  field.onChange({ target: { value: data } });
                }}
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

export default EditorField;
