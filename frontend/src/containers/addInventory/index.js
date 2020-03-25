import React from "react";
import AddInventory from '../../components/addInventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const AddInventoryContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <AddInventory />
        </div>
      </div>
    </div>
  );
};

export default AddInventoryContainer;

