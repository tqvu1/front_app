import { useForm as useHookForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

import { REGEX } from 'src/constants/app';

export type FormValue = {
  email: string;
  otp: string;
};

const useForm = () => {
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required()
      .matches(
        REGEX.REGEX_EMAIL_MATCHES,
        t('validation.email', { name: t(`label.email`) }),
      ),
    otp: Yup.string().required(),
  });

  const formInfo = useHookForm<FormValue>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: 'onChange',
  });
  return { ...formInfo };
};

export default useForm;
