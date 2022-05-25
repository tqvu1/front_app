import 'react-i18next';
import en from 'src/locales/en.json';
import ja from 'src/locales/ja.json';

type LangKey<T> = T extends object
  ? {
      [K in keyof T]:
        | K
        | `${K & string}${'' extends LangKey<T[K]> ? '' : '.'}${LangKey<T[K]>}`;
    }[keyof T]
  : '';

type E = typeof en;
type En = LangKey<typeof en>;
type LangObj = LangObject<En>;

type LangObject<L> = { [K in L]: string };

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      en: typeof en;
      ja: typeof ja;
    };
    defaultNS: 'ja';
  }
}
