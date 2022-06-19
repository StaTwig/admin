import React, { useEffect, useState } from 'react';
import Inventory from '../../components/inventory';
import { useDispatch } from 'react-redux';
import { getProductsInventory } from '../../actions/inventoryAction';

const InventoryContainer = (props) => {
  const [inventories, setInventories] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const dispatch = useDispatch();
  const type = localStorage.getItem('type');

  const [filters, setFilters] = useState({
    inventoryType: (type == 'BREWERY' || type == 'CENTRAL_AUTHORITY') ? 'BREWERY' : 'VENDOR',
    vendorType: 'ALL_VENDORS',
    state: '',
    district: '',
    sku: '',
  });

  async function _getProductsInventory(_filters) {
    const result = await dispatch(getProductsInventory(_filters));
    setInventories(result.message);
    let inventories = result.message;
    let _totalStock = inventories.reduce((a, b) => +a + +b.quantity, 0);
    setTotalStock(_totalStock);
  }

  useEffect(() => {
    _getProductsInventory(filters);
  }, []);

  const applyFilters = async (_filters) => {
    setFilters(_filters);
    await _getProductsInventory(_filters);
  };

  return (
    <Inventory
      inventories={inventories}
      totalStock={totalStock}
      {...props}
      applyFilters={applyFilters}
    />
  );
};

export default InventoryContainer;
