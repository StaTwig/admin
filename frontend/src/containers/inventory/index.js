import React,  { useEffect } from "react";
import Inventory from '../../components/inventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useDispatch, useSelector} from "react-redux";
import {getInventories} from "../../actions/inventoryActions";

const InventoryContainer = props => {
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
                              <Inventory  inventories={inventories}/>
                        </div>
                  </div>
            </div>
      );
};

export default InventoryContainer;

