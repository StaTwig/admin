import { useDispatch} from 'react-redux';
import React, { useState, useEffect, useSelector } from 'react';
import Profile from '../../components/profile';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {getUserInfo} from "../../actions/userActions";


const ProfileContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Profile {...props}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;

