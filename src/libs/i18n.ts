import i18n from 'i18next';
import { initReactI18next, TFunction } from 'react-i18next';
import { setLocale } from 'yup';

import en from 'src/locales/en.json';
import ja from 'src/locales/ja.json';

export const resources = {
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
} as const;

export function buildYupLocale(_: unknown, t): void {
  setLocale({
    mixed: {
      required: ({ path }) => {
        return t('validation.required', { name: t(`label.${path}`) });
      },
      oneOf: ({ path }) => {
        return t('validation.not_matched', { name: t(`label.${path}`) });
      },
    },
    number: {
      min: ({ path, min }) => {
        return t('validation.min.numeric', {
          name: t(`label.${path}`),
          value: min,
        });
      },
    },
    string: {
      email: ({ path }) => {
        return t('validation.email', { name: t(`label.${path}`) });
      },
      max: ({ path, max }) => {
        return t('validation.max.string', {
          name: t(`label.${path}`),
          value: max,
        });
      },
      min: ({ path, min }) => {
        return t('validation.min.string', {
          name: t(`label.${path}`),
          value: min,
        });
      },
    },
  });
}

i18n.use(initReactI18next).init(
  {
    fallbackLng: 'en',
    debug: false,
    lng: 'ja',
    resources,
  },
  buildYupLocale,
);

const I18n = i18n;
const t: TFunction = (...args: Parameters<TFunction>) => I18n.t(...args);

export { I18n, t };
