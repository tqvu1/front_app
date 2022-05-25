import React, { useEffect, useState } from 'react';
import { Radio, TableProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import _ from 'lodash';

import { t } from 'src/libs/i18n';
import { formatPeriodDateTime } from 'src/utils/helper';
import { PER } from 'src/constants/app';
import useTableCommon from 'src/hooks/useTable';
import useQueryUrl from 'src/hooks/useQueryUrl';
import { DisplayCondition } from 'src/components/common';
import useNotificationSetting from 'src/queries/useNotificationSetting';

const useTable = () => {
  const query = useQueryUrl();
  const { page = 1, limit = PER.DEFAULT } = query;
  const { initPostFlg, queryNotificationSetting } = useNotificationSetting();

  const {
    pagination: paginationCommon,
    rowSelection,
    ...rest
  } = useTableCommon({
    hasSelect: true,
  });

  const [postFlgData, setPostFlgData] = useState<Payload.PostFlgData[]>([]);

  useEffect(() => {
    // Set post flag data from query result.
    // Check duplicate data before set.
    setPostFlgData((prevState) => {
      const ids = prevState?.map((item) => item.seqno);
      const filtered = _.filter(
        initPostFlg,
        (item) => !ids?.includes(item.seqno),
      );
      return [...prevState, ...filtered];
    });
  }, [queryNotificationSetting?.data?.data.items]);

  const onChangeRadio = (event, seqno) => {
    // Update post flag data when change radio.
    setPostFlgData((prevState) => {
      const filtered = _.filter(prevState, (item) => item.seqno != seqno);
      return [...filtered, { seqno, postedFlg: event.target.value }];
    });
  };

  const columns: ColumnsType<Response.NotificationEntity> = [
    {
      title: t('notification_setting.no'),
      dataIndex: 'index',
      render(value, item, index) {
        return (page - 1) * limit + index + 1;
      },
    },
    {
      title: t('notification_setting.title'),
      dataIndex: 'title',
      render: (text, record) => {
        return record?.rmOsiraseContent?.title;
      },
    },
    {
      title: t('notification_setting.display_condition'),
      dataIndex: 'hyoujiBasho',
      render: (text) => {
        return <DisplayCondition display={text} />;
      },
    },
    {
      title: t('notification_setting.created_by'),
      render: (text, record) => {
        return record?.rmWebUser?.smei;
      },
    },
    {
      title: t('notification_setting.publish_date_time'),
      render: (text, record) => {
        return formatPeriodDateTime(record.postedFrom, record.postedTo);
      },
    },
    {
      title: t('notification_setting.flag'),
      dataIndex: 'postedFlg',
      render(text, record) {
        return (
          <Radio.Group
            name="flag"
            defaultValue={text}
            onChange={(event) => onChangeRadio(event, record.seqno)}
          >
            <Radio value={'0'}>{t('notification_setting.flag_public')}</Radio>
            <Radio value={'1'}>{t('notification_setting.flag_private')}</Radio>
          </Radio.Group>
        );
      },
    },
  ];

  const tableProps: TableProps<any> = {
    columns: columns,
    loading: {
      spinning: queryNotificationSetting.isFetching,
      indicator: <LoadingOutlined />,
    },
    dataSource: queryNotificationSetting.data?.data?.items,
    rowKey: 'seqno',
    size: 'middle',
    pagination: {
      ...paginationCommon,
      total: queryNotificationSetting?.data?.data?.total,
      current: queryNotificationSetting?.data?.data?.page,
      pageSize: queryNotificationSetting?.data?.data?.offset,
    },
    className: 'custom_table',
    rowSelection: rowSelection,
    scroll: { x: 'max-content' },
    locale: {
      emptyText: t('message.E000025'),
    },
  };

  return {
    tableProps,
    postFlgData,
    ...rest,
  };
};

export default useTable;
