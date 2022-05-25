import React from 'react';
import { Button, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import useForm, { FormValue } from './useForm';
import useResetPass from 'src/queries/useResetPass';
import { InputField } from 'src/components/form';

type Props = {
  resetToken?: any;
  email: string;
};

const ResetPass: React.FC<Props> = ({ resetToken, email }) => {
  const { control, handleSubmit } = useForm();
  const { t } = useTranslation();
  const mutation = useResetPass();

  const onResetPass = (val) => {
    let payload = {
      email: email,
      tokenPassword: resetToken,
      password: val.new_password,
      rePassword: val.re_password,
    };
    mutation.mutate(payload);
  };
  return (
    <Form
      layout="vertical"
      className="reset_pass_form"
      onFinish={handleSubmit((val) => onResetPass(val))}
    >
      <InputField<FormValue>
        controller={{ control, name: 'new_password' }}
        inputProps={{
          placeholder: t('auth_form.new_password_placeholder'),
          type: 'password',
          minLength: 8,
          maxLength: 88,
        }}
        label={t('auth_form.new_password_label')}
        required
      />
      <InputField<FormValue>
        controller={{ control, name: 're_password' }}
        name="confirm_new_password"
        inputProps={{
          placeholder: t('auth_form.confirm_new_password_placeholder'),
          type: 'password',
          minLength: 8,
          maxLength: 88,
        }}
        label={t('auth_form.confirm_new_password_label')}
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
            {t('reset_password.button_reset')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ResetPass;
