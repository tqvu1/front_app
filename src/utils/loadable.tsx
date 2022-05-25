import React, { lazy, Suspense } from 'react';
import LoadingSuspense from 'src/components/applications/LoadingSuspense';

const loadable = (
  importFunc: () => Promise<any>,
  fallback: React.ReactElement | null = <LoadingSuspense />,
) => {
  const LazyComponent = lazy(importFunc);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );
};

export default loadable;
