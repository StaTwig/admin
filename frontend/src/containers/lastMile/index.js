import { useDispatch} from 'react-redux';
import React, { useState, useEffect, useSelector } from 'react';
import LastMile from '../../components/lastMile';
 import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';



const LastMileContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <LastMile {...props}/>
        </div>
      </div>
    </div>
  );
};

export default LastMileContainer;

