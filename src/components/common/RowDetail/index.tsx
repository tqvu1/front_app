import React from 'react';
import { Row, Col, Typography, ColProps } from 'antd';

type Props = {
  title: string | React.ReactNode;
  value?: string | number | React.ReactNode;
  actions?: React.ReactNode;
  layout?: {
    titleCol?: ColProps | boolean;
    valueCol?: ColProps | boolean;
    actionsCol?: ColProps | boolean;
  };
  style?: React.CSSProperties;
};

const { Text } = Typography;

const RowDetail: React.FC<Props> = (props) => {
  const { title, value, actions, layout, style } = props;

  const defaultLayout: Props['layout'] = {
    titleCol: layout?.titleCol ?? { span: 4 },
    valueCol: layout?.valueCol ?? { span: 17 },
    actionsCol: layout?.actionsCol ?? { span: 4 },
  };

  return (
    <Row style={{ marginBottom: 6, ...style }} className="row_detail">
      <Col {...defaultLayout.titleCol} className="title">
        <Text>{title}</Text>
      </Col>
      <Col {...defaultLayout.valueCol} className="value">
        <Text className="value">{value}</Text>
      </Col>
      <Col {...defaultLayout.actionsCol} className="action">
        {actions}
      </Col>
    </Row>
  );
};

export default RowDetail;
