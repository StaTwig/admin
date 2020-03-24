import React from "react";
import Inventory from '../../components/inventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const InventoryContainer = props => {
      return (
            <div className="container-fluid p-0">
                  <Header />
                  <div className="d-flex">
                        <Sidebar {...props} />
                        <div className="content">
                              <Inventory />
                        </div>
                  </div>
            </div>
      );
};

export default InventoryContainer;

