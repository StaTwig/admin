import React,  { useEffect, useState } from "react";
import Inventory from '../../components/inventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useDispatch, useSelector} from "react-redux";
import {getInventories, resetInventories, getInventoryDetails} from "../../actions/inventoryActions";

const InventoryContainer = props => {
  const dispatch = useDispatch();

  const [skip, setSkip] = useState(5);
  const [limit, setLimit] = useState(5);
  const [loadMore, setLoadMore] = useState(true);

  const inventories = useSelector(state => {
    return state.inventories;
  });
 const inventoryDetails = useSelector(state => {
    return state.inventoryDetails;
  });

  const inventoriesCount = useSelector(state => {
      return state.inventoriesCount;
    });
  useEffect(() => {
    dispatch(resetInventories());
   // dispatch(getInventories(0, 5));
    dispatch(getInventoryDetails());
  }, []);


  const onLoadMore = async () => {
    const newSkip = skip + 5;
    setSkip(newSkip);
    const results = await dispatch(getInventories(skip, limit));
    if (results === 0) {
      setLoadMore(false);
    }
  };
  return (
            <div className="container-fluid p-0">
                  <Header {...props} />
                  <div className="d-flex">
                        <Sidebar {...props} />
                        <div className="content">
                              <Inventory  inventories={inventories} inventoriesCount={inventoriesCount}  loadMore={loadMore} inventoryDetails={inventoryDetails} onLoadMore={onLoadMore} {...props}/>
                        </div>
                  </div>
            </div>
      );
};

export default InventoryContainer;

