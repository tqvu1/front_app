import React, { useEffect, useState } from 'react';
import {
  AutoComplete,
  AutoCompleteProps,
  Button,
  ButtonProps,
  Checkbox,
  Col,
  Form,
  FormItemProps,
  Input,
  InputProps,
  Row,
  Select,
  SelectProps,
  Statistic,
  Typography,
} from 'antd';
import {
  FormState,
  useController,
  UseControllerProps,
  UseFormReturn,
  Controller,
  Control,
  FieldError,
} from 'react-hook-form';
import _ from 'lodash';
import { Info } from 'src/components/icon';
import defaultUploadSrc from 'src/assets/defaultUpload.png';
import uploadErrorSrc from 'src/assets/upload-error.png';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { fileSize, fileTypes } from 'src/constants/app';
import { preSignedImage, uploadImage } from 'src/utils/uploadImage';
import { CheckboxGroupProps } from 'antd/lib/checkbox';

type Props<T> = {
  controller: UseControllerProps<T>;
  context: UseFormReturn<T>;
  groupCols: number[];
  errorCol?: 12 | 24;
  helper?: React.ReactNode;
} & FormItemProps;

const FieldContext = React.createContext<
  (Props<any>['context'] & { control: Control<any> }) | undefined
>(undefined);

function GroupField<T extends Record<string, any>>(props: Props<T>) {
  const {
    controller,
    children,
    groupCols,
    context,
    errorCol = 24,
    helper,
    ...rest
  } = props;
  const { fieldState } = useController<T>(controller);
  const { error } = fieldState;
  const firstErr = error && (Object.values(error)[0] as FieldError);

  const childrenWithCol = React.Children.map(children, (child, index) => {
    return (
      <Col key={index} span={groupCols[index]}>
        {React.cloneElement(child as React.ReactElement, {
          style: { width: '100%' },
          ...(child as React.ReactElement).props,
        })}
      </Col>
    );
  });

  return (
    <Form.Item
      {...rest}
      colon={false}
      labelAlign="left"
      labelCol={props.labelCol || { span: 4 }}
      wrapperCol={props.wrapperCol || { span: 20 }}
      validateStatus={firstErr ? 'error' : ''}
    >
      <FieldContext.Provider
        value={{ ...context, control: controller.control! }}
      >
        <Row>
          <Col span={errorCol}>
            <Row
              gutter={6}
              style={{ width: '100%' }}
              className="group_field_row"
            >
              {childrenWithCol}
            </Row>
          </Col>
          {firstErr && (
            <Col span={errorCol}>
              <Typography.Text
                className="ant-form-item-explain ant-form-item-explain-error"
                type="danger"
                ellipsis={{ tooltip: true }}
              >
                <Info />
                {firstErr.message ? firstErr.message : firstErr}
              </Typography.Text>
            </Col>
          )}
        </Row>
        <span className="text-secondary">{helper}</span>
      </FieldContext.Provider>
    </Form.Item>
  );
}

type SymbolProps = {
  text: React.ReactNode;
};

// eslint-disable-next-line react/display-name
GroupField.Symbol = function ({ text }: SymbolProps) {
  return <span className="group_field_symbol">{text}</span>;
};

type GroupFieldInput = {
  name: string;
} & InputProps;

GroupField.Input = function GroupFieldInput(props: GroupFieldInput) {
  const { name, ...rest } = props;
  const { formState, control } = React.useContext(FieldContext) || {};
  const { errors } = formState as FormState<any>;
  const error = _.get(errors, name);

  return (
    <Form.Item validateStatus={error ? 'error' : ''} className="mb-0">
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return <Input {...field} {...rest} />;
        }}
      />
    </Form.Item>
  );
};

type GroupFieldCheckbox = {
  name: string;
} & CheckboxGroupProps;

GroupField.Checkbox = function GroupFieldCheckbox(props: GroupFieldCheckbox) {
  const { name, ...rest } = props;
  const { formState, control } = React.useContext(FieldContext) || {};
  const { errors } = formState as FormState<any>;
  const error = _.get(errors, name);

  return (
    <Form.Item validateStatus={error ? 'error' : ''} className="mb-0">
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return <Checkbox.Group {...field} {...rest} />;
        }}
      />
    </Form.Item>
  );
};

type GroupFieldInputNumber = {
  name: string;
} & InputProps;

GroupField.InputNumber = function GroupFieldInputNumber(
  props: GroupFieldInputNumber,
) {
  const { name, ...rest } = props;
  const { formState, control } = React.useContext(FieldContext) || {};
  const { errors } = formState as FormState<any>;
  const error = _.get(errors, name);

  const onKeyPress = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <Form.Item validateStatus={error ? 'error' : ''} className="mb-0">
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return <Input {...field} {...rest} onKeyPress={onKeyPress} />;
        }}
      />
    </Form.Item>
  );
};

type GroupFieldSelect = {
  name: string;
} & SelectProps<any>;

GroupField.Select = function GroupFieldSelect(props: GroupFieldSelect) {
  const { name, ...rest } = props;
  const { control, formState } = React.useContext(FieldContext) || {};
  const { errors } = formState as FormState<any>;

  const error = _.get(errors, name);

  return (
    <Form.Item validateStatus={error ? 'error' : ''} className="mb-0">
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return <Select {...field} {...rest} />;
        }}
      />
    </Form.Item>
  );
};

type GroupFieldButton = {
  onClick?: (value) => void;
  secondary?: boolean;
} & Omit<ButtonProps, 'onClick'>;

