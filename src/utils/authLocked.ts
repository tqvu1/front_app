import history from 'src/libs/history';
import { PATH } from 'src/pages/auth';
import LocalStorage from 'src/utils/LocalStorage';

const authLocked = () => {
  if (history.location.pathname !== PATH.SIGN_IN) {
    LocalStorage.removeInfo();
    history.push(PATH.SIGN_IN, {
      state: {
        isLock: true,
      },
    });
  }
};

export default authLocked;
