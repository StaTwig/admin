import React from "react";
import NewInventory from '../../components/newinventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const NewInventoryContainer = props => {
  return (
    <div className="container-fluid p-0">
      <Header />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <NewInventory />
        </div>
      </div>
    </div>
  );
};

export default NewInventoryContainer;

