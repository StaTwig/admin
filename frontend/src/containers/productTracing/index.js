import React from "react";
import ProductTracing from "../../components/productTracing";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
import { useTranslation } from 'react-i18next';
const ProductTracingContainer = (props) => {
const { t, i18n } = useTranslation();
  return (
    <div className='container-fluid p-0'>
      <Header {...props} t={t}/>
      <div className='d-flex'>
        <Sidebar {...props} t={t}/>
        <div className='content'>
          <ProductTracing t={t}/>
        </div>
      </div>
    </div>
  );
};

export default ProductTracingContainer;
