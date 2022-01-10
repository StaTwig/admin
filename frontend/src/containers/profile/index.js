import React from "react";
import Profile from "../../components/profile";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from 'react-i18next';

const ProfileContainer = (props) => {
const { t, i18n } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <Profile {...props} t={t} />
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
