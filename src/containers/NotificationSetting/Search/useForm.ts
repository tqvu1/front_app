import * as Yup from 'yup';
import { useForm as useHookForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// import { t } from 'src/libs/i18n';
import useQueryUrl from 'src/hooks/useQueryUrl';
import { t } from 'src/libs/i18n';
import dayjs from 'dayjs';
import { mbStrWidth } from 'src/utils/helper';

export type FormValue = {
  publish_date_from: string;
  publish_date_to: string;
  title: string;
  display_condition: string;
  display_order: string;
};

const useForm = () => {
  const query = useQueryUrl();

  const defaultValues: FormValue = {
    publish_date_from: query.publish_date_from,
    publish_date_to: query.publish_date_to,
    title: query.title,
    display_condition: query.display_condition,
    display_order: query.display_order,
  };

  const schema = Yup.object().shape({
    publish_date_from: Yup.date()
      .nullable(true)
      .transform((curr, orig) => (orig === '' ? null : curr)),
    publish_date_to: Yup.date()
      .nullable(true)
      .transform((curr, orig) => (orig === '' ? null : curr))
      .when('publish_date_from', (from_date, schema) => {
        return schema.test({
          test: function (to_date) {
            // check case to_date entered, but from_date not entered
            if (!from_date && to_date) {
              return this.createError({
                message: t('message.E000003', {
                  param1: t('notification_setting.publish_date_from'),
                }),
                path: 'publish_date_from',
              });
            }
            // check case from_date entered, but to_date not entered
            else if (!to_date && from_date) {
              return this.createError({
                message: t('message.E000003', {
                  param1: t('notification_setting.publish_date_to'),
                }),
                path: 'publish_date_to',
              });
            }
            // check case to_date is before from_date
            else if (to_date && from_date) {
              if (dayjs(to_date).isBefore(dayjs(from_date))) {
                return this.createError({
                  message: t('message.E000015', {
                    param1: t('notification_setting.publish_date_from_to'),
                  }),
                  path: 'publish_date_from',
                });
              }
            }
            // other case is true
            return true;
          },
        });
      }),
    title: Yup.string().test(
      'maxLength',
      t('message.E000002', {
        param1: t('notification_setting.title'),
        param2: 200,
      }),
      (val) => {
        return mbStrWidth(val) <= 200;
      },
    ),
  });

  const form = useHookForm<FormValue>({
    defaultValues,
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });

  return { ...form };
};

export default useForm;
