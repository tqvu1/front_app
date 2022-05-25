import React, { useState } from 'react';
import { Button, Divider, Select, Space, Tag, TagProps } from 'antd';
import { TablePaginationConfig, TableProps } from 'antd/lib/table';
import qs from 'query-string';

import history from 'src/libs/history';
import useQueryUrl from 'src/hooks//useQueryUrl';
import { PER } from 'src/constants/app';
import { t } from 'src/libs/i18n';
import { PAGE_SIZE_OPTIONS } from 'src/constants/optionSelect/pageSize';

type UseTable = {
  hasSelect?: boolean;
  pagination?: any;
};

const useTable = <T extends { seqno: string | number }>(
  { hasSelect }: UseTable = { hasSelect: true },
) => {
  const query = useQueryUrl();
  const [rowKeysSelected, setRowKeysSelected] = useState<React.Key[]>([]);
  const defaultPageSize = query.limit ? Number(query.limit) : PER.DEFAULT;
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const onChangePage = (page: number) => {
    history.push({
      search: qs.stringify({ ...query, page }),
    });
  };

  const onChangePageSize = (limit) => {
    history.push({
      search: qs.stringify({ ...query, limit, page: 1 }),
    });
  };

  const paginationProps: TablePaginationConfig = {
    position: ['topRight', 'bottomRight'],
    onChange: onChangePage,
    pageSize: defaultPageSize,
    showSizeChanger: false,
    showTotal(total) {
      return (
        <Space className="show_total_space_container">
          <span>{t('table.page_size')}</span>
          <Select
            size="small"
            value={pageSize}
            onChange={setPageSize}
            options={PAGE_SIZE_OPTIONS(t)}
          />
          <span>{t('table.record')}</span>
          <Button
            type="primary"
            size="small"
            onClick={() => onChangePageSize(pageSize)}
          >
            {t('table.apply_page_size')}
          </Button>
          <Divider type="vertical" />
          <span>
            {t('table.show_items', { total: total.toLocaleString() })}
          </span>
          <Divider type="vertical" />
        </Space>
      );
    },
  };

  const rowSelection: TableProps<T>['rowSelection'] = {
    type: 'checkbox',
    onSelect(data, checked) {
      if (checked) {
        setRowKeysSelected([...rowKeysSelected, data.seqno]);
        return;
      }

      const rowFiltered = rowKeysSelected.filter((row) => row !== data.seqno);
      setRowKeysSelected(rowFiltered);
    },
    onSelectAll(checked, changed, selected) {
      const listIds = selected.map((d) => d.seqno) as React.Key[];
      if (checked) {
        setRowKeysSelected([...rowKeysSelected, ...listIds]);
        return;
      }

      const rowFiltered = rowKeysSelected.filter(
        (key) => !listIds.includes(key),
      );
      setRowKeysSelected(rowFiltered);
    },
    selectedRowKeys: rowKeysSelected,
  };

  const Selected = (props: TagProps) => {
    if (rowKeysSelected.length) {
      return React.createElement(
        Tag,
        {
          closable: true,
          onClose: () => setRowKeysSelected([]),
          color: 'orange',
          style: {
            fontSize: 14,
            padding: '4px 8px',
          },
          ...props,
        },
        props.children,
      );
    }

    return null;
  };

  return {
    pagination: paginationProps,
    rowSelection: hasSelect ? rowSelection : undefined,
    Selected,
    rowSelected: rowKeysSelected.map((key) => Number(key)),
    setRowKeysSelected,
  };
};

export default useTable;
