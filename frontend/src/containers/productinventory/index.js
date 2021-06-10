import React,  { useEffect, useState } from "react";
import ProductInventory from '../../components/productinventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { turnOn, turnOff } from '../../actions/spinnerActions';
import { getProducts } from '../../actions/poActions';
import { getInventories } from "../../actions/inventoryActions";

const ProductInventoryContainer = props => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const inventories = useSelector(state => {
    return state.inventories;
  });
  useEffect(() => {
    async function fetchData() {
      dispatch(turnOn());
      const result = await getProducts();
      setProducts(result);
      dispatch(getInventories(0, 10000));
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
          <ProductInventory inventories={inventories} products={products} {...props} />
        </div>
      </div>
    </div>
  );
};

export default ProductInventoryContainer;
