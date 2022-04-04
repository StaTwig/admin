import React from "react";
import AdminProfile from "../../components/adminprofile";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from "react-i18next";

const AdminProfileContainer = (props) => {
  const { t } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <AdminProfile t={t} />
        </div>
      </div>
    </div>
  );
};

export default AdminProfileContainer;
