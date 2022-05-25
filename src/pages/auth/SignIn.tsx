import React from 'react';
import { Layout } from 'antd';

import SignInContainer from 'src/containers/SignIn';

const SignInPage: React.FC = () => {
  return (
    <Layout className="restrict_container">
      <SignInContainer />
    </Layout>
  );
};

export const PATH = '/sign_in' as const;
export default SignInPage;
