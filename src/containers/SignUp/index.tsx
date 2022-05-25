import React from 'react';
import { Button, Col, Form, Row } from 'antd';
// import { useTranslation } from 'react-i18next';

import useForm, { FormValue } from './useForm';
// import useSignUp from 'src/queries/useSignUp';
import { InputField, InputPasswordField } from 'src/components/form';

const SignUp: React.FC = () => {
  const { control, handleSubmit } = useForm();
  // const { t } = useTranslation();
  // const mutation = useSignUp({ form });

  return (
    <Row justify="center" className="mt-60 mb-60">
      <Col>
        <Form
          layout="vertical"
          onFinish={handleSubmit((val) => console.log(val))}
        >
          <InputField<FormValue>
            controller={{ control, name: 'name' }}
            label={'Name'}
            required
          />
          <InputField<FormValue>
            controller={{ control, name: 'email' }}
            label={'Email'}
            required
          />
          <InputPasswordField<FormValue>
            controller={{ control, name: 'password' }}
            label={'Password'}
            required
          />
          <div className="btn-save">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUp;
