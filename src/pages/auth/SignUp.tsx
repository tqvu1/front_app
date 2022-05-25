import React from 'react';
import Loadable from 'src/components/applications/Loadable';
import { Layout } from 'antd';

export const PATH = '/sign_up' as const;
const Container = () => import('src/containers/SignUp');

const Page: React.FC = () => {
  return (
    <Layout className="sign_up">
      <Loadable factory={Container} />
    </Layout>
  );
};

export default Page;
