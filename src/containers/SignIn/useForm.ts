import { useForm as useHookForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { REGEX } from 'src/constants/app';
import { useTranslation } from 'react-i18next';

export type FormValue = {
  email: string;
  password: string;
};

const useForm = () => {
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .matches(REGEX.REGEX_EMAIL_MATCHES, t('validation.email'))
      .required(),
    password: Yup.string().required(),
  });

  const formInfo = useHookForm<FormValue>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });
  return { ...formInfo };
};

export default useForm;
