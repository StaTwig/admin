import React, { useEffect } from "react";
import ProductList from '../../components/productList';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useDispatch, useSelector} from "react-redux";
import {getInventories} from "../../actions/inventoryActions";

const ProductListContainer = props => {
      const dispatch = useDispatch();
  const inventories = useSelector(state => {
    return state.inventories;
  });
  useEffect(() => {
    dispatch(getInventories());
  }, []);


      return (
            <div className="container-fluid p-0">
                  <Header {...props} />
                  <div className="d-flex">
                        <Sidebar {...props} />
                        <div className="content">
                        <ProductList  inventories={inventories} {...props}/>
                        </div>
                  </div>
            </div>
      );
};

export default ProductListContainer;

