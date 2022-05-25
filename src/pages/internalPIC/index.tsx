import React from 'react';

import InternalPIC from 'src/containers/InternalPIC';

const InternalPICPage: React.FC = () => {
  return <InternalPIC />;
};

export const PATH = '/internal_pic' as const;
export default InternalPICPage;
