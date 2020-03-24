import React from "react";
import Inventory from '../../components/inventory';
import Header from '../../components/shared/header';
import Sidebar from '../../components/shared/sidebarMenu';

const NetworkContainer = props => {
      return (
            <div className="container-fluid p-0">
                  <Header />
                  <div className="d-flex">
                        <Sidebar {...props} />
                        <div className="content">
                              Network ....
                        </div>
                  </div>
            </div>
      );
};

export default NetworkContainer;

