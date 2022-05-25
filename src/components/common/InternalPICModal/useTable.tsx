import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import { TableProps } from 'antd';

import useInternalPIC from 'src/queries/useInternalPIC';

type Props = {
  searchParams?: SearchParams.InternalPIC;
  setSearchParams?: Dispatch<SetStateAction<SearchParams.InternalPIC>>;
};

const useTable = ({ searchParams, setSearchParams }: Props) => {
  const { t } = useTranslation();

  const { queryInternalPICList } = useInternalPIC({
    ...searchParams,
  });

  const columns = [
    {
      title: t('internal_pic.company_name'),
      dataIndex: 'company_contact_name',
      key: 'company_contact_name',
    },
    {
      title: t('internal_pic.email_address'),
      dataIndex: 'email_address',
      key: 'email_address',
    },
  ];

  const fakeData = [
    {
      company_contact_name: 'company_contact_name1',
      email_address: '〇〇@gmail.com',
    },
    {
      company_contact_name: 'company_contact_name2',
      email_address: '〇〇@gmail.com',
    },
    {
      company_contact_name: 'company_contact_name3',
      email_address: '〇〇@gmail.com',
    },
  ];

  const tableProps: TableProps<any> = {
    columns: columns,
    dataSource: fakeData,
    loading: {
      spinning: queryInternalPICList.isLoading,
      indicator: <LoadingOutlined />,
    },
    rowKey: 'company_contact_name',
    rowSelection: {
      type: 'checkbox',
    },
    size: 'middle',
    pagination: false,
    locale: {
      emptyText: t('message.E000024'),
    },
  };

  return {
    tableProps,
  };
};

export default useTable;
