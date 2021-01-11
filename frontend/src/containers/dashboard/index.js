import React, { useState } from "react";
import DashBoard from '../../components/dashboard';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import './style.scss'
import DashBar from "../../shared/dashbar/index";

const DashBoardContainer = props => {
      const[DashVisible,setDashVisible]=useState(false);
      const[content,setContent]=useState(true);
      return (
            <div className="container-fluid p-0">
                  <Header {...props} />
                  <div className="d-flex">
                        <Sidebar {...props} />
                        <div className="content">
                       <DashBoard {...props} DashVisible={DashVisible} setDashVisible={setDashVisible}
                       content={content} setContent={setContent}/>
                        </div>
                     {DashVisible ? <DashBar {...props} setDashVisible={setDashVisible}  content={content} setContent={setContent}/> : null}
                        </div>
                 
            </div>
      );
};

export default DashBoardContainer;
