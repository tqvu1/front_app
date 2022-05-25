import React from 'react';
import { Spin } from 'antd';

const LoadingSuspense: React.FC = () => {
  return (
    <div className="content_wrapper">
      <div className="content_wrapper_loading">
        <Spin />
      </div>
    </div>
  );
};

export default LoadingSuspense;
