import React, { useEffect } from "react";
import Shipment from '../../components/shipments';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import {getShipments} from "../../actions/shipmentActions";
import {getInventories} from "../../actions/inventoryActions";

const ShipmentContainer = props => {
      const dispatch = useDispatch();
  const inventories = useSelector(state => {
    return state.inventories;
  });
  const shipments = useSelector(state => {
      return state.shipments;
    });
    useEffect(() => {
      dispatch(getShipments());
      dispatch(getInventories());
    }, []);

      return (
            <div className="container-fluid p-0">
                  <Header {...props} />
                  <div className="d-flex">
                        <Sidebar {...props} />
                        <div className="content">
                              <Shipment shipments={shipments} inventories={inventories}/>
                        </div>
                  </div>
            </div>
      );
};

export default ShipmentContainer;

