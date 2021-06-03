import React, { useState, useEffect } from "react";
import ViewInventory from '../../components/viewInventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch } from 'react-redux';
import { turnOn, turnOff } from '../../actions/spinnerActions';
import { getInventoryByWareHouse } from '../../actions/inventoryActions';

const ViewInventoryContainer = props => {
  const [inventories, setInventories] = useState([]);
  const dispatch = useDispatch();
  const warehouseId = props.match.params?.warehouseId;

  useEffect(() => {
    async function fetchData() {
      dispatch(turnOn());
      const result = await getInventoryByWareHouse(0, 1000, warehouseId);
      setInventories(result);
      dispatch(turnOff());
    }
    fetchData();
  }, []);

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

export default ViewInventoryContainer;

