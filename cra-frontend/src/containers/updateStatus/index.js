import React from "react";
import UpdateStatus from "../../components/updateStatus";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const UpdateTrackingStatusContainer = (props) => {
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <UpdateStatus {...props} />
        </div>
      </div>
    </div>
  );
};

export default UpdateTrackingStatusContainer;
