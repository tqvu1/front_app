import { useForm as useHookForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type FormValue = {
  name: string;
  email: string;
  password: string;
};

const useForm = () => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const formInfo = useHookForm<FormValue>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });
  return { ...formInfo };
};

export default useForm;
