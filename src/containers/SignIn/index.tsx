import React from 'react';
import { Button, Col, Form, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useForm, { FormValue } from './useForm';
import { InputField } from 'src/components/form';
import logo from 'src/assets/logo.png';
import useSignIn from 'src/queries/useSignIn';
import useLogo from 'src/queries/useLogo';
import { FRONTSITE_PATH } from 'src/constants/app';
import useTitle from 'src/hooks/useTitle';

const SignIn: React.FC = () => {
  const { control, handleSubmit, setError } = useForm();
  const { t } = useTranslation();
  const mutation = useSignIn({ setError });
  const { data } = useLogo();
  useTitle(t('sign_in.tab_title'));

  return (
    <React.Fragment>
      <Row justify="center" align="middle">
        <div className="signin_container">
          <Row justify="center">
            <Col span={16} className="text-center">
              <Typography.Link href={FRONTSITE_PATH}>
                <img
                  src={data?.ecsiteLogoDir || logo}
                  alt="logo"
                  className="logo_signin"
                />
              </Typography.Link>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={24}>
              <p className="signin_title">{t('sign_in.title')}</p>
            </Col>
          </Row>
          <Form
            layout="vertical"
            onFinish={handleSubmit((val) => mutation.mutate(val))}
          >
            <InputField<FormValue>
              controller={{ control, name: 'email' }}
              inputProps={{
                placeholder: t('auth_form.email_placeholder'),
                maxLength: 80,
              }}
              required
            />
            <InputField<FormValue>
              controller={{ control, name: 'password' }}
              inputProps={{
                placeholder: t('auth_form.password_placeholder'),
                type: 'password',
                minLength: 8,
                maxLength: 88,
              }}
              required
            />
            <Row justify="center">
              <Col span={24}>
                <Link to={'/forgot_password'}>
                  <p className="signin_forgot">
                    {t('sign_in.reset_password_text')}
                  </p>
                </Link>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={12}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full signin_button"
                  loading={mutation.isLoading}
                >
                  {t('sign_in.button')}
                </Button>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={24} className="signin_note">
                <p>{t('sign_in.browser_note')}</p>
                <p>・{t('sign_in.ie_text')}</p>
                <p>・{t('sign_in.chrome_text')}</p>
              </Col>
            </Row>
          </Form>
        </div>
      </Row>
    </React.Fragment>
  );
};

export default SignIn;
