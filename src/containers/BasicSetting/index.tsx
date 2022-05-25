import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  GroupField,
  ImageUploadField,
  InputField,
  RadioGroupField,
} from 'src/components/form';
import BottomNote from './BottomNote';
import TopNote from './TopNote';
import useForm, { FormValue } from './useForm';

const BasicSetting: React.FC = () => {
  const { t } = useTranslation();
  const { form, fakeDataRole, fakeDataPerson, fakeDataNotiEmail } = useForm();
  const { control, handleSubmit } = form;

  const inputArr = Array.from(Array(19).keys());
  const handleClick = (value) => {
    console.log(value);
  };

  return (
    <div className="basic_setting_container">
      <TopNote />
      <div className="form">
        <InputField
          controller={{ control, name: 'front_site_name' }}
          inputProps={{
            placeholder: t('basic_setting.form'),
          }}
          label={t('basic_setting.front_site_name')}
          labelCol={{ xs: 24, md: 7, xl: 5 }}
          wrapperCol={{ xs: 24, md: 17, xl: 19 }}
          style={{ marginBottom: '16px' }}
          required
        />
        <Row>
          <Col xs={24} md={7} xl={5}>
            <Typography.Title level={5} className="form_label">
              {t('basic_setting.login_screen_url')}
            </Typography.Title>
          </Col>
          <Col xs={24} md={17} xl={19} className="mb-20">
            <Link to={'/sign_in'} className="form_link">
              {t('basic_setting.login_screen_url')}
            </Link>
          </Col>
        </Row>
        <InputField
          controller={{ control, name: 'company_name' }}
          inputProps={{
            placeholder: t('basic_setting.form'),
          }}
          label={t('basic_setting.company_name')}
          labelCol={{ xs: 24, md: 7, xl: 5 }}
          wrapperCol={{ xs: 24, md: 17, xl: 19 }}
          required
        />
        <Row justify="space-between">
          <Col xs={11} md={14} xl={12}>
            <InputField
              controller={{ control, name: 'phone_number' }}
              inputProps={{
                placeholder: '01-2345-6789',
              }}
              label={t('basic_setting.phone_number')}
              labelCol={{ xs: 24, md: 12, xl: 10 }}
              wrapperCol={{ xs: 24, md: 10, xl: 11 }}
              style={{ marginBottom: '16px' }}
              required
            />
          </Col>
          <Col xs={11} md={10} xl={12}>
            <InputField
              controller={{ control, name: 'fax_number' }}
              inputProps={{
                placeholder: '01-2345-6789',
              }}
              label={t('basic_setting.fax_number')}
              labelCol={{ xs: 24, md: 10, xl: 5 }}
              wrapperCol={{ xs: 24, md: 14, xl: 11 }}
              style={{ marginBottom: '16px' }}
            />
          </Col>
        </Row>
        <InputField
          controller={{ control, name: 'address' }}
          inputProps={{
            placeholder: t('basic_setting.form'),
          }}
          label={t('basic_setting.address')}
          labelCol={{ xs: 24, md: 7, xl: 5 }}
          wrapperCol={{ xs: 24, md: 17, xl: 19 }}
          className="input_any"
        />
        <Divider className="form_divider" />
        <div className="form_person">
          <GroupField<FormValue>
            required
            label={t('basic_setting.responsible_person_name')}
            controller={{ name: 'responsible_person_1', control }}
            groupCols={[24, 24, 24]}
            labelCol={{ xs: 24, md: 7, xl: 5 }}
            wrapperCol={{ xs: 24, md: 17, xl: 19 }}
            context={form}
          >
            <Row className="new">
              <Col xs={24} md={8} xl={8}>
                <Row className="form_person_required">
                  <Col xs={6} md={8} xl={5}>
                    <Typography.Title level={5} className="form_label">
                      {'1)'}
                    </Typography.Title>
                  </Col>
                  <Col xs={18} md={16} xl={19}>
                    <GroupField.Select
                      name="responsible_person_1.name"
                      options={fakeDataPerson}
                      placeholder={t('basic_setting.responsible_person')}
                      className="form_select"
                    />
                  </Col>
                </Row>
              </Col>
              <Col xs={18} md={6} xl={7} offset={1} className="form_email">
                <GroupField.Input
                  name="responsible_person_1.mail"
                  placeholder={t('basic_setting.email')}
                />
              </Col>
              <Col xs={24} md={9} xl={8} className="form_checkbox_group">
                <GroupField.Checkbox
                  name="responsible_person_1.role"
                  options={fakeDataRole}
                />
              </Col>
            </Row>
          </GroupField>
          {inputArr.map((i) => {
            return (
              <GroupField
                controller={{ name: `responsible_person_${i + 2}`, control }}
                groupCols={[24, 24, 24]}
                labelCol={{ xs: 24, md: 7, xl: 5 }}
                wrapperCol={{ xs: 24, md: 17, xl: 19 }}
                context={form}
                key={i}
                className="form_person_row"
              >
                <Row className="new">
                  <Col xs={24} md={8} xl={8}>
                    <Row>
                      <Col
                        xs={6}
                        md={8}
                        xl={5}
                        className="form_person_sub_label"
                      >
                        <Typography.Title level={5} className="form_label">
                          {`${i + 2})`}
                        </Typography.Title>
                      </Col>
                      <Col xs={18} md={16} xl={19}>
                        <GroupField.Select
                          name={`responsible_person_${i + 2}.name`}
                          options={fakeDataPerson}
                          placeholder={t('basic_setting.responsible_person')}
                          className="form_select"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={18} md={6} xl={7} offset={1} className="form_email">
                    <GroupField.Input
                      name={`responsible_person_${i + 2}.email`}
                      placeholder={t('basic_setting.email')}
                    />
                  </Col>
                  <Col xs={24} md={9} xl={8} className="form_checkbox_group">
                    <GroupField.Checkbox
                      name={`responsible_person_${i + 2}.role`}
                      options={fakeDataRole}
                    />
                  </Col>
                </Row>
              </GroupField>
            );
          })}
        </div>
        <Divider className="form_divider" />
        <Row className="form_hours mb-8">
          <Col xs={24} md={7} xl={5}>
            <Typography.Title level={5} className="form_label_any">
              {t('basic_setting.business_hours')}
            </Typography.Title>
          </Col>
          <Col xs={24} md={17} xl={19}>
            <Row>
              <Col xs={11} md={4} xl={4}>
                <InputField
                  controller={{ control, name: 'business_hours_start' }}
                  inputProps={{
                    placeholder: '00:00',
                  }}
                />
              </Col>
              <Col xs={2} md={1} className="form_hours_middle">
                ~
              </Col>
              <Col xs={11} md={4} xl={4}>
                <InputField
                  controller={{ control, name: 'business_hours_end' }}
                  inputProps={{
                    placeholder: '00:00',
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="form_business_day">
          <Col xs={24} md={7} xl={5}>
            <Typography.Title level={5} className="form_label_required">
              {t('basic_setting.estimated_expiration_date')}
            </Typography.Title>
          </Col>
          <Col>
            <Row>
              <Col span={4}>
                <InputField
                  controller={{ control, name: 'estimated_expiration_date' }}
                  inputProps={{
                    placeholder: '7',
                  }}
                  required
                />
              </Col>
              <Col span={20} className="form_business_day_text">
                <Typography.Text className="form_label">
                  {t('basic_setting.business_day')}
                </Typography.Text>
                <Typography.Text className="form_business_day_note">
                  {t('basic_setting.business_day_note')}
                </Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider className="form_divider" />
        <InputField
          controller={{ control, name: 'specific_customer' }}
          inputProps={{
            placeholder: t('basic_setting.form'),
          }}
          label={t('basic_setting.specific_customer_flag_name')}
          labelCol={{ xs: 24, md: 7, xl: 5 }}
          wrapperCol={{ xs: 24, md: 17, xl: 19 }}
          style={{ marginBottom: '16px' }}
          className="input_any"
        />
        <RadioGroupField<FormValue>
          label={t('basic_setting.email_notification')}
          radioGroupProps={{
            options: fakeDataNotiEmail,
          }}
          controller={{
            name: 'notification_email',
            control,
          }}
          labelCol={{ xs: 24, md: 7, xl: 5 }}
          wrapperCol={{ xs: 24, md: 17, xl: 19 }}
          className="form_radio_group input_any"
        />
        <Row>
          <Col xs={24} md={7} xl={5} className="form_upload_label">
            <Typography.Title level={5} className="form_label">
              {t('basic_setting.ec_site_logo')}
            </Typography.Title>
          </Col>
          <Col xs={24} md={7} xl={5}>
            <ImageUploadField
              controller={{
                name: 'logo_img',
                control: control,
              }}
              maxCount={1}
              className="form_upload"
              showUploadList={{ showPreviewIcon: false }}
            >
              <Button
                type="primary"
                icon={<UploadOutlined />}
                className="form_button"
              >
                {t('basic_setting.upload')}
              </Button>
            </ImageUploadField>
          </Col>
          <Col xs={24} md={3} xl={3} className="form_upload_label">
            <Typography.Title level={5} className="form_label">
              {t('basic_setting.qr_code')}
            </Typography.Title>
          </Col>
          <Col xs={24} md={7} xl={5}>
            <ImageUploadField
              controller={{
                name: 'qr_img',
                control: control,
              }}
              maxCount={1}
              className="form_upload"
              showUploadList={{ showPreviewIcon: false }}
            >
              <Button
                type="primary"
                icon={<UploadOutlined />}
                className="form_button"
              >
                {t('basic_setting.upload')}
              </Button>
            </ImageUploadField>
          </Col>
        </Row>
      </div>
      <BottomNote />
      <Divider className="form_divider" />
      <div className="submit_button">
        <Button type="primary" onClick={handleSubmit(handleClick)}>
          {t('basic_setting.setting')}
        </Button>
      </div>
    </div>
  );
};

export default BasicSetting;
