import React, { useState } from 'react';
import { Col, Modal, ModalProps, Row, Typography } from 'antd';

type Props = {
  modalProps?: ModalProps;
  children?: React.ReactElement;
  content: ({ onClose }: { onClose: () => void }) => React.ReactElement;
  footer?: ({ onClose }: { onClose: () => void }) => React.ReactElement;
  title?: string;
  autoOpen?: boolean;
  maskClosable?: boolean;
};

const CustomModal: React.FC<Props> = (props) => {
  const {
    children,
    modalProps,
    content,
    title,
    footer,
    autoOpen = false,
    maskClosable = true,
  } = props;
  const [visible, setVisible] = useState(autoOpen);
  let childrenWithClick;
  if (children) {
    childrenWithClick = React.cloneElement(children as React.ReactElement, {
      onClick: () => {
        if (typeof children?.props?.onClick !== 'undefined') {
          children?.props?.onClick.call(window);
        }
        setVisible(true);
      },
    });
  }

  React.useEffect(() => {
    setVisible(autoOpen);
  }, [autoOpen]);

  return (
    <React.Fragment>
      {childrenWithClick && childrenWithClick}
      <Modal
        {...modalProps}
        destroyOnClose
        maskClosable={maskClosable}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        centered
        footer={null}
        wrapClassName="custom_modal"
      >
        <Typography.Title style={{ textAlign: 'center' }} level={1}>
          {title}
        </Typography.Title>
        {content({ onClose: () => setVisible(false) })}
        <Row justify="center" style={{ marginTop: 24 }}>
          <Col> {footer && footer({ onClose: () => setVisible(false) })}</Col>
        </Row>
      </Modal>
    </React.Fragment>
  );
};

export default CustomModal;
