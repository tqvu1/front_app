import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';

type Props = {
  errorResponse?: AxiosResponse;
  statusCode?: 404 | 500 | 403;
};

const ErrorPage: React.FC<Props> = (props) => {
  const { errorResponse, statusCode } = props;
  const { status = statusCode } = errorResponse || { error: undefined };
  let code: 404 | 500 | 403 | undefined = undefined;
  let title: string = '';

  switch (status) {
    case 404:
      code = 404;
      title = 'Not found';
      break;
    case 500:
      code = 500;
      title = 'There is an error from server';
      break;
    case 403:
      code = 403;
      title = 'You are not allow to see this page';
      break;
    default:
      break;
  }

  return (
    <Result
      status={code}
      title={status}
      subTitle={title}
      extra={
        <Link to="/">
          <Button type="primary">Home</Button>
        </Link>
      }
    />
  );
};

export default ErrorPage;
