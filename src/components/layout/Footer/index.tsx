import React from 'react';
import { useTranslation } from 'react-i18next';
import { Footer } from 'antd/lib/layout/layout';

type Props = {
  backgroundColor?: boolean;
};

const AppFooter: React.FC<Props> = (props) => {
  const { backgroundColor = true } = props;

  const { t } = useTranslation();
  return (
    <Footer className={backgroundColor ? 'footer background' : 'footer'}>
      <p className="footer-bottom">{t('footer.footer_bottom')}</p>
    </Footer>
  );
};

export default AppFooter;
