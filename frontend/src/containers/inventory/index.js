import React from "react";
import Inventory from '../../components/inventory';
import Header from '../../components/shared/header';
import Sidebar from '../../components/shared/sidebarMenu';

const InventoryContainer = () => {
      return (
            <div className="container-fluid p-0">
                  <Header />
                  <div className="d-flex">
                        <Sidebar />
                        <div className="content">
                              <Inventory />
                        </div>
                  </div>
            </div>
      );
};

export default InventoryContainer;

