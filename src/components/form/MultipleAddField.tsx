import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Col,
  Form,
  FormItemProps,
  Input,
  InputProps,
  Row,
  Tag,
  Typography,
} from 'antd';
import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { Info } from 'src/components/icon';

type Props<T> = {
  inputProps?: InputProps;
  errorCol?: 12 | 24;
  form: UseFormReturn<T>;
  name: Path<T>;
  helper?: React.ReactNode;
  type?: 'tag' | 'line';
  defaultValue?: string[];
} & Omit<FormItemProps, 'children'>;

type AddRowProps = {
  text: string;
  onClick?: () => void;
};

const RowAdded = ({ text, onClick }: AddRowProps) => {
  return (
    <div className="d-flex justify-between align-center">
      <span>· {text}</span>
      <Info
        w={16}
        h={16}
        fill="#999"
        className="cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};

function MultipleAddField<T extends Record<string, any>>(props: Props<T>) {
  const {
    inputProps,
    errorCol = 24,
    label,
    form,
    name,
    helper,
    type = 'line',
    defaultValue = [],
    ...rest
  } = props;
  const { formState, setValue, clearErrors, getValues } = form;
  const { errors, touchedFields } = formState;
  const { t } = useTranslation();
  const [text, setText] = useState<string>('');
  const [values, setValues] = useState<string[]>(defaultValue);
  const fieldErrors = errors as FieldErrors;
  const fieldTouched = touchedFields as { [P: string]: any };

  useEffect(() => {
    setValue(name, defaultValue as any);
  }, []);

  useEffect(() => {
    setValues(getValues(name) || defaultValue);
  }, [getValues(name)]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onClick = () => {
    if (!text) return;
    setValues([...values, text]);
    setValue(name, [...values, text] as any);
    clearErrors(name);
    setText('');
  };

  const removeTag = (v) => {
    const vals = values.filter((val, i) => i !== v);
    setValues(vals);
    setValue(name, vals as any);
  };

  return (
    <Form.Item
      colon={false}
      label={label}
      labelAlign="left"
      labelCol={label ? { span: 24 } : undefined}
      wrapperCol={label ? { span: 24 } : undefined}
      validateStatus={fieldTouched[name] && fieldErrors[name] ? 'error' : ''}
      {...rest}
    >
      <Row gutter={4}>
        <Col span={errorCol}>
          <Row style={{ width: '100%' }}>
            <Col flex="auto">
              <Input
                {...inputProps}
                onChange={onChangeInput}
                value={text}
                style={{ width: '100%' }}
              />
            </Col>
            <Col>
              <Button type="primary" onClick={onClick}>
                {t('button.add')}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={errorCol}>
          {fieldErrors[name] && (
            <Typography.Text
              className="ant-form-item-explain ant-form-item-explain-error"
              type="danger"
              ellipsis={{ tooltip: true }}
              style={{ lineHeight: errorCol === 24 ? '16px' : '42px' }}
            >
              <Info />
              {fieldErrors[name].message}
            </Typography.Text>
          )}
        </Col>
      </Row>
      <Row className="mt-8">
        {type === 'line' &&
          values.map((v, i) => {
            return (
              <Col key={i} span={24}>
                <RowAdded text={v} onClick={() => removeTag(i)} />
              </Col>
            );
          })}
        {type === 'tag' &&
          values.map((v, i) => {
            return (
              <Tag
                visible
                closable
                key={i}
                className="multiple_add_tag"
                onClose={() => removeTag(i)}
              >
                {v}
              </Tag>
            );
          })}
      </Row>
      <span className="text-secondary">{helper}</span>
    </Form.Item>
  );
}

export default MultipleAddField;
