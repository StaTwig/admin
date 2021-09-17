import React,  { useEffect, useState } from "react";
import Inventory from '../../components/inventory';
import Header from '../../shared/header';
import Sidebar from '../../shared/sidebarMenu';
import {useDispatch, useSelector} from "react-redux";
import {getInventories, resetInventories, getInventoryDetails, getTransactionFilterList} from "../../actions/inventoryActions";

const InventoryContainer = props => {
  const dispatch = useDispatch();

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [inventoryFilterData, setInventoryFilterData] = useState([]);
  // const [loadMore, setLoadMore] = useState(true);

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
    async function fetchData() {
      const inventoryFilterDataRes = await getTransactionFilterList();
      setInventoryFilterData(inventoryFilterDataRes);
    };
    dispatch(resetInventories());
    dispatch(getInventories(0, 10, "", "", "", "")); //(skip, limit, dateFilter, productName, productCategory, status)
    fetchData();
  }, []);


  // const onLoadMore = async () => {
  //   const newSkip = skip + 5;
  //   setSkip(newSkip);
  //   const results = await dispatch(getInventories(skip, limit));
  //   if (results === 0) {
  //     setLoadMore(false);
  //   }
  // };

  // const onLoadMore = async (isInc) => {
  //   const newSkip = isInc ? skip + 5 : skip - 5;
  //   setSkip(newSkip);
  //   dispatch(getInventories(newSkip, limit, ""));
  // };

  return (
    <div className="container-fluid p-0">
      <Header {...props} />
      <div className="d-flex">
        <Sidebar {...props} />
        <div className="content">
          <Inventory skip={skip} inventoriesCount={inventoriesCount} inventoryDetails={inventories} inventoryFilterData={inventoryFilterData} {...props} />
        </div>
      </div>
    </div>
  );
};

export default InventoryContainer;

