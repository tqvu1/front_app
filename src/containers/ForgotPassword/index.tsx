import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useForm, { FormValue } from './useForm';
import { InputField } from 'src/components/form';
import logo from 'src/assets/logo.png';
import useLogo from 'src/queries/useLogo';
import useForgotPass from 'src/queries/useForgotPass';
import { useAppContext } from 'src/store';
import { PATH } from 'src/pages/auth';

const ForgotPassword: React.FC = () => {
  const { control, handleSubmit, setError } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [cowndown, setCowndown] = useState(0);
  const [state] = useAppContext();
  const { t } = useTranslation();
  const { data } = useLogo();

  useEffect(() => {
    timerResend();
  }, [cowndown]);

  const timerResend = () => {
    let timer = setTimeout(() => {
      if (cowndown <= 0) {
        clearInterval(timer);
        setIsSuccess(false);
      } else {
        setCowndown(cowndown - 1);
      }
    }, 1000);
  };

  const onSendMail = (val) => {
    setIsSuccess(false);
    let payload = {
      email: val.email,
      lang: state?.lang || 'ja',
    };
    mutation.mutate(payload);
  };

  const onSuccess = (data) => {
    setIsSuccess(true);
    setCowndown(60);
  };

  const mutation = useForgotPass({ setError, onSuccess });

  return (
    <div>
      <Row justify="center" align="middle">
        <div className="forgot_pass">
          <Row justify="center">
            <Col span={18}>
              <Link to={PATH.SIGN_IN}>
                <img
                  src={data?.ecsiteLogoDir || logo}
                  alt="logo"
                  className="forgot_pass_logo"
                />
              </Link>
            </Col>
          </Row>
          <Form
            layout="vertical"
            className="forgot_pass_form"
            onFinish={handleSubmit((val) => onSendMail(val))}
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
            {isSuccess && (
              <p className="text-center">
                {t('forgot_password.message_success')}
              </p>
            )}
            <Row justify="center" className="forgot_pass_buttons">
              <Col span={12} className="forgot_pass_button_forgot">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full "
                  disabled={cowndown > 0}
                  loading={mutation.isLoading}
                >
                  {cowndown > 0
                    ? cowndown
                    : t('forgot_password.button_confirm')}
                </Button>
              </Col>
              <Col span={12} className="forgot_pass_button_cancel">
                <Button
                  type="primary"
                  onClick={() => history.back()}
                  className="w-full"
                >
                  {t('forgot_password.button_cancel')}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Row>
    </div>
  );
};

export default ForgotPassword;
