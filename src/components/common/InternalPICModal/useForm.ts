import { useForm as useHookForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type FormValue = {
  searchKey: string;
};

const useForm = () => {
  const schema = Yup.object().shape({
    searchKey: Yup.string(),
  });

  const formInfo = useHookForm<FormValue>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });
  return { ...formInfo };
};

export default useForm;
