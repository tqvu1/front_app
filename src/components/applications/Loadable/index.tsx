import React from 'react';

type Props = {
  factory: () => Promise<{ default: React.ComponentType<any> }>;
};

const Loadable: React.FC<Props> = ({ factory }) => {
  const Component = React.lazy(factory);

  return (
    <React.Suspense fallback={null}>
      <Component />
    </React.Suspense>
  );
};

export default Loadable;
