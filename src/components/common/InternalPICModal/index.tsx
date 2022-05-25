import React, { useState } from 'react';
import { Row, Col, Button, Table, Divider, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { InputField } from 'src/components/form';
import { RowDetail } from 'src/components/common/index';
import useForm, { FormValue } from './useForm';
import useTable from './useTable';

type Props = {
  onClose?: any;
};

const InternalPICModal: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm();

  const [searchParams, setSearchParams] = useState<SearchParams.InternalPIC>({
    search: '',
  });

  const { tableProps } = useTable({
    searchParams,
    setSearchParams,
  });

  const handleSearch = (values) => {
    setSearchParams({
      search: values.searchAddress,
    });
  };

  const handleSetting = () => {
    console.log('setting');
  };

  return (
    <React.Fragment>
      <div className="internal_pic_modal">
        <RowDetail
          title={t('internal_pic.customer_name')}
          value={'顧客名'}
          layout={{
            titleCol: { xs: 6, sm: 6, md: 5, lg: 4, xl: 3 },
            valueCol: { xs: 16, sm: 15, md: 16, lg: 17, xl: 20 },
          }}
        />
        <RowDetail
          title={t('internal_pic.internal_person')}
          value={'上松 靖幸'}
          layout={{
            titleCol: { xs: 6, sm: 6, md: 5, lg: 4, xl: 3 },
            valueCol: { xs: 16, sm: 15, md: 16, lg: 17, xl: 20 },
          }}
        />
        <Divider />
        <Row className="mb-20">
          <Typography.Text>{t('internal_pic.internal_note')}</Typography.Text>
        </Row>
        <Row>
          <Col xs={18} sm={20} md={22} lg={22} xl={22}>
            <InputField<FormValue>
              label={t('internal_pic.search_person')}
              labelCol={{ xs: 24, sm: 7, md: 6, lg: 5, xl: 4 }}
              wrapperCol={{ xs: 24, sm: 16, md: 16, lg: 17, xl: 19 }}
              controller={{
                control,
                name: 'searchKey',
                defaultValue: '',
              }}
              inputProps={{
                maxLength: 30,
                placeholder: t('internal_pic.place_holdel_internal_person'),
              }}
            />
          </Col>
          <Col xs={5} sm={4} md={2} lg={2} xl={2}>
            <Button
              type="primary"
              onClick={handleSubmit((val) => handleSearch(val))}
              className="w-full internal_pic_modal_button_search"
            >
              {t('button.search')}
            </Button>
          </Col>
        </Row>
        <Row className="modal_table">
          <Col span={24}>
            <Table {...tableProps} />
          </Col>
        </Row>
        <Row justify="center" className="mt-20">
          <Button type="primary" onClick={handleSetting} className="px-60">
            {t('basic_setting.setting')}
          </Button>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default InternalPICModal;
