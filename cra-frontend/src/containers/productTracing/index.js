import React from "react";
import ProductTracing from "../../components/productTracing";
import Header from "../../shared/header";
import Sidebar from "../../shared/sidebarMenu";
const ProductTracingContainer = (props) => {
  return (
    <div className='container-fluid p-0'>
      <Header {...props} />
      <div className='d-flex'>
        <Sidebar {...props} />
        <div className='content'>
          <ProductTracing />
        </div>
      </div>
    </div>
  );
};

export default ProductTracingContainer;
