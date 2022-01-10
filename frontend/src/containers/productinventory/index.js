import React, { useEffect, useState } from "react";
import ProductInventory from "../../components/productinventory";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useDispatch, useSelector } from "react-redux";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import { getProducts } from "../../actions/poActions";
import { getInventory } from "../../actions/inventoryActions";
import { useTranslation } from 'react-i18next';

const ProductInventoryContainer = (props) => {
const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const inventories = useSelector((state) => {
    return state.inventoryDetails;
  });
  useEffect(() => {
    async function fetchData() {
      dispatch(turnOn());
      const result = await getProducts();
      setProducts(result);
      dispatch(getInventory(0, 10000));
      dispatch(turnOff());
    }
    fetchData();
  }, [dispatch]);
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <ProductInventory
            inventories={inventories}
            products={products}
            t={t}
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInventoryContainer;
