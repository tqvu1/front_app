import React from 'react';
import ErrorPage from 'src/components/applications/ErrorPage';

export const PATH = '/403' as const;

const Forbidden: React.FC = () => {
  return <ErrorPage statusCode={403} />;
};

export default Forbidden;
