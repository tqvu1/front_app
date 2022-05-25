import history from 'src/libs/history';
import { PATH } from 'src/pages/auth';
import LocalStorage from 'src/utils/LocalStorage';
import { notification } from 'antd';

const authorization = () => {
  if (history.location.pathname !== PATH.SIGN_IN) {
    LocalStorage.removeInfo();
    history.push(PATH.SIGN_IN);

    notification.error({ message: 'Unauthorised' });
  }
};

export default authorization;
