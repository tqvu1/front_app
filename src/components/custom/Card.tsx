import { Card, Divider, Typography } from 'antd';
import React from 'react';

type Props = {
  title?: string;
};

const CardCustom: React.FC<Props> = ({ children, title }) => {
  return (
    <Card className="custom_card">
      <Typography.Title level={1}>{title}</Typography.Title>
      <Divider className="mt-20 mb-8" />
      {children}
    </Card>
  );
};

export default CardCustom;
