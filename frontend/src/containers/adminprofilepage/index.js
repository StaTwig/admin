import React from "react";
import AdminProfilePage from '../../components/adminprofilepage';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const AdminProfilePageContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <AdminProfilePage />
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePageContainer;

