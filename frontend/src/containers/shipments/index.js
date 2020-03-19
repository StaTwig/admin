import React from "react";
import Shipment from '../../components/shipments';
import Header from '../../components/shared/header';
import Sidebar from '../../components/shared/sidebarMenu';

const ShipmentContainer = () => {
      return (
            <div className="container-fluid p-0">
                  <Header />
                  <div className="d-flex">
                        <Sidebar />
                        <div className="content">
                              <Shipment />
                        </div>
                  </div>
            </div>
      );
};

export default ShipmentContainer;

