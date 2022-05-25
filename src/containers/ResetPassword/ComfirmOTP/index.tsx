import React from 'react';
import { Button, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import useForm, { FormValue } from './useForm';
import useVerifyOTP from 'src/queries/useVerifyOTP';
import { InputField, NumberOnlyField } from 'src/components/form';

type Props = {
  onConfirmOTP?: (data) => void;
};

const ConfirmOTP: React.FC<Props> = ({ onConfirmOTP }) => {
  const { control, handleSubmit, setError, getValues } = useForm();
  const { t } = useTranslation();

  const onVerifyOTP = (val) => {
    let payload = {
      email: val.email,
      token: val.otp,
    };
    mutation.mutate(payload);
  };

  const onSuccess = (data) => {
    onConfirmOTP &&
      onConfirmOTP({
        resetToken: data.item,
        email: getValues('email'),
      });
  };

  const mutation = useVerifyOTP({ setError, onSuccess });

  return (
    <Form
      layout="vertical"
      className="reset_pass_form"
      onFinish={handleSubmit((val) => onVerifyOTP(val))}
    >
      <InputField<FormValue>
        controller={{ control, name: 'email' }}
        inputProps={{
          placeholder: t('auth_form.email_placeholder'),
          minLength: 1,
          maxLength: 80,
        }}
        label={t('auth_form.email_label')}
        required
      />
      <NumberOnlyField<FormValue>
        controller={{ control, name: 'otp' }}
        inputProps={{
          placeholder: t('auth_form.otp_placeholder'),
          minLength: 6,
          maxLength: 6,
        }}
        label={t('auth_form.otp_label')}
        required
      />
      <Row justify="center">
        <Col xs={16} sm={15} md={14}>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={mutation.isLoading}
          >
            {t('reset_password.button_confirm')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ConfirmOTP;
