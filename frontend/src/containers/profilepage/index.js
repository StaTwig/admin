import React from "react";
import ProfilePage from '../../components/profilepage';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const ProfilePageContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ProfilePage />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageContainer;

