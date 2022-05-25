import React, { useState } from 'react';
import { Col, Row } from 'antd';

import logo from 'src/assets/logo.png';

import ConfirmOTP from './ComfirmOTP';
import ResetPass from './ResetPass';
import useLogo from 'src/queries/useLogo';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [resetToken, setResetToken] = useState(false);
  const { data } = useLogo();

  const onConfirmOTP = (data) => {
    setIsVerified(true);
    setEmail(data.email);
    setResetToken(data.resetToken);
  };

  return (
    <React.Fragment>
      <Row justify="center" align="middle">
        <div className="reset_pass">
          <Row justify="center">
            <Col span={18} className="text-center">
              <img
                src={data?.ecsiteLogoDir ? data?.ecsiteLogoDir : logo}
                alt="logo"
                className="reset_pass_logo"
              />
            </Col>
          </Row>
          {!isVerified ? (
            <ConfirmOTP onConfirmOTP={onConfirmOTP} />
          ) : (
            <ResetPass resetToken={resetToken} email={email} />
          )}
        </div>
      </Row>
    </React.Fragment>
  );
};

export default ResetPassword;
