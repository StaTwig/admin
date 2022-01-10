import React from "react";

import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import network from "../../assets/icons/NetworkBG.png";
import { useTranslation } from 'react-i18next';

const NetworkContainer = (props) => {
const { t, i18n } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t}/>
      <div className='d-flex'>
        <Sidebar {...props} t={t}/>
        <div className='content'>
          <img
            alt=''
            src={network}
            className='icon'
            width='1200'
            height='600'
          />
        </div>
      </div>
    </div>
  );
};

export default NetworkContainer;
