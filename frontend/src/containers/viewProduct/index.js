import React, { useState, useEffect } from "react";
import ViewInventory from '../../components/viewInventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch } from 'react-redux';
import { turnOn, turnOff } from '../../actions/spinnerActions';
import { getInventoryByWareHouse } from '../../actions/inventoryActions';

const ViewProductContainer = props => {
  const [inventories, setInventories] = useState([props.location.state.data]);
  const dispatch = useDispatch();
  console.log(props.location.state.data)
  // setInventories([])
  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ViewInventory inventories={inventories} {...props} />
        </div>
      </div>
    </div>
  );
};

export default ViewProductContainer;

