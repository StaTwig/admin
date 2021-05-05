import React, {useEffect, useState} from "react";
import Inventory from "../../components/inventory";
import { useDispatch } from 'react-redux';
import {getProductsInventory} from '../../actions/inventoryAction';

const InventoryContainer = (props) => {
  const [inventories, setInventories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const result = await dispatch(getProductsInventory());
      setInventories(result.message);
    })();
  }, []);

  return <Inventory inventories={inventories} {...props} />;
};

export default InventoryContainer;
