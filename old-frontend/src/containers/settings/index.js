import React from 'react';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import Settings from '../../components/settings';

const SettingsContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Settings {...props}/>
        </div>
      </div>
    </div>
  );
};

export default SettingsContainer;

