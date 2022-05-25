import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppContext } from 'src/store';
import { APP_ACTIONS } from 'src/constants/app';
import LocalStorage from 'src/utils/LocalStorage';
import useLanguage from 'src/queries/useLanguage';

const LangSelect: React.FC = () => {
  const { i18n } = useTranslation();
  const [state, dispatch] = useAppContext();
  var siteInfo: any = LocalStorage.initSiteInfo;

  if (!siteInfo?.rmGengos) {
    const { data } = useLanguage();
    siteInfo = data;
  }

  const changeLang = async () => {
    const lang = state.lang === 'ja' ? 'en' : 'ja';
    await i18n.changeLanguage(lang);

    dispatch({
      type: APP_ACTIONS.CHANGE_LANG,
      payload: lang,
    });
  };

  return (
    <div className="lang-select">
      <Select size="small" onChange={changeLang} value={state.lang}>
        {siteInfo &&
          siteInfo?.map((item) => (
            <Select.Option key={item.gengoCd} value={item.gengoCd}>
              {item.gengoNm}
            </Select.Option>
          ))}
      </Select>
    </div>
  );
};

export default LangSelect;
