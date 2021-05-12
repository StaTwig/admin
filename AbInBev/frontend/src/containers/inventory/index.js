import React, { useEffect, useState } from "react";
import Inventory from "../../components/inventory";
import { useDispatch } from 'react-redux';
import { getProductsInventory } from '../../actions/inventoryAction';

const InventoryContainer = (props) => {
  const [inventories, setInventories] = useState([]);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    inventoryType: 'BREWERY',
    vendorType: 'ALL_VENDORS',
    state: '',
    district: '',
    sku: ''
  });

  async function _getProductsInventory(_filters) {
    const result = await dispatch(getProductsInventory(_filters));
    setInventories(result.message);
  }

  useEffect(() => {
    _getProductsInventory(filters);
  }, []);

  const applyFilters = async (_filters) => {
    await _getProductsInventory(_filters);
  }

  return <Inventory inventories={inventories} {...props} applyFilters={applyFilters} />;
};

export default InventoryContainer;
