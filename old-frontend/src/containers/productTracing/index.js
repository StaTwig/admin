import React, { useEffect } from "react";
import ProductTracing from '../../components/productTracing';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
//import {useDispatch, useSelector} from "react-redux";
//import {trackShipment} from "../../actions/shipmentActions";

const ProductTracingContainer = props => {
  //const dispatch = useDispatch();

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <ProductTracing />
        </div>
      </div>
    </div>
  );
};

export default ProductTracingContainer;

