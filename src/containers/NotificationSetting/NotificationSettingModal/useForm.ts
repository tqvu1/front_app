import { useForm as useHookForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { ValidationError } from 'yup';

export type NotificationItem = {
  title: string;
  upload_file: string;
  text: string;
  langCd: string;
  langNm: string;
};

export type FormValue = {
  publish_date_from: string;
  publish_date_to: string;
  display_condition: string;
  display_order: string;
  notifications: NotificationItem[];
};

const useForm = () => {
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    display_condition: Yup.array()
      .min(1, t('validation.required_display_conditions'))
      .required(t('validation.required_display_conditions')),
    notifications: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().max(
            200,
            t('validation.max_length', { length: 200 }),
          ),
          upload_file: Yup.mixed().test(
            'fileSize',
            t('validation.max_size', { size: 5 }),
            (file) => {
              if (typeof file !== 'undefined' && file != null && file != '') {
                return file.file.size <= 5 * 1100000;
              } else {
                return true;
              }
            },
          ),
          text: Yup.string().max(
            2000,
            t('validation.max_length_text', { length: 2000 }),
          ),
        }),
      )
      .test(
        'text',
        t('validation.required_title'),
        (notifications = [], { createError }) => {
          let checkAllNotificationEmpty = 0;
          const errors = notifications
            .map((notification, key) => {
              if (
                notification.title === '' &&
                notification.upload_file === '' &&
                notification.text === ''
              ) {
                checkAllNotificationEmpty++;
                if (checkAllNotificationEmpty === notifications.length) {
                  return new ValidationError(
                    t('validation.required_title'),
                    notification[key],
                    `notifications.0.title`,
                  );
                }
              }
              if (
                (notification.title === '' && notification.upload_file) ||
                (notification.text && notification.title === '')
              ) {
                return new ValidationError(
                  t('validation.required_title'),
                  notification[key],
                  `notifications.${key}.title`,
                );
              }
            })
            .filter(Boolean);
          if (errors.length === 0) {
            return true;
          }

          return createError({
            message: () => errors,
          });
        },
      ),
  });

  const form = useHookForm<FormValue>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  return {
    ...form,
  };
};

export default useForm;
