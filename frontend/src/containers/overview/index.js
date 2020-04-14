import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import OverView from '../../components/overview';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {getShipments} from "../../actions/shipmentActions";
import {getInventories} from "../../actions/inventoryActions";
import {getUserInfo} from "../../actions/userActions";

const OverviewContainer = props => {
  const dispatch = useDispatch();
  const shipments = useSelector(state => {
    return state.shipments;
  });
  const inventory = useSelector(state =>{
    return state.inventories;
  })
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
          <OverView shipments={shipments} inventory={inventory}/>
        </div>
      </div>
    </div>
  );
};

export default OverviewContainer;

