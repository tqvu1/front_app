import React, { useEffect } from 'react';
import { Row, Col, Button, Typography, Divider, Tabs } from 'antd';
import useForm from './useForm';
import { useFieldArray } from 'react-hook-form';
import { t } from 'src/libs/i18n';
import {
  CheckboxGroupField,
  DateRangePickerField,
  RadioGroupField,
} from 'src/components/form';
import { FormValue } from './useForm';

import {
  DISPLAY_CONDITION,
  DISPLAY_ORDER,
} from 'src/constants/optionSelect/notification';
import useLanguage from 'src/queries/useLanguage';
import LanguageItem from './LanguageItem';

type Props = {
  onClose: () => void;
};
const { TabPane } = Tabs;

const ModalNotification: React.FC<Props> = ({ onClose }) => {
  const { control, handleSubmit, getValues } = useForm();
  const { data } = useLanguage();

  const { fields, append, remove } = useFieldArray({
    name: 'notifications',
    control,
  });

  useEffect(() => {
    data?.forEach((item) => {
      append({
        title: '',
        text: '',
        upload_file: '',
        langCd: item.gengoCd,
        langNm: item.gengoNm,
      });
    });
    return () => {
      remove();
    };
  }, [data && data.length]);

  const handleSubmitForm = () => {
    console.log(getValues());
    onClose();
  };

  const changeTab = () => {};

  return (
    <React.Fragment>
      <div className="p-20 modal-notification">
        <Row gutter={[0, 24]}>
          <Col lg={16} xs={24} sm={24}>
            <Row gutter={[0, 10]}>
              <Col xs={24} sm={24} md={24} lg={24} className="group-input">
                <CheckboxGroupField<FormValue>
                  className="mb-0"
                  label={t('notification_setting.display_conditions')}
                  controller={{ name: 'display_condition', control }}
                  checkboxGroupProps={{ options: DISPLAY_CONDITION(t) }}
                  labelCol={{ xs: 24, md: 5 }}
                  wrapperCol={{ xs: 24, md: 19 }}
                  required
                />
              </Col>
              <Col xs={24} sm={24} className="group-label mt-10">
                <DateRangePickerField<FormValue>
                  controllerFrom={{
                    control,
                    name: 'publish_date_from',
                  }}
                  label={t('notification_setting.publish_date_period')}
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
                  wrapperCol={{ xs: 24, md: 15 }}
                  required
                />
              </Col>
              <Col xs={24} sm={24}>
                <Row gutter={[0, 6]} align="middle">
                  <Col
                    xs={24}
                    sm={24}
                    lg={24}
                    className="group-input input_tag"
                  >
                    <RadioGroupField<FormValue>
                      label={t('notification_setting.publishing_settings')}
                      controller={{
                        name: 'display_order',
                        control,
                        defaultValue: 'registration_date',
                      }}
                      radioGroupProps={{
                        options: DISPLAY_ORDER(t),
                      }}
                      labelCol={{ xs: 24, md: 5 }}
                      wrapperCol={{ xs: 24, md: 19 }}
                      required
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col lg={8} sm={24} className="introduction">
            {t('notification_setting.introduction_1')}
            <br />
            <br />
            {t('notification_setting.introduction_2')}
          </Col>
        </Row>
        <Row className="mt-50">
          <Col xl={24} sm={24} span={24}>
            <Tabs
              onChange={changeTab}
              tabBarGutter={0}
              tabBarExtraContent={{
                left: (
                  <Typography.Text className="label_language title">
                    {t('notification_setting.language')}
                  </Typography.Text>
                ),
              }}
              defaultActiveKey="1"
              tabPosition={'top'}
            >
              {fields &&
                fields?.map((language, index) => (
                  <TabPane tab={language.langNm} key={index}>
                    <LanguageItem control={control} index={index} />
                  </TabPane>
                ))}
            </Tabs>
          </Col>
        </Row>

        <Row align="middle" justify="center">
          <Divider className="mb-30" />
          <Button
            className="button_submit_notification"
            type="primary"
            onClick={handleSubmit(handleSubmitForm)}
          >
            {t('notification_setting.submit')}
          </Button>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ModalNotification;
