import { useForm as useHookForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export type FormValue = {
  front_site_name: string;
  company_name: string;
  phone_number: string;
  fax_number: string;
  address: string;
  business_hours_start: string;
  business_hours_end: string;
  estimated_expiration_date: string;
  specific_customer: string;
  notification_email: string;
  logo_img: string;
  qr_img: string;
  responsible_person_1: { name: string; email: string; role: string };
  responsible_person_2: { name: string; email: string; role: string };
  responsible_person_3: { name: string; email: string; role: string };
  responsible_person_4: { name: string; email: string; role: string };
  responsible_person_5: { name: string; email: string; role: string };
  responsible_person_6: { name: string; email: string; role: string };
  responsible_person_7: { name: string; email: string; role: string };
  responsible_person_8: { name: string; email: string; role: string };
  responsible_person_9: { name: string; email: string; role: string };
  responsible_person_10: { name: string; email: string; role: string };
  responsible_person_11: { name: string; email: string; role: string };
  responsible_person_12: { name: string; email: string; role: string };
  responsible_person_13: { name: string; email: string; role: string };
  responsible_person_14: { name: string; email: string; role: string };
  responsible_person_15: { name: string; email: string; role: string };
  responsible_person_16: { name: string; email: string; role: string };
  responsible_person_17: { name: string; email: string; role: string };
  responsible_person_18: { name: string; email: string; role: string };
  responsible_person_19: { name: string; email: string; role: string };
  responsible_person_20: { name: string; email: string; role: string };
};

const fakeDataRole = [
  { label: '管理者', value: 'admin' },
  { label: '閲覧のみ', value: 'view' },
];

const fakeDataNotiEmail = [
  { label: 'メール通知する', value: 'yes' },
  { label: 'メール通知しない', value: 'no' },
];

const fakeDataPerson = [
  {
    label: 'Test 123',
    value: '1',
  },
  {
    label: 'Test 233',
    value: '2',
  },
  {
    label: 'Test 333',
    value: '3',
  },
];

const useForm = () => {
  const schema = Yup.object().shape({});

  const form = useHookForm<any>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
  });
  return { form, fakeDataRole, fakeDataPerson, fakeDataNotiEmail };
};

export default useForm;
