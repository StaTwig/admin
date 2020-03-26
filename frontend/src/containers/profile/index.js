import React from "react";
import Profile from '../../components/profile';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const ProfileContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;

