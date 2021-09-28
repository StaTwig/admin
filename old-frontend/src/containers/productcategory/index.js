import React,  { useEffect, useState } from "react";
import ProductCategory from '../../components/productcategory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import { useDispatch, useSelector } from 'react-redux';
import { turnOn, turnOff } from '../../actions/spinnerActions';
import { getProducts } from '../../actions/poActions';

const ProductCategoryContainer = props => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      dispatch(turnOn());
      const result = await getProducts();
      setProducts(result);
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
          <ProductCategory products={products} {...props} />
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryContainer;

