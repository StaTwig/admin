import React from "react";
import Inventory from '../../components/inventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';

const NetworkContainer = props => {
      return (
            <div className="container-fluid p-0">
                  <Header {...props} />
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

