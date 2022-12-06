import React, { useEffect, useState } from "react";
import ProductCategory from "../../components/productcategory";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useDispatch } from "react-redux";
import { turnOn, turnOff } from "../../actions/spinnerActions";
import { getProducts } from "../../actions/poActions";
import { useTranslation } from "react-i18next";

const ProductCategoryContainer = (props) => {
  const { t } = useTranslation();
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
  }, [dispatch]);

  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t} />
      <div className='d-flex'>
        <Sidebar {...props} t={t} />
        <div className='content'>
          <ProductCategory products={products} {...props} t={t} />
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryContainer;
