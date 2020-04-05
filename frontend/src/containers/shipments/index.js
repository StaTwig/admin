import React from "react";
import Shipment from '../../components/shipments';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useSelector} from "react-redux";

const ShipmentContainer = props => {
  const inventories = useSelector(state => {
    return state.inventories;
  });
      return (
            <div className="container-fluid p-0">
                  <Header {...props} />
                  <div className="d-flex">
                        <Sidebar {...props} />
                        <div className="content">
                              <Shipment inventories={inventories}/>
                        </div>
                  </div>
            </div>
      );
};

export default ShipmentContainer;

