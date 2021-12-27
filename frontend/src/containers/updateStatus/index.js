import React from "react";
import UpdateStatus from "../../components/updateStatus";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from 'react-i18next';

const UpdateTrackingStatusContainer = (props) => {
const { t, i18n } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t}/>
      <div className='d-flex'>
        <Sidebar {...props} t={t}/>
        <div className='content'>
          <UpdateStatus {...props} t={t}/>
        </div>
      </div>
    </div>
  );
};

export default UpdateTrackingStatusContainer;
