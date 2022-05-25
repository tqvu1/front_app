import { Button, Col, Divider, Row } from 'antd';
import React from 'react';
import qs from 'query-string';

import {
  CheckboxGroupField,
  DateRangePickerField,
  InputField,
  RadioGroupField,
} from 'src/components/form';
import { t } from 'src/libs/i18n';
import useForm, { FormValue } from './useForm';
import {
  DISPLAY_CONDITION,
  DISPLAY_ORDER,
} from 'src/constants/optionSelect/notification';
import history from 'src/libs/history';
import useQueryUrl from 'src/hooks/useQueryUrl';

const Search: React.FC = () => {
  const { control, handleSubmit, getValues } = useForm();
  const query = useQueryUrl();

  const handleSearch = (values) => {
    history.push({
      search: qs.stringify(
        {
          ...query,
          ...values,
          publish_date_from: getValues().publish_date_from,
          publish_date_to: getValues().publish_date_to,
        },
        {
          skipNull: true,
          skipEmptyString: true,
          arrayFormatSeparator: '|',
          arrayFormat: 'bracket-separator',
        },
      ),
    });
  };

  return (
    <div className="search">
      <Row>
        <Col xs={24} md={12} xl={12}>
          <DateRangePickerField<FormValue>
            label={t('notification_setting.publish_date_period')}
            controllerFrom={{
              control,
              name: 'publish_date_from',
            }}
            controllerTo={{
              control,
              name: 'publish_date_to',
            }}
            datePickerPropsFrom={{
              placeholder: t('start'),
            }}
            datePickerPropsTo={{
              placeholder: t('end'),
            }}
            labelCol={{ xs: 24, md: 5 }}
            wrapperCol={{ xs: 24, md: 14 }}
          />
        </Col>
        <Col xs={24} md={10} xl={10}>
          <InputField<FormValue>
            label={t('notification_setting.title')}
            controller={{
              control,
              name: 'title',
            }}
            inputProps={{
              maxLength: 200,
            }}
            labelCol={{ xs: 24, md: 6 }}
            wrapperCol={{ xs: 24, md: 18 }}
          />
        </Col>
        <Col xs={24} md={2} xl={2} className="title_note">
          {t('notification_setting.title_note')}
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={12} xl={12}>
          <CheckboxGroupField<FormValue>
            label={t('notification_setting.display_condition')}
            controller={{ name: 'display_condition', control }}
            checkboxGroupProps={{ options: DISPLAY_CONDITION(t) }}
            labelCol={{ xs: 5, md: 5 }}
            wrapperCol={{ xs: 19, md: 14 }}
          />
        </Col>
        <Col xs={24} md={12} xl={12}>
          <RadioGroupField<FormValue>
            label={t('notification_setting.display_order')}
            controller={{
              name: 'display_order',
              control,
            }}
            radioGroupProps={{
              options: DISPLAY_ORDER(t),
            }}
            labelCol={{ xs: 5, md: 5 }}
            wrapperCol={{ xs: 19, md: 16 }}
          />
        </Col>
      </Row>
      <Divider className="mt-0 mb-30" />
      <Row justify="center" className="mt-12">
        <Col xs={12} md={3}>
          <Button
            type="primary"
            className="w-full btn-search"
            onClick={handleSubmit(handleSearch)}
          >
            {t('button.search')}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Search;
