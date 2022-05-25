import { useForm as useHookForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { isValidPassword } from 'src/utils/helper';
import { REGEX } from 'src/constants/app';

export type FormValue = {
  new_password: string;
  re_password: string;
};

const useForm = () => {
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    new_password: Yup.string()
      .required()
      .matches(
        REGEX.REGEX_PASSWORD_MATCHES,
        t('validation.password_not_alphabet'),
      )
      .test(
        'valid-password',
        t('validation.password_not_valid'),
        isValidPassword,
      ),
    re_password: Yup.string()
      .required()
      .oneOf([Yup.ref('new_password')], t('validation.password_not_match')),
  });

  const formInfo = useHookForm<FormValue>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: 'onChange',
  });
  return { ...formInfo };
};

export default useForm;
