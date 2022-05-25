import React from 'react';

import HomeContainer from 'src/containers/Home';

const HomePage: React.FC = () => {
  return <HomeContainer />;
};

export const PATH = '/' as const;
export default HomePage;