GroupField.Button = function GroupFieldButton(props: GroupFieldButton) {
  const { onClick, secondary = true, ...rest } = props;
  const { getValues } = React.useContext(FieldContext) || {};
  let cln: string = '';

  if (secondary) {
    cln = 'btn-secondary';
  }

  return (
    <Button
      {...rest}
      onClick={() => onClick?.(getValues?.())}
      className={`${cln} group_field_button`}
    >
      {props.children}
    </Button>
  );
};

type GroupFieldCountDownButton = {
  onClick?: (value) => void;
  secondary?: boolean;
  countdown?: number;
  format?: string;
  suffix?: string;
  prefix?: string;
} & Omit<ButtonProps, 'onClick'>;

GroupField.CountDownButton = function GroupFieldCountDownButton(
  props: GroupFieldCountDownButton,
) {
  const {
    onClick,
    secondary = true,
    countdown = 0,
    format = 'ss',
    suffix,
    prefix,
    loading,
    ...rest
  } = props;
  const { getValues } = React.useContext(FieldContext) || {};
  const [isCountDown, setIsCountDown] = useState<boolean>(false);

  const callbackOnChange = () => {
    setIsCountDown(true);
    return onClick ? onClick(getValues ? getValues : null) : null;
  };

  const onFinishCountDown = () => {
    setIsCountDown(false);
  };

  let cln: string = '';
  if (secondary) {
    cln = 'btn-secondary';
  }

  return (
    <Button
      {...rest}
      onClick={callbackOnChange}
      className={`${cln} group_field_button`}
      loading={countdown > 0 ? isCountDown : loading}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        width: '100%',
      }}
    >
      {isCountDown && countdown > 0 ? (
        <Statistic.Countdown
          value={countdown}
          format={format}
          suffix={suffix}
          prefix={prefix}
          onFinish={onFinishCountDown}
          style={{
            lineHeight: '100%',
          }}
        />
      ) : (
        props.children
      )}
    </Button>
  );
};

type AutoCompleteFieldProps = {
  name: string;
} & AutoCompleteProps;

GroupField.AutoComplete = function GroupFieldAutoComplete(
  props: AutoCompleteFieldProps,
) {
  const { name, ...rest } = props;
  const { control, formState } = React.useContext(FieldContext) || {};
  const { errors } = formState as FormState<any>;

  const error = _.get(errors, name);

  return (
    <Form.Item validateStatus={error ? 'error' : ''} className="mb-0">
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <AutoComplete
              // filterOption={(inputValue, option) =>
              //   option!.value
              //     .toUpperCase()
              //     .indexOf(inputValue.toUpperCase()) !== -1
              // }
              {...rest}
              {...field}
            />
          );
        }}
      />
    </Form.Item>
  );
};

type ImageUploadProps = {
  name: string;
};

GroupField.ImageUpload = function GroupFieldImageUpload({
  name,
}: ImageUploadProps) {
  const { control, formState, setValue, setError, getValues } =
    React.useContext(FieldContext) || {};
  const [file, setFile] = useState<File | undefined>();
  const [fileName, setFileName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  const { errors } = formState as FormState<any>;
  const error = _.get(errors, name);
  const fileTypeError = file?.type && !fileTypes.includes(file.type);
  const fileSizeError = file && file.size / 1024 / 1024 > fileSize;

  useEffect(() => {
    const preSignAndUpload = async () => {
      if (file && !fileTypeError && !fileSizeError) {
        try {
          setLoading(true);
          const res = await preSignedImage(file);
          await uploadImage(res.data.data, file);

          setId(res.data.data.id);
          setLoading(false);
        } catch (err) {
          const message = _.get(
            err,
            'response.data.errors[0].message',
            'Error',
          );
          setError?.(name, { message });
          setLoading(false);
        }
      }
    };
    preSignAndUpload();
  }, [file, fileTypeError, fileSizeError]);

  // react hook form is sida, cant set value in useEffect
  useEffect(() => {
    if (id) {
      setValue?.(name, { id });
    }
  }, [id]);

  const getImageUrl = () => {
    if (fileTypeError || fileSizeError || error) return uploadErrorSrc;

    if (file) return URL.createObjectURL(file);

    if (getValues?.(name)) return getValues?.(name).path;

    return defaultUploadSrc;
  };

  return (
    <Form.Item validateStatus={error ? 'error' : ''} className="mb-0">
      <Controller
        control={control}
        name={name}
        render={() => {
          return (
            <label
              className="image_upload"
              htmlFor={name}
              onClick={(e) => {
                if (file) {
                  e.preventDefault();
                }
              }}
            >
              <input
                onChange={(e) => {
                  setFileName(e.target.value);
                  setFile(e.target.files![0]);
                }}
                type="file"
                id={name}
                value={fileName}
                style={{ display: 'none' }}
              />
              <img
                className={`object-contain cursor-pointer ${
                  fileTypeError || fileSizeError ? 'error' : ''
                }`}
                width={150}
                height={150}
                src={getImageUrl()}
              />
              {loading && (
                <div className="overlay d-flex">
                  <div className="overlay_content">
                    <LoadingOutlined spin className="icon" />
                  </div>
                </div>
              )}
              {file && !loading && (
                <div className="overlay">
                  <div className="overlay_content">
                    <DeleteOutlined
                      className="icon"
                      onClick={() => {
                        setFileName('');
                        setValue?.(name, undefined);
                        setFile(undefined);
                      }}
                    />
                    <br />
                    <Typography.Text ellipsis>{file.name}</Typography.Text>
                  </div>
                </div>
              )}
            </label>
          );
        }}
      />
    </Form.Item>
  );
};

export default GroupField;
