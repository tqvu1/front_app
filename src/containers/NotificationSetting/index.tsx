import React from 'react';

import Note from './Note';
import Search from './Search';
import Table from './Table';

const NotificationSetting: React.FC = () => {
  return (
    <React.Fragment>
      <div className="notification_setting">
        <Note />
        <Search />
        <Table />
      </div>
    </React.Fragment>
  );
};

export default NotificationSetting;
