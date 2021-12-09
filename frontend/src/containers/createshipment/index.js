import React from "react";
import CreateShipment from "../../components/createshipment";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const createShipmentContainer = (props) => {
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <CreateShipment {...props} />
        </div>
      </div>
    </div>
  );
};

export default createShipmentContainer;
