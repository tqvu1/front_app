export const DISPLAY_CONDITION: App.OptionsFnc = (t) => [
  { label: t('notification_setting.login_page'), value: 'login_page' },
  { label: t('notification_setting.front_site'), value: 'front_site' },
];

export const DISPLAY_ORDER: App.OptionsFnc = (t) => [
  {
    label: t('notification_setting.registration_date'),
    value: 'registration_date',
  },
  { label: t('notification_setting.publish_date'), value: 'publish_date' },
];
