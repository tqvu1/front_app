import React, { useEffect, useState } from 'react';
import {
  Col,
  Form,
  FormItemProps,
  Row,
  Typography,
  Upload,
  UploadProps,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import { ShowUploadListInterface, UploadFile } from 'antd/lib/upload/interface';
import { useController, UseControllerProps } from 'react-hook-form';

import { Info } from 'src/components/icon';
import defaultUploadSrc from 'src/assets/defaultUpload.png';
import { fileSize, fileTypes } from 'src/constants/app';
import { preSignedImage, uploadImage } from 'src/utils/uploadImage';

type Props<T> = {
  controller: UseControllerProps<T>;
  errorCol?: 12 | 24;
  maxCount?: number;
  helper?: React.ReactNode;
  children?: React.ReactElement;
  showUploadList?: boolean | ShowUploadListInterface;
} & Omit<FormItemProps, 'children'>;

function ImageUploadField<T extends Record<string, any>>(props: Props<T>) {
  const {
    controller,
    errorCol = 24,
    label,
    helper,
    children,
    maxCount = 10,
    showUploadList,
    ...rest
  } = props;
  const { fieldState, field } = useController<T>(controller);
  const { error } = fieldState;
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setFileList(
      field.value?.map((img: Response.Image) => {
        return {
          uid: img.id,
          url: img.path,
        };
      }),
    );
  }, [field.value]);

  const setFile = (
    origin: RcFile,
    options: Omit<UploadFile, 'uid' | 'name'>,
  ) => {
    setFileList(
      fileList.map((f) => {
        if (origin.uid !== f.uid) return f;
        return {
          ...options,
          uid: f.uid,
          name: f.name,
          percent: Math.floor(Math.random() * 21) + 50,
        };
      }),
    );
  };

  const uploadProps: UploadProps = {
    beforeUpload(file) {
      const fileTypeError = file?.type && !fileTypes.includes(file.type);
      const fileSizeError = file && file.size / 1024 / 1024 > fileSize;

      if (!fileSizeError && !fileTypeError) {
        setFile(file, {
          status: 'uploading',
          percent: Math.floor(Math.random() * 21) + 10,
        });
        setFileList([
          ...fileList,
          {
            status: 'uploading',
            name: file.name,
            uid: file.uid,
          },
        ]);
        return true;
      } else {
        setFileList([
          ...fileList,
          {
            status: 'error',
            name: file.name,
            uid: file.uid,
          },
        ]);
        return false;
      }
    },
    async action(file) {
      try {
        const res = await preSignedImage(file);
        setFile(file, {
          status: 'uploading',
          percent: Math.floor(Math.random() * 21) + 70,
        });

        await uploadImage(res.data.data, file);
        setFile(file, {
          status: 'success',
          url: URL.createObjectURL(file),
        });
        field.onChange([
          ...field.value,
          { id: res.data.data.id, path: URL.createObjectURL(file) },
        ]);
      } catch (err) {
        setFile(file, { status: 'error' });
      }

      return Promise.reject();
    },
    maxCount: maxCount,
    onRemove(file) {
      const newFileList = field.value?.filter((f) => file.uid !== f.id) || [];
      field.onChange(newFileList);
    },
    fileList,
    showUploadList: showUploadList,
  };

  return (
    <Form.Item
      className={`upload_image ${fileList?.length >= 10 ? 'hide' : ''}`}
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
              <Upload {...uploadProps} listType="picture-card">
                {children || (
                  <img src={defaultUploadSrc} width={150} height={150} />
                )}
              </Upload>
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
      <span className="text-secondary">{helper}</span>
    </Form.Item>
  );
}

export default ImageUploadField;
