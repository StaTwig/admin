import React, { useState } from "react";
import ViewExpiry from "../../components/viewexpiry";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const ViewExpiryContainer = (props) => {
  const [inventories, setInventories] = useState([props.location.state.data]);
  console.log(props.location.state.data);
  //setInventories([]);
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ViewExpiry inventories={inventories} {...props} />
        </div>
      </div>
    </div>
  );
};

export default ViewExpiryContainer;
