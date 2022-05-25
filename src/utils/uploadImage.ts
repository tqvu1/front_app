import axios from 'src/libs/axios';
import axiosBase from 'axios';
import { AxiosPromise } from 'axios';
import { UploadFile } from 'antd/es/upload/interface';

export const preSignedImage = (file: File | UploadFile) => {
  return axios<any>({
    method: 'post',
    url: '/files/presigned',
    data: {
      mime_type: file.type,
      content_length: file.size,
    },
  }) as AxiosPromise<any>;
};

export type Data = {
  form_attributes: {
    action: string;
    enctype: string;
    method: string;
  };
  form_inputs: {
    'Content-Type': string;
    Policy: string;
    'X-Amz-Algorithm': string;
    'X-Amz-Credential': string;
    'X-Amz-Date': string;
    'X-Amz-Signature': string;
    key: string;
  };
};

export const uploadImage = (data: Data, file: File | UploadFile) => {
  const formdata = new FormData();

  for (const key in data.form_inputs) {
    formdata.append(key, data.form_inputs[key]);
  }
  formdata.append('file', file as File, file.name);

  return axiosBase({
    baseURL: data.form_attributes.action,
    method: 'post',
    data: formdata,
    headers: {
      enctype: data.form_attributes.enctype,
    },
  });
};
