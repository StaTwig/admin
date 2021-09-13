import React, { useState } from "react";
import ViewInventory from "../../components/viewInventory";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";

const ViewProductContainer = (props) => {
  const [inventories, setInventories] = useState([props.location.state.data]);
  console.log(props.location.state.data);
  setInventories([]);
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <ViewInventory inventories={inventories} {...props} />
        </div>
      </div>
    </div>
  );
};

export default ViewProductContainer;
