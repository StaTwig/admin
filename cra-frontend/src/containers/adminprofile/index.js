import React from "react";
import AdminProfile from '../../components/adminprofile';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const AdminProfileContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <AdminProfile />
        </div>
      </div>
    </div>
  );
};

export default AdminProfileContainer;

