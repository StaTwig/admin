import React from "react";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import Settings from "../../components/settings";
import { useTranslation } from 'react-i18next';

const SettingsContainer = (props) => {
const { t, i18n } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t}/>
      <div className='d-flex'>
        <Sidebar {...props} t={t}/>
        <div className='content'>
          <Settings {...props} t={t}/>
        </div>
      </div>
    </div>
  );
};

export default SettingsContainer;
