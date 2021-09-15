import React from "react";
import VerifyShipment from "../../components/verifyshipment";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const VerifyShipmentContainer = (props) => {
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <VerifyShipment {...props} />
        </div>
      </div>
    </div>
  );
};

export default VerifyShipmentContainer;
